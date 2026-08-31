from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from products.forms import JsonUploadForm, MAX_UPLOAD_SIZE


class JsonUploadFormTest(TestCase):

    def test_valid_json_file(self):
        """Test that a valid .json file under 5MB passes validation."""
        content = b'[{"name": "Test Product", "category": "Network Camera"}]'
        uploaded_file = SimpleUploadedFile("products.json", content, content_type="application/json")
        form = JsonUploadForm(files={'json_file': uploaded_file})
        self.assertTrue(form.is_valid())

    def test_invalid_file_extension(self):
        """Test that non-.json file extensions are rejected by FileExtensionValidator."""
        content = b'print("malicious python script")'
        uploaded_file = SimpleUploadedFile("script.py", content, content_type="text/x-python")
        form = JsonUploadForm(files={'json_file': uploaded_file})
        self.assertFalse(form.is_valid())
        self.assertIn('json_file', form.errors)

    def test_file_exceeds_max_size(self):
        """Test that files exceeding 5MB max upload limit are rejected to prevent DoS."""
        oversized_content = b'a' * (MAX_UPLOAD_SIZE + 100)
        uploaded_file = SimpleUploadedFile("large.json", oversized_content, content_type="application/json")
        form = JsonUploadForm(files={'json_file': uploaded_file})
        self.assertFalse(form.is_valid())
        self.assertIn('json_file', form.errors)
