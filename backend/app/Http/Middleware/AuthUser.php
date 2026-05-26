<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthUser
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $token = $request->header('token');

            if (!$token) {
                return response()->json([
                    'success' => false,
                    'message' => 'Un-Authorized access'
                ]);
            }

            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $request->merge(['userId' => $decoded->id]);

            return $next($request);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal Server Error',
            ]);
        }
    }
}
