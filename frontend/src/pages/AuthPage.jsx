
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AuthPage.css";

// export default function AuthPage({ setLoggedIn }) {
//   const [mode, setMode] = useState("login"); // "login" | "signup"
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       let url = "";
//       let body = {};

//       if (mode === "login") {
//         url = "http://localhost:5000/auth/login";
//         body = { email, password };
//       } else {
//         url = "http://localhost:5000/auth/signup";
//         body = { username, email, password };
//       }

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();

//       if (!data.ok) {
//         setError(data.error || "Something went wrong");
//         setLoading(false);
//         return;
//       }

//       if (mode === "login") {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("username", data.username);
//         setLoggedIn(true);
//         navigate("/home", { replace: true });
//       } else {
//         alert("Signup successful! Please login.");
//         setMode("login");
//       }

//     } catch (err) {
//       console.error(err);
//       setError("Failed to connect to server");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <h1>{mode === "login" ? "Sign in to Auralens" : "Create Account"}</h1>

//         <form onSubmit={handleSubmit}>
//           {mode === "signup" && (
//             <>
//               <label>Username</label>
//               <input
//                 className="auth-input"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </>
//           )}

//           <label>Email {mode === "login" && "(phone for mobile accounts)"}</label>
//           <input
//             className="auth-input"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label>
//             Password{" "}
//             {mode === "login" && (
//               <span className="forgot">Forgot your password?</span>
//             )}
//           </label>
//           <input
//             className="auth-input"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {error && <p className="error">{error}</p>}

//           <button type="submit" className="auth-button" disabled={loading}>
//             {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Sign up"}
//           </button>
//         </form>

//         {mode === "login" ? (
//           <div className="auth-footer">
//             <p>New to Auralens?</p>
//             <button
//               className="link-button"
//               type="button"
//               onClick={() => setMode("signup")}
//             >
//               Create your Auralens account
//             </button>
//           </div>
//         ) : (
//           <div className="auth-footer">
//             <p>Already have an account?</p>
//             <button
//               className="link-button"
//               type="button"
//               onClick={() => setMode("login")}
//             >
//               Sign in here
//             </button>
//           </div>
//         )}

//         <p className="terms">
//           By {mode === "login" ? "signing in" : "signing up"}, you agree to
//           Auralens <a href="#">Terms</a>.
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import bgVideo from "../assets/bg-video.mp4";
import "./AuthPage.css";

export default function AuthPage({ setLoggedIn }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      particles: {
        number: { value: 60 },
        color: { value: ["#8b5cf6", "#22d3ee", "#34d399", "#f472b6"] },
        links: { enable: true, distance: 130, opacity: 0.25, color: "#8b5cf6" },
        move: { enable: true, speed: 1.2 },
      },
    }),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let url = "";
      let body = {};

      if (mode === "login") {
        url = "http://localhost:5000/auth/login";
        body = { email, password };
      } else {
        url = "http://localhost:5000/auth/signup";
        body = { username, email, password };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      if (mode === "login") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setLoggedIn(true);
        navigate("/home", { replace: true });
      } else {
        alert("Signup successful! Please login.");
        setMode("login");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* 🔹 Background Video */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* 🔹 Overlay */}
      <div className="bg-overlay" />

      {/* 🔹 Particles */}
      <div className="bg-particles">
        <Particles id="auth-particles" init={particlesInit} options={particlesOptions} />
      </div>

      {/* 🔹 Auth Card */}
      <div className="auth-card">
        <h1>{mode === "login" ? "Sign in to Auralens" : "Create Account"}</h1>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <label>Username</label>
              <input
                className="auth-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </>
          )}

          <label>Email {mode === "login" && "(phone for mobile accounts)"}</label>
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>
            Password{" "}
            {mode === "login" && (
              <span className="forgot">Forgot your password?</span>
            )}
          </label>
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Sign up"}
          </button>
        </form>

        {mode === "login" ? (
          <div className="auth-footer">
            <p>New to Auralens?</p>
            <button
              className="link-button"
              type="button"
              onClick={() => setMode("signup")}
            >
              Create your Auralens account
            </button>
          </div>
        ) : (
          <div className="auth-footer">
            <p>Already have an account?</p>
            <button
              className="link-button"
              type="button"
              onClick={() => setMode("login")}
            >
              Sign in here
            </button>
          </div>
        )}

        <p className="terms">
          By {mode === "login" ? "signing in" : "signing up"}, you agree to
          Auralens <a href="#">Terms</a>.
        </p>
      </div>
    </div>
  );
}
