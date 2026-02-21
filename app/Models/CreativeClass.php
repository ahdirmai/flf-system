<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CreativeClass extends Model implements HasMedia
{
    use HasFactory, HasUuids, InteractsWithMedia;

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    protected $table = 'classes';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'quota',
        'status',
        'dates',
        'start_registration',
        'end_registration',
    ];

    protected $appends = ['thumbnail_url'];

    public function getThumbnailUrlAttribute()
    {
        return $this->getFirstMediaUrl('thumbnails');
    }

    protected $casts = [
        'start_registration' => 'datetime',
        'end_registration' => 'datetime',
        'price' => 'decimal:2',
        'dates' => 'array',
    ];

    public function registrations()
    {
        return $this->hasMany(Registration::class, 'class_id');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnails')
            ->singleFile();
    }
}
