import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="topbar" data-aos="fade-down">
      <div className="topbar-nav">
        <button className="circle-btn"><FaChevronLeft /></button>
        <button className="circle-btn"><FaChevronRight /></button>
      </div>
      <div className="topbar-right">
        <input className="search" placeholder="Search songs, artists…" />
        <div className="avatar">A</div>
      </div>
    </div>
  );
}
