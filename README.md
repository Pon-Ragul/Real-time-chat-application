# Real-time Chat Application

A modern, full-stack real-time chat application built with **React**, **Node.js/Express**, and **Socket.io**.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Usage](#usage)
- [Contributing](#contributing)

## ✨ Features

- **Real-time Messaging**: Instant message delivery using Socket.io
- **User Authentication**: Secure JWT-based authentication with bcryptjs
- **User Profiles**: Customizable user profiles with avatar support
- **Image Upload**: Cloudinary integration for image hosting
- **Theme Support**: Dark/Light mode toggle
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Message History**: Persistent message storage with MongoDB
- **User Presence**: Real-time online/offline status

## 🛠 Tech Stack

### Backend
- **Express.js**: REST API framework
- **Node.js**: Runtime environment
- **MongoDB**: NoSQL database
- **Socket.io**: Real-time bidirectional communication
- **JWT**: Authentication
- **Cloudinary**: Image hosting and management
- **Bcryptjs**: Password hashing

### Frontend
- **React**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Tailwind component library
- **Axios**: HTTP client
- **Socket.io Client**: Real-time communication
- **Zustand**: State management
- **React Router**: Client-side routing
- **React Hot Toast**: Notifications

## 📁 Project Structure

```
Real-time-chat-application/
├── backend/
│   ├── controller/
│   │   ├── authcontroller.js       # Authentication logic
│   │   └── messagecontroller.js    # Message handling
│   ├── lib/
│   │   ├── cloudinary.js          # Cloudinary configuration
│   │   └── socket.js              # Socket.io setup
│   ├── middleware/
│   │   └── middleware.js           # Express middleware
│   ├── model/
│   │   ├── usermodel.js           # User schema
│   │   └── messagemodel.js        # Message schema
│   ├── route/
│   │   ├── authroute.js           # Authentication routes
│   │   └── messageroute.js        # Message routes
│   ├── util/
│   │   └── util.js                # Utility functions
│   ├── server.js                  # Entry point
│   ├── package.json               # Dependencies
│   └── .env                       # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AuthImagePattern.jsx
    │   │   ├── ChatContainer.jsx
    │   │   ├── ChatHeader.jsx
    │   │   ├── MessageInput.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── NoChatSelected.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── skeletons/         # Loading skeletons
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   ├── SettingsPage.jsx
    │   │   └── SignupPage.jsx
    │   ├── store/
    │   │   ├── useAuthStore.js    # Auth state
    │   │   ├── useChatStore.js    # Chat state
    │   │   └── useThemeStore.js   # Theme state
    │   ├── lib/
    │   │   ├── axios.js           # Axios configuration
    │   │   └── utils.js           # Utility functions
    │   ├── constants/
    │   │   └── theme.js           # Theme constants
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── App.css
    │   └── index.css
    ├── public/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── eslint.config.js
```

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local or cloud instance)
- **Cloudinary Account** (for image uploads)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Pon-Ragul/Real-time-chat-application.git
cd Real-time-chat-application
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGO_URL=mongodb://your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

### Frontend Configuration

The frontend is configured to connect to `http://localhost:5000` by default. Update the API endpoint in `src/lib/axios.js` if needed.

## 🎯 Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
The backend server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The frontend dev server will run on `http://localhost:5173`

### Option 2: Build Frontend for Production

```bash
cd frontend
npm run build
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user profile
- `PUT /update-profile` - Update user profile
- `PUT /update-avatar` - Update user avatar

### Message Routes (`/api/messages`)
- `GET /users` - Get all users
- `GET /:id` - Get messages with specific user
- `POST /send/:id` - Send message to user

## 🔌 Socket Events

### Client to Server
- `send_message` - Send a new message
- `user_typing` - Notify user is typing
- `user_stop_typing` - Notify user stopped typing

### Server to Client
- `receive_message` - Receive a new message
- `user_typing` - User is typing notification
- `user_stop_typing` - User stopped typing notification
- `online_users` - List of online users

## 💬 Usage

1. **Sign Up**: Create a new account with email and password
2. **Login**: Login with your credentials
3. **Browse Users**: View all available users in the sidebar
4. **Start Chat**: Click on a user to open the chat window
5. **Send Messages**: Type messages and send them in real-time
6. **View Profile**: Click on the profile icon to view and edit your profile
7. **Change Theme**: Toggle between dark and light modes

## 📝 License

This project is open-source and available under the ISC License.

## 👤 Author

**Pon Ragul**
- GitHub: [@Pon-Ragul](https://github.com/Pon-Ragul)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

