import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model=genai.GenerativeModel("gemini-2.5-flash")

def analyze_portfolio(context):

    prompt=f"""
You are a portfolio intelligence AI.

You have access to:
1. Portfolio holdings
2. Market stream analytics
3. Live risk indicators

Use:
- monthly_return
- volatility
- drawdown
- signal classification

If signal is HIGH_RISK:
explain downside exposure.

If signal is BULLISH:
explain upside momentum.

Do not exaggerate risk.

Always remind users to do their own research.

Portfolio Data:
{context}
"""

    try:
        response=model.generate_content(prompt)
        return response.text

    except Exception as e:

        print("GEMINI ERROR:",e)

        return f"""
Portfolio processed successfully.

AI analysis temporarily unavailable.

Reason:
{str(e)}

Portfolio parsing completed.
Please do your own research before making investment decisions.
"""