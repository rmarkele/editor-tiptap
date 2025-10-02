<?php

use App\Http\Controllers\QuestionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('editor', function () {
        return Inertia::render('editor/index');
    })->name('editor');

    Route::resource('questions', QuestionController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

