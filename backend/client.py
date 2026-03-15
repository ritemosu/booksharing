import requests

res = requests.post('http://127.0.0.1:9000/users/register', json={"name": "Litms", "email": "ritemosu1118@gmail.com", "password": "qwer!#$"})
print(res.status_code)
print(res.json())