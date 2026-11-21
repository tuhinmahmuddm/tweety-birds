import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [active, setActive] = useState("Dashboard");
  const [pairs, setPairs] = useState([]);
  const [form, setForm] = useState({
    pairNumber: "",
    pairName: "",
    caseNumber: ""
  });
  const [editing, setEditing] = useState(null);

  const modules = [
    "Dashboard",
    "Pair Management",
    "Egg Management",
    "Baby Management",
    "Finance Management",
    "Courses & Medicine"
  ];

  function savePair(e) {
    e.preventDefault();

    if (!form.pairNumber || !form.pairName || !form.caseNumber) {
      alert("Please fill in all fields.");
      return;
    }

    if (editing !== null) {
      setPairs(pairs.map((pair, index) =>
        index === editing ? form : pair
      ));
      setEditing(null);
    } else {
      setPairs([...pairs, form]);
    }

    setForm({ pairNumber: "", pairName: "", caseNumber: "" });
  }

  function editPair(index) {
    setForm(pairs[index]);
    setEditing(index);
  }

  function deletePair(index) {
    if (window.confirm("Delete this pair?")) {
      setPairs(pairs.filter((_, i) => i !== index));
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🐦 Tweety Birds</h2>
        <p className="sub">Aviary Management</p>

        {modules.map(item => (
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
              {[
                ["Total Pairs", pairs.length],
                ["Total Eggs", 0],
                ["Total Babies", 0],
                ["Active Courses", 0]
              ].map(([item, value]) => (
                <article className="card" key={item}>
                  <p>{item}</p>
                  <h2>{value}</h2>
                </article>
              ))}
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
        ) : active === "Pair Management" ? (
          <>
            <section className="welcome">
              <h2>Pair Management 🌿</h2>
              <p>Add and manage your bird pairs.</p>
            </section>

            <section className="card">
              <h2>{editing !== null ? "Edit Pair" : "Add New Pair"}</h2>

              <form onSubmit={savePair} className="pair-form">
                <label>Pair Number</label>
                <input
                  placeholder="Example: P-01"
                  value={form.pairNumber}
                  onChange={e => setForm({
                    ...form, pairNumber: e.target.value
                  })}
                />

                <label>Pair Name</label>
                <input
                  placeholder="Example: Yellow Fischer"
                  value={form.pairName}
                  onChange={e => setForm({
                    ...form, pairName: e.target.value
                  })}
                />

                <label>Case Number</label>
                <input
                  placeholder="Example: C-01"
                  value={form.caseNumber}
                  onChange={e => setForm({
                    ...form, caseNumber: e.target.value
                  })}
                />

                <button className="back" type="submit">
                  {editing !== null ? "Update Pair" : "Save Pair"}
                </button>

                {editing !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(null);
                      setForm({
                        pairNumber: "",
                        pairName: "",
                        caseNumber: ""
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </section>

            <h2 className="section-title">Pair List ({pairs.length})</h2>

            {pairs.length === 0 ? (
              <section className="card">
                No pairs added yet.
              </section>
            ) : (
              <section className="pair-list">
                {pairs.map((pair, index) => (
                  <article className="card" key={index}>
                    <h3>{pair.pairName}</h3>
                    <p>Pair Number: {pair.pairNumber}</p>
                    <p>Case Number: {pair.caseNumber}</p>
                    <p>Male Parent ID: {pair.caseNumber}M</p>
                    <p>Female Parent ID: {pair.caseNumber}F</p>
                    <button onClick={() => editPair(index)}>Edit</button>
                    <button onClick={() => deletePair(index)}>Delete</button>
                  </article>
                ))}
              </section>
            )}
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
                  
