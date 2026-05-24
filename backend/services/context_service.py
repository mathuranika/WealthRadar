import requests

from services.market_analyzer import analyze_symbol

MFAPI_SEARCH_URL = "https://api.mfapi.in/mf/search"


def search_scheme(scheme_name):

    try:
        response = requests.get(
            MFAPI_SEARCH_URL,
            params={"q": scheme_name},
            timeout=10
        )

        results = response.json()

        if not results:
            return None

        return results[0]

    except Exception:
        return None


def infer_market_symbol(row):

    category = row.get("Category", "").lower()
    sub_category = row.get("Sub-category", "").lower()
    scheme = row.get("Scheme Name", "").lower()

    if "gold" in scheme or "gold" in sub_category:
        return "GC=F"

    if "equity" in category:
        return "^NSEI"

    return None


def build_context(parsed):

    enriched_holdings = []

    for row in parsed["holdings"]:

        mfapi_data = search_scheme(
            row["Scheme Name"]
        )

        symbol = infer_market_symbol(row)

        market_stream = None

        if symbol:
            market_stream = analyze_symbol(symbol)

        enriched_holdings.append({
            **row,
            "mfapi": mfapi_data,
            "market_stream": market_stream
        })

    return {
        "summary": parsed["summary"],
        "holdings": enriched_holdings
    }