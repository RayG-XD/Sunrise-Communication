import django
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
django.setup()

from django.contrib.auth.models import User

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'sunrisecommunication1555@gmail.com', 'sunrise@admin123')
    print('Superuser created: admin / sunrise@admin123')
else:
    print('Admin user already exists')
