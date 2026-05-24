from fastapi import APIRouter
from pydantic import BaseModel
from typing import Any,Optional
from services.gemini_service import model

router=APIRouter()

class ChatRequest(BaseModel):
    question:str
    holdings:list[Any]=[]
    summary:Optional[dict]=None

@router.post("/chat")
async def chat(req:ChatRequest):

    prompt=f"""
        You are WealthRadar.

        Portfolio summary:
        {req.summary}

        Holdings:
        {req.holdings}

        User question:
        {req.question}

        Instructions:
        - Use ONLY provided portfolio context.
        - Do not invent holdings.
        - Mention diversification/risk when relevant.
        - Use markdown formatting.
        - Use headings when useful.
        - Use bullet points.
        - Bold important portfolio observations.
        - Keep answers concise and readable.
        - End with:
        Please do your own research before making investment decisions.
    """

    response=model.generate_content(prompt)

    return {
        "answer":response.text
    }