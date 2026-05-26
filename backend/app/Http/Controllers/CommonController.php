<?php

namespace App\Http\Controllers;

use App\Models\Item;

class CommonController extends Controller
{
    public function getAllItems()
    {
        try {
            $items = Item::all();

            // Transform to match MERN response (Items with _id, camelCase)
            $items = $items->map(function ($item) {
                return [
                    '_id' => $item->id,
                    'id' => $item->id,
                    'image' => $item->image,
                    'name' => $item->name,
                    'price' => $item->price,
                    'desc' => $item->desc,
                    'category' => $item->category,
                    'foodType' => $item->food_type ?? 'veg',
                    'available' => $item->available,
                ];
            });

            return response()->json([
                'success' => true,
                'Items' => $items,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ]);
        }
    }
}
