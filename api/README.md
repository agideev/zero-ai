# Zero AI — Backend API

Backend API for Zero AI, an AI-powered chat application that processes user questions and conversation history to generate responses.

## Technologies

- Node.js
- Express.js
- TypeScript
- Axios (for HTTP requests, when applicable)

## Features

- Process user questions.
- Maintain conversational context through message history.
- Generate AI responses.
- Handle API requests and errors.
- Support communication with the Zero AI frontend.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

Install dependencies:

```bash
npm install
```

### Run the API

Start the development server:

```bash
npm run dev
```

Make sure the API is running before using the frontend application.

## API Endpoint

### Send a Question

**Endpoint:** `POST /api/chat`

**Content-Type:** `application/json`

#### Request Body

```json
{
  "question": "What is artificial intelligence?",
  "history": [
    {
      "role": "user",
      "content": "I want to learn about technology."
    },
    {
      "role": "assistant",
      "content": "Technology includes tools and systems developed to solve problems."
    }
  ]
}
```

#### Parameters

| Parameter | Type | Description |
|---|---|---|
| `question` | `string` | The user's current question. |
| `history` | `array` | Previous messages used to maintain conversational context. |
| `history[].role` | `string` | Message sender: `user` or `assistant`. |
| `history[].content` | `string` | The content of the previous message. |

#### Example Response

The response format depends on the backend implementation. If the API returns a JSON object, it may look like this:

```json
{
  "response": "Artificial intelligence (AI) is a field of computer science focused on creating systems that perform tasks requiring human-like intelligence."
}
```

## Frontend Integration

The frontend communicates with the backend through HTTP requests using Axios.

Example using Axios:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000
});

export async function sendQuestion(question, history = []) {
  const { data } = await api.post('/chat', {
    question,
    history
  });

  return data;
}
```

### Environment Configuration

The backend API URL is configured in the frontend's `.env` file using the `VITE_API_URL` environment variable.

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

Update this variable according to your backend environment. For production, set it to the URL of your deployed API.

**Note:** Restart the frontend development server after modifying the `.env` file so that the updated environment variable takes effect.

## Error Handling

The API should validate incoming requests and return appropriate HTTP status codes.

Common status codes include:

| Status | Description |
|---|---|
| `200 OK` | Request processed successfully. |
| `400 Bad Request` | Invalid request body or missing required parameters. |
| `500 Internal Server Error` | Unexpected server-side error. |
| `502 Bad Gateway` | An upstream AI service returned an invalid response or could not be reached. |

Actual status codes depend on the backend implementation.

## Project Structure

```text
api/
├── src/
│   └── server.js
│   └── app.js
├── package.json
└── README.md
```

Adapt this structure to match the actual project files.

## Development

Start the development server with:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`, assuming the server uses port `3000`.

## License

This project is licensed under the [MIT License](LICENSE).

You are free to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of this software, subject to the conditions of the MIT License.

See the [LICENSE](LICENSE) file for the full license text.
