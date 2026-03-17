import requests

BASE_URL = 'http://127.0.0.1:9000'

res = requests.get('http://127.0.0.1:9000/users/search?user_name=Litms')

print(res.status_code)
print(res.json())