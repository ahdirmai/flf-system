<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    // Ensure roles exist
    Role::firstOrCreate(['name' => 'admin']);
    Role::firstOrCreate(['name' => 'participant']);
});

test('admin is redirected to admin dashboard', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('admin.dashboard', absolute: false));
});

test('participant is redirected to user dashboard', function () {
    $user = User::factory()->create();
    $user->assignRole('participant');

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('user without role is redirected to user dashboard', function () {
    $user = User::factory()->create();
    // No role assigned

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});
