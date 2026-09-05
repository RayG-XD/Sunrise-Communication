from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Inquiry

User = get_user_model()


class InquiryViewSetSecurityTests(APITestCase):

    def setUp(self):
        self.inquiry = Inquiry.objects.create(
            name='John Doe',
            phone='9876543210',
            email='john@example.com',
            organization='Test Society',
            message='Test inquiry message'
        )
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
        self.list_url = reverse('inquiry-list')
        self.detail_url = reverse('inquiry-detail', kwargs={'pk': self.inquiry.pk})

    def test_unauthenticated_user_can_create_inquiry(self):
        payload = {
            'name': 'Jane Doe',
            'phone': '1234567890',
            'email': 'jane@example.com',
            'message': 'Need CCTV audit'
        }
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Inquiry.objects.count(), 2)

    def test_unauthenticated_user_cannot_list_inquiries(self):
        response = self.client.get(self.list_url)
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_unauthenticated_user_cannot_retrieve_inquiry(self):
        response = self.client.get(self.detail_url)
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_admin_user_can_list_and_retrieve_inquiries(self):
        self.client.force_authenticate(user=self.admin_user)
        list_response = self.client.get(self.list_url)
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)

        detail_response = self.client.get(self.detail_url)
        self.assertEqual(detail_response.status_code, status.HTTP_200_OK)
