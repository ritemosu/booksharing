from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def root_index():
    return {"message": "Hi, This is a test"}