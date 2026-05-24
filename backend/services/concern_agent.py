import json
from services.gemini_service import model

def generate_concerns(summary,holdings):

    prompt=f"""
You are a portfolio concern agent.

Portfolio summary:
{summary}

Holdings:
{holdings}

Find REAL investment concerns.

Check:
- diversification
- concentration risk
- lack of debt exposure
- geographic exposure
- volatility clues
- excessive equity dependence

Return ONLY VALID JSON.

Example:

[
 {
  "title":"High Equity Concentration",
  "detail":"Portfolio is heavily concentrated in Indian equities.",
  "severity":"warning"
 }
]
"""

    try:

        response=model.generate_content(prompt)

        text=response.text.strip()

        text=text.replace("```json","").replace("```","")

        return json.loads(text)

    except Exception as e:

        print("CONCERN AGENT ERROR:",e)

        return [
            {
                "title":"Portfolio Snapshot",
                "detail":"Unable to generate AI concerns.",
                "severity":"warning"
            }
        ]