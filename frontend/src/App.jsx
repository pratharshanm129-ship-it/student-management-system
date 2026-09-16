
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import StudentTable from './components/StudentTable';
import StudentFormModal from './components/StudentFormModal';
import StudentDetailModal from './components/StudentDetailModal';
import ConfirmModal from './components/ConfirmModal';
import ToastNotification from './components/ToastNotification';
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './services/api';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Operation loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchStudents(searchTerm);
      // Filter by department locally if selected
      let filteredData = data;
      if (selectedDept) {
        filteredData = data.filter((s) => s.department === selectedDept);
      }
      setStudents(filteredData);
    } catch (err) {
      showToast(err.message || 'Failed to load students list', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedDept]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Open modal handlers
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleOpenView = (student) => {
    setViewingStudent(student);
  };

  const handleOpenDelete = (student) => {
    setDeletingStudent(student);
  };

  // Form submit handler (Create / Edit)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
        showToast(`Student record for "${formData.name}" updated successfully!`, 'success');
      } else {
        await createStudent(formData);
        showToast(`Student "${formData.name}" added successfully!`, 'success');
      }
      setIsFormOpen(false);
      setEditingStudent(null);
      loadStudents();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete submit handler
  const handleConfirmDelete = async () => {
    if (!deletingStudent) return;
    setIsDeleting(true);
    try {
      await deleteStudent(deletingStudent.id);
      showToast(`Student record "${deletingStudent.name}" deleted successfully!`, 'success');
      setDeletingStudent(null);
      loadStudents();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar
        studentCount={students.length}
        onOpenAddModal={handleOpenAdd}
      />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
      />

      <StudentTable
        students={students}
        loading={loading}
        onSelectView={handleOpenView}
        onSelectEdit={handleOpenEdit}
        onSelectDelete={handleOpenDelete}
      />

      {/* Create / Edit Form Modal */}
      <StudentFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingStudent(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingStudent}
        isSubmitting={isSubmitting}
      />

      {/* View Detail Modal */}
      <StudentDetailModal
        isOpen={!!viewingStudent}
        onClose={() => setViewingStudent(null)}
        student={viewingStudent}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!deletingStudent}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleConfirmDelete}
        studentName={deletingStudent?.name}
        isDeleting={isDeleting}
      />

      {/* Floating Toast Alerts */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

export default App;
