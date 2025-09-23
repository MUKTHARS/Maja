const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Remove artificial timeout limits since Gemini can take time for long responses
const REQUEST_TIMEOUT = 120000; // 120 seconds for comprehensive responses

export const sendMessage = async (message) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('The AI is generating a comprehensive response. This may take a moment for detailed answers.');
    }
    
    console.error('Error sending message:', error);
    throw error;
  }
};
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// export const sendMessage = async (message) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/chat`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ message }),
//     });

//     if (!response.ok) {
//       throw new Error(`API error: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.reply;
//   } catch (error) {
//     console.error('Error sending message:', error);
//     throw error;
//   }
// };