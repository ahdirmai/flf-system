<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CreativeClass;
use App\Models\Participant;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalParticipants = Participant::count();
        $activeClasses = CreativeClass::where('status', 'active')->count();
        $pendingTransactions = Payment::where('status', 'pending')->count();

        $recentTransactions = Payment::with(['registration.participant', 'registration.creativeClass'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'participant_name' => $payment->registration->participant->name,
                    'participant_phone' => $payment->registration->participant->phone_number,
                    'class_name' => $payment->registration->creativeClass->name,
                    'amount' => $payment->amount,
                    'payment_method' => $payment->payment_method,
                    'status' => $payment->status,
                    'created_at' => $payment->created_at->format('d M Y, H:i'),
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'totalParticipants' => $totalParticipants,
            'activeClasses' => $activeClasses,
            'pendingTransactions' => $pendingTransactions,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}
