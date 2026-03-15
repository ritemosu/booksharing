from fastapi import FastAPI
import sqlite3
import hashlib
from database import init_db, get_db
from pydantic import BaseModel
import time
import uuid

class User(BaseModel):
    name: str
    email: str
    password: str

init_db()

app = FastAPI()

@app.get('/')
def root_index():
    return {"message": "Hi, This is a test"}

@app.post('/users/register')
def register_user(user: User):
    conn = get_db()
    cur = conn.cursor()
    try:
        id = uuid.uuid4()
        user_name = user.name
        h = hashlib.new("SHA512")
        h.update(user.password.encode())
        hash_pass = h.hexdigest()
        email = user.email
        bio = ""
        datetime = time.strftime('%Y-%m-%d %H:%M:%S')
        cur.execute('INSERT INTO users VALUES (?, ?, ?, ?, ?,?)', ((str(id),user_name,email,hash_pass,bio,datetime)))
        conn.commit()
        return {"message": "User registerd successfully", "user_id": id}

    except sqlite3.Error as e:
        print(f"[Register] Something went wrong: {e}")
        conn.rollback()
        raise
    finally:
        conn.close()