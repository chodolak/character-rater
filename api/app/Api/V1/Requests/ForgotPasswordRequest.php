<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class ForgotPasswordRequest extends FormRequest
{
    public function rules()
    {
        $this->sanitize();
        return Config::get('chodolak.forgot_password.validation_rules');
    }

    public function authorize()
    {
        return true;
    }

    public function sanitize()
    {
        $input = $this->all();

        $input['email'] = filter_var($input['email'], FILTER_SANITIZE_STRING);

        $this->replace($input);     
    }
}
