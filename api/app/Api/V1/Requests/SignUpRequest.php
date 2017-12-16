<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class SignUpRequest extends FormRequest
{
    public function rules()
    {
        $this->sanitize();
        return Config::get('chodolak.sign_up.validation_rules');
    }

    public function authorize()
    {
        return true;
    }

    public function sanitize()
    {
        $input = $this->all();

        $input['name'] = filter_var($input['name'], FILTER_SANITIZE_STRING);
        $input['email'] = filter_var($input['email'], FILTER_SANITIZE_STRING);
        $input['password'] = filter_var($input['password'], FILTER_SANITIZE_STRING);

        $this->replace($input);     
    }
}
