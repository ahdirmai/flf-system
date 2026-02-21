<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::get('classes/template', [\App\Http\Controllers\Admin\CreativeClassController::class, 'downloadTemplate'])->name('classes.template');
    Route::post('classes/{id}/import', [\App\Http\Controllers\Admin\CreativeClassController::class, 'importParticipants'])->name('classes.import');
    Route::post('classes/{id}/participants', [\App\Http\Controllers\Admin\CreativeClassController::class, 'addParticipant'])->name('classes.participants.add');
    Route::resource('classes', \App\Http\Controllers\Admin\CreativeClassController::class);

    Route::get('transactions/create', [\App\Http\Controllers\Admin\TransactionController::class, 'create'])->name('transactions.create');
    
    Route::get('participants', [\App\Http\Controllers\Admin\ParticipantController::class, 'index'])->name('participants.index');
    Route::post('participants', [\App\Http\Controllers\Admin\ParticipantController::class, 'store'])->name('participants.store');
    Route::get('participants/{id}', [\App\Http\Controllers\Admin\ParticipantController::class, 'show'])->name('participants.show');
    Route::put('participants/{id}', [\App\Http\Controllers\Admin\ParticipantController::class, 'update'])->name('participants.update');
    Route::post('transactions', [\App\Http\Controllers\Admin\TransactionController::class, 'store'])->name('transactions.store');
    Route::get('/transactions', [\App\Http\Controllers\Admin\TransactionController::class, 'index'])->name('transactions.index');
    Route::post('/transactions/{id}/verify', [\App\Http\Controllers\Admin\TransactionController::class, 'verify'])->name('transactions.verify');
});