from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_FILE = BASE_DIR / "data" / "contracts.csv"


class DataService:
    def __init__(self):
        self.df = None

    # ----------------------------------
    # Load Dataset
    # ----------------------------------
    def load(self):
        if self.df is None:
            if not DATA_FILE.exists():
                raise FileNotFoundError(
                    f"Dataset not found: {DATA_FILE}"
                )

            self.df = pd.read_csv(DATA_FILE)

        return self.df

    # ----------------------------------
    # Dashboard Summary
    # ----------------------------------
    def summary(self):
        df = self.load()

        return {
            "total_contracts": int(len(df)),
            "total_spending": float(df["amount"].sum()),
            "agencies": int(df["agency"].nunique()),
            "vendors": int(df["vendor"].nunique())
        }

    # ----------------------------------
    # Contracts
    # ----------------------------------
    def get_contracts(self, limit=100):
        df = self.load()

        return (
            df.head(limit)
            .fillna("")
            .to_dict(orient="records")
        )

    # ----------------------------------
    # Search
    # ----------------------------------
    def search(self, query):
        df = self.load()

        result = df[
            df.astype(str)
            .apply(
                lambda row: row.str.contains(
                    query,
                    case=False,
                    na=False
                ).any(),
                axis=1,
            )
        ]

        return (
            result
            .fillna("")
            .to_dict(orient="records")
        )

    # ----------------------------------
    # Analytics
    # ----------------------------------
    def analytics(self):
        df = self.load()

        agency_spending = (
            df.groupby("agency")["amount"]
            .sum()
            .reset_index()
        )

        return agency_spending.to_dict(
            orient="records"
        )

    # ----------------------------------
    # Graph Data
    # ----------------------------------
    def graph(self):
        df = self.load()

        nodes = []
        edges = []

        added = set()

        for _, row in df.iterrows():

            agency = str(row["agency"])
            vendor = str(row["vendor"])
            contract = str(row["contract_title"])

            if agency not in added:
                nodes.append({
                    "id": agency,
                    "label": agency,
                    "type": "agency"
                })
                added.add(agency)

            if contract not in added:
                nodes.append({
                    "id": contract,
                    "label": contract,
                    "type": "contract"
                })
                added.add(contract)

            if vendor not in added:
                nodes.append({
                    "id": vendor,
                    "label": vendor,
                    "type": "vendor"
                })
                added.add(vendor)

            edges.append({
                "source": agency,
                "target": contract
            })

            edges.append({
                "source": contract,
                "target": vendor
            })

        return {
            "nodes": nodes,
            "edges": edges
        }

    # ----------------------------------
    # Top Values
    # ----------------------------------
    def top_values(self, column):
        df = self.load()

        if column not in df.columns:
            return {
                "error": f"{column} not found"
            }

        return (
            df[column]
            .value_counts()
            .head(20)
            .to_dict()
        )

    # ----------------------------------
    # Dataset Info
    # ----------------------------------
    def info(self):
        df = self.load()

        return {
            "rows": len(df),
            "columns": list(df.columns),
            "shape": list(df.shape),
            "missing_values": (
                df.isnull()
                .sum()
                .to_dict()
            )
        }


data_service = DataService()