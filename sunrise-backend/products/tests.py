from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from products.models import Inquiry

User = get_user_model()


class InquiryViewSetSecurityTestCase(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='Password123!'
        )
        self.inquiry = Inquiry.objects.create(
            name='John Doe',
            phone='9876543210',
            email='john@example.com',
            organization='Test Society',
            message='Need CCTV installation quote'
        )

    def test_anonymous_user_can_create_inquiry(self):
        """Verify unauthenticated user can submit (POST) an inquiry."""
        data = {
            'name': 'Jane Doe',
            'phone': '9123456789',
            'email': 'jane@example.com',
            'organization': 'Apex Towers',
            'message': 'Audit request for 50 flats'
        }
        response = self.client.post('/api/inquiries/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Inquiry.objects.filter(name='Jane Doe').count(), 1)

    def test_anonymous_user_cannot_list_inquiries(self):
        """Verify unauthenticated user cannot view (GET) inquiry list (PII protection)."""
        response = self.client.get('/api/inquiries/')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_anonymous_user_cannot_retrieve_inquiry_detail(self):
        """Verify unauthenticated user cannot retrieve specific inquiry by ID."""
        response = self.client.get(f'/api/inquiries/{self.inquiry.id}/')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_admin_user_can_list_and_retrieve_inquiries(self):
        """Verify authenticated admin/staff user can list and retrieve inquiries."""
        self.client.force_authenticate(user=self.admin_user)

        list_response = self.client.get('/api/inquiries/')
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)

        detail_response = self.client.get(f'/api/inquiries/{self.inquiry.id}/')
        self.assertEqual(detail_response.status_code, status.HTTP_200_OK)
        self.assertEqual(detail_response.data['name'], 'John Doe')
