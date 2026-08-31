from django import forms
from django.core.validators import FileExtensionValidator

MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB limit to prevent DoS via large file uploads


class JsonUploadForm(forms.Form):
    json_file = forms.FileField(
        label='Select Products JSON File',
        help_text='Upload a .json file (max 5MB) containing a list of products with specs, category, brand, and details.',
        widget=forms.FileInput(attrs={'accept': '.json', 'class': 'form-control'}),
        validators=[FileExtensionValidator(allowed_extensions=['json'])]
    )
    clear_existing = forms.BooleanField(
        required=False,
        initial=False,
        label='Clear existing products before importing',
        help_text='Check this if you want to replace all current products with the contents of the uploaded JSON file.'
    )

    def clean_json_file(self):
        json_file = self.cleaned_data.get('json_file')
        if json_file and json_file.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError(
                f'File size exceeds the maximum allowed limit of 5MB. (Uploaded size: {json_file.size / (1024 * 1024):.2f}MB)'
            )
        return json_file
