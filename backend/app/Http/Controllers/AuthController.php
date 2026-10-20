<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    )
    {

    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService->register($request->validated());
        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'Register successfully'
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->authService->login($request->validated());
        if(!$user) return response()->json([
            'success' => false,
            'message' => 'Invalid email or password'
        ], 401);

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'Login successfully'
        ]);
    }

    public function logout(): JsonResponse
    {

    }


}
