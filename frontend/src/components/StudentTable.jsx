import React from 'react';
import { Eye, Edit2, Trash2, Users } from 'lucide-react';

const StudentTable = ({ students, onSelectView, onSelectEdit, onSelectDelete, loading }) => {
  const getInitials = (name) => {
    if (!name) return 'S';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <div className="empty-icon">⏳</div>
          <p>Loading student records...</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <Users className="empty-icon" size={48} />
          <h3>No Students Found</h3>
          <p>Try clearing your search filters or add a new student.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Register Number</th>
              <th>Contact Info</th>
              <th>Dept</th>
              <th>Year</th>
              <th>CGPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>#{student.id}</td>
                <td>
                  <div className="student-name-box">
                    <div className="avatar-circle">{getInitials(student.name)}</div>
                    <span className="student-name">{student.name}</span>
                  </div>
                </td>
                <td>
                  <span className="reg-no-code">{student.register_number}</span>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>
                    <div>{student.email}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{student.phone}</div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-dept">{student.department}</span>
                </td>
                <td>
                  <span className="badge badge-year">{student.year} Year</span>
                </td>
                <td>
                  <span className={`badge badge-cgpa ${parseFloat(student.cgpa) < 7.5 ? 'warning' : ''}`}>
                    {parseFloat(student.cgpa).toFixed(2)}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="btn-icon-only view"
                      title="View Details"
                      onClick={() => onSelectView(student)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-icon-only edit"
                      title="Edit Record"
                      onClick={() => onSelectEdit(student)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn-icon-only delete"
                      title="Delete Record"
                      onClick={() => onSelectDelete(student)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
