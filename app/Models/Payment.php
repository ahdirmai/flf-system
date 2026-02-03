<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Payment extends Model implements HasMedia
{
    use HasFactory, HasUuids, InteractsWithMedia;

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    protected $fillable = [
        'registration_id',
        'amount',
        'paid_amount',
        'payment_method',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
    ];

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('proof')
            ->singleFile();
    }
}
