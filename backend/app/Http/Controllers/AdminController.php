<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Order;
use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Cloudinary\Cloudinary;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function adminLogin(Request $request)
    {
        try {
            $email = $request->input('email');
            $password = $request->input('password');

            if (!$email || !$password) {
                return response()->json([
                    'success' => false,
                    'message' => 'All fields are mandatory'
                ]);
            }

            if ($email === env('ADMIN_EMAIL') && $password === env('ADMIN_PASSWORD')) {
                $payload = [
                    'email' => $email,
                    'exp' => time() + (7 * 24 * 60 * 60) // 7 days
                ];
                $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

                return response()->json([
                    'success' => true,
                    'message' => 'Login Successfully',
                    'token' => $token
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid Credential'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function addItem(Request $request)
    {
        try {
            $name = $request->input('name');
            $price = $request->input('price');
            $desc = $request->input('desc');
            $category = $request->input('category');
            $foodType = $request->input('foodType', 'veg');
            $image = $request->file('image');

            if (!$name || !$price || !$desc || !$image || !$category || !in_array($foodType, ['veg', 'non-veg'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'All Fields are mandatory'
                ]);
            }

            $imageUrl = null;

            if (env('CLOUDINARY_CLOUD_NAME') && env('CLOUDINARY_API_KEY') && env('CLOUDINARY_API_SECRET')) {
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

                $imageUrl = $uploadResult['secure_url'];
            } else {
                $uploadsPath = public_path('uploads');
                if (!is_dir($uploadsPath)) {
                    mkdir($uploadsPath, 0755, true);
                }

                $filename = Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)) . '-' . time() . '.' . $image->getClientOriginalExtension();
                $image->move($uploadsPath, $filename);
                $imageUrl = url('uploads/' . $filename);
            }

            $newItem = Item::create([
                'image' => $imageUrl,
                'name' => $name,
                'price' => $price,
                'desc' => $desc,
                'category' => $category,
                'food_type' => $foodType,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Item added Successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function removeItem(Request $request)
    {
        try {
            $itemId = $request->input('itemId');
            Item::destroy($itemId);

            return response()->json([
                'success' => true,
                'message' => 'Item deleted Successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function changeAvailability(Request $request)
    {
        try {
            $itemId = $request->input('itemId');
            $item = Item::find($itemId);

            if ($item) {
                $item->available = !$item->available;
                $item->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Availability changed'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function setSellingMode(Request $request)
    {
        try {
            $mode = $request->input('mode', 'both');

            if (!in_array($mode, ['veg', 'non-veg', 'both'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid selling mode'
                ]);
            }

            if ($mode === 'both') {
                Item::query()->update(['available' => true]);
            } else {
                Item::query()->update(['available' => false]);
                Item::where('food_type', $mode)->update(['available' => true]);
            }

            return response()->json([
                'success' => true,
                'message' => $mode === 'both' ? 'Selling both veg and non-veg' : 'Selling mode updated'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function getAllOrders()
    {
        try {
            $orders = Order::with(['user' => function ($query) {
                $query->select('id', 'full_name', 'address', 'phone', 'email');
            }])
            ->orderBy('created_at', 'desc')
            ->get();

            // Transform to match the MERN response format
            $orders = $orders->map(function ($order) {
                return [
                    '_id' => $order->id,
                    'userId' => $order->user ? [
                        '_id' => $order->user->id,
                        'fullName' => $order->user->full_name,
                        'address' => $order->user->address,
                        'phone' => $order->user->phone,
                        'email' => $order->user->email,
                    ] : null,
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
                'orders' => $orders
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function takeAction(Request $request)
    {
        try {
            $orderId = $request->input('orderId');
            $action = $request->input('action');


            $order = Order::find($orderId);
            $order->status = $action;
            // If marking as Completed, ensure payment is marked as paid
            if ($action === 'Completed' && !$order->is_paid) {
                $order->is_paid = true;
                $order->payment_status = 'Paid';
            }
            $order->save();

            return response()->json([
                'success' => true,
                'message' => 'Action Taken Successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function getAllUsers()
    {
        try {
            $users = User::select('id', 'full_name', 'email', 'image', 'address', 'gender', 'dob', 'phone', 'created_at', 'updated_at')->get();

            // Transform to match MERN response
            $users = $users->map(function ($user) {
                return [
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
            });

            return response()->json([
                'success' => true,
                'users' => $users
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function getDashboardStats()
    {
        try {
            $userCount = User::count();
            $orderCount = Order::count();
            $itemCount = Item::count();
            $totalRevenue = Order::where('is_paid', true)->sum('total_price');

            return response()->json([
                'success' => true,
                'stats' => [
                    'users' => $userCount,
                    'orders' => $orderCount,
                    'items' => $itemCount,
                    'revenue' => $totalRevenue,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function deleteUsers(Request $request)
    {
        try {
            $userId = $request->input('userId');
            Order::where('user_id', $userId)->delete();
            User::destroy($userId);

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }

    public function getAllMessage()
    {
        try {
            $messages = Message::all();

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
