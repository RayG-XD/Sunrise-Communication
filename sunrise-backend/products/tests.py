from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Inquiry

User = get_user_model()


class InquiryPermissionsTestCase(APITestCase):
    """Test suite to verify security permissions on the inquiry endpoint."""

    def setUp(self):
        self.admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='password123'
        )
        self.regular_user = User.objects.create_user(
            username='user',
            email='user@example.com',
            password='password123'
        )
        self.inquiry = Inquiry.objects.create(
            name='John Doe',
            phone='9876543210',
            email='john@example.com',
            message='Test inquiry'
        )

    def test_unauthenticated_user_can_create_inquiry(self):
        """Verify unauthenticated users can submit public inquiries (POST)."""
        data = {
            'name': 'Jane Doe',
            'phone': '9123456789',
            'email': 'jane@example.com',
            'message': 'Public quote request'
        }
        response = self.client.post('/api/inquiries/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Inquiry.objects.count(), 2)

    def test_unauthenticated_user_cannot_list_inquiries(self):
        """Verify unauthenticated users cannot access customer inquiries list (GET)."""
        response = self.client.get('/api/inquiries/')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_unauthenticated_user_cannot_retrieve_inquiry_detail(self):
        """Verify unauthenticated users cannot access specific customer inquiry details (GET)."""
        response = self.client.get(f'/api/inquiries/{self.inquiry.id}/')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_regular_user_cannot_list_inquiries(self):
        """Verify non-admin authenticated users cannot list customer inquiries (GET)."""
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.get('/api/inquiries/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_user_can_list_inquiries(self):
        """Verify administrative users can list customer inquiries (GET)."""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/inquiries/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
