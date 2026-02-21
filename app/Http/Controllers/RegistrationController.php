<?php

namespace App\Http\Controllers;

use App\Models\CreativeClass;
use App\Models\Registration;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'class_id' => 'required|exists:classes,uuid',
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        return DB::transaction(function () use ($request) {
            try {
                $user = Auth::user();

                // Handle Guest Registration
                if (!$user && $request->filled('name') && $request->filled('phone')) {
                    // Create or Find User by Username (phone)
                    $user = User::where('username', $request->phone)->first();
                    
                    if (!$user) {
                        $user = User::create([
                            'name' => $request->name,
                            'username' => $request->phone,
                            'password' => Hash::make($request->phone),
                        ]);
                        $user->assignRole('participant');
                    }

                    // Create or Find Participant
                    if (!$user->participant) {
                        $user->participant()->create([
                            'name' => $request->name,
                            'phone_number' => $request->phone,
                        ]);
                    }

                    Auth::login($user);
                }

                if (!$user) {
                    return back()->with('error', 'Silakan login atau isi data diri untuk mendaftar.');
                }

                $participant = $user->participant;

                if (!$participant) {
                    return back()->with('error', 'Profil peserta tidak ditemukan.');
                }

                // Find Class by UUID
                $creativeClass = CreativeClass::where('uuid', $request->class_id)->firstOrFail();

                // Check Duplicates
                $exists = Registration::where('participant_id', $participant->id)
                    ->where('class_id', $creativeClass->id)
                    ->exists();

                if ($exists) {
                    return back()->with('message', 'Anda sudah terdaftar di kelas ini.');
                }

                // Check Quota
                if ($creativeClass->quota <= 0) {
                    return back()->with('error', 'Kuota sudah penuh.');
                }

                // Create Registration
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

                return redirect()->back()->with('success', 'Pendaftaran berhasil! Silakan unggah bukti transfer anda.');
            } catch (\Exception $e) {
                return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
            }
        });
    }

    public function uploadProof(Request $request, string $id)
    {
        $request->validate([
            'proof' => 'required|image|max:4096', // 4MB max
        ]);

        return DB::transaction(function () use ($request, $id) {
            try {
                $user = Auth::user();
                // $id is Registration UUID
                $registration = Registration::where('uuid', $id)
                    ->where('participant_id', $user->participant->id)
                    ->firstOrFail();

                $payment = $registration->payment;

                if (!$payment) {
                    $payment = $registration->payment()->create([
                        'amount' => $registration->creativeClass->price,
                        'status' => 'pending',
                    ]);
                }

                $payment->clearMediaCollection('proof');
                $payment->addMediaFromRequest('proof')->toMediaCollection('proof');

                return back()->with('success', 'Bukti pembayaran berhasil diunggah. Mohon tunggu verifikasi.');
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal mengunggah bukti: ' . $e->getMessage());
            }
        });
    }
}
