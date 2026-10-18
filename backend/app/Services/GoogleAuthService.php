<?php

namespace App\Services;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Contracts\User as GoogleUser;
use App\Models\User;

class GoogleAuthService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function authenticate(GoogleUser $googleUser)
    {
        $googleId = $googleUser->getId();
        $email = $googleUser->getEmail();

        if (!$googleId || !$email) {
            throw new \RuntimeException(
                'Google User ID or email is empty.'
            );
        }
        $user = User::where('google_id', $googleId)->first();

        if ($user) {return $user;}

        $emailVerified = filter_var(
            $googleUser->user['email_verified'] ?? false,
            FILTER_VALIDATE_BOOLEAN
        );
        if (!$emailVerified) {
            throw new \RuntimeException(
                'Google email has not been verified.'
            );
        }

        $user = User::where('email', $email)->first();
        if ($user) {
            $user->forceFill([
                'google_id' => $googleId,
                'avatar' => $googleUser->getAvatar(),
            ])->save();

            return $user;
        }

        return User::create([
            'name' => $googleUser->getName() ?? 'Google User',
            'email' => $email,
            'google_id' => $googleId,
            'avatar' => $googleUser->getAvatar(),
            'password' => Hash::make(Str::random(40)),
        ]);

    }
}
