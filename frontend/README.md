<h1 align="center" style="font-weight: bold;">Zero-AI Frontend</h1>

<p align="center">
  <a href="#tech">Technologies</a> •
  <a href="#started">Getting Started</a> •
  <a href="#structure">Project Structure</a> •
  <a href="#api">API Integration</a>
</p>

<p align="center">
  Frontend interface for Zero-AI, an AI system that provides general assistance.
</p>

<p align="center">
  <img src="./docs/screenshots/zeroai-1.png" alt="Chatbot desktop interface - screen 1" width="90%">
  <br><br>
  <img src="./docs/screenshots/zeroai-2.png" alt="Chatbot desktop interface - screen 2" width="90%">
</p>

<h2 id="tech">💻 Technologies</h2>

This project was developed using the following technologies:

* Vue.js
* TypeScript
* Vite
* Tailwind CSS
* Axios

<h2 id="started">🚀 Getting Started</h2>

Follow the instructions below to run the project locally.

<h3>Prerequisites</h3>

Make sure you have installed:

* Node.js
* npm
* Git

<h3>Cloning</h3>

Clone the repository:

```bash
git clone https://github.com/agideev/zero-ai.git
```

Enter the project directory:

```bash
cd zero-ai/frontend
```

<h3>Installing Dependencies</h3>

Install the project dependencies:

```bash
npm install
```

<h3>Environment Variables</h3>

Create a `.env` file in the root directory of the project:

```env
VITE_API_URL=http://localhost:3000/api
```

> Adjust the API URL according to the address where your backend is running.

<h3>Starting</h3>

Start the development server:

```bash
npm run dev
```

After starting the server, Vite will provide a local URL, usually:

```text
http://localhost:5173
```

<h2 id="api">🔌 API Integration</h2>

The frontend communicates with the backend through an HTTP API.

### Chat

| Method | Endpoint    | Description              |
| ------ | ----------- | ------------------------ |
| `POST` | `/api/chat` | Send messages to Zero-AI |


Run the development server:

```bash
npm run dev
```

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

<h2>📦 Production</h2>

To generate the production build:

```bash
npm run build
```

The generated files will be available in the:

```text
dist/
```

directory.

<h2>🔗 Backend</h2>

This application requires the Zero-AI Backend API to process messages and generate AI responses.

The backend is responsible for:

* Receiving user messages
* Processing questions and requests
* Managing conversation history
* Generating AI responses
* Handling API requests and errors

Make sure the backend API is running before using the application locally. The frontend communicates with the backend through the `/api/chat` endpoint.

<h2>🤝 Contributing</h2>

Contributions are welcome.

To contribute:

```bash
# Fork the repository

# Create a new branch
git checkout -b feature/my-feature

# Make your changes

# Commit your changes
git commit -m "feat: add new feature"

# Push your branch
git push origin feature/my-feature
```

Then open a Pull Request explaining the problem solved or feature implemented.

<h2>📄 License</h2>

This project is licensed under the MIT License, allowing anyone to use, copy, modify, distribute, and sell copies of the software, subject to the terms and conditions of the license.

See the [LICENSE](LICENSE) file for the full license text.
