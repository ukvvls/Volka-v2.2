import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error) {
    console.error("VOLKA render error:", error);
  }
  render() {
    if (this.state.error) {
      return (
        <main className="fatal-error" dir="rtl">
          <div className="fatal-card">
            <div className="fatal-mark">V</div>
            <h1>VOLKA واجهت مشكلة أثناء التشغيل</h1>
            <p>لم نترك الشاشة بيضاء. حدّث الصفحة، وإذا استمرت المشكلة أرسل لقطة لهذه الرسالة.</p>
            <button onClick={() => window.location.reload()}>إعادة تحميل VOLKA</button>
            <small>{String(this.state.error?.message || "Unknown error")}</small>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Missing #root element in index.html");

createRoot(rootElement).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);
