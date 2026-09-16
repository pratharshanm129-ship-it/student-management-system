import React from 'react';
import { X, Mail, Phone, BookOpen, Award, Calendar, Hash } from 'lucide-react';

const StudentDetailModal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  const getInitials = (name) => {
    return name
      ? name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2)
      : 'S';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Student Profile</h2>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="profile-header">
            <div className="profile-avatar">{getInitials(student.name)}</div>
            <div className="profile-info">
              <h3>{student.name}</h3>
              <span className="reg-no-code">{student.register_number}</span>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-item">
              <label><Hash size={12} style={{ display: 'inline', marginRight: 4 }} /> Student ID</label>
              <span>#{student.id}</span>
            </div>

            <div className="profile-item">
              <label><BookOpen size={12} style={{ display: 'inline', marginRight: 4 }} /> Department</label>
              <span>{student.department}</span>
            </div>

            <div className="profile-item">
              <label><Mail size={12} style={{ display: 'inline', marginRight: 4 }} /> Email</label>
              <span>{student.email}</span>
            </div>

            <div className="profile-item">
              <label><Phone size={12} style={{ display: 'inline', marginRight: 4 }} /> Phone</label>
              <span>{student.phone}</span>
            </div>

            <div className="profile-item">
              <label><Calendar size={12} style={{ display: 'inline', marginRight: 4 }} /> Academic Year</label>
              <span>Year {student.year}</span>
            </div>

            <div className="profile-item">
              <label><Award size={12} style={{ display: 'inline', marginRight: 4 }} /> CGPA Score</label>
              <span style={{ color: 'var(--success)', fontWeight: 800 }}>
                {parseFloat(student.cgpa).toFixed(2)} / 10.00
              </span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
