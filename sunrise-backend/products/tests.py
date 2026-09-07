from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Inquiry


class InquirySecurityTests(APITestCase):
    """Test suite verifying access controls on Inquiry endpoints."""

    def setUp(self):
        self.inquiry = Inquiry.objects.create(
            name="John Doe",
            email="john@example.com",
            phone="1234567890",
            message="Need quote for CCTV system"
        )
        self.admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="adminpassword123"
        )
        self.list_url = reverse('inquiry-list')
        self.detail_url = reverse('inquiry-detail', kwargs={'pk': self.inquiry.pk})

    def test_anonymous_user_can_create_inquiry(self):
        """Anonymous users must be allowed to submit inquiries via POST."""
        data = {
            "name": "Jane Smith",
            "email": "jane@example.com",
            "phone": "9876543210",
            "message": "Inquiry about intercom setup"
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Inquiry.objects.count(), 2)

    def test_anonymous_user_cannot_list_inquiries(self):
        """Anonymous users must NOT be allowed to list customer inquiries (PII leak)."""
        response = self.client.get(self.list_url)
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_anonymous_user_cannot_retrieve_inquiry(self):
        """Anonymous users must NOT be allowed to retrieve individual customer inquiries."""
        response = self.client.get(self.detail_url)
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_admin_user_can_list_and_retrieve_inquiries(self):
        """Admin users must be allowed to list and retrieve inquiries."""
        self.client.force_authenticate(user=self.admin_user)

        list_response = self.client.get(self.list_url)
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)

        detail_response = self.client.get(self.detail_url)
        self.assertEqual(detail_response.status_code, status.HTTP_200_OK)
