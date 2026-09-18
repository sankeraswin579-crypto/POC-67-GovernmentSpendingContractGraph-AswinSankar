
from pathlib import Path
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# ============================================================
# CONFIGURATION
# ============================================================

BASE_URL = "https://poc-67-government-spending-contract.vercel.app/"

ROOT = Path(__file__).resolve().parent.parent

SCREENSHOT_DIR = ROOT / "tests" / "screenshots"
REPORT_DIR = ROOT / "tests" / "reports"

SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
REPORT_DIR.mkdir(parents=True, exist_ok=True)

REPORT_FILE = REPORT_DIR / "Test_Report.txt"


# ============================================================
# RESULT STORAGE
# ============================================================

results = []


def record(test_name, status, message):
    results.append(
        f"{test_name}: {status} - {message}"
    )


def take_screenshot(driver, filename):
    path = SCREENSHOT_DIR / filename
    driver.save_screenshot(str(path))
    return path


# ============================================================
# CHROME SETUP
# ============================================================

options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")

driver = webdriver.Chrome(options=options)

# Explicit wait for cloud deployment latency.
wait = WebDriverWait(driver, 30)

run_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")


try:

    # ========================================================
    # OPEN LIVE APPLICATION
    # ========================================================

    driver.get(BASE_URL)

    # ========================================================
    # TEST 1 — VISUAL LOAD
    # ========================================================

    try:

        wait.until(
            EC.presence_of_element_located(
                (
                    By.XPATH,
                    "//*[contains(text(),"
                    "'Government Spending Intelligence Dashboard')]"
                )
            )
        )

        take_screenshot(
            driver,
            "01_visual_load_PASS.png"
        )

        record(
            "TEST 1 - Visual Load",
            "PASS",
            "POC-67 dashboard loaded successfully."
        )

    except Exception as exc:

        take_screenshot(
            driver,
            "01_visual_load_FAIL.png"
        )

        record(
            "TEST 1 - Visual Load",
            "FAIL",
            f"Dashboard did not load correctly: {exc}"
        )

    # ========================================================
    # TEST 2 — GRAPH HANDSHAKE
    # ========================================================

    try:

        # ----------------------------------------------------
        # 2.1 Graph container
        # ----------------------------------------------------

        wait.until(
            EC.presence_of_element_located(
                (
                    By.CSS_SELECTOR,
                    '[data-testid="graph-stage"]'
                )
            )
        )

        # ----------------------------------------------------
        # 2.2 Determine graph state
        # ----------------------------------------------------

        def graph_state(driver_instance):

            nodes = driver_instance.find_elements(
                By.CSS_SELECTOR,
                '[data-testid^="graph-node-"]'
            )

            errors = driver_instance.find_elements(
                By.CSS_SELECTOR,
                '[data-testid="graph-error"]'
            )

            loading = driver_instance.find_elements(
                By.CSS_SELECTOR,
                '[data-testid="graph-loading"]'
            )

            if nodes:
                return "nodes"

            if errors:
                return "error"

            if not loading:
                return "empty"

            return False

        state = wait.until(graph_state)

        # ----------------------------------------------------
        # 2.3 Graph API/frontend error
        # ----------------------------------------------------

        if state == "error":

            error_element = driver.find_element(
                By.CSS_SELECTOR,
                '[data-testid="graph-error"]'
            )

            error_text = error_element.text.strip()

            raise RuntimeError(
                f"Frontend graph error: {error_text}"
            )

        # ----------------------------------------------------
        # 2.4 Graph finished without nodes
        # ----------------------------------------------------

        if state == "empty":

            raise RuntimeError(
                "Graph stage finished loading, "
                "but no graph nodes were rendered."
            )

        # ----------------------------------------------------
        # 2.5 Find graph nodes
        # ----------------------------------------------------

        graph_nodes = driver.find_elements(
            By.CSS_SELECTOR,
            '[data-testid^="graph-node-"]'
        )

        if not graph_nodes:

            raise RuntimeError(
                "No graph node with "
                "data-testid='graph-node-*' was found."
            )

        # ----------------------------------------------------
        # 2.6 Select the first real graph node
        # ----------------------------------------------------

        node = graph_nodes[0]

        driver.execute_script(
            "arguments[0].scrollIntoView({block: 'center'});",
            node
        )

        # ----------------------------------------------------
        # 2.7 Wait for clickable node
        # ----------------------------------------------------

        wait.until(
            EC.element_to_be_clickable(
                (
                    By.CSS_SELECTOR,
                    '[data-testid^="graph-node-"]'
                )
            )
        )

        # ----------------------------------------------------
        # 2.8 Click node
        # ----------------------------------------------------

        node.click()

        # ----------------------------------------------------
        # 2.9 Wait for Intelligence Panel
        # ----------------------------------------------------

        wait.until(
            EC.visibility_of_element_located(
                (
                    By.CSS_SELECTOR,
                    '[data-testid="intelligence-panel"]'
                )
            )
        )

        take_screenshot(
            driver,
            "02_graph_handshake_PASS.png"
        )

        record(
            "TEST 2 - Graph Handshake",
            "PASS",
            "Real graph node loaded, clicked, "
            "and Intelligence Panel appeared."
        )

    except Exception as exc:

        take_screenshot(
            driver,
            "02_graph_handshake_FAIL.png"
        )

        record(
            "TEST 2 - Graph Handshake",
            "FAIL",
            str(exc)
        )

    # ========================================================
    # TEST 3 — DEVELOPER SIGNATURE
    # ========================================================

    try:

        # ----------------------------------------------------
        # 3.1 Locate Info button
        # ----------------------------------------------------

        info_button = wait.until(
            EC.element_to_be_clickable(
                (
                    By.CSS_SELECTOR,
                    '[data-testid="info-button"]'
                )
            )
        )

        driver.execute_script(
            "arguments[0].scrollIntoView({block: 'center'});",
            info_button
        )

        # ----------------------------------------------------
        # 3.2 Click Info button
        # ----------------------------------------------------

        info_button.click()

        # ----------------------------------------------------
        # 3.3 Wait for modal
        # ----------------------------------------------------

        wait.until(
            EC.visibility_of_element_located(
                (
                    By.CSS_SELECTOR,
                    '[data-testid="developer-info-modal"]'
                )
            )
        )

        # ----------------------------------------------------
        # 3.4 Locate developer signature
        # ----------------------------------------------------

        signature = wait.until(
            EC.visibility_of_element_located(
                (
                    By.CSS_SELECTOR,
                    '[data-testid="developer-signature"]'
                )
            )
        )

        signature_text = signature.text

        # ----------------------------------------------------
        # 3.5 Verify developer name
        # ----------------------------------------------------

        if "Aswin Sankar P.S." in signature_text:

            take_screenshot(
                driver,
                "03_developer_signature_PASS.png"
            )

            record(
                "TEST 3 - Developer Signature",
                "PASS",
                "Developer Information modal displayed "
                "Aswin Sankar P.S."
            )

        else:

            take_screenshot(
                driver,
                "03_developer_signature_FAIL.png"
            )

            record(
                "TEST 3 - Developer Signature",
                "FAIL",
                "Developer modal appeared, but "
                "Aswin Sankar P.S. was not found."
            )

    except Exception as exc:

        take_screenshot(
            driver,
            "03_developer_signature_FAIL.png"
        )

        record(
            "TEST 3 - Developer Signature",
            "FAIL",
            f"Developer Information test failed: {exc}"
        )


finally:

    # ========================================================
    # CLOSE BROWSER
    # ========================================================

    driver.quit()


# ============================================================
# BUILD FINAL REPORT
# ============================================================

report_lines = [
    "POC-67 GOVERNMENT SPENDING CONTRACT GRAPH",
    "SELENIUM UAT REPORT",
    "=" * 60,
    f"Run Time: {run_time}",
    f"URL: {BASE_URL}",
    "",
]

report_lines.extend(results)


# ============================================================
# SUMMARY
# ============================================================

passed = sum(
    ": PASS -" in result
    for result in results
)

failed = sum(
    ": FAIL -" in result
    for result in results
)


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


# ============================================================
# FINAL STATUS
# ============================================================

if len(results) == 3 and passed == 3 and failed == 0:

    report_lines.append(
        "FINAL RESULT: PASS"
    )

else:

    report_lines.append(
        "FINAL RESULT: FAIL"
    )


# ============================================================
# SAVE REPORT
# ============================================================

REPORT_FILE.write_text(
    "\n".join(report_lines),
    encoding="utf-8"
)


# ============================================================
# PRINT REPORT
# ============================================================

print(
    "\n".join(report_lines)
)

print(
    f"\nReport saved to: {REPORT_FILE}"
)
