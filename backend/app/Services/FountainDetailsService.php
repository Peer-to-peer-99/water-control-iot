<?php

namespace App\Services;

use App\Models\Fountain;

class FountainDetailsService
{
    public function getDetails(Fountain $fountain): array
    {
        $device = $fountain->devices()->with([
            'readings' => fn ($query) => $query->latest('measured_at')->limit(1)
        ])->first();

        $reading = $device?->readings->first();
        $lastSeen = $reading?->measured_at;

        $connected = $lastSeen !== null && $lastSeen->greaterThanOrEqualTo(now()->subSeconds(15));

        return [
            'id' => $fountain->id,
            'name' => $fountain->name,
            'description' => $fountain->description,
            'address' => $fountain->address,
            'status' => $fountain->status,

            'water_level' => [
                'distance_cm' => $reading?->distance_cm !== null
                    ? (float) $reading->distance_cm
                    : null,
                'percentage' => null,
            ],

            'connection' => [
                'status' => $connected
                    ? 'connected'
                    : 'disconnected',
                'last_seen' => $lastSeen,
            ],

            'temperature' => [
                'value' => null,
                'unit' => '°C',
            ],
        ];
    }
}
