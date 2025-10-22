<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'fecha',
        'lugar',
        'boletos_disponibles',
        'precio'
    ];

    //Un evento tiene muchas compras
    public function compras() {
        return $this->hasMany(Compra::class, 'evento_id');
    }
}

