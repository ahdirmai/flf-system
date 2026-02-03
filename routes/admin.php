<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('classes/template', [\App\Http\Controllers\Admin\CreativeClassController::class, 'downloadTemplate'])->name('classes.template');
    Route::post('classes/{id}/import', [\App\Http\Controllers\Admin\CreativeClassController::class, 'importParticipants'])->name('classes.import');
    Route::resource('classes', \App\Http\Controllers\Admin\CreativeClassController::class);

    Route::get('transactions/create', [\App\Http\Controllers\Admin\TransactionController::class, 'create'])->name('transactions.create');
    Route::post('participants', [\App\Http\Controllers\Admin\ParticipantController::class, 'store'])->name('participants.store');
    Route::post('transactions', [\App\Http\Controllers\Admin\TransactionController::class, 'store'])->name('transactions.store');
    Route::get('/transactions', [\App\Http\Controllers\Admin\TransactionController::class, 'index'])->name('transactions.index');
    Route::post('/transactions/{id}/verify', [\App\Http\Controllers\Admin\TransactionController::class, 'verify'])->name('transactions.verify');
});