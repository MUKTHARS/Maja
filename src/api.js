import axios from "axios";

const API_URL = "http://localhost:8000/api/chat"; // Replace with backend URL in prod

export const sendMessage = async (message) => {
  try {
    const res = await axios.post(API_URL, { message });
    return res.data.reply;
  } catch (err) {
    console.error(err);
    return "Error: Could not get response.";
  }
};
