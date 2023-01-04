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
            $table->string('image');
            $table->string('prefecture');
            $table->string('area');
            $table->string('time');
            $table->string('weather');
            $table->string('barometric');
            $table->string('tackle');
            $table->string('lure');
            $table->text('tide');
            $table->string('kind');
            $table->text('lat');
            $table->text('lng');
            $table->datetime('date');
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
