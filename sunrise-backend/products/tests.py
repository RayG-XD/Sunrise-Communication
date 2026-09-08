from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Inquiry


class InquirySecurityTests(APITestCase):
    def setUp(self):
        self.inquiry = Inquiry.objects.create(
            name="John Doe",
            email="john@example.com",
            phone="1234567890",
            message="Test inquiry message",
            inquiry_type="contact"
        )
        self.admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="adminpassword123"
        )

    def test_anonymous_user_can_create_inquiry(self):
        data = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "0987654321",
            "message": "New quote request",
            "inquiry_type": "contact"
        }
        response = self.client.post("/api/inquiries/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_anonymous_user_cannot_list_inquiries(self):
        response = self.client.get("/api/inquiries/")
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_anonymous_user_cannot_retrieve_inquiry(self):
        response = self.client.get(f"/api/inquiries/{self.inquiry.id}/")
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_admin_user_can_list_inquiries(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get("/api/inquiries/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data.get('results', response.data)), 1)
