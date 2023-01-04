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
            $table->();    user_id
            $table->();    port_id
            $table->string('eyecatch');
            $table->string('title');
            $table->text('content');
            $image->string('image');
            $table->string('prefecture');
            $table->string('area');
            $table->string('time');
            $table->string('weather');
            $table->string('barometric');
            $table->string('tackle');
            $table->string('lure');
            $table->string('tide');
            $table->string('kind');
            $table->string('lat');
            $table->string('lng');
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
