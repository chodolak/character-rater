<?php

use Dingo\Api\Routing\Router;

/** @var Router $api */
$api = app(Router::class);

$api->version('v1', function (Router $api) {
    $api->group(['prefix' => 'auth'], function(Router $api) {
        $api->post('signup', 'App\\Api\\V1\\Controllers\\SignUpController@signUp');
        $api->post('login', 'App\\Api\\V1\\Controllers\\LoginController@login');

        $api->post('recovery', 'App\\Api\\V1\\Controllers\\ForgotPasswordController@sendResetEmail');
        $api->post('reset', 'App\\Api\\V1\\Controllers\\ResetPasswordController@resetPassword');

        $api->post('logout', 'App\\Api\\V1\\Controllers\\LogoutController@logout');
        $api->post('refresh', 'App\\Api\\V1\\Controllers\\RefreshController@refresh');
        $api->get('me', 'App\\Api\\V1\\Controllers\\UserController@me');
    });

    $api->group(['prefix' => 'admin'], function(Router $api) {
        $api->post('character/upload', 'App\\Api\\V1\\Controllers\\AdminController@createCharacter');
        $api->put('character/{id}', 'App\\Api\\V1\\Controllers\\AdminController@updateCharacter');
        $api->post('show', 'App\\Api\\V1\\Controllers\\AdminController@createShow');
        $api->put('show/{id}', 'App\\Api\\V1\\Controllers\\AdminController@updateShow');
    });

    $api->group(['middleware' => 'jwt.auth'], function(Router $api) {
        $api->get('protected', function() {
            return response()->json([
                'message' => 'Access to protected resources granted! You are seeing this text as you provided the token correctly.'
            ]);
        });

        $api->get('refresh', [
            'middleware' => 'jwt.refresh',
            function() {
                return response()->json([
                    'message' => 'By accessing this endpoint, you can refresh your access token at each request. Check out this response headers!'
                ]);
            }
        ]);
    });

    $api->get('shows', 'App\\Api\\V1\\Controllers\\ShowController@get');
    $api->get('shows/{name}', 'App\\Api\\V1\\Controllers\\ShowController@getShowByName');
    $api->get('shows/id/{id}', 'App\\Api\\V1\\Controllers\\ShowController@getShowById');
    $api->get('characters', 'App\\Api\\V1\\Controllers\\CharacterController@get');
    $api->get('characters/{name}', 'App\\Api\\V1\\Controllers\\CharacterController@getCharacterByName');
    $api->get('characters/id/{id}', 'App\\Api\\V1\\Controllers\\CharacterController@getCharacterById');
    $api->get('characters/{show}/{character}', 'App\\Api\\V1\\Controllers\\CharacterController@getCharacterByShow');

    $api->get('hello', function() {
        return response()->json([
            'message' => 'This is a simple example of item returned by your APIs. Everyone can see it.'
        ]);
    });
});
