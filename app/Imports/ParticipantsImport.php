<?php

namespace App\Imports;

use App\Models\CreativeClass;
use App\Models\Participant;
use App\Models\Registration;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Row;

class ParticipantsImport implements OnEachRow, WithHeadingRow
{
    protected $creativeClass;

    public function __construct(CreativeClass $creativeClass)
    {
        $this->creativeClass = $creativeClass;
    }

    public function onRow(Row $row)
    {
        $rowIndex = $row->getIndex();
        $row = $row->toArray();

        // Expect headers: name, phone
        $name = $row['name'] ?? null;
        $phone = $row['phone'] ?? $row['phone_number'] ?? null;

        if (!$name || !$phone) {
            return;
        }

        // Basic phone sanitization (keep digits only)
        // If your phone numbers have +, keeping it might be better?
        // Let's assume input is digits or simple formatting
        // $phone = preg_replace('/[^0-9]/', '', $phone); 

        // 1. Find or Create User
        $user = User::firstOrCreate(
            ['username' => $phone],
            [
                'name' => $name,
                'password' => Hash::make($phone), // Default pwd = phone number
            ]
        );

        // Assign role safely
        if (method_exists($user, 'hasRole') && !$user->hasRole('participant')) {
            $user->assignRole('participant');
        }

        // 2. Find or Create Participant
        $participant = Participant::firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => $name,
                'phone_number' => $phone,
            ]
        );

        // 3. Register to Class
        $exists = Registration::where('participant_id', $participant->id)
            ->where('class_id', $this->creativeClass->id)
            ->exists();

        if (!$exists) {
            // Check Quota
            if ($this->creativeClass->quota > 0) {
                Registration::create([
                    'participant_id' => $participant->id,
                    'class_id' => $this->creativeClass->id,
                    'status' => 'confirmed', // Admin imported => Confirmed
                ]);

                // Decrement Quota
                $this->creativeClass->decrement('quota');
            }
        }
    }
}
