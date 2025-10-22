<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('compras', function (Blueprint $table) {
            $table->unsignedBigInteger('evento_id')->after('id');
            $table->string('comprador')->after('evento_id');
            $table->integer('cantidad_boletos')->after('comprador');
            $table->dateTime('fecha_compra')->after('cantidad_boletos');
            $table->decimal('total_compra', 10, 2)->after('fecha_compra');

            // 🔗 Relación con eventos (opcional)
            $table->foreign('evento_id')->references('id')->on('eventos')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('compras', function (Blueprint $table) {
            $table->dropForeign(['evento_id']);
            $table->dropColumn(['evento_id', 'comprador', 'cantidad_boletos', 'fecha_compra', 'total_compra']);
        });
    }
};
