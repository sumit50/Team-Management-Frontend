import axios from "axios";

export const getQuote = async () => {
    try {
        const res = await axios.get("https://motivational-spark-api.vercel.app/api/quotes");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch quote", error);
        return [];
    }
};
