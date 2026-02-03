<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CreativeClass;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $classes = CreativeClass::where('status', 'active')->latest()->get();
        return Inertia::render('Dashboard', [
            'availableClasses' => $classes
        ]);
    }

    public function myClasses()
    {
        $user = Auth::user();

        if (!$user->participant) {
            return Inertia::render('Dashboard/MyClasses', [
                'registrations' => []
            ]);
        }

        $registrations = $user->participant->registrations()
            ->with(['creativeClass', 'payment'])
            ->latest() // Most recent first
            ->get()
            ->map(function ($reg) {
                return [
                    'id' => $reg->uuid, // For routes
                    'status' => $reg->status,
                    'created_at' => $reg->created_at->toIso8601String(),
                    'class' => $reg->creativeClass, // Includes price, name, etc.
                    'payment' => $reg->payment ? [
                        'status' => $reg->payment->status,
                        'amount' => $reg->payment->amount,
                        'proof_url' => $reg->payment->getFirstMediaUrl('proof'),
                        'created_at' => $reg->payment->created_at->toIso8601String(),
                    ] : null
                ];
            });

        return Inertia::render('Dashboard/MyClasses', [
            'registrations' => $registrations
        ]);
    }
}
