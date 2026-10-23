<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Fountain;
class FountainSeeder extends Seeder
{
    private array $fountains = [
       [
            'name' => 'Chafariz 1 - Boa Passagem',
            'description' => '',
            'address' => 'Boa Passagem, Caicó, Rio Grande do Norte, Brazil',
            'latitude' => '-6.446786',
            'longitude' => '-37.092069',
       ]
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->fountains as $fountainToCreate) {
            Fountain::create($fountainToCreate);
        }
    }
}
