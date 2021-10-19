import { MAIN_URL } from "../constants";
const headers = {
  "Cache-Control": "no-cache",
  "Content-Type": "application/json",
  Pragma: "no-cache",
};

export default {
  fetchAfisha: () => fetch(`${MAIN_URL}/kino.json`, { headers }),
  fetchComingSoon: () => fetch(`${MAIN_URL}/kinocoon.json`, { headers }),
  fetchRepertoires: () => fetch(`${MAIN_URL}/theatre.json`, { headers }),
  fetchClubs: () => fetch(`${MAIN_URL}/clubs.json`, { headers }),
  fetchTheatre: () => fetch(`${MAIN_URL}/theatre.json`, { headers }),
  fetchNews: () => fetch(`${MAIN_URL}/news.json`, { headers }),
};
