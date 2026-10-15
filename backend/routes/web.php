<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('welcome');
});

// Served explicitly (instead of relying on the public/storage symlink) so
// requests always pass through Laravel's kernel and pick up CORS headers,
// even under `php artisan serve`, which serves existing static files
// directly and would otherwise skip all middleware.
Route::get('/storage/{path}', function (string $path) {
    abort_unless(Storage::disk('public')->exists($path), 404);

    return Storage::disk('public')->response($path);
})->where('path', '.*');
