# AI Traffic Classifier Chrome Extension

A Chrome extension that monitors and classifies web traffic to identify AI-related API calls and services. This tool helps developers and security professionals track AI service usage across different websites.

## Features

- 🔍 **Real-time Traffic Monitoring**: Intercepts and analyzes web requests in real-time
- 🎯 **AI Service Detection**: Identifies traffic to popular AI services including:
  - OpenAI/ChatGPT API
  - Anthropic Claude
  - Google Gemini
  - Perplexity AI
  - Hugging Face
  - And other AI-related endpoints
- 📊 **Confidence Scoring**: Classifies requests as high or low confidence based on URL patterns
- 🔔 **Visual Indicators**:
  - Badge counter for high-confidence AI requests
  - Color-coded logs in the popup interface
- 📝 **Request Logging**: Maintains a history of detected requests with:
  - Timestamp
  - Request method
  - Full URL
  - Confidence level
  - Host information

## Technical Details

### System Architecture

```text
+-------------------+         +-------------------+         +-------------------+
|                   |         |                   |         |                   |
|   Browser Tabs    +-------->+ Background Script +-------->+   Chrome Storage  |
|                   |         |                   |         |                   |
+-------------------+         +-------------------+         +-------------------+
                                      |   ^                          ^
                                      |   |                          |
                                      v   |                          |
                              +-------------------+                  |
                              |   Popup UI        +------------------+
                              | (Log Display,     |
                              |  Clear Button)    |
                              +-------------------+
```

### Data Flow

```text
1. Browser makes a web request
2. Background script intercepts the request
3. Request is classified (AI-related or not)
4. Request details are saved to Chrome Storage
5. If high-confidence AI request, badge is updated
6. Popup UI reads logs from storage and displays them
7. User can clear logs and reset badge from the popup
```

### Component Interaction

```text
[Browser Tab]
     |
     v
[Background Script]
     |
     v
[Request Classifier]---+
     |                 |
     v                 |
[Storage Manager] <----+
     |
     v
[Popup UI] <----> [User]
```

### Detection Patterns

The extension monitors for requests matching these patterns:

- `openai.com/v1/` - OpenAI API endpoints
- `chatgpt.com/backend-api/conversation` - ChatGPT web interface
- `api.anthropic.com/v1` - Anthropic Claude API
- `perplexity.ai` - Perplexity AI services
- `gemini.googleapis.com` - Google Gemini API
- `huggingface.co/api` - Hugging Face API
- `claude.ai` - Claude web interface
- Generic AI patterns (e.g., `ai.` subdomains)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/ai-traffic-classifier-extension.git
   cd ai-traffic-classifier-extension
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the extension:

   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` directory from this project

## Development

- **Tech Stack**:

  - TypeScript
  - Vite for building
  - Chrome Extension Manifest V3

- **Project Structure**:

  ```
  ├── src/
  │   ├── background/     # Service worker and request handling
  │   ├── popup/         # Extension popup UI
  │   ├── utils/         # Shared utilities
  │   └── manifest.json  # Extension configuration
  ├── public/            # Static assets
  └── dist/             # Build output
  ```

- **Development Commands**:
  ```bash
  npm run dev     # Start development build
  npm run build   # Create production build
  ```

## Usage

1. After installation, the extension icon will appear in your Chrome toolbar
2. Click the icon to view the popup interface showing detected AI-related requests
3. The badge counter shows the number of high-confidence AI requests detected
4. Use the clear button to reset logs and badge count

## Privacy

- The extension only monitors network requests
- All data is stored locally in your browser
- No data is sent to external servers
- You can clear all stored data at any time

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details
