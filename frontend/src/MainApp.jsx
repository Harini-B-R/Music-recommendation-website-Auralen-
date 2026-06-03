
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import LandingPage from "./pages/Landing";
// import AuthPage from "./pages/AuthPage";  // ✅ combined Login/Signup
// import App from "./App";

// /*
//   Wrappers for using useNavigate inside Router
// */

// function LandingWrapper() {
//   const navigate = useNavigate();
//   const onGetStarted = () => {
//     navigate("/auth"); // ✅ always go to auth
//   };
//   return <LandingPage onGetStarted={onGetStarted} />;
// }

// function AuthWrapper({ setLoggedIn }) {
//   return <AuthPage setLoggedIn={setLoggedIn} />;
// }

// export default function MainApp() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page */}
//         <Route
//           path="/"
//           element={isLoggedIn ? <Navigate to="/home" replace /> : <LandingWrapper />}
//         />

//         {/* Combined Login/Signup */}
//         <Route
//           path="/auth"
//           element={isLoggedIn ? <Navigate to="/home" replace /> : <AuthWrapper setLoggedIn={setIsLoggedIn} />}
//         />

//         {/* Home */}
//         <Route
//           path="/home"
//           element={isLoggedIn ? <App setLoggedIn={setIsLoggedIn} /> : <Navigate to="/auth" replace />}
//         />

//         {/* Catch all */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/Landing";
import AuthPage from "./pages/AuthPage";  // combined Login/Signup
import App from "./App";

function LandingWrapper() {
  const navigate = useNavigate();
  const onGetStarted = () => {
    navigate("/auth"); // go to auth after landing
  };
  return <LandingPage onGetStarted={onGetStarted} />;
}

function AuthWrapper({ setLoggedIn }) {
  return <AuthPage setLoggedIn={setLoggedIn} />;
}

export default function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        {/* Landing Page always comes first */}
        <Route path="/" element={<LandingWrapper />} />

        {/* Auth Page */}
        <Route path="/auth" element={<AuthWrapper setLoggedIn={setIsLoggedIn} />} />

        {/* Home Page */}
        <Route
          path="/home"
          element={isLoggedIn ? <App setLoggedIn={setIsLoggedIn} /> : <Navigate to="/auth" replace />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
