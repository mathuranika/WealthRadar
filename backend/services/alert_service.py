def generate_alerts(holdings):

    alerts = []

    for holding in holdings:

        market = holding.get("market_stream")

        if not market:
            continue

        signal = market.get("signal")

        if signal == "HIGH_RISK":
            alerts.append({
                "type": "RISK",
                "scheme": holding["Scheme Name"],
                "message":
                    f"{holding['Scheme Name']} shows strong downside movement."
            })

        elif signal == "BULLISH":
            alerts.append({
                "type": "OPPORTUNITY",
                "scheme": holding["Scheme Name"],
                "message":
                    f"{holding['Scheme Name']} is currently trending upward."
            })

    return alerts