import axios from "axios";

export const getQuote = async () => {
  try {
    const res = await axios.get(
      "https://motivational-spark-api.vercel.app/api/quotes",
      {
        timeout: 5000,
      },
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch quote", error);
    // Return empty array instead of throwing to prevent page hang
    return [];
  }
};
