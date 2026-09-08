from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from products.models import Category, Product

User = get_user_model()


class AdminJsonUploadSecurityTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='Password123!'
        )
        self.client.force_login(self.admin_user)
        self.upload_url = reverse('admin:products_product_upload_json')

    def test_upload_invalid_json_hides_raw_exception(self):
        invalid_json = SimpleUploadedFile(
            'invalid.json',
            b'{invalid_json_payload: [}', # Invalid syntax causes json.loads exception
            content_type='application/json'
        )
        response = self.client.post(
            self.upload_url,
            {'json_file': invalid_json, 'clear_existing': False},
            follow=True
        )
        self.assertEqual(response.status_code, 200)

        # Retrieve messages
        messages = list(response.context['messages'])
        self.assertTrue(len(messages) > 0)
        error_msg = str(messages[0])

        # Verify that generic message is shown and raw exception/stack details are not exposed
        self.assertIn('Failed to process JSON file. Please check file format and contents.', error_msg)
        self.assertNotIn('Traceback', error_msg)
        self.assertNotIn('JSONDecodeError', error_msg)
