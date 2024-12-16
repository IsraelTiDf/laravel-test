<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Contact;

interface ContactServiceInterface
{
    public function getAllContacts(): Collection;

    public function getContactById(int $id): ?Contact;

    public function storeContact(array $data): Contact;

    public function updateContact(int $id, array $data): ?Contact;

    public function deleteContact(int $id): bool;
}
