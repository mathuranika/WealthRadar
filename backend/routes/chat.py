from fastapi import (

    APIRouter,

    Request,

    HTTPException

)

from pydantic import BaseModel

from services.gemini_service import (
    analyze_portfolio
)

router = APIRouter()


class ChatRequest(

    BaseModel

):

    question: str


@router.post("/chat")

async def chat(

    req: ChatRequest,

    request: Request

):

    context = (

        request.app.state.current_context

    )

    if context is None:

        raise HTTPException(

            status_code=400,

            detail=(
                "Upload a portfolio first."
            )

        )

    payload = {

        "question":
            req.question,

        "portfolio":
            context

    }

    answer = analyze_portfolio(

        payload

    )

    return {

        "question":
            req.question,

        "answer":
            answer

    }