import { useContext, useState } from 'react';
import '../css/Sidebar.css';
import { FaTachometerAlt, FaTable, FaFileExport, FaTimes, FaBars, FaQrcode, FaTools, FaCog } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const {dispatch} = useContext(AuthContext);
  return (
    <>
    <div className="sidebar-toggle">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>
    <aside className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      
      <h2 className="sidebar-title">QR Feedback</h2>
      <nav className="sidebar-nav">
        <a href="/dashboard" className="sidebar-link">
          <FaTachometerAlt className="sidebar-icon" />
          Dashboard
        </a>
        <a href="/feedback-table" className="sidebar-link">
          <FaTable className="sidebar-icon" />
          Feedback Table
        </a>
        <a href="/reports" className="sidebar-link">
          <FaFileExport className="sidebar-icon" />
          Export Reports
        </a>
        <a href="/qr" className="sidebar-link">
          <FaQrcode className="sidebar-icon" />
          QR Generator
        </a>
        <a href="/services" className="sidebar-link">
          <FaTools className="sidebar-icon" />
          Services
        </a>
        
    
        <a className='sidebar-link' style={{cursor: "pointer"}} onClick={()=> {
          dispatch({ type: "LOGOUT"});
        }}>
          Logout
        </a>
      </nav>
    </aside>
    </>
  );
}
