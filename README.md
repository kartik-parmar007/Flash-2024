# Flash 2024 ⚡

![Flash 2024 Logo](android-chrome-192x192.png)

## 🌟 Project Overview

Flash 2024 is a modern React-based application built with Vite that offers a lightning-fast user experience. The project combines powerful web technologies with mobile capabilities through Capacitor.

## ✨ Features

- **⚡ Lightning Fast**: Built with Vite for near-instantaneous development and production builds
- **📱 Cross-Platform**: Supports web, Android, and Electron (desktop) platforms
- **🎨 Beautiful UI**: Leverages Chakra UI and Framer Motion for stunning visuals
- **🔥 Firebase Integration**: Authentication and database functionalities
- **📷 Camera Support**: Image capture and processing capabilities
- **🗺️ Maps Integration**: Location services with Leaflet
- **🧠 AI Features**: Integration with Google's Generative AI
- **🔄 State Management**: Efficient state handling with Zustand

## 🛠️ Tech Stack

- **Frontend**: React, Chakra UI, Framer Motion
- **Build Tool**: Vite
- **Mobile**: Capacitor (Android)
- **Desktop**: Electron
- **Maps**: Leaflet, React Leaflet
- **AI**: Google Cloud Vision, Google Generative AI
- **Authentication**: Firebase Auth
- **State Management**: Zustand
- **Sharing & Social**: React Share, Social Login integrations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/kartik-parmar007/Flash-2024.git
   cd Flash-2024
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Build for production
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📱 Mobile Development

### Android

```bash
npm run build
npx cap add android
npx cap sync
npx cap open android
```

## 🖥️ Desktop Development

```bash
npm run build
npx cap add @capacitor-community/electron
npx cap sync
npx cap open @capacitor-community/electron
```

## 🔧 Configuration

The project uses several configuration files:

- `vite.config.js` - Vite configuration
- `capacitor.config.json` - Capacitor settings
- `.eslintrc.cjs` - ESLint rules

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

## 👨‍💻 Author

- Kartik Parmar
