<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reading extends Model
{
    protected $fillable = [
        'device_id',
        'distance_cm',
        'measured_at',
    ];

    protected function casts(): array
    {
        return [
            'distance_cm' => 'decimal:2',
            'measured_at' => 'datetime',
        ];
    }

    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class);
    }
}
