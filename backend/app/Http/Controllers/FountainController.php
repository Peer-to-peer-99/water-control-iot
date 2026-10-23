<?php

namespace App\Http\Controllers;

use App\Models\Fountain;
use Illuminate\Http\Request;

class FountainController extends Controller
{
    public function index()
    {
        $fountains = Fountain::query()->select([
            'id',
            'name',
            'description',
            'address',
            'latitude',
            'longitude',
            'status'
        ])->whereNotNull('latitude')
            ->whereNotNull('longitude')->get();

        return response()->json($fountains);
    }

    public function show(Fountain $fountain)
    {
        return response()->json($fountain);
    }
}
