<?php

namespace App\Http\Controllers;

use App\Interfaces\ContactServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use Symfony\Component\HttpFoundation\Response;

class ContactController extends Controller
{
    private ContactServiceInterface $contactService;

    public function __construct(ContactServiceInterface $contactService)
    {
        $this->contactService = $contactService;
    }

    public function index(): JsonResponse
    {
        try {
            $contacts = $this->contactService->getAllContacts();
            return response()->json([
                'status' => 'success',
                'message' => 'Contacts successfully retrieved.',
                'data' => $contacts,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while retrieving contacts.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $contact = $this->contactService->getContactById($id);

            if (!$contact) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Contact not found.',
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Contact successfully retrieved.',
                'data' => $contact,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while retrieving the contact.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'contact' => 'required|string|max:15',
                'email' => 'required|email|max:255',
            ]);

            $contact = $this->contactService->storeContact($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Contact successfully created.',
                'data' => $contact,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while creating the contact.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $data = $request->validate([
                'name' => 'sometimes|string|max:255',
                'contact' => 'sometimes|string|max:15',
                'email' => 'sometimes|email|max:255',
            ]);

            $contact = $this->contactService->updateContact($id, $data);

            return response()->json([
                'status' => 'success',
                'message' => 'Contact successfully updated.',
                'data' => $contact,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while updating the contact.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            if ($this->contactService->deleteContact($id)) {
                return response()->json(['status' => 'success','message' => 'Contact successfully deleted.']);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Contact not found.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the contact.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
