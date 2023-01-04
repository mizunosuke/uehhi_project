<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ports', function (Blueprint $table) {
            $table->id();
            $table->string('port_name');
            $table->string('image');
            $table->string('access');
            $table->string('parking');
            $table->string('manager')->nullable();
            $table->text('caution')->nullable();
            $table->string('kind')->nullable();
            $table->text('lat')->nullable();
            $table->text('lng')->nullable();
            $table->string('canfishing')->nullable();
            $table->string('toilet')->nullable();
            $table->string('light')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ports');
    }
};
