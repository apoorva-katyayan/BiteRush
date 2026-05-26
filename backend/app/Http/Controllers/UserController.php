<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;
use Cloudinary\Cloudinary;
use Razorpay\Api\Api as RazorpayApi;

class UserController extends Controller
{
    public function userLogin(Request $request)
    {
        try {
            $email = $request->input('email');
            $password = $request->input('password');

            if (!$email || !$password) {
                return response()->json([
                    'success' => false,
                    'message' => 'All Fields are mandatory'
                ]);
            }

            $userData = User::where('email', $email)->first();
            if (!$userData) {
                return response()->json([
                    'success' => false,
                    'message' => 'User Not found'
                ]);
            }

            $isValid = Hash::check($password, $userData->password);
            if (!$isValid) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid Credential'
                ]);
            }

            $payload = [
                'id' => $userData->id,
                'email' => $email,
                'exp' => time() + (24 * 60 * 60) // 1 day
            ];
            $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

            return response()->json([
                'success' => true,
                'message' => 'Login successfully',
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function userSignup(Request $request)
    {
        try {
            $fullName = $request->input('fullName');
            $email = $request->input('email');
            $password = $request->input('password');

            if (!$email || !$password || !$fullName) {
                return response()->json([
                    'success' => false,
                    'message' => 'All Fields are mandatory'
                ]);
            }

            $existingUser = User::where('email', $email)->first();
            if ($existingUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email is already in use'
                ]);
            }

            $hashedPassword = Hash::make($password);

            $user = User::create([
                'full_name' => $fullName,
                'email' => $email,
                'password' => $hashedPassword,
            ]);

            $payload = [
                'id' => $user->id,
                'email' => $email,
                'exp' => time() + (24 * 60 * 60)
            ];
            $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

            return response()->json([
                'success' => true,
                'message' => 'Account created successfully',
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function userProfile(Request $request)
    {
        try {
            $userId = $request->input('userId');
            $user = User::find($userId);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ]);
            }

            // Transform to match MERN response
            $profile = [
                '_id' => $user->id,
                'fullName' => $user->full_name,
                'email' => $user->email,
                'image' => $user->image,
                'address' => $user->address,
                'gender' => $user->gender,
                'dob' => $user->dob,
                'phone' => $user->phone,
                'createdAt' => $user->created_at->toISOString(),
                'updatedAt' => $user->updated_at->toISOString(),
            ];

            return response()->json([
                'success' => true,
                'profile' => $profile,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $image = $request->file('image');
            $userId = $request->input('userId');
            $fullName = $request->input('fullName');
            $phone = $request->input('phone');
            $address = $request->input('address');
            $dob = $request->input('dob');
            $gender = $request->input('gender');

            if (!$fullName || !$phone || !$address || !$dob || !$gender || !$userId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Some Data is missing'
                ]);
            }

            User::where('id', $userId)->update([
                'full_name' => $fullName,
                'phone' => $phone,
                'address' => $address,
                'dob' => $dob,
                'gender' => $gender,
            ]);

            if ($image) {
                $cloudinary = new Cloudinary([
                    'cloud' => [
                        'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                        'api_key' => env('CLOUDINARY_API_KEY'),
                        'api_secret' => env('CLOUDINARY_API_SECRET'),
                    ]
                ]);

                $uploadResult = $cloudinary->uploadApi()->upload($image->getRealPath(), [
                    'resource_type' => 'image'
                ]);

                User::where('id', $userId)->update([
                    'image' => $uploadResult['secure_url']
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Profile updated Successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function placeOrder(Request $request)
    {
        try {
            $userId = $request->input('userId');
            $mode = $request->input('mode');
            $items = $request->input('items');
            $totalPrice = $request->input('totalPrice');
            $payment = $request->input('payment');

            if (!$userId || !$items || $totalPrice == 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Missing required fields',
                ]);
            }


            // Prevent duplicate unpaid online orders for same user/cart
            $existingOrder = Order::where('user_id', $userId)
                ->where('mode', $mode ?? 'takeaway')
                ->where('items', $items)
                ->where('total_price', $totalPrice)
                ->where('payment', $payment ?? 'Cash')
                ->where('is_paid', false)
                ->where('status', 'Pending')
                ->first();

            if ($existingOrder) {
                $order = $existingOrder;
            } else {
                $order = Order::create([
                    'user_id' => $userId,
                    'mode' => $mode ?? 'takeaway',
                    'items' => $items,
                    'total_price' => $totalPrice,
                    'payment' => $payment ?? 'Cash',
                ]);
            }

            // Transform to match MERN response
            $savedOrder = [
                '_id' => $order->id,
                'userId' => $order->user_id,
                'mode' => $order->mode,
                'items' => $order->items,
                'totalPrice' => $order->total_price,
                'payment' => $order->payment,
                'isPaid' => $order->is_paid,
                'status' => $order->status,
                'createdAt' => $order->created_at->toISOString(),
                'updatedAt' => $order->updated_at->toISOString(),
            ];

            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully',
                'order' => $savedOrder,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function getOrders(Request $request)
    {
        try {
            $userId = $request->input('userId');
            $orders = Order::where('user_id', $userId)->orderBy('created_at', 'desc')->get();

            // Transform to match MERN response
            $orders = $orders->map(function ($order) {
                return [
                    '_id' => $order->id,
                    'userId' => $order->user_id,
                    'mode' => $order->mode,
                    'items' => $order->items,
                    'totalPrice' => $order->total_price,
                    'payment' => $order->payment,
                    'isPaid' => $order->is_paid,
                    'status' => $order->status,
                    'createdAt' => $order->created_at->toISOString(),
                    'updatedAt' => $order->updated_at->toISOString(),
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'User orders fetched successfully',
                'orders' => $orders,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function cancelOrder(Request $request)
    {
        try {
            $userId = $request->input('userId');
            $orderId = $request->input('orderId');

            $order = Order::where('id', $orderId)->where('user_id', $userId)->first();

            if ($order->status === "Accepted" || $order->status === "Completed") {
                return response()->json([
                    'success' => false,
                    'message' => "Order already processed and can't be cancelled."
                ]);
            }

            if ($order->status === "Cancelled") {
                return response()->json([
                    'success' => false,
                    'message' => "This order is already cancelled."
                ]);
            }

            $order->status = "Cancelled";
            if ($order->is_paid) {
                $order->is_paid = false;
                $order->payment_status = 'Refunded';
            }
            $order->save();

            return response()->json([
                'success' => true,
                'message' => 'Your order has been cancelled successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function paymentRazorpay(Request $request)
    {
        try {
            $orderId = $request->input('orderId');
            $order = Order::find($orderId);

            if (!$order || $order->status === "Cancelled") {
                return response()->json([
                    'success' => false,
                    'message' => 'Order does not exist'
                ]);
            }

            $api = new RazorpayApi(env('RAZORPAY_KEY_ID'), env('RAZORPAY_KEY_SECRET'));

            $razorpayOrder = $api->order->create([
                'amount' => $order->total_price * 100,
                'currency' => env('CURRENCY', 'INR'),
                'receipt' => (string) $orderId,
            ]);

            return response()->json([
                'success' => true,
                'response' => $razorpayOrder->toArray(),
                'key' => env('RAZORPAY_KEY_ID'),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function verifyPayment(Request $request)
    {
        try {
            $razorpayOrderId = $request->input('razorpay_order_id');

            $api = new RazorpayApi(env('RAZORPAY_KEY_ID'), env('RAZORPAY_KEY_SECRET'));
            $orderInfo = $api->order->fetch($razorpayOrderId);

            if ($orderInfo->status === 'paid') {
                Order::where('id', $orderInfo->receipt)->update(['is_paid' => true]);

                return response()->json([
                    'success' => true,
                    'message' => 'Payment successfull'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Payment failed'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function sendMessage(Request $request)
    {
        try {
            $name = $request->input('name');
            $email = $request->input('email');
            $message = $request->input('message');

            if (!$name || !$email || !$message) {
                return response()->json([
                    'success' => false,
                    'message' => 'All fields are required.'
                ]);
            }

            Message::create([
                'name' => $name,
                'email' => $email,
                'message' => $message,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function getAllMessages()
    {
        try {
            $messages = Message::orderBy('created_at', 'desc')->get();

            // Transform to match MERN response
            $messages = $messages->map(function ($msg) {
                return [
                    '_id' => $msg->id,
                    'name' => $msg->name,
                    'email' => $msg->email,
                    'message' => $msg->message,
                    'createdAt' => $msg->created_at->toISOString(),
                    'updatedAt' => $msg->updated_at->toISOString(),
                ];
            });

            return response()->json([
                'success' => true,
                'messages' => $messages,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }
}
