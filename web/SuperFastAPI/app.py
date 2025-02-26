from typing import Optional
from fastapi import FastAPI, Body
from pydantic import BaseModel

app = FastAPI(
    title="SuperFastAPI",
    description="Mt first API :)",
    version="1.0.0",
)

DATABASE = {}

class UserCreate(BaseModel):
    fname: str
    lname: str
    email: str
    gender: str

@app.get("/")
async def root():
    return {"message": "Welcome to my SuperFastAPI. No frontend tho - visit sometime later :)"}

@app.get("/get/{username}")
async def get_user(username: str):
    if username in DATABASE:
        return {"message": DATABASE[username]}
    return {"error": "User not found"}

@app.post("/create/{username}")
async def create_user(username: str, user_data: UserCreate):
    if username not in  DATABASE:
        if len(DATABASE) < 5:
            DATABASE[username] = user_data.dict()
            DATABASE[username]["role"] = "guest"
            return {"message": "User created!"}
        else:
            return {"error": "Database is full"}
    return {"error": "User already exists"}

@app.put("/update/{username}")
async def update_user(
    username: str,
    user_data: dict = Body(
        ..., 
        example={
            "fname": "John",
            "lname": "Doe",
            "email": "john.doe@example.com",
            "gender": "male"
        }
    ),
    ):
    if username in  DATABASE:
        DATABASE[username] = user_data
        return {"message": "User created!"}
    return {"error": "User not found"}

@app.get("/flag/{username}")
async def get_flag(username: str):
    if username in DATABASE:
        if DATABASE[username]["role"] == "admin":
            FLAG = open("/flag.txt", 'r').read().strip()
            return {"message": FLAG}
        else:
            return {"error": "Only for admin"}
    return {"error": "User not found"}
