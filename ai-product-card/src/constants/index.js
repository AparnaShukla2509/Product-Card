export const CATEGORIES = [
  { value: "Electronics", label: "Electronics", icon: "💻" },
  { value: "Fashion", label: "Fashion", icon: "👚" },
  { value: "Toys & Games", label: "Toys & Games", icon: "🎮" },
  { value: "Health & Personal Care", label: "Health & Personal Care", icon: "💊" },
];

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "https://api.example.com",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "Please fill in all required fields",
  GENERATION_FAILED: "Failed to generate content. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  TIMEOUT: "Request timed out. Please try again.",
};