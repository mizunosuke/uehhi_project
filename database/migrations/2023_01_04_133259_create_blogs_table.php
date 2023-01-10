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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('eyecatch');
            $table->string('title');
            $table->text('content');
            $table->string('access');
            $table->string('time')->nullable();
            $table->string('weather');
            $table->string('tackle')->nullable();
            $table->string('lure')->nullable();
            $table->text('tide')->nullable();
            $table->string('kind');
            $table->text('lat')->nullable();
            $table->text('lng')->nullable();
            $table->datetime('date')->nullable();
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
        Schema::dropIfExists('blogs');
    }
};
