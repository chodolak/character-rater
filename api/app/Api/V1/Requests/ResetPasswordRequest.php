<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function rules()
    {
        $this->sanitize();
        return Config::get('chodolak.reset_password.validation_rules');
    }

    public function authorize()
    {
        return true;
    }

    public function sanitize()
    {
        $input = $this->all();

        $input['email'] = filter_var($input['email'], FILTER_SANITIZE_STRING);
        $input['token'] = filter_var($input['token'], FILTER_SANITIZE_STRING);
        $input['password'] = filter_var($input['password'], FILTER_SANITIZE_STRING);
        $input['password_confirmation'] = filter_var($input['password_confirmation'], FILTER_SANITIZE_STRING);

        $this->replace($input);     
    }
}
