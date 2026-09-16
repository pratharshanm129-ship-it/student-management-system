import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const ToastNotification = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast ${toast.type}`}>
        {toast.type === 'success' ? (
          <CheckCircle size={20} color="var(--success)" />
        ) : (
          <AlertCircle size={20} color="var(--danger)" />
        )}
        <div style={{ flex: 1, fontSize: '0.88rem' }}>{toast.message}</div>
        <button
          className="btn-icon-only"
          onClick={onClose}
          style={{ width: '24px', height: '24px', border: 'none', background: 'transparent' }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
