<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\CompraController;

Route::apiResource('eventos', EventoController::class);
Route::apiResource('compras', CompraController::class);

Route::get('/eventos/{id}', [EventoController::class, 'show']);

Route::post('/compras', [CompraController::class, 'store']);

Route::get('/compras', [CompraController::class, 'index']);





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
