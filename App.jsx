import { useState } from "react";


const TOPICS = [
  { id: "politics", label: "Politics", icon: "🏛️", desc: "Elections, policy, governance" },
  { id: "world", label: "World News", icon: "🌍", desc: "International affairs & diplomacy" },
  { id: "economy", label: "Economy", icon: "📈", desc: "Markets, finance, trade" },
  { id: "climate", label: "Climate", icon: "🌱", desc: "Environment & sustainability" },
  { id: "social", label: "Social Justice", icon: "✊", desc: "Civil rights & equity" },
  { id: "tech", label: "Technology", icon: "💻", desc: "AI, startups, innovation" },
  { id: "science", label: "Science", icon: "🔬", desc: "Research & discovery" },
  { id: "culture", label: "Culture", icon: "🎨", desc: "Arts, film, music, books" },
  { id: "health", label: "Health", icon: "🏥", desc: "Medicine & wellness" },
  { id: "sports", label: "Sports", icon: "⚽", desc: "Athletic events & analysis" },
  { id: "local", label: "Local News", icon: "📍", desc: "Community & city stories" },
  { id: "opinion", label: "Opinion", icon: "💬", desc: "Editorials & commentary" },
];


const PERSPECTIVES = [
  { id: "left", label: "Progressive", color: "#3b82f6" },
  { id: "center-left", label: "Center-Left", color: "#6366f1" },
  { id: "center", label: "Balanced", color: "#8b5cf6" },
  { id: "center-right", label: "Center-Right", color: "#ec4899" },
  { id: "right", label: "Conservative", color: "#f43f5e" },
];


const SOURCES = [
  "In-depth analysis", "Breaking news", "Data journalism",
  "Long-form essays", "Investigative reporting", "Podcasts & audio",
  "Video & documentary", "Community voices",
];


export default function App() {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [selected, setSelected] = useState([]);
  const [perspective, setPerspective] = useState("");
  const [sourcePrefs, setSourcePrefs] = useState([]);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});


  const toggleTopic = (id) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));


  const toggleSource = (s) =>
    setSourcePrefs((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));


  const validate = () => {
    const e = {};
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (mode === "signup" && !form.name.trim()) e.name = "Name required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };


  const handleAuth = () => {
    if (!validate()) return;
    if (mode === "signup") {
      setMode("prefs");
      setStep(1);
    } else {
      setDone(true);
    }
  };


  const handleFinish = () => setDone(true);


  if (done) {
    return (
      <div style={styles.page}>
        <div style={styles.doneCard}>
          <h2 style={styles.doneTitle}>You're all set ✦</h2>
          <button style={styles.primaryBtn} onClick={() => setDone(false)}>
            Back
          </button>
        </div>
      </div>
    );
  }


  if (mode === "prefs") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.headline}>Step {step}</h2>


          {step === 1 && (
            <>
              <p>Select topics:</p>
              {TOPICS.map((t) => (
                <button key={t.id} onClick={() => toggleTopic(t.id)}>
                  {t.label}
                </button>
              ))}
              <button onClick={() => setStep(2)}>Next</button>
            </>
          )}


          {step === 2 && (
            <>
              <p>Select perspective:</p>
              {PERSPECTIVES.map((p) => (
                <button key={p.id} onClick={() => setPerspective(p.id)}>
                  {p.label}
                </button>
              ))}
              <button onClick={() => setStep(3)}>Next</button>
            </>
          )}


          {step === 3 && (
            <>
              <p>Select sources:</p>
              {SOURCES.map((s) => (
                <button key={s} onClick={() => toggleSource(s)}>
                  {s}
                </button>
              ))}
              <button onClick={handleFinish}>Finish</button>
            </>
          )}
        </div>
      </div>
    );
  }


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.headline}>
          {mode === "login" ? "Login" : "Sign Up"}
        </h1>


        {mode === "signup" && (
          <input
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}


        <input
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />


        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />


        <button style={styles.primaryBtn} onClick={handleAuth}>
          {mode === "login" ? "Login" : "Sign Up"}
        </button>


        <button
          style={styles.ghostBtn}
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          Switch to {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  );
}


const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  card: {
    background: "#111118",
    padding: 30,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  headline: {
    fontSize: 24,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #333",
    background: "#0d0d15",
    color: "white",
  },
  primaryBtn: {
    padding: 10,
    background: "#7c3aed",
    border: "none",
    color: "white",
    borderRadius: 6,
    cursor: "pointer",
  },
  ghostBtn: {
    background: "none",
    border: "none",
    color: "#aaa",
    cursor: "pointer",
  },
  doneCard: {
    textAlign: "center",
  },
  doneTitle: {
    fontSize: 28,
  },
};

