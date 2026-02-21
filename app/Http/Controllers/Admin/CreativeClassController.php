<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\CreativeClass;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ParticipantsImport;
use App\Exports\ParticipantsTemplateExport;

use Illuminate\Support\Facades\DB;

class CreativeClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classes = CreativeClass::latest()->get();
        return Inertia::render('Admin/Classes/Index', [
            'classes' => $classes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Classes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quota' => 'required|integer|min:1',
            'status' => 'required|in:draft,active,done,archive',
            'dates' => 'nullable|array',
            'dates.*' => 'date',
            'start_registration' => 'required|date',
            'end_registration' => 'required|date|after_or_equal:start_registration',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        return DB::transaction(function () use ($request, $validated) {
            try {
                $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);

                $creativeClass = CreativeClass::create($validated);

                if ($request->hasFile('thumbnail')) {
                    $creativeClass->addMediaFromRequest('thumbnail')->toMediaCollection('thumbnails');
                }

                return redirect()->route('admin.classes.index')->with('success', 'Workshop berhasil dibuat.');
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal membuat workshop: ' . $e->getMessage())->withInput();
            }
        });
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $creativeClass = CreativeClass::where('uuid', $id)->firstOrFail();
        return Inertia::render('Admin/Classes/Edit', [
            'creativeClass' => $creativeClass
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $creativeClass = CreativeClass::where('uuid', $id)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quota' => 'required|integer|min:1',
            'status' => 'required|in:draft,active,done,archive',
            'dates' => 'nullable|array',
            'dates.*' => 'date',
            'start_registration' => 'required|date',
            'end_registration' => 'required|date|after_or_equal:start_registration',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        return DB::transaction(function () use ($request, $validated, $creativeClass) {
            try {
                if ($request->name !== $creativeClass->name) {
                    $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);
                }

                $creativeClass->update($validated);

                if ($request->hasFile('thumbnail')) {
                    $creativeClass->clearMediaCollection('thumbnails');
                    $creativeClass->addMediaFromRequest('thumbnail')->toMediaCollection('thumbnails');
                }

                return redirect()->route('admin.classes.index')->with('success', 'Workshop berhasil diperbarui.');
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal memperbarui workshop: ' . $e->getMessage())->withInput();
            }
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $creativeClass = CreativeClass::where('uuid', $id)->firstOrFail();
        
        return DB::transaction(function () use ($creativeClass) {
            try {
                $creativeClass->delete();
                return redirect()->route('admin.classes.index')->with('success', 'Workshop berhasil dihapus.');
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal menghapus workshop: ' . $e->getMessage());
            }
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $creativeClass = CreativeClass::with(['registrations.participant.user'])
            ->where('uuid', $id)
            ->firstOrFail();

        // Get participants who are NOT registered in this class
        $registeredParticipantIds = $creativeClass->registrations->pluck('participant_id')->toArray();
        $availableParticipants = \App\Models\Participant::whereNotIn('id', $registeredParticipantIds)
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Classes/Show', [
            'creativeClass' => $creativeClass,
            'registrations' => $creativeClass->registrations,
            'availableParticipants' => $availableParticipants
        ]);
    }

    public function importParticipants(Request $request, string $id)
    {
        $creativeClass = CreativeClass::where('uuid', $id)->firstOrFail();

        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv'
        ]);

        return DB::transaction(function () use ($request, $creativeClass) {
            try {
                Excel::import(new ParticipantsImport($creativeClass), $request->file('file'));
                return redirect()->back()->with('success', 'Peserta berhasil diimpor.');
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal mengimpor peserta: ' . $e->getMessage());
            }
        });
    }

    public function downloadTemplate()
    {
        return Excel::download(new ParticipantsTemplateExport, 'participants_template.xlsx');
    }

    public function addParticipant(Request $request, string $id)
    {
        $creativeClass = CreativeClass::where('uuid', $id)->firstOrFail();

        $request->validate([
            'participant_id' => 'nullable|exists:participants,id',
            'name' => 'required_without:participant_id|string|max:255|nullable',
            'phone' => 'required_without:participant_id|string|max:20|nullable',
        ]);

        return DB::transaction(function () use ($request, $creativeClass) {
            try {
                if ($request->filled('participant_id')) {
                    $participant = \App\Models\Participant::findOrFail($request->participant_id);
                } else {
                    $name = $request->name;
                    $phone = $request->phone;

                    // 1. Find or Create User
                    $user = \App\Models\User::firstOrCreate(
                        ['username' => $phone],
                        [
                            'name' => $name,
                            'password' => Hash::make($phone),
                        ]
                    );

                    // Assign role safely
                    if (!$user->hasRole('participant')) {
                        $user->assignRole('participant');
                    }

                    // 2. Find or Create Participant
                    $participant = \App\Models\Participant::firstOrCreate(
                        ['user_id' => $user->id],
                        [
                            'name' => $name,
                            'phone_number' => $phone,
                        ]
                    );
                }

                // 3. Register to Class
                $exists = \App\Models\Registration::where('participant_id', $participant->id)
                    ->where('class_id', $creativeClass->id)
                    ->exists();

                if ($exists) {
                    return back()->with('error', 'Peserta ini sudah terdaftar di kelas ini.');
                }

                // Check Quota
                if ($creativeClass->quota <= 0) {
                    return back()->with('error', 'Kuota kelas sudah penuh.');
                }

                \App\Models\Registration::create([
                    'participant_id' => $participant->id,
                    'class_id' => $creativeClass->id,
                    'status' => 'confirmed', // Admin manually adding => Confirmed
                ]);

                // Decrement Quota
                $creativeClass->decrement('quota');

                return back()->with('success', 'Berhasil menambahkan peserta ke kelas ini.');
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal menambahkan peserta: ' . $e->getMessage())->withInput();
            }
        });
    }
}
