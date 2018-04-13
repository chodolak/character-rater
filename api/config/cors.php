<?php

return [
    /*
     |--------------------------------------------------------------------------
     | Laravel CORS
     |--------------------------------------------------------------------------
     |

     | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
     | to accept any value.
     |
     */
    'supportsCredentials' => true,
    'allowedOrigins' => ['chodolak.com', 'www.chodolak.com', 'localhost:8080'],
    'allowedHeaders' => ['Content-Type', 'X-Requested-With', 'Origin', 'X-Auth-Token', 'Accept', 'Authorization'],
    'allowedMethods' => ['GET', 'POST', 'PUT', 'HEAD', 'OPTIONS', 'DELETE'],
    'exposedHeaders' => [],
    'maxAge' => 0,
    'hosts' => [],
];

