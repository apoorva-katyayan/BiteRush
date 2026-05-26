<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommonController;
use App\Http\Middleware\AuthAdmin;
use App\Http\Middleware\AuthUser;

Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminController::class, 'adminLogin']);
    
    Route::middleware([AuthAdmin::class])->group(function () {
        Route::post('/add-item', [AdminController::class, 'addItem']);
        Route::post('/remove-item', [AdminController::class, 'removeItem']);
        Route::post('/change-availability', [AdminController::class, 'changeAvailability']);
        Route::post('/selling-mode', [AdminController::class, 'setSellingMode']);
        Route::get('/all-orders', [AdminController::class, 'getAllOrders']);
        Route::post('/action', [AdminController::class, 'takeAction']);
        Route::get('/all-users', [AdminController::class, 'getAllUsers']);
        Route::get('/dashboard-data', [AdminController::class, 'getDashboardStats']);
        Route::post('/delete-users', [AdminController::class, 'deleteUsers']);
        Route::get('/get-message', [AdminController::class, 'getAllMessage']);
    });
});

Route::prefix('user')->group(function () {
    Route::post('/signup', [UserController::class, 'userSignup']);
    Route::post('/login', [UserController::class, 'userLogin']);
    Route::post('/send-message', [UserController::class, 'sendMessage']);
    
    Route::middleware([AuthUser::class])->group(function () {
        Route::get('/profile', [UserController::class, 'userProfile']);
        Route::post('/update-profile', [UserController::class, 'updateProfile']);
        Route::post('/place-order', [UserController::class, 'placeOrder']);
        Route::get('/get-order', [UserController::class, 'getOrders']);
        Route::post('/cancel-order', [UserController::class, 'cancelOrder']);
        Route::post('/payment-razorpay', [UserController::class, 'paymentRazorpay']);
        Route::post('/verify-payment', [UserController::class, 'verifyPayment']);
    });
});

Route::prefix('common')->group(function () {
    Route::get('/get-items', [CommonController::class, 'getAllItems']);
    Route::get('/all-messages', [UserController::class, 'getAllMessages']);
});
