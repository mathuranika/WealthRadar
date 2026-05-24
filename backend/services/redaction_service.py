import pandas as pd
import os

PII_FIELDS = [

    "Name",

    "Mobile Number",

    "PAN"

]

def create_redacted_copy(

    input_path

):

    df = pd.read_excel(

        input_path,

        header=None
    )

    for idx,row in df.iterrows():

        for col in row.index:

            value=row[col]

            if pd.isna(value):

                continue

            if str(value).strip() in PII_FIELDS:

                if (

                    col+1

                    <

                    len(row)

                ):

                    df.at[

                        idx,

                        col+1

                    ]="[REDACTED]"

    filename=os.path.basename(

        input_path

    )

    redacted_path=(

        f"uploads/redacted_{filename}"

    )

    df.to_excel(

        redacted_path,

        index=False,

        header=False

    )

    return redacted_path