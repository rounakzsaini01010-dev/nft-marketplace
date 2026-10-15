<?php

use App\Http\Controllers\NftController;
use Illuminate\Support\Facades\Route;

Route::post('/nft/upload', [NftController::class, 'store']);
Route::get('/nfts', [NftController::class, 'index']);
Route::get('/nft/{id}', [NftController::class, 'show']);
Route::delete('/nft/{id}', [NftController::class, 'destroy']);
