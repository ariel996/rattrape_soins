<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::query()->updateOrCreate(
            ['name'=>'Admin'],
        );
        Role::query()->updateOrCreate(
            ['name'=>'Secretory'],
        );
        Role::query()->updateOrCreate(
            ['name'=>'Staff'],
        );
        Role::query()->updateOrCreate(
            ['name'=>'Patient'],
        );
    }
}
