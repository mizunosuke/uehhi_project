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
        Schema::table('blogimages', function (Blueprint $table) {
            $table->foreignId('blog_id')->after('id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('blogimages', function (Blueprint $table) {
            $table->dropForeign(['blog_id']);
            $table->dropColumn(['blog_id']);
        });
    }
};
