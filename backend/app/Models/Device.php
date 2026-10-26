<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Device extends Model
{
    protected $fillable = [
        'fountain_id',
    ];


    protected static function booted(): void
    {
        static::creating(function (Device $device) {
            $device->uuid = (string) Str::uuid();
        });
    }

    public function fountain(): BelongsTo
    {
        return $this->belongsTo(Fountain::class);
    }

    public function readings(): HasMany
    {
        return $this->hasMany(Reading::class);
    }

}
