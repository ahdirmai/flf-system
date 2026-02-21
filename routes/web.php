<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\WelcomeController::class, 'index']);

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified','role:participant'])
    ->name('dashboard');

Route::get('/my-transactions', [\App\Http\Controllers\DashboardController::class, 'myTransactions'])
    ->middleware(['auth', 'verified','role:participant'])
    ->name('my-transactions');

Route::get('/my-classes', [\App\Http\Controllers\DashboardController::class, 'myClasses'])
    ->middleware(['auth', 'verified','role:participant'])
    ->name('my-classes');

Route::get('/class/{slug}', [\App\Http\Controllers\DashboardController::class, 'show'])
    ->name('class.show');

Route::post('/registrations', [\App\Http\Controllers\RegistrationController::class, 'store'])->name('registrations.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/registrations/{id}/proof', [\App\Http\Controllers\RegistrationController::class, 'uploadProof'])->name('registrations.upload-proof');
});

require __DIR__ . '/auth.php';
