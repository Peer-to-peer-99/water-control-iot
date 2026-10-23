<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDeviceRequest;
use App\Services\DeviceReadingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeviceController extends Controller
{
    public function __construct(
        protected DeviceReadingService $deviceReadingService
    )
    {}
    public function store(CreateDeviceRequest $request): JsonResponse
    {

        $reading = $this->deviceReadingService->create($request->validated());
        return response()->json([
           'message' => 'Device created successfully.',
           'data' => $reading
        ], 201);
    }
}
