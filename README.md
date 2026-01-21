# 🎨 ShoCanvas - Digital Drawing & Art Platform

A modern, full-featured web application for creating, uploading, and managing digital artwork. Built with React and powered by Firebase backend services.

## 📋 Project Overview

ShoCanvas is an interactive digital drawing platform that allows users to:

- 🖌️ Draw and sketch directly on a canvas
- 📤 Upload artwork to a cloud-based gallery
- 🔐 Authenticate securely with Firebase
- 💾 Store and manage their artwork collection
- 📱 Experience responsive design across devices

## 🛠️ Technology Stack

### Frontend Framework & Libraries

- **React** (v19.1.0) - UI library for building interactive interfaces
- **Vite** (v7.0.3) - Next-generation frontend build tool with HMR (Hot Module Replacement)
- **React Router DOM** (v7.12.0) - Client-side routing and navigation
- **React Hook Form** (v7.60.0) - Lightweight form validation library

### State Management

- **Redux Toolkit** (v2.8.2) - State management with async thunks
- **React-Redux** (v9.2.0) - React bindings for Redux

### Styling

- **Tailwind CSS** (v4.1.18) - Utility-first CSS framework
- **PostCSS** (v8.5.6) - CSS transformation tool
- **Autoprefixer** (v10.4.23) - Vendor prefix automation

### Backend & Authentication

- **Firebase** (v11.10.0) - Backend services including:
  - **Firebase Authentication** - Email/password authentication with session persistence
  - **Firestore Database** - Real-time NoSQL database for storing user data and metadata
  - **Firebase Storage** (via Cloudinary integration) - Image upload and storage

### Image Upload & Storage

- **Cloudinary** - Image hosting and delivery service for uploaded artwork

### Development Tools

- **ESLint** (v9.30.1) - Code linting and quality assurance
- **ESLint Plugin React Hooks** - React-specific linting rules
- **ESLint Plugin React Refresh** - Fast refresh integration

### Runtime

- **Node.js** (v22.17.0) - JavaScript runtime

## 🏗️ Project Architecture

### Folder Structure

```
src/
├── components/          # Reusable React components
│   ├── LoginForm/      # Authentication component
│   ├── Navbar.jsx      # Navigation bar
│   ├── Canvas.jsx      # Main drawing canvas
│   ├── HomeCard.jsx    # Gallery display
│   ├── Loading.jsx     # Loading overlay
│   └── ThumbnailComp.jsx # Image thumbnail display
├── Pages/              # Page components
│   ├── Canvas.jsx      # Canvas page
│   ├── Home.jsx        # Home/gallery page
│   └── ErrorPage.jsx   # Error page
├── store/              # Redux state management
│   ├── authReducer.js        # Authentication state
│   ├── signupReducer.jsx      # Sign-up and login logic
│   ├── uploadReducer.js       # Upload state management
│   ├── loadingReducer.js      # Global loading state
│   └── store.js               # Redux store configuration
├── routes/             # Routing configuration
│   ├── ProtectedRoute.jsx     # Route protection with auth
│   └── routesConfig.jsx       # Route definitions
├── hooks/              # Custom React hooks
│   └── useNavigationLoading.js # Loading state during navigation
├── utility/            # Utility functions
│   ├── utils.js        # General utilities
│   ├── authStorage.js  # Session persistence
│   └── fireConfig.js   # Firebase configuration
└── assets/             # Static assets
```

### Key Features

#### 1. **Authentication System**

- Email/password registration and login
- Session persistence using localStorage
- Protected routes with dual-layer authentication checks
- Firebase Authentication integration

#### 2. **Drawing Canvas**

- Full-featured drawing canvas with mouse and touch support
- Real-time stroke rendering with smooth lines
- DPI scaling for accurate cursor positioning
- Canvas resize handling
- Save artwork as PNG images

#### 3. **Image Management**

- Upload artwork to Cloudinary
- Store metadata in Firestore
- View gallery of recent uploads
- Thumbnail preview with hover effects
- Responsive grid layout

#### 4. **User Interface**

- Modern, clean design with Tailwind CSS
- Custom animations (hzero, coverAndRetract)
- Loading overlays with animated indicators
- Responsive navigation with dropdown menus
- Mobile-friendly layout

#### 5. **State Management**

- Redux store for global state
- Async thunks for API calls
- Loading states for better UX
- Authentication state persistence

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env.local` file with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 📱 Features in Detail

### Drawing Canvas

- **Precision Drawing**: DPI-scaled coordinates for accurate drawing
- **Touch Support**: Full touch event handling for mobile devices
- **Smooth Strokes**: Rounded line joins for natural-looking drawings
- **Clear & Save**: Clear canvas or save artwork with a single click

### Authentication

- **Sign Up**: Create new account with email validation
- **Sign In**: Login with existing credentials
- **Session Persistence**: Stay logged in across browser sessions
- **Logout**: Secure logout with session cleanup

### Gallery

- **Recent Uploads**: View your recently created artwork
- **Thumbnail Preview**: See artwork at a glance
- **Interactive UI**: Hover effects and smooth transitions
- **Responsive Grid**: Adapts to different screen sizes

## 🔐 Security Features

- **Environment Variable Protection**: Sensitive credentials stored in `.env.local`
- **Firebase Security**: Server-side authentication and authorization
- **Protected Routes**: Authentication checks on client and server side
- **Form Validation**: Client-side validation with react-hook-form

## 📊 Performance Optimizations

- **Vite Fast Build**: Lightning-fast development builds
- **Code Splitting**: Automatic code chunking for optimal loading
- **Lazy Loading**: Route-based code splitting
- **Tailwind Purging**: Only includes used CSS classes
- **Image Optimization**: Cloudinary integration for image delivery

## 🎯 Future Enhancements

- [ ] Collaborative drawing features
- [ ] Drawing tools (eraser, color picker, brush sizes)
- [ ] Undo/Redo functionality
- [ ] Social sharing capabilities
- [ ] Comment and feedback system
- [ ] Advanced filters and effects
- [ ] Export to multiple formats

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React, Firebase, and Tailwind CSS**
