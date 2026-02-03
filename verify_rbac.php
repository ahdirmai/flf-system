<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

echo "Verifying RBAC Logic...\n";

try {
    // 1. Setup Test Users (Already seeded, but strictly enforcing here)
    $admin = User::firstOrCreate(
        ['username' => '081299999999'],
        ['name' => 'Super Admin', 'password' => Hash::make('password')]
    );
    if (!$admin->hasRole('admin'))
        $admin->assignRole('admin');

    $participant = User::firstOrCreate(
        ['username' => '081288888888'],
        ['name' => 'John Participant', 'password' => Hash::make('password')]
    );
    if ($participant->hasRole('admin'))
        $participant->removeRole('admin');
    if (!$participant->hasRole('participant'))
        $participant->assignRole('participant');


    // 2. Test Admin Access (Simulation)
    echo "\nTesting Admin Access (User: {$admin->username}):\n";
    $adminHasRole = $admin->hasRole('admin');
    echo " - Has 'admin' role: " . ($adminHasRole ? "✅ YES" : "❌ NO") . "\n";

    // Simulate Route access check (Middleware logic)
    // We can't fully simulate HTTP request easily in Tinker script without acting as user, 
    // but we can verify the middleware assignment.

    $routes = Route::getRoutes();
    $adminRoute = $routes->getByName('admin.dashboard');
    $middleware = $adminRoute->gatherMiddleware();

    echo " - Admin Route Middleware: " . implode(', ', $middleware) . "\n";

    if (in_array('role:admin', $middleware) || in_array('spatie.permission.middleware.role:admin', $middleware)) {
        echo "✅ Route is protected by 'role:admin' middleware.\n";
    } else {
        echo "❌ Route is MISSING 'role:admin' middleware!\n";
    }


    // 3. Test Participant Access (Simulation)
    echo "\nTesting Participant Access (User: {$participant->username}):\n";
    $participantHasRole = $participant->hasRole('admin');
    echo " - Has 'admin' role: " . ($participantHasRole ? "❌ YES (Should be NO)" : "✅ NO") . "\n";

    if (!$participantHasRole) {
        echo "✅ Participant would be DENIED access to admin routes (403).\n";
    } else {
        echo "❌ Participant would be GRANTED access (Security Risk).\n";
    }

} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
