import axios from "axios";
import { API_CONFIG } from "../constants";
import { delay } from "../utils/helpers";

const TITLE_PREFIXES = [
  "Premium",
  "Elegant",
  "Modern",
  "Classic",
  "Stylish",
  "Luxury",
  "Professional",
  "Essential",
  "Ultimate"
];


const DESCRIPTIONS = {
  Electronics: [
    "Experience powerful performance driven by advanced technology designed to make everyday tasks faster and more efficient. Built with precision engineering, this electronic device delivers smooth operation, reliable durability, and seamless connectivity. Its modern design and intelligent features make it ideal for both work and entertainment needs.",

    "This next-generation electronic product combines speed, innovation, and efficiency to enhance your digital lifestyle. Designed for long-lasting performance, it offers smart functionality, energy efficiency, and user-friendly controls. A perfect blend of modern aesthetics and cutting-edge technology.",

    "Engineered with high-quality components, this device ensures consistent performance and dependable reliability. Its sleek and ergonomic design complements modern spaces while delivering advanced features for daily use. Ideal for users who value performance, durability, and smart design.",

    "Upgrade your everyday experience with a feature-rich electronic device crafted for convenience and productivity. With intelligent technology, smooth performance, and a refined modern look, it delivers exceptional value for home or professional use.",

    "Crafted to meet modern technological demands, this electronic product offers powerful performance, intuitive controls, and long-term reliability. Designed to integrate seamlessly into your lifestyle, it combines premium build quality with innovative functionality."
  ],

  Fashion: [
    "This stylish fashion essential is crafted from premium-quality materials to provide exceptional comfort and durability. Designed with a balance of modern trends and timeless appeal, it enhances your everyday look with effortless elegance.",

    "Elevate your wardrobe with a thoughtfully designed fashion piece that offers comfort, sophistication, and versatility. Its refined craftsmanship and contemporary design make it perfect for casual wear and special occasions alike.",

    "A versatile fashion item designed to complement a wide range of styles and occasions. Made with attention to detail, it delivers long-lasting comfort while adding a touch of elegance to your daily attire.",

    "Expertly tailored to combine style and functionality, this fashion product offers a comfortable fit with a modern aesthetic. Its premium finish and durable construction ensure lasting quality.",

    "Designed for individuals who appreciate quality and style, this fashion essential delivers all-day comfort with a refined and contemporary look."
  ],

  "Toys & Games": [
    "This engaging toy is designed to inspire creativity, imagination, and joyful play experiences. Built with safe and durable materials, it encourages learning and skill development while keeping children entertained for hours.",

    "Perfect for family fun and interactive play, this game promotes problem-solving, teamwork, and creative thinking. Its engaging design ensures meaningful entertainment for all ages.",

    "Crafted to provide both fun and learning, this toy supports creativity and developmental growth. Durable construction ensures safe and long-lasting playtime experiences.",

    "A fun-filled game that delivers excitement while enhancing cognitive skills, coordination, and imagination. Ideal for kids and family-friendly entertainment.",

    "Designed to entertain, educate, and inspire, this toy offers the perfect balance of enjoyment and developmental benefits."
  ],

  "Health & Personal Care": [
    "This thoughtfully designed personal care product supports daily wellness and promotes a healthier lifestyle. Made with gentle and effective materials, it ensures safe, comfortable, and reliable everyday use.",

    "Created to enhance your self-care routine, this product combines quality, comfort, and effectiveness. Its user-friendly design makes it suitable for consistent daily use.",

    "A premium health and personal care essential focused on hygiene, comfort, and overall well-being. Designed to keep you feeling fresh and confident throughout the day.",

    "Designed to support a balanced and healthy lifestyle, this personal care product delivers gentle performance with dependable results.",

    "An essential addition to your daily routine, offering comfort, care, and wellness-focused performance you can trust."
  ]
};


const CATEGORY_TAGS = {
  Electronics: ["Tech", "Gadget", "Smart Device", "Innovation", "Digital", "Wireless"],
  Fashion: ["Trendy", "Style", "Wardrobe", "Chic", "Designer", "Fashionable"],
  "Toys & Games": ["Fun", "Playtime", "Entertainment", "Family", "Creative", "Adventure"],
  "Health & Personal Care": ["Wellness", "Healthcare", "Self Care", "Hygiene", "Daily Care", "Healthy Living"]
};


const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);


const generateMockContent = (productName, category) => {
  const title = `${rand(TITLE_PREFIXES)} ${productName}`;
  const description = rand(DESCRIPTIONS[category] || DESCRIPTIONS.Electronics);

  const words = productName.split(" ").filter(w => w.length > 2);

  const tags = [
    ...new Set([
      productName,
      ...words.slice(0, 2),
      category,
      ...shuffle(CATEGORY_TAGS[category] || CATEGORY_TAGS.Electronics).slice(0, 3)
    ])
  ].slice(0, 10);

  return { title, description, tags };
};


const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: { "Content-Type": "application/json" }
});


const retryRequest = async (fn, retries = API_CONFIG.RETRY_ATTEMPTS) => {
  let lastError;
  for (let i = 1; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < retries) {
        await delay(API_CONFIG.RETRY_DELAY * Math.pow(2, i - 1));
      }
    }
  }
  throw lastError;
};


export const generateContent = async (productName, category) => {
  try {
    const res = await retryRequest(() =>
      apiClient.post("/api/generate", { productName, category })
    );
    return res.data;
  } catch (error) {
    console.warn("API failed, using mock content");
    await delay(500);
    return generateMockContent(productName, category);
  }
};

export default generateContent;