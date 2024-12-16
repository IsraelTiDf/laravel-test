<?php

namespace App\Services;

use App\Interfaces\ContactServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Contact;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ContactService implements ContactServiceInterface
{
    public function getAllContacts(): Collection
    {
        return Contact::all();
    }

    public function getContactById(int $id): ?Contact
    {
        return Contact::find($id);
    }

    public function storeContact(array $data): Contact
    {
        return Contact::create($data);
    }

    public function updateContact(int $id, array $data): ?Contact
    {
        $contact = Contact::find($id);

        if (!$contact) {
            throw new ModelNotFoundException("Contact not found");
        }

        $contact->update($data);
        return $contact;
    }

    public function deleteContact(int $id): bool
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return false;
        }

        return $contact->delete();
    }
}
