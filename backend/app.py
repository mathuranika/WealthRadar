from fastapi import FastAPI
from routes.upload import router as upload_router
from routes.analyze import router as analyze_router
from routes.chat import router as chat_router

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
# GLOBAL PORTFOLIO CONTEXT CACHE

app.state.current_context = None

app.include_router(upload_router)
app.include_router(analyze_router)
app.include_router(chat_router)
app.state.current_context = None
app.state.current_file = None

@app.get("/")

def root():

    return {

        "status":"running"

    }