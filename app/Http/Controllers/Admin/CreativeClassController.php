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
            'start_registration' => 'required|date',
            'end_registration' => 'required|date|after_or_equal:start_registration',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);

        $creativeClass = CreativeClass::create($validated);

        if ($request->hasFile('thumbnail')) {
            $creativeClass->addMediaFromRequest('thumbnail')->toMediaCollection('thumbnails');
        }

        return redirect()->route('admin.classes.index')->with('success', 'Class created successfully.');
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
            'start_registration' => 'required|date',

            'end_registration' => 'required|date|after_or_equal:start_registration',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        if ($request->name !== $creativeClass->name) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);
        }

        $creativeClass->update($validated);

        if ($request->hasFile('thumbnail')) {
            $creativeClass->clearMediaCollection('thumbnails');
            $creativeClass->addMediaFromRequest('thumbnail')->toMediaCollection('thumbnails');
        }

        return redirect()->route('admin.classes.index')->with('success', 'Class updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $creativeClass = CreativeClass::where('uuid', $id)->firstOrFail();
        $creativeClass->delete();

        return redirect()->route('admin.classes.index')->with('success', 'Class deleted successfully.');
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $creativeClass = CreativeClass::with(['registrations.participant.user'])
            ->where('uuid', $id)
            ->firstOrFail();

        return Inertia::render('Admin/Classes/Show', [
            'creativeClass' => $creativeClass,
            'registrations' => $creativeClass->registrations
        ]);
    }

    public function importParticipants(Request $request, string $id)
    {
        $creativeClass = CreativeClass::where('uuid', $id)->firstOrFail();

        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv'
        ]);

        Excel::import(new ParticipantsImport($creativeClass), $request->file('file'));

        return redirect()->back()->with('success', 'Participants imported successfully.');
    }

    public function downloadTemplate()
    {
        return Excel::download(new ParticipantsTemplateExport, 'participants_template.xlsx');
    }
}
