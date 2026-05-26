<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'full_name' => 'Test User',
                'password' => Hash::make('password'),
                'phone' => '9876543210',
                'address' => 'Aurangabad, Bihar',
                'gender' => 'Male',
                'dob' => '2000-01-01',
            ]
        );

        $items = [
            ['menu_1.png', 'Greek Salad', 120, 'Fresh cucumber, tomato, olives, and creamy feta with a bright herb dressing.', 'Salad', 'veg'],
            ['menu_2.png', 'Veg Roll', 95, 'Soft wrap stuffed with spiced vegetables, crunchy onions, and house sauces.', 'Rolls', 'veg'],
            ['menu_3.png', 'Gulab Jamun Sundae', 140, 'Warm gulab jamun served with chilled cream and a sweet syrup finish.', 'Sweets', 'veg'],
            ['menu_4.png', 'Paneer Starter', 110, 'Golden paneer bites tossed with peppers and BiteRush spices.', 'Starters', 'veg'],
            ['menu_5.jpg', 'Cream Cake', 165, 'Light cake with smooth cream and a sweet bakery-style finish.', 'Cake', 'veg'],
            ['menu_6.png', 'Veg Noodles', 135, 'Wok-tossed noodles with crisp vegetables and savory seasoning.', 'Noodles', 'veg'],
            ['menu_7.png', 'Chicken Pasta Bowl', 185, 'Comforting pasta tossed in a creamy sauce with juicy chicken and herbs.', 'Pasta', 'non-veg'],
            ['menu_8.png', 'Classic Chicken Pizza', 260, 'Cheesy pizza with a crisp base, tomato sauce, chicken, and fresh toppings.', 'Pizza', 'non-veg'],
        ];

        foreach ($items as [$image, $name, $price, $desc, $category, $foodType]) {
            Item::updateOrCreate(
                ['name' => $name],
                [
                    'image' => "http://127.0.0.1:5173/src/assets/{$image}",
                    'price' => $price,
                    'desc' => $desc,
                    'category' => $category,
                    'food_type' => $foodType,
                    'available' => true,
                ]
            );
        }

        Message::updateOrCreate(
            ['email' => 'riya@example.com'],
            ['name' => 'Riya Sharma', 'message' => 'The food arrived hot, fresh, and faster than expected. BiteRush has become my weekend favorite.']
        );

        Message::updateOrCreate(
            ['email' => 'aman@example.com'],
            ['name' => 'Aman Verma', 'message' => 'Clean ordering flow, good menu variety, and the pizza was excellent.']
        );
    }
}
