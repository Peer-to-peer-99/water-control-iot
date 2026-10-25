<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Fountain extends Model
{
    protected $fillable = [
        'name',
        'description',
        'address',
        'photo_url',
        'latitude',
        'longitude',
        'status'
    ];

    public function devices(): HasMany
    {
        return $this->hasMany(Device::class);
    }
}
