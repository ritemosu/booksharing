from fastapi import FastAPI
import sqlite3

app = FastAPI()

@app.get('/')
def root_index():
    return {"message": "Hi, This is a test"}