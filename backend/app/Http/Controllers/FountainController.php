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
            'latitude',
            'longitude',
        ])->whereNotNull('latitude')
            ->whereNotNull('longitude')->get();

        return response()->json($fountains);
    }
}
