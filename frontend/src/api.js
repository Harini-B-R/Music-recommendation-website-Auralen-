/*const API_BASE = 'http://localhost:5000'

export async function login(username, password) {
  const r = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  return r.json()
}

export async function recommend(text) {
  const r = await fetch(`${API_BASE}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  return r.json()
}*/
const BASE = "http://127.0.0.1:5000";

export async function login(username) {
  const r = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ username })
  });
  const data = await r.json();
  if (data.token) localStorage.setItem("token", data.token);
  if (data.username) localStorage.setItem("username", data.username);
  return data;
}

export async function getSongs() {
  const r = await fetch(`${BASE}/songs`);
  return r.json();
}

export async function searchSongs(q) {
  const r = await fetch(`${BASE}/search?q=` + encodeURIComponent(q || ""));
  return r.json();
}

export async function recommend(text) {
  const r = await fetch(`${BASE}/recommend`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ text })
  });
  return r.json();
}

export async function getDailyMix() {
  const r = await fetch(`${BASE}/daily-mix`);
  return r.json();
}

export async function getRecent() {
  const r = await fetch(`${BASE}/recent`);
  return r.json();
}

export async function getLiked() {
  const r = await fetch(`${BASE}/liked`);
  return r.json();
}

export async function addLiked(song) {
  const r = await fetch(`${BASE}/liked`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(song)
  });
  return r.json();
}

export async function removeLiked(song) {
  const r = await fetch(`${BASE}/liked`, {
    method: "DELETE",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(song)
  });
  return r.json();
}

export async function recordPlay(song) {
  await fetch(`${BASE}/play`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(song)
  });
}

