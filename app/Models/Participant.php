<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory, HasUuids;

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    protected $fillable = [
        'user_id',
        'name',
        'phone_number',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
