from fastapi import (
    APIRouter,
    Request,
    HTTPException
)

from services.gemini_service import (
    analyze_portfolio
)

router = APIRouter()

@router.post("/analyze")

async def analyze(

    request: Request

):

    context = (

        request.app.state.current_context

    )

    if context is None:

        raise HTTPException(

            status_code=400,

            detail=(
                "No portfolio uploaded. "
                "Upload first."
            )

        )

    analysis = analyze_portfolio(

        context

    )

    return {

        "summary":
            context["summary"],

        "holdings":
            context["holdings"],

        "analysis":
            analysis

    }