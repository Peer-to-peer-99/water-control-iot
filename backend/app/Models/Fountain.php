<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fountain extends Model
{
    protected $fillable = [
        'name',
        'description',
        'address',
        'latitude',
        'longitude',
        'status'
    ];
}
