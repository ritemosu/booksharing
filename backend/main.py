from fastapi import FastAPI, Depends, HTTPException
import sqlite3
from database import init_db, get_db
from pydantic import BaseModel
from auth import get_password_hash, verify_password, create_access_token, decode_token
import time
import uuid

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS(Cross-Origin Resource shareing)エラーが発生してしまうため、
# こっちでlocahost:5173（viteのポート）を指定して
# エラーが起きないようにしないといけない
# https://qiita.com/higakin/items/fabe6a23d564b20ad558　を参照
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Viteのデフォルトポート
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

init_db()

@app.get('/')
def root_index():
    return {"message": "Hi, This is a test"}

@app.post('/users/register')
def register_user(user: User):
    conn = get_db()
    cur = conn.cursor()
    try:
        id = str(uuid.uuid4())
        user_name = user.name
        hash_pass = get_password_hash(user.password)
        email = user.email
        bio = ""
        datetime = time.strftime('%Y-%m-%d %H:%M:%S')
        cur.execute('INSERT INTO users VALUES (?, ?, ?, ?, ?,?)', ((id,user_name,email,hash_pass,bio,datetime)))
        conn.commit()
        return {"message": "User registerd successfully", "user_id": id}

    except sqlite3.Error as e:
        print(f"[Register] Something went wrong: {e}")
        conn.rollback()
        raise
    finally:
        conn.close()

# ログインの確認から認証までを行う
# 認証の処理はauth.pyのcreate_access_tokenに行わせている。
@app.post('/user/login')
def login_user(request: LoginRequest):
    conn = get_db()
    cur  = conn.cursor()
    try:
        cur.execute('SELECT id, hashed_password FROM users WHERE email = ?', (request.email,))
        row = cur.fetchone()

        if row is None or not verify_password(request.password, row[1]):
            raise HTTPException(
                status_code=401,
                detail="メールアドレスまたはパスワードが正しくありません"
            )
        token = create_access_token(data={"sub": row[0]})
        return {"access_token": token, "token_type": "bearer"}
    finally:
        conn.close()

@app.get('/users/me')
def get_me(user_id: str = Depends(decode_token)):
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute('SELECT id, username, email, bio FROM users WHERE id= ?', (user_id,))
        row = cur.fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
        return {"id": row[0], "username": row[1], "email": row[2], "bio":row[3]}
    finally:
        conn.close()

