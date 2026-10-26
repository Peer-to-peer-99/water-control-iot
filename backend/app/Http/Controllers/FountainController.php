<?php

namespace App\Http\Controllers;

use App\Models\Fountain;
use App\Services\FountainDetailsService;
use Illuminate\Http\Request;

class FountainController extends Controller
{
    private const RESERVOIR_HEIGHT_CM = 100;
    public function __construct(
        protected FountainDetailsService $fountainDetailsService
    )
    {

    }
    public function index()
    {
        $fountains = Fountain::query()->select([
            'id',
            'name',
            'description',
            'address',
            'photo_url',
            'latitude',
            'longitude',
            'status'
        ])->whereNotNull('latitude')
            ->whereNotNull('longitude')->get();

        return response()->json($fountains);
    }

    public function show(Fountain $fountain)
    {
        return response()->json(
            $this->fountainDetailsService->getDetails($fountain)
        );
    }
}
