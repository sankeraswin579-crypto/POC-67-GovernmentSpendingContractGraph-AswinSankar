import os
from pathlib import Path

import pandas as pd
import requests
from dotenv import load_dotenv

load_dotenv()

# ----------------------------------------
# Configuration
# ----------------------------------------

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

# USA Spending sample dataset
DEFAULT_URL = (
    "https://download.data.gov/"
    "usaspending/award_data_archive/latest_contracts.csv"
)

DATASET_URL = os.getenv("DATASET_URL", DEFAULT_URL)

OUTPUT_FILE = DATA_DIR / "contracts.csv"


# ----------------------------------------
# Download dataset
# ----------------------------------------

def download_dataset(force=False):
    """
    Download contracts dataset.

    force=True will overwrite existing file.
    """

    if OUTPUT_FILE.exists() and not force:
        print(f"[INFO] Dataset already exists.")
        print(f"[INFO] {OUTPUT_FILE}")
        return OUTPUT_FILE

    print("[INFO] Downloading Government Spending dataset...")

    response = requests.get(DATASET_URL, stream=True, timeout=120)
    response.raise_for_status()

    with open(OUTPUT_FILE, "wb") as file:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                file.write(chunk)

    print("[SUCCESS] Download complete.")
    print(OUTPUT_FILE)

    return OUTPUT_FILE


# ----------------------------------------
# Load dataset
# ----------------------------------------

def load_dataset():
    """
    Returns pandas DataFrame.
    """

    if not OUTPUT_FILE.exists():
        download_dataset()

    df = pd.read_csv(OUTPUT_FILE)

    return df


# ----------------------------------------
# Preview
# ----------------------------------------

def preview(rows=5):
    df = load_dataset()

    print("\nRows:", len(df))
    print("\nColumns:")
    print(df.columns.tolist())

    print("\nPreview:")
    print(df.head(rows))


# ----------------------------------------
# Main
# ----------------------------------------

if __name__ == "__main__":
    download_dataset()
    preview()