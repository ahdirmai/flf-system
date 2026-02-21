<?php

namespace App\Http\Controllers;

use App\Models\CreativeClass;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $classes = CreativeClass::where('status', 'active')
            ->latest()
            ->get();

        $registeredClassIds = [];
        if (Auth::check() && Auth::user()->participant) {
            $registeredClassIds = Auth::user()->participant->registrations()
                ->pluck('class_id')
                ->toArray();
        }

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'classes' => $classes,
            'registeredClassIds' => $registeredClassIds,
        ]);
    }
}
