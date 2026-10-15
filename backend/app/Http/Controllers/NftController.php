<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNftUploadRequest;
use App\Models\Nft;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class NftController extends Controller
{
    /**
     * GET /api/nfts
     * List all NFT records, newest first.
     */
    public function index()
    {
        $nfts = Nft::query()->latest()->paginate(12);

        return response()->json([
            'success' => true,
            'data' => $nfts,
        ]);
    }

    /**
     * GET /api/nft/{id}
     * Show a single NFT record.
     */
    public function show(int $id)
    {
        $nft = Nft::find($id);

        if (! $nft) {
            return response()->json([
                'success' => false,
                'message' => 'NFT not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $nft,
        ]);
    }

    /**
     * POST /api/nft/upload
     * Upload an NFT image, generate its metadata JSON, and store the record.
     */
    public function store(StoreNftUploadRequest $request)
    {
        $imagePath = null;
        $metadataPath = null;

        try {
            // 1. Store the image with a unique, non-guessable filename.
            $imageFilename = Str::uuid()->toString().'.'.$request->file('image')->getClientOriginalExtension();
            $imagePath = $request->file('image')->storeAs('nfts', $imageFilename, 'public');
            $imageUrl = Storage::disk('public')->url($imagePath);

            // 2. Generate the NFT metadata JSON (ERC-721 style) and store it.
            $metadata = [
                'name' => $request->input('name'),
                'description' => $request->input('description', ''),
                'image' => $imageUrl,
            ];

            $metadataFilename = Str::uuid()->toString().'.json';
            $metadataPath = 'metadata/'.$metadataFilename;
            Storage::disk('public')->put(
                $metadataPath,
                json_encode($metadata, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
            );
            $metadataUrl = Storage::disk('public')->url($metadataPath);

            // 3. Persist the NFT record inside a database transaction.
            $nft = DB::transaction(function () use ($request, $imagePath, $metadataPath) {
                return Nft::create([
                    'name' => $request->input('name'),
                    'description' => $request->input('description'),
                    'image_path' => $imagePath,
                    'metadata_path' => $metadataPath,
                    'wallet_address' => $request->input('wallet_address'),
                ]);
            });

            return response()->json([
                'success' => true,
                'message' => 'NFT uploaded successfully',
                'image_url' => $imageUrl,
                'metadata_url' => $metadataUrl,
                'data' => $nft,
            ], 201);
        } catch (Throwable $e) {
            // Roll back any files already written to disk so we don't leave orphans.
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            if ($metadataPath) {
                Storage::disk('public')->delete($metadataPath);
            }

            Log::error('NFT upload failed: '.$e->getMessage(), ['exception' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong while uploading the NFT. Please try again.',
            ], 500);
        }
    }

    /**
     * DELETE /api/nft/{id}
     * Delete an NFT record and its associated files.
     */
    public function destroy(int $id)
    {
        $nft = Nft::find($id);

        if (! $nft) {
            return response()->json([
                'success' => false,
                'message' => 'NFT not found',
            ], 404);
        }

        try {
            DB::transaction(function () use ($nft) {
                Storage::disk('public')->delete([$nft->image_path, $nft->metadata_path]);
                $nft->delete();
            });

            return response()->json([
                'success' => true,
                'message' => 'NFT deleted successfully',
            ]);
        } catch (Throwable $e) {
            Log::error('NFT deletion failed: '.$e->getMessage(), ['exception' => $e]);

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong while deleting the NFT. Please try again.',
            ], 500);
        }
    }
}
