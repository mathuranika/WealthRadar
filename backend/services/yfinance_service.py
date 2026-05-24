import yfinance as yf

def enrich_market_data(

    holdings

):

    enriched=[]

    for row in holdings:

        scheme=row[
            "Scheme Name"
        ]

        try:

            search=yf.Search(

                scheme,

                max_results=1

            )

            quotes=search.quotes

            market=None

            if quotes:

                symbol=quotes[0][
                    "symbol"
                ]

                ticker=yf.Ticker(
                    symbol
                )

                info=ticker.info

                market={

                    "symbol":
                        symbol,

                    "sector":
                        info.get(
                            "sector"
                        ),

                    "price":
                        info.get(
                            "regularMarketPrice"
                        ),

                    "change_pct":
                        info.get(
                            "regularMarketChangePercent"
                        )

                }

        except:

            market=None

        enriched.append({

            **row,

            "market":
                market

        })

    return enriched