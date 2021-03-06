<?php

return [

    // these options are related to the sign-up procedure
    'sign_up' => [

        // this option must be set to true if you want to release a token
        // when your user successfully terminates the sign-in procedure
        'release_token' => env('SIGN_UP_RELEASE_TOKEN', false),

        // here you can specify some validation rules for your sign-in request
        'validation_rules' => [
            'name' => 'required|alpha_num|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]
    ],

    // these options are related to the login procedure
    'login' => [

        // here you can specify some validation rules for your login request
        'validation_rules' => [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]
    ],

    // these options are related to the password recovery procedure
    'forgot_password' => [

        // here you can specify some validation rules for your password recovery procedure
        'validation_rules' => [
            'email' => 'required|email'
        ]
    ],

    // these options are related to the password recovery procedure
    'reset_password' => [

        // this option must be set to true if you want to release a token
        // when your user successfully terminates the password reset procedure
        'release_token' => env('PASSWORD_RESET_RELEASE_TOKEN', false),

        // here you can specify some validation rules for your password recovery procedure
        'validation_rules' => [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed'
        ]
    ],

    'character_upload' => [
        'validation_rules' => [
            'name' => 'required',
            'show' => 'required|numeric',
            'image' => 'required',
            'fileName' => 'required',
            'bio' => 'required',
        ]
    ],

    'show' => [
        'validation_rules' => [
            'name' => 'required',
            'bio' => 'required',
            'image' => 'required',
            'fileName' => 'required',
        ]
    ],

    'rating' => [
        'validation_rules' => [
            'rating' => 'required|numeric|between:0.5,5.0',
            'character' => 'required|numeric',
        ]
    ],

    'rating_put' => [
        'validation_rules' => [
            'rating' => 'required|numeric|between:0.5,5.0',
        ]
    ],

];
