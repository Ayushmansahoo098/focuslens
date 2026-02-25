# 🎯 FocusLens — AI Focus Tracking Studio

> Track focus in real time using your webcam, head pose, and iris gaze estimation. Built with React, face-api.js, and MediaPipe Face Mesh.

![Made with React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Create React App](https://img.shields.io/badge/Build-CRA-09D3AC?style=flat&logo=createreactapp)
![face-api.js](https://img.shields.io/badge/face--api.js-0.22.2-6E56CF?style=flat)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Face%20Mesh-FF6F00?style=flat)
![Recharts](https://img.shields.io/badge/Recharts-Analytics-8884D8?style=flat)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 Real-Time Focus States | Detects `focused`, `warning`, `distracted`, `drowsy`, `away`, and `low_light` |
| 👁️ Iris Gaze Tracking | MediaPipe Face Mesh with refined landmarks for gaze direction |
| 🙂 Head Pose Estimation | Yaw/pitch/roll signals from facial landmarks |
| ⏱️ Time Buffer Logic | Prevents instant false alerts with sustained-state thresholds |
| 📉 Noise Smoothing | Moving-average smoothing for stable predictions |
| 🎛️ Session Calibration | Per-session baseline calibration for user/device adaptation |
| 🌙 Low-Light Guard | Detects unreliable lighting and pauses confidence-based scoring |
| 📊 Analytics Dashboard | Focus trends, distraction charts, and weekly performance cards |
| 📱 Device Friendly UI | Responsive layout for mobile, tablets (iPad), and desktops |

---

## 🛠️ Tech Stack

- **Frontend** — React 18, Create React App, react-router-dom
- **AI / Vision** — face-api.js, MediaPipe Face Mesh, react-webcam
- **Charts** — Recharts
- **Deployment** — Vercel

---

## 📁 Folder Structure

```text
focuslens/
├── public/
│   ├── models/                  # face-api model weights
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ClickSpark.jsx
│   │   └── WaveLabel.jsx
│   ├── hooks/
│   │   ├── useCamera.js
│   │   ├── useFaceDetection.js
│   │   └── useFocusSession.js   # core detection/session logic
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── CameraPage.jsx
│   │   └── DashboardPage.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18+
- A modern browser (Chrome recommended)
- Webcam access

### 1. Clone the repo

```bash
git clone https://github.com/Ayushmansahoo098/focuslens.git
cd focuslens
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm start
```

### 4. Open in browser

```text
http://localhost:3000
```

Allow camera access when prompted.

---

## 🧭 Focus States

| State | Meaning |
|---|---|
| `focused` | Head + gaze are within strict thresholds |
| `warning` | Mild deviation; user likely still engaged |
| `distracted` | Sustained stronger deviation from focus zone |
| `drowsy` | EAR-based low eye openness pattern |
| `away` | Face not reliably detected for consecutive frames |
| `low_light` | Scene luminance too low for reliable tracking |

---

## ⚙️ Scripts

| Script | Description |
|---|---|
| `npm start` | Run local dev server |
| `npm test` | Run test suite |
| `npm run build` | Create production build |

Current build command in `package.json`:

```json
"build": "CI=false GENERATE_SOURCEMAP=false react-scripts build"
```

This is used so CI warning behavior does not block Vercel deployment.

---

## 🌐 Deployment (Vercel)

1. Import repo in Vercel
2. Keep install command: `npm install`
3. Keep build command: `npm run build`
4. Deploy

Notes:
- MediaPipe Face Mesh assets are loaded from jsDelivr at runtime.
- Internet access is required for model asset fetch on first load.

---

## 🎨 UI Notes

- Landing page uses a warm cream + teal + lilac palette
- Footer, buttons, and hover interactions are customized
- Button labels support wave animation on hover
- Camera page layout adapts by breakpoint:
  - Mobile: `<=768px`
  - Tablet: `769–1024px`
  - Desktop: `>1024px`

---

## 👤 Author

**Ayushman Sahoo**
