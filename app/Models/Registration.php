<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory, HasUuids;

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    protected $fillable = [
        'participant_id',
        'class_id',
        'status',
    ];

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }

    public function creativeClass()
    {
        return $this->belongsTo(CreativeClass::class, 'class_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
