from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from products.models import Inquiry

class InquiryPermissionsTestCase(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser('admin', 'admin@example.com', 'adminpass123')
        self.inquiry = Inquiry.objects.create(
            name='Test Client',
            phone='9876543210',
            email='test@example.com',
            organization='Test Society',
            locality='Thane',
            message='Test Inquiry'
        )

    def test_anonymous_user_can_create_inquiry(self):
        payload = {
            'name': 'John Doe',
            'phone': '1234567890',
            'email': 'john@example.com',
            'organization': 'Apex Heights',
            'message': 'Audit request'
        }
        response = self.client.post('/api/inquiries/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_anonymous_user_cannot_list_inquiries(self):
        response = self.client.get('/api/inquiries/')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_anonymous_user_cannot_retrieve_inquiry(self):
        response = self.client.get(f'/api/inquiries/{self.inquiry.id}/')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_admin_user_can_list_and_retrieve_inquiries(self):
        self.client.force_authenticate(user=self.admin_user)
        list_response = self.client.get('/api/inquiries/')
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)

        detail_response = self.client.get(f'/api/inquiries/{self.inquiry.id}/')
        self.assertEqual(detail_response.status_code, status.HTTP_200_OK)
