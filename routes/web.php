<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/my-classes', [\App\Http\Controllers\DashboardController::class, 'myClasses'])
    ->middleware(['auth', 'verified'])
    ->name('my-classes');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/registrations', [\App\Http\Controllers\RegistrationController::class, 'store'])->name('registrations.store');
    Route::post('/registrations/{id}/proof', [\App\Http\Controllers\RegistrationController::class, 'uploadProof'])->name('registrations.upload-proof');
});

require __DIR__ . '/auth.php';
