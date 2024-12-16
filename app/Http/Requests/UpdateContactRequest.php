<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|min:5|max:255',
            'contact' => 'sometimes|digits:9',
            'email' => 'sometimes|email|max:255',
        ];
    }

    /**
     * Mensagens de erro personalizadas.
     */
    public function messages(): array
    {
        return [
            'name.sometimes' => 'O nome deve ter pelo menos 5 caracteres.',
            'contact.sometimes' => 'O contato deve ter exatamente 9 dígitos.',
            'email.sometimes' => 'O e-mail informado é inválido.',
        ];
    }
}
