<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ParticipantController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => ['required', 'string', 'max:20', Rule::unique('participants', 'phone_number')],
        ]);

        $user = User::firstOrCreate(
            ['username' => $request->phone],
            [
                'name' => $request->name,
                'password' => Hash::make($request->phone), // Default password
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

        return back()->with('success', 'Participant created successfully.');
    }
}
