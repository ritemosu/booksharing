import requests

BASE_URL = 'http://127.0.0.1:9000'

res = requests.post('http://127.0.0.1:9000/user/login', json={"email": "ritemosu1118@gmail.com", "password": 'aiueo'})

print(res.status_code)

token = res.json()['access_token']
print(f"token: {token}")

me = requests.get(f'{BASE_URL}/users/me', headers={
    'Authorization': f'Bearer {token}'
})

print(me.status_code)
print(me.json())