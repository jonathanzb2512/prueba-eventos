<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;

    protected $fillable = [
        'evento_id',
        'comprador',
        'cantidad_boletos',
        'fecha_compra',
        'total_compra'
    ];

    // Cada compra pertenece a un evento
    public function evento() {
        return $this->belongsTo(Evento::class, 'evento_id');
    }
}
