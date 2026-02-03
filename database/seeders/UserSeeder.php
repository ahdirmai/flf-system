<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Admin
        $admin = User::firstOrCreate([
            'username' => '081299999999',
        ], [
            'name' => 'Super Admin',
            'password' => Hash::make('password'),
        ]);

        $admin->assignRole('admin');

        // 2. Create Participant
        $participantUser = User::firstOrCreate([
            'username' => '081288888888',
        ], [
            'name' => 'John Participant',
            'password' => Hash::make('password'),
        ]);

        $participantUser->assignRole('participant');

        // Ensure Participant Profile Exists
        if (!$participantUser->participant) {
            $participantUser->participant()->create([
                'name' => $participantUser->name,
                'phone_number' => $participantUser->username,
            ]);
        }
    }
}
