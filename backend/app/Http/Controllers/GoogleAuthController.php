<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Socialite;
use App\Services\GoogleAuthService;

class GoogleAuthController extends Controller
{
    public function __construct(
        private readonly GoogleAuthService $googleAuthService
    )
    {}
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(Request $request): JsonResponse
    {
        $googleUser = Socialite::driver('google')->user();
        $user = $this->googleAuthService->authenticate($googleUser);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'data' => $user,
        ], 201);
    }
}
