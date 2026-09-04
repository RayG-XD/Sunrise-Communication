from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Inquiry


class InquirySecurityTests(APITestCase):
    def setUp(self):
        self.inquiry = Inquiry.objects.create(
            name="Test Lead",
            phone="9876543210",
            email="test@example.com",
            message="Need 8 CCTV cameras"
        )
        self.admin_user = User.objects.create_superuser(
            username="admin",
            password="adminpassword123",
            email="admin@example.com"
        )
        self.list_url = reverse('inquiry-list')
        self.detail_url = reverse('inquiry-detail', kwargs={'pk': self.inquiry.pk})

    def test_anonymous_user_can_submit_inquiry(self):
        payload = {
            "name": "Jane Doe",
            "phone": "9123456789",
            "email": "jane@example.com",
            "inquiry_type": "contact",
            "message": "Inquiry test message"
        }
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_anonymous_user_cannot_list_inquiries(self):
        response = self.client.get(self.list_url)
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_anonymous_user_cannot_retrieve_inquiry_detail(self):
        response = self.client.get(self.detail_url)
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_admin_user_can_list_and_retrieve_inquiries(self):
        self.client.force_authenticate(user=self.admin_user)
        list_response = self.client.get(self.list_url)
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)

        detail_response = self.client.get(self.detail_url)
        self.assertEqual(detail_response.status_code, status.HTTP_200_OK)
