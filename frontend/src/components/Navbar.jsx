import React from 'react';
import { GraduationCap, UserPlus } from 'lucide-react';

const Navbar = ({ studentCount, onOpenAddModal }) => {
  return (
    <header className="navbar">
      <div className="brand-section">
        <div className="brand-icon">
          <GraduationCap size={26} />
        </div>
        <div>
          <h1 className="brand-title">Student Management System</h1>
          <p className="brand-subtitle">Full-Stack Django REST & React Application</p>
        </div>
      </div>

      <div className="nav-actions">
        <div className="stats-badge">
          Total Students: <span className="stats-count">{studentCount}</span>
        </div>
        <button className="btn btn-primary" onClick={onOpenAddModal}>
          <UserPlus size={18} />
          <span>Add Student</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
