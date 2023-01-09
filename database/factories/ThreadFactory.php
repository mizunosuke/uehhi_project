<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Thread>
 */
class ThreadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_id = User::all()->random(1)[0]->id;
        $port_id = rand(1,10);

        return [
            'port_id' => $port_id,
            'user_id' => $user_id,
            'text' => $this->faker->text,
        ];
    }
}
