<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Registration;
use App\Models\Participant;
use App\Models\User;
use App\Models\CreativeClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        $payments = Payment::with(['registration.participant', 'registration.creativeClass', 'media'])
            ->latest()
            ->get()
            ->map(function (Payment $payment) {
                return [
                    'id' => $payment->uuid,
                    'amount' => $payment->amount,
                    'status' => $payment->status,
                    'proof_url' => $payment->getFirstMediaUrl('proof'),
                    'participant_name' => $payment->registration->participant->name ?? 'Unknown',
                    'class_name' => $payment->registration->creativeClass->name ?? 'Unknown',
                    'created_at' => $payment->created_at->format('Y-m-d H:i'),
                ];
            });

        return Inertia::render('Admin/Transactions/Index', [
            'payments' => $payments
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Transactions/Create', [
            'participants' => Participant::select('id', 'name', 'phone_number')->orderBy('name')->get(),
            'classes' => CreativeClass::select('id', 'name', 'price', 'quota')->where('status', 'active')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'participant_id' => 'required|exists:participants,id',
            'class_id' => 'required|exists:classes,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            'status' => 'required|in:pending,success,failed',
            'proof' => 'nullable|image|max:4096',
        ]);

        return DB::transaction(function () use ($request) {
            try {
                $status = $request->status;
                $registrationStatus = $status === 'success' ? 'confirmed' : 'pending';

                // Find or Create Registration
                $registration = Registration::firstOrCreate(
                    [
                        'participant_id' => $request->participant_id,
                        'class_id' => $request->class_id,
                    ],
                    [
                        'status' => $registrationStatus,
                    ]
                );

                // If registration existed, update status if payload implies success
                if ($registration->wasRecentlyCreated) {
                    // Decrement quota if confirmed
                    if ($registrationStatus === 'confirmed') {
                        $creativeClass = CreativeClass::findOrFail($request->class_id);
                        $creativeClass->decrement('quota');
                    }
                } else {
                    // If exists, force update status if payment is success
                    if ($status === 'success' && $registration->status !== 'confirmed') {
                        $registration->update(['status' => 'confirmed']);
                        $creativeClass = CreativeClass::findOrFail($request->class_id);
                        $creativeClass->decrement('quota');
                    }
                }

                // Create Payment
                $payment = $registration->payment()->create([
                    'amount' => $request->amount,
                    'paid_amount' => $status === 'success' ? $request->amount : 0,
                    'payment_method' => $request->payment_method,
                    'status' => $status,
                ]);

                if ($request->hasFile('proof')) {
                    $payment->addMediaFromRequest('proof')->toMediaCollection('proof');
                }

                return redirect()->route('admin.transactions.index')->with('success', 'Transaksi berhasil disimpan.');
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal menyimpan transaksi: ' . $e->getMessage())->withInput();
            }
        });
    }

    public function verify(Request $request, string $id)
    {
        $payment = Payment::where('uuid', $id)->firstOrFail();

        $request->validate([
            'action' => 'required|in:approve,reject'
        ]);

        return DB::transaction(function () use ($request, $payment) {
            try {
                if ($request->action === 'approve') {
                    $payment->update(['status' => 'success']);
                    $payment->registration->update(['status' => 'confirmed']);
                } elseif ($request->action === 'reject') {
                    $payment->update(['status' => 'failed']);
                }

                return redirect()->back()->with('success', 'Verifikasi pembayaran berhasil diperbarui.');
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal memverifikasi: ' . $e->getMessage());
            }
        });
    }
}
