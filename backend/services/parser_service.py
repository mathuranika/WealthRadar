import pandas as pd

PII_FIELDS = [

    "Name",

    "Mobile Number",

    "PAN"

]


def clean_number(value):

    if value is None:

        return 0

    value = str(value)

    value = value.replace(",", "")

    value = value.replace("₹", "")

    value = value.replace("%", "")

    value = value.strip()

    if value == "":

        return 0

    try:

        return float(value)

    except:

        return value


def parse_groww_file(filepath):

    df = pd.read_excel(

        filepath,

        header=None

    )

    cleaned = []

    for _, row in df.iterrows():

        vals = [

            x for x in row.tolist()

            if pd.notna(x)

        ]

        if vals:

            cleaned.append(vals)

    summary = {}

    holdings_start = None

    for i, row in enumerate(cleaned):

        first_col = str(
            row[0]
        ).strip()

        # ---------- PII REDACTION ----------

        if first_col in PII_FIELDS:

            if len(row) > 1:

                row[1] = "[REDACTED]"

        # ---------- SUMMARY EXTRACTION ----------

        if first_col == "Total Investments":

            try:

                summary = {

                    "invested":

                        clean_number(
                            cleaned[i+1][0]
                        ),

                    "current_value":

                        clean_number(
                            cleaned[i+1][1]
                        ),

                    "pnl":

                        clean_number(
                            cleaned[i+1][2]
                        ),

                    "xirr":

                        clean_number(
                            cleaned[i+1][4]
                        )

                }

            except Exception:

                summary = {}

        # ---------- HOLDINGS TABLE ----------

        if first_col == "Scheme Name":

            holdings_start = i

            break

    if holdings_start is None:

        raise Exception(

            "Could not locate holdings table."

        )

    headers = cleaned[
        holdings_start
    ]

    rows = cleaned[
        holdings_start + 1:
    ]

    holdings_df = pd.DataFrame(

        rows,

        columns=headers

    )

    holdings_df = holdings_df.fillna("")

    # ---------- NUMERIC NORMALIZATION ----------

    numeric_cols = [

        "Units",

        "Invested Value",

        "Current Value",

        "Returns"

    ]

    for col in numeric_cols:

        if col in holdings_df.columns:

            holdings_df[col] = (

                holdings_df[col]

                .apply(
                    clean_number
                )

            )

    # ---------- CLEAN XIRR ----------

    if "XIRR" in holdings_df.columns:

        holdings_df["XIRR"] = (

            holdings_df["XIRR"]

            .apply(
                clean_number
            )

        )

    # ---------- CATEGORY STANDARDIZATION ----------

    if "Category" in holdings_df.columns:

        holdings_df["Category"] = (

            holdings_df["Category"]

            .astype(str)

            .str.strip()

        )

    if "Sub-category" in holdings_df.columns:

        holdings_df["Sub-category"] = (

            holdings_df["Sub-category"]

            .astype(str)

            .str.strip()

        )

    return {

        "summary": summary,

        "holdings":

            holdings_df.to_dict(
                "records"
            )

    }