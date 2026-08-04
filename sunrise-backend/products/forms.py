from django import forms


class JsonUploadForm(forms.Form):
    json_file = forms.FileField(
        label='Select Products JSON File',
        help_text='Upload a .json file containing a list of products with specs, category, brand, and details.',
        widget=forms.FileInput(attrs={'accept': '.json', 'class': 'form-control'})
    )
    clear_existing = forms.BooleanField(
        required=False,
        initial=False,
        label='Clear existing products before importing',
        help_text='Check this if you want to replace all current products with the contents of the uploaded JSON file.'
    )
