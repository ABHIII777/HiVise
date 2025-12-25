from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class AddRequest(BaseModel):
    a: int
    b: int


@app.get("/health")
def health():
    return {"status": "OK"}


@app.post("/add")
def add(req: AddRequest):
    return {"result": req.a + req.b}
