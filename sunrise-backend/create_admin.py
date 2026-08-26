import sys
import django
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
django.setup()

from django.contrib.auth.models import User

username = os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'sunrisecommunication1555@gmail.com')
password = os.getenv('DJANGO_SUPERUSER_PASSWORD')

if not password:
    print('Error: DJANGO_SUPERUSER_PASSWORD environment variable is not set.', file=sys.stderr)
    sys.exit(1)

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f'Superuser created: {username}')
else:
    print(f'Admin user "{username}" already exists')
