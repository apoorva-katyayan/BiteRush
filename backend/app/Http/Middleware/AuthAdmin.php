<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthAdmin
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $atoken = $request->header('atoken');

            if (!$atoken) {
                return response()->json([
                    'success' => false,
                    'message' => 'Un-Authorized access'
                ]);
            }

            $decoded = JWT::decode($atoken, new Key(env('JWT_SECRET'), 'HS256'));

            if ($decoded->email !== env('ADMIN_EMAIL')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Un-Authorized access'
                ]);
            }

            return $next($request);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal Server Error',
            ]);
        }
    }
}
