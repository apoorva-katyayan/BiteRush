<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('mode')->default('takeaway');
            $table->text('items');
            $table->decimal('total_price', 10, 2);
            $table->string('payment')->default('Cash');
            $table->boolean('is_paid')->default(false);
            $table->enum('status', ['Pending', 'Accepted', 'Cancelled', 'Completed'])->default('Pending');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
