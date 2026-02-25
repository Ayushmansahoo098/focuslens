import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import WaveLabel from "../components/WaveLabel";

const mockSessions = [
  { date: "Mon", focusScore: 82, distractions: 4, duration: 25 },
  { date: "Tue", focusScore: 91, distractions: 2, duration: 40 },
  { date: "Wed", focusScore: 74, distractions: 7, duration: 20 },
  { date: "Thu", focusScore: 88, distractions: 3, duration: 35 },
  { date: "Fri", focusScore: 95, distractions: 1, duration: 50 },
  { date: "Sat", focusScore: 78, distractions: 5, duration: 30 },
  { date: "Sun", focusScore: 90, distractions: 2, duration: 45 },
];

const statCards = [
  { label: "Avg Focus Score", value: "85", sub: "This week", icon: "🎯" },
  { label: "Total Sessions", value: "7", sub: "This week", icon: "📅" },
  { label: "Total Focus Time", value: "245m", sub: "This week", icon: "⏱️" },
  { label: "Best Score", value: "95", sub: "Friday", icon: "🏆" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#EDE8F7", border: "1px solid #C9BFEA",
        borderRadius: "10px", padding: "10px 16px",
        fontSize: "13px", color: "#1A1A1A"
      }}>
        <p style={{ margin: 0, fontWeight: "700" }}>{label}</p>
        <p style={{ margin: "4px 0 0", color: "#A594E0" }}>
          {payload[0].name}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("focusScore");

  return (
    <div style={{ background: "#F2EDE4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        padding: "18px 64px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #C9BFEA",
      }}>
        <span
          onClick={() => navigate("/")}
          style={{ fontWeight: "800", fontSize: "20px", color: "#1A1A1A", cursor: "pointer", letterSpacing: "-0.5px" }}
        >
          FocusLens
        </span>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/")}
            className="wave-btn"
            style={{
              background: "transparent", color: "#6B6B6B",
              border: "none", fontSize: "14px",
              cursor: "pointer", fontWeight: "500"
            }}
          >
            <WaveLabel text="Home" />
          </button>
          <button
            onClick={() => navigate("/camera")}
            className="wave-btn"
            style={{
              background: "#A594E0", color: "#fff",
              border: "none", borderRadius: "20px",
              padding: "8px 20px", fontSize: "14px",
              fontWeight: "600", cursor: "pointer",
            }}
          >
            <WaveLabel text="Start Session →" />
          </button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: "40px 64px" }}>

        {/* Title */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#1A1A1A", margin: 0, letterSpacing: "-1px" }}>
            Your Dashboard
          </h1>
          <p style={{ color: "#6B6B6B", marginTop: "6px", fontSize: "14px" }}>
            Track your weekly focus performance
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
          {statCards.map((card, i) => (
            <div key={i} style={{
              background: "#EDE8F7", border: "1px solid #C9BFEA",
              borderRadius: "16px", padding: "24px", flex: "1",
              transition: "transform 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon}</div>
              <p style={{ margin: 0, fontSize: "13px", color: "#6B6B6B", fontWeight: "500" }}>{card.label}</p>
              <h2 style={{ margin: "6px 0 0", fontSize: "32px", fontWeight: "800", color: "#1A1A1A" }}>
                {card.value}
              </h2>
              <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#A594E0" }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div style={{
          background: "#EDE8F7", border: "1px solid #C9BFEA",
          borderRadius: "20px", padding: "32px",
          marginBottom: "24px"
        }}>
          {/* Chart Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#1A1A1A" }}>
              Weekly Overview
            </h3>
            {/* Tabs */}
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { key: "focusScore", label: "Focus Score" },
                { key: "distractions", label: "Distractions" },
                { key: "duration", label: "Duration (min)" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="wave-btn"
                  style={{
                    background: activeTab === tab.key ? "#A594E0" : "#F2EDE4",
                    color: activeTab === tab.key ? "#fff" : "#6B6B6B",
                    border: "1px solid #C9BFEA",
                    borderRadius: "20px", padding: "6px 16px",
                    fontSize: "13px", fontWeight: "600",
                    cursor: "pointer", transition: "all 0.2s"
                  }}
                >
                  <WaveLabel text={tab.label} />
                </button>
              ))}
            </div>
          </div>

          {/* Line Chart */}
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockSessions} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#C9BFEA" />
              <XAxis dataKey="date" tick={{ fontSize: 13, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 13, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={activeTab}
                stroke="#A594E0"
                strokeWidth={3}
                dot={{ fill: "#A594E0", r: 5 }}
                activeDot={{ r: 7, fill: "#1A1A1A" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart + Session History side by side */}
        <div style={{ display: "flex", gap: "24px" }}>

          {/* Bar Chart */}
          <div style={{
            background: "#EDE8F7", border: "1px solid #C9BFEA",
            borderRadius: "20px", padding: "32px", flex: "1"
          }}>
            <h3 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "700", color: "#1A1A1A" }}>
              Distractions Per Day
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockSessions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C9BFEA" />
                <XAxis dataKey="date" tick={{ fontSize: 13, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 13, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="distractions" fill="#C9BFEA" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Session History */}
          <div style={{
            background: "#EDE8F7", border: "1px solid #C9BFEA",
            borderRadius: "20px", padding: "32px", flex: "1"
          }}>
            <h3 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "700", color: "#1A1A1A" }}>
              Session History
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {mockSessions.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: "#F2EDE4", borderRadius: "10px",
                  border: "1px solid #C9BFEA"
                }}>
                  <span style={{ fontWeight: "600", fontSize: "14px", color: "#1A1A1A" }}>{s.date}</span>
                  <span style={{ fontSize: "13px", color: "#6B6B6B" }}>{s.duration} min</span>
                  <span style={{
                    fontSize: "13px", fontWeight: "700",
                    color: s.focusScore >= 85 ? "#16a34a" : s.focusScore >= 70 ? "#d97706" : "#dc2626"
                  }}>
                    {s.focusScore}%
                  </span>
                  <span style={{
                    background: s.focusScore >= 85 ? "#dcfce7" : s.focusScore >= 70 ? "#fef9c3" : "#fee2e2",
                    color: s.focusScore >= 85 ? "#16a34a" : s.focusScore >= 70 ? "#d97706" : "#dc2626",
                    fontSize: "12px", fontWeight: "600",
                    padding: "3px 10px", borderRadius: "20px"
                  }}>
                    {s.focusScore >= 85 ? "Great" : s.focusScore >= 70 ? "OK" : "Poor"}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
