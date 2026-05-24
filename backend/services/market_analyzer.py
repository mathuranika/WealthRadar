import yfinance as yf


def analyze_symbol(symbol):
    try:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period="1mo")

        if hist.empty:
            return None

        close = hist["Close"]

        current_price = float(close.iloc[-1])
        start_price = float(close.iloc[0])

        monthly_return = ((current_price - start_price) / start_price) * 100

        volatility = float(
            close.pct_change().std() * 100
        )

        max_price = float(close.max())

        drawdown = (
            (current_price - max_price)
            / max_price
        ) * 100

        signal = "HOLD"

        if monthly_return <= -10:
            signal = "HIGH_RISK"

        elif monthly_return >= 10:
            signal = "BULLISH"

        return {
            "symbol": symbol,
            "current_price": round(current_price, 2),
            "monthly_return": round(monthly_return, 2),
            "volatility": round(volatility, 2),
            "drawdown": round(drawdown, 2),
            "signal": signal
        }

    except Exception as e:
        return {
            "error": str(e)
        }