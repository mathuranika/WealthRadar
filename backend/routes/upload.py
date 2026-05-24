from fastapi import APIRouter, UploadFile, File, Request
import os

from services.redaction_service import create_redacted_copy
from services.parser_service import parse_groww_file
from services.context_service import build_context
from services.alert_service import generate_alerts
from services.gemini_service import analyze_portfolio

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_file(
    request: Request,
    file: UploadFile = File(...)
):

    # temporary raw upload
    raw_path = os.path.join(
        UPLOAD_DIR,
        f"tmp_{file.filename}"
    )

    with open(raw_path, "wb") as f:
        f.write(await file.read())

    # redact BEFORE permanent storage
    safe_path = create_redacted_copy(
        raw_path
    )

    # destroy raw file
    os.remove(raw_path)

    # ETL
    parsed = parse_groww_file(
        safe_path
    )

    # MFAPI + market stream enrichment
    context = build_context(
        parsed
    )

    # alert generation
    alerts = generate_alerts(
        context["holdings"]
    )

    # AI reasoning
    analysis = analyze_portfolio(
        {
            "summary": context["summary"],
            "holdings": context["holdings"],
            "alerts": alerts
        }
    )

    # runtime session cache
    request.app.state.current_context = {
        "summary": context["summary"],
        "holdings": context["holdings"],
        "alerts": alerts
    }

    request.app.state.current_file = safe_path

    return {
        "message": "upload successful",
        "filename": file.filename,
        "saved_file": safe_path,
        "summary": context["summary"],
        "holdings": context["holdings"],
        "alerts": alerts,
        "analysis": analysis
    }