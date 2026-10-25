<?php

namespace App\Services;

use App\Models\Device;
use App\Models\Reading;

class DeviceReadingService
{
    public function create(array $data): Reading
    {
        $device = Device::query()->where('uuid', $data['device_uuid'])->firstOrFail();
        return $device->readings()->create(attributes: [
            "distance_cm" => $data['distance_cm'],
            "measured_at" => $data['measured_at'],
        ]);
    }

    public function latestForFountain(int $fountainId): ?Reading
    {
        return Reading::query()->whereHas('device', function ($query) use ($fountainId) {
            $query->where('fountain_id', $fountainId);
        } )->orderByDesc('measured_at')->orderByDesc('id')->first();
    }
}
