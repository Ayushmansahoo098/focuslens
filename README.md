# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.# 🎯 FocusLens — AI Study Focus Coach

FocusLens is an AI-powered productivity assistant that helps students and professionals stay focused during deep work sessions. It uses real-time webcam analysis to detect distraction, drowsiness, and attention, providing live feedback and performance insights.

🔗 **Live Demo:** https://ayushman-focuslens.vercel.app/

---

## 🚀 Overview

Maintaining focus during long study or work sessions is difficult. FocusLens leverages computer vision and real-time analytics to monitor user attention and generate actionable insights.

The system detects whether the user is focused, distracted, or drowsy using lightweight browser-based AI, ensuring privacy and fast performance.

---

## ✨ Key Features

### 🧠 Real-time AI Focus Detection

* Detects attention and presence using face tracking
* Runs directly in the browser for privacy

### ⚡ Live Distraction Alerts

* Instant feedback when the user loses focus
* Encourages deep work habits

### 😴 Drowsiness & Attention Monitoring

* Eye tracking and blink analysis (planned)
* Head pose and gaze tracking

### 📊 Focus Analytics Dashboard

* Track session duration
* Measure productivity and focus score
* Identify patterns in distraction

### 🎯 Gamified Productivity

* Focus streaks
* Performance tracking
* Motivational insights

---

## 🛠️ Tech Stack

### Frontend

* React (Create React App)
* React Hooks and modular architecture
* Recharts for analytics

### AI & Computer Vision

* face-api.js
* Tiny Face Detector
* Landmark detection for eye tracking

### Backend *(In Progress)*

* Node.js
* Express
* MongoDB
* Socket.io for real-time alerts

### Deployment

* Vercel

---

## 🏗️ System Architecture

```
Webcam → Face Detection → Focus Analysis → Real-time Feedback  
         ↓  
     Session Data → Backend → Analytics Dashboard  
```

The application processes video locally in the browser to ensure:

* Privacy
* Low latency
* Real-time performance

---

## 📂 Project Structure

```
src/
 ├── components
 ├── pages
 ├── hooks
 ├── utils
public/
 └── models (AI weights)
```

The project follows a scalable architecture using custom React hooks for modular AI and session logic.

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Ayushmansahoo098/focuslens.git
cd focuslens
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm start
```

---

## 🌍 Deployment

FocusLens is deployed using Vercel for high performance and global edge delivery.

To deploy:

1. Connect GitHub to Vercel
2. Push code
3. Auto-deploy

---

## 📌 Roadmap

### 🔥 Phase 1

* Landing page
* Webcam integration
* Real-time detection

### 🚀 Phase 2

* Drowsiness detection
* Eye blink tracking
* Head pose analysis

### 📊 Phase 3

* Backend integration
* Focus history
* Session analytics

### 💡 Phase 4

* AI productivity insights
* Personalized coaching
* Mobile support

---

## 🤝 Contributing

Contributions and ideas are welcome. Feel free to open issues or pull requests.

---

## 📬 Contact

Created by **Ayushman Sahoo**
If you find this project useful, please ⭐ the repository.

---

> FocusLens aims to transform deep work using AI-driven insights and real-time feedback.


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
