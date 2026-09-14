from pathlib import Path
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


BASE_URL = "https://poc-67-government-spending-contract.vercel.app/"

ROOT = Path(__file__).resolve().parent.parent
SCREENSHOT_DIR = ROOT / "tests" / "screenshots"
REPORT_DIR = ROOT / "tests" / "reports"

SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
REPORT_DIR.mkdir(parents=True, exist_ok=True)

REPORT_FILE = REPORT_DIR / "Test_Report.txt"

results = []


def record(test_name, status, message):
    results.append(
        f"{test_name}: {status} - {message}"
    )


def screenshot(driver, name):
    path = SCREENSHOT_DIR / name
    driver.save_screenshot(str(path))
    return path


options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")

driver = webdriver.Chrome(options=options)
wait = WebDriverWait(driver, 20)

run_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

try:
    # ---------------------------------------------------------
    # TEST 1 — VISUAL LOAD
    # ---------------------------------------------------------
    driver.get(BASE_URL)

    wait.until(
        EC.presence_of_element_located(
            (By.XPATH, "//*[contains(text(),'Government Spending Intelligence Dashboard')]")
        )
    )

    screenshot(driver, "01_visual_load.png")

    record(
        "TEST 1 - Visual Load",
        "PASS",
        "POC-67 dashboard loaded successfully."
    )

    # ---------------------------------------------------------
    # TEST 2 — GRAPH HANDSHAKE
    # ---------------------------------------------------------
    graph_nodes = driver.find_elements(
        By.CSS_SELECTOR,
        '[data-testid^="graph-node-"]'
    )

    if not graph_nodes:
        screenshot(driver, "02_graph_handshake_FAIL.png")

        record(
            "TEST 2 - Graph Handshake",
            "FAIL",
            "No graph node with data-testid='graph-node-*' was found on the live deployment."
        )
    else:
        node = graph_nodes[0]

        driver.execute_script(
            "arguments[0].scrollIntoView({block: 'center'});",
            node
        )

        wait.until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, '[data-testid^="graph-node-"]')
            )
        )

        node.click()

        wait.until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, '[data-testid="intelligence-panel"]')
            )
        )

        screenshot(driver, "02_graph_handshake_PASS.png")

        record(
            "TEST 2 - Graph Handshake",
            "PASS",
            "Real graph node clicked and Intelligence Panel appeared."
        )

        # Close panel
        close_button = wait.until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, '[data-testid="intelligence-panel-close"]')
            )
        )

        close_button.click()

    # ---------------------------------------------------------
    # TEST 3 — DEVELOPER SIGNATURE
    # ---------------------------------------------------------
    info_button = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, '[data-testid="info-button"]')
        )
    )

    info_button.click()

    modal = wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, '[data-testid="developer-info-modal"]')
        )
    )

    signature = wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, '[data-testid="developer-signature"]')
        )
    )

    signature_text = signature.text

    if "Aswin Sankar P.S." in signature_text:
        screenshot(driver, "03_developer_signature_PASS.png")

        record(
            "TEST 3 - Developer Signature",
            "PASS",
            "Developer Information modal displayed Aswin Sankar P.S."
        )
    else:
        screenshot(driver, "03_developer_signature_FAIL.png")

        record(
            "TEST 3 - Developer Signature",
            "FAIL",
            "Developer modal appeared, but Aswin Sankar P.S. was not found."
        )

finally:
    driver.quit()


# -------------------------------------------------------------
# WRITE REPORT
# -------------------------------------------------------------
report_lines = [
    "POC-67 GOVERNMENT SPENDING CONTRACT GRAPH",
    "SELENIUM UAT REPORT",
    "=" * 60,
    f"Run Time: {run_time}",
    f"URL: {BASE_URL}",
    "",
]

report_lines.extend(results)

passed = sum(": PASS -" in result for result in results)
failed = sum(": FAIL -" in result for result in results)

report_lines.extend(
    [
        "",
        "=" * 60,
        f"TOTAL TESTS: {len(results)}",
        f"PASSED: {passed}",
        f"FAILED: {failed}",
        "",
    ]
)

if failed == 0:
    report_lines.append("FINAL RESULT: PASS")
else:
    report_lines.append("FINAL RESULT: FAIL")

REPORT_FILE.write_text(
    "\n".join(report_lines),
    encoding="utf-8"
)

print("\n".join(report_lines))
print(f"\nReport saved to: {REPORT_FILE}")