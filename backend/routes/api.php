<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->middleware('web')->name('api.v1.')->group(function () {
    Route::prefix('google')->name('google')->group(function () {
        Route::get('callback', [GoogleAuthController::class, 'callback'])->name('callback');
        Route::get('redirect', [GoogleAuthController::class, 'redirect'])->name('redirect');
    });
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login'])->name('login');
        Route::post('register', [AuthController::class, 'register'])->name('register');
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    });
});
