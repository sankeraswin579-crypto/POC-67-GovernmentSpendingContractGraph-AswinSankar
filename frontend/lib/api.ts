const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

export default API;

export async function fetchContracts() {
  const res = await fetch(`${API}/api/contracts`);
  return res.json();
}

export async function fetchSummary() {
  const res = await fetch(`${API}/api/summary`);
  return res.json();
}