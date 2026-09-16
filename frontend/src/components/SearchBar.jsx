import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, selectedDept, setSelectedDept }) => {
  return (
    <div className="controls-bar">
      <div className="search-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by student name, register number, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="btn-icon-only" 
            style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent' }}
            onClick={() => setSearchTerm('')}
          >
            <X size={16} />
          </button>
        )}
      </div>

      <select
        className="dept-filter"
        value={selectedDept}
        onChange={(e) => setSelectedDept(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="CSE">CSE - Computer Science</option>
        <option value="ECE">ECE - Electronics & Comm.</option>
        <option value="EEE">EEE - Electrical & Elect.</option>
        <option value="IT">IT - Info Tech</option>
        <option value="MECH">MECH - Mechanical</option>
        <option value="CIVIL">CIVIL - Civil</option>
      </select>
    </div>
  );
};

export default SearchBar;
