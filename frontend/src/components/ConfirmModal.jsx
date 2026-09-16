import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, studentName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '450px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ borderBottomColor: 'rgba(239, 68, 68, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
            <AlertTriangle size={20} />
            <h2 className="modal-title">Confirm Deletion</h2>
          </div>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>{studentName}</strong>?
          </p>
          <p style={{ color: 'var(--danger)', fontSize: '0.82rem', marginTop: '0.5rem' }}>
            This action cannot be undone and will permanently remove the record from SQLite database.
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
            <Trash2 size={16} />
            <span>{isDeleting ? 'Deleting...' : 'Delete Student'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
