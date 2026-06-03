import { NavLink } from "react-router-dom";
import { FaHome, FaSearch, FaBook } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div>
      <div className="brand">Moodify</div>

      <nav className="nav-section">
        <NavLink to="/" end className="nav-link">
          <FaHome />
          <span>Home</span>
        </NavLink>
        <NavLink to="/research" className="nav-link">
          <FaSearch />
          <span>Research</span>
        </NavLink>
        <NavLink to="/history" className="nav-link">
          <FaBook />
          <span>History</span>
        </NavLink>
      </nav>

      <div className="library">
        <div className="library-title">Your Library</div>
        <ul className="library-list">
          <li>Liked Songs</li>
          <li>Recently Played</li>
          <li>Daily Mix</li>
        </ul>
      </div>
    </div>
  );
}
