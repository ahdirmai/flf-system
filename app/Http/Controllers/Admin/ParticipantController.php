<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

use Illuminate\Support\Facades\DB;

class ParticipantController extends Controller
{
    public function index()
    {
        $participants = Participant::withCount('registrations')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Participants/Index', [
            'participants' => $participants,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => ['required', 'string', 'max:20', Rule::unique('participants', 'phone_number')],
        ]);

        return DB::transaction(function () use ($request) {
            try {
                $user = User::firstOrCreate(
                    ['username' => $request->phone],
                    [
                        'name' => $request->name,
                        'password' => Hash::make($request->phone),
                    ]
                );

                if (!$user->hasRole('participant')) {
                    $user->assignRole('participant');
                }

                Participant::firstOrCreate(
                    ['user_id' => $user->id],
                    [
                        'name' => $request->name,
                        'phone_number' => $request->phone,
                    ]
                );

                return back()->with('success', 'Peserta berhasil didaftarkan.');
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal mendaftarkan peserta: ' . $e->getMessage())->withInput();
            }
        });
    }

    public function show($id)
    {
        $participant = Participant::with(['registrations.creativeClass', 'registrations.payment'])->findOrFail($id);

        return Inertia::render('Admin/Participants/Show', [
            'participant' => $participant,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => ['required', 'string', 'max:20', Rule::unique('participants', 'phone_number')->ignore($id)],
        ]);

        return DB::transaction(function () use ($request, $id) {
            try {
                $participant = Participant::findOrFail($id);
                $participant->update([
                    'name' => $request->name,
                    'phone_number' => $request->phone,
                ]);

                if ($participant->user_id) {
                    $user = User::find($participant->user_id);
                    if ($user) {
                        $user->update([
                            'name' => $request->name,
                            'username' => $request->phone,
                        ]);
                    }
                }

                return back()->with('success', 'Data peserta berhasil diperbarui.');
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal memperbarui data: ' . $e->getMessage())->withInput();
            }
        });
    }
}
