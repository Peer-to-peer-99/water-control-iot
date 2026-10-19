<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function check(Request $request): JsonResponse
    {
        return response()->json([
            'authenticated' => $request->user() !== null,
        ]);
    }
}
