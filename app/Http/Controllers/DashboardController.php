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
        $activeRegistrationsCount = 0;

        if (Auth::check() && Auth::user()->participant) {
            $activeRegistrationsCount = Auth::user()->participant->registrations()
                ->whereIn('status', ['confirmed', 'pending'])
                ->count();
        }

        return Inertia::render('Dashboard', [
            'availableClasses' => $classes,
            'activeRegistrationsCount' => $activeRegistrationsCount
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

    public function show(string $slug)
    {
        $creativeClass = CreativeClass::where('slug', $slug)->firstOrFail();

        return Inertia::render('Class/Show', [
            'classDetails' => $creativeClass
        ]);
    }

    public function myTransactions()
    {
        $user = Auth::user();

        if (!$user->participant) {
            return Inertia::render('Dashboard/MyTransactions', [
                'transactions' => []
            ]);
        }

        // Get payments via registrations
        $transactions = \App\Models\Payment::whereHas('registration', function ($q) use ($user) {
            $q->where('participant_id', $user->participant->id);
        })
            ->with(['registration.creativeClass'])
            ->latest()
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->uuid,
                    'amount' => $payment->amount,
                    'status' => $payment->status,
                    'created_at' => $payment->created_at->toIso8601String(),
                    'payment_method' => $payment->payment_method ?? 'Transfer',
                    'class_name' => $payment->registration->creativeClass->name,
                ];
            });

        return Inertia::render('Dashboard/MyTransactions', [
            'transactions' => $transactions
        ]);
    }
}
