<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use Illuminate\Http\Request;

class CompraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // 👇 Incluye la relación 'evento' con cada compra
        $compras = Compra::with('evento')->get();
        return response()->json($compras);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'evento_id' => 'required|integer',
            'comprador' => 'required|string|max:255',
            'cantidad_boletos' => 'required|integer|min:1',
            'fecha_compra' => 'required|date',
            'total_compra' => 'required|numeric|min:0',
        ]);

        // Crear la compra
        $compra = Compra::create($validated);

         // 🔹 Buscar el evento asociado
         $evento = \App\Models\Evento::find($validated['evento_id']);

         if($evento) {
            // 🔹 Restar los boletos comprados
            $evento->boletos_disponibles -= $validated['cantidad_boletos'];

            // 🔹 Asegurarse de que no quede negativo
            if ($evento->boletos_disponibles < 0) {
                $evento->boletos_disponibles =0;
            }
            $evento->save();
         }

        return response()->json([
            'message' => 'Compra registrada exitosamente 🎟️',
            'compra' => $compra,
            'evento_actualizado' => $evento
        ], 201);
    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function show(Compra $compra)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function edit(Compra $compra)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Compra $compra)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function destroy(Compra $compra)
    {
        //
    }
}
