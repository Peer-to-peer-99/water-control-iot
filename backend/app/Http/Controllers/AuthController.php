<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterLoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(RegisterLoginRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'google_id' => $data['google_id'],
            'avatar' => $data['avatar'],
        ]);

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'Register successfully'
        ], 201);
    }

    public function login(): JsonResponse
    {

    }

    public function logout(): JsonResponse
    {

    }


}
