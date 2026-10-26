<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\FountainController;
use App\Http\Controllers\SessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->name('api.v1.')->group(function () {
    Route::prefix('google')->name('google')->group(function () {
        Route::get('callback', [GoogleAuthController::class, 'callback'])->name('callback');
        Route::get('redirect', [GoogleAuthController::class, 'redirect'])->name('redirect');
    });
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register'])->name('register');
        Route::post('login', [AuthController::class, 'login'])->name('login');

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [AuthController::class, 'logout'])->name('logout');
            Route::get('me', [AuthController::class, 'me'])->name('me');
        });
    });
    Route::get('/session/check', [SessionController::class, 'check'])->name('session.check');
    Route::get('/fountains', [FountainController::class, 'index'])->name('foundains.index');
    Route::get('/fountains/{fountain}', [FountainController::class, 'show'])->name('foundains.show');
    Route::post('/device/readings', [DeviceController::class, 'store'])->name('device.readings');
    Route::get('/fountains/{fountain}/readings/latest', [DeviceController::class, 'latestReading'])->name( 'device.latest-reading');
});
