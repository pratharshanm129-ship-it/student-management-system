import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

const StudentFormModal = ({ isOpen, onClose, onSubmit, initialData, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    register_number: '',
    email: '',
    phone: '',
    department: 'CSE',
    year: '1',
    cgpa: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        register_number: initialData.register_number || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        department: initialData.department || 'CSE',
        year: initialData.year ? String(initialData.year) : '1',
        cgpa: initialData.cgpa ? String(initialData.cgpa) : '',
      });
    } else {
      setFormData({
        name: '',
        register_number: '',
        email: '',
        phone: '',
        department: 'CSE',
        year: '1',
        cgpa: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Student Name is required.';
    }

    if (!formData.register_number.trim()) {
      newErrors.register_number = 'Register Number is required.';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.register_number)) {
      newErrors.register_number = 'Register Number must be alphanumeric.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!formData.cgpa) {
      newErrors.cgpa = 'CGPA is required.';
    } else {
      const cgpaVal = parseFloat(formData.cgpa);
      if (isNaN(cgpaVal) || cgpaVal < 0 || cgpaVal > 10) {
        newErrors.cgpa = 'CGPA must be a number between 0.00 and 10.00.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      year: parseInt(formData.year, 10),
      cgpa: parseFloat(formData.cgpa).toFixed(2),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{initialData ? 'Edit Student Record' : 'Add New Student'}</h2>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="e.g. Anish Kumar"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Register Number *</label>
                <input
                  type="text"
                  name="register_number"
                  className={`form-input ${errors.register_number ? 'error' : ''}`}
                  placeholder="e.g. 927621104005"
                  value={formData.register_number}
                  onChange={handleChange}
                />
                {errors.register_number && <span className="error-text">{errors.register_number}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="e.g. student@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number * (10 Digits)</label>
                <input
                  type="text"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Department *</label>
                <select
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="CSE">CSE - Computer Science</option>
                  <option value="ECE">ECE - Electronics & Comm.</option>
                  <option value="EEE">EEE - Electrical & Elect.</option>
                  <option value="IT">IT - Information Tech</option>
                  <option value="MECH">MECH - Mechanical</option>
                  <option value="CIVIL">CIVIL - Civil</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Academic Year *</label>
                <select
                  name="year"
                  className="form-select"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">CGPA * (0.00 - 10.00)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  name="cgpa"
                  className={`form-input ${errors.cgpa ? 'error' : ''}`}
                  placeholder="e.g. 8.75"
                  value={formData.cgpa}
                  onChange={handleChange}
                />
                {errors.cgpa && <span className="error-text">{errors.cgpa}</span>}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <Check size={18} />
              <span>{isSubmitting ? 'Saving...' : initialData ? 'Update Record' : 'Create Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
