<?php

namespace Database\Seeders;

use App\Models\Device;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DeviceSeeder extends Seeder
{
    protected array $devices = [
        [
            'fountain_id' => 1
        ]
    ];
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->devices as $createToDevice) {
            Device::create([
                'uuid' => (string) Str::uuid(),
                'fountain_id' => $createToDevice['fountain_id'],
            ]);
        }
    }
}
