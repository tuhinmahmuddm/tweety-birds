
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [active, setActive] = useState("Dashboard");

  const modules = [
    "Dashboard",
    "Pair Management",
    "Egg Management",
    "Baby Management",
    "Finance Management",
    "Courses & Medicine"
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🐦 Tweety Birds</h2>
        <p className="sub">Aviary Management</p>
        {modules.map((item) => (
          <button
            key={item}
            className={active === item ? "active" : ""}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </aside>

      <main className="content">
        <header>
          <div>
            <p className="sub">WELCOME TO</p>
            <h1>{active}</h1>
          </div>
          <span className="avatar">🐦</span>
        </header>

        {active === "Dashboard" ? (
          <>
            <section className="welcome">
              <h2>Your Birds, Your Care 🌿</h2>
              <p>Manage your aviary in one simple place.</p>
            </section>

            <section className="stats">
              {["Total Pairs", "Total Eggs", "Total Babies", "Active Courses"].map(
                (item) => (
                  <article className="card" key={item}>
                    <p>{item}</p>
                    <h2>0</h2>
                  </article>
                )
              )}
            </section>

            <h2 className="section-title">Management Modules</h2>
            <section className="modules">
              {modules.slice(1).map((item, index) => (
                <button
                  className="module-card"
                  key={item}
                  onClick={() => setActive(item)}
                >
                  <span>{["🪺", "🥚", "🐣", "💰", "💊"][index]}</span>
                  <strong>{item}</strong>
                  <small>Open module →</small>
                </button>
              ))}
            </section>
          </>
        ) : (
          <section className="welcome">
            <h2>{active}</h2>
            <p>This module is ready for the next development step.</p>
            <button className="back" onClick={() => setActive("Dashboard")}>
              ← Back to Dashboard
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
