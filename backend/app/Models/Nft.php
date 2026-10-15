<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable(['name', 'description', 'image_path', 'metadata_path', 'wallet_address', 'token_id'])]
class Nft extends Model
{
    /**
     * Attributes appended to the model's array/JSON form.
     *
     * @var array<int, string>
     */
    protected $appends = ['image_url', 'metadata_url'];

    /**
     * Public URL of the stored NFT image.
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => Storage::disk('public')->url($this->image_path),
        );
    }

    /**
     * Public URL of the stored metadata JSON.
     */
    protected function metadataUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => Storage::disk('public')->url($this->metadata_path),
        );
    }
}
