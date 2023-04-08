<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        User::query()->updateOrCreate([
            'email' => 'admin@gmail.com',
        ], [
            'name' => 'Admin Seed',
            'dob'=> now(),
            'role_id'=> 1,
            'password'=> Hash::make('password'),
        ]);
    }
}
