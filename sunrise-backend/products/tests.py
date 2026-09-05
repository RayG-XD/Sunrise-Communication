from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from products.models import Inquiry

User = get_user_model()


class InquirySecurityTests(APITestCase):
    """Test security permissions on InquiryViewSet endpoint."""

    def setUp(self):
        self.inquiry = Inquiry.objects.create(
            inquiry_type='contact',
            name='Test Client',
            phone='9876543210',
            email='test@example.com',
            message='Need CCTV quote'
        )
        self.regular_user = User.objects.create_user(
            username='user',
            password='Password123!'
        )
        self.admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='AdminPassword123!'
        )

    def test_unauthenticated_user_can_create_inquiry(self):
        """Ensure anonymous public users can submit inquiries."""
        payload = {
            'inquiry_type': 'contact',
            'name': 'Jane Doe',
            'phone': '9123456789',
            'email': 'jane@example.com',
            'message': 'Inquiry test message'
        }
        response = self.client.post('/api/inquiries/', payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Inquiry.objects.count(), 2)

    def test_unauthenticated_user_cannot_list_inquiries(self):
        """Ensure anonymous public users cannot view sensitive inquiries list."""
        response = self.client.get('/api/inquiries/')
        self.assertIn(
            response.status_code,
            [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]
        )

    def test_unauthenticated_user_cannot_retrieve_inquiry_detail(self):
        """Ensure anonymous public users cannot access individual inquiry details."""
        response = self.client.get(f'/api/inquiries/{self.inquiry.id}/')
        self.assertIn(
            response.status_code,
            [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]
        )

    def test_non_staff_user_cannot_list_inquiries(self):
        """Ensure authenticated non-staff users cannot view inquiries list."""
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.get('/api/inquiries/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_user_can_list_and_retrieve_inquiries(self):
        """Ensure administrative staff can view customer inquiries."""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/inquiries/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
