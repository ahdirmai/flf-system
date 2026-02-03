<?php

namespace App\Http\Controllers;

use App\Models\CreativeClass;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'class_id' => 'required|exists:classes,uuid',
        ]);

        $user = Auth::user();
        $participant = $user->participant;

        if (!$participant) {
            return back()->withErrors(['error' => 'Participant profile not found.']);
        }

        // Find Class by UUID
        $creativeClass = CreativeClass::where('uuid', $request->class_id)->firstOrFail();

        // Check Duplicates
        $exists = Registration::where('participant_id', $participant->id)
            ->where('class_id', $creativeClass->id)
            ->exists();

        if ($exists) {
            return back()->with('message', 'You are already registered for this class.');
        }

        // Check Quota
        if ($creativeClass->quota <= 0) {
            return back()->withErrors(['class_id' => 'Quota is full.']);
        }

        // Create Registration
        // Decrement quota
        $creativeClass->decrement('quota');

        $registration = Registration::create([
            'participant_id' => $participant->id,
            'class_id' => $creativeClass->id,
            'status' => 'pending',
        ]);

        // Create initial payment record (pending)
        $registration->payment()->create([
            'amount' => $creativeClass->price,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Registered successfully. Please make payment.');
    }

    public function uploadProof(Request $request, string $id)
    {
        $user = Auth::user();
        // $id is Registration UUID
        $registration = Registration::where('uuid', $id)
            ->where('participant_id', $user->participant->id)
            ->firstOrFail();

        $request->validate([
            'proof' => 'required|image|max:4096', // 4MB max
        ]);

        $payment = $registration->payment;

        if (!$payment) {
            $payment = $registration->payment()->create([
                'amount' => $registration->creativeClass->price,
                'status' => 'pending',
            ]);
        }

        $payment->clearMediaCollection('proof');
        $payment->addMediaFromRequest('proof')->toMediaCollection('proof');

        // Can update status if we want logic like "uploaded_proof"

        return back()->with('success', 'Proof uploaded successfully. Please wait for verification.');
    }
}
