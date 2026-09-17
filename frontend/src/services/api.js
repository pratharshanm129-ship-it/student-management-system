const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
const API_BASE_URL = `${BASE_URL.replace(/\/$/, '')}/students/`;

export const fetchStudents = async (searchTerm = '') => {
  const url = searchTerm 
    ? `${API_BASE_URL}?search=${encodeURIComponent(searchTerm)}`
    : API_BASE_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch students list from server.');
  }
  return await response.json();
};

export const fetchStudentById = async (id) => {
  const response = await fetch(`${API_BASE_URL}${id}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch student details (ID: ${id}).`);
  }
  return await response.json();
};

export const createStudent = async (studentData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = parseApiErrors(data);
    throw new Error(errorMsg);
  }
  return data;
};

export const updateStudent = async (id, studentData) => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = parseApiErrors(data);
    throw new Error(errorMsg);
  }
  return data;
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: 'DELETE',
  });

  if (!response.ok && response.status !== 204) {
    throw new Error(`Failed to delete student (ID: ${id}).`);
  }
  return true;
};

// Helper function to extract human-readable error messages from DRF validation responses
const parseApiErrors = (errorData) => {
  if (typeof errorData === 'string') return errorData;
  if (Array.isArray(errorData)) return errorData.join(', ');
  
  const messages = [];
  for (const [field, errors] of Object.entries(errorData)) {
    const formattedField = field.replace('_', ' ').toUpperCase();
    if (Array.isArray(errors)) {
      messages.push(`${formattedField}: ${errors.join(', ')}`);
    } else {
      messages.push(`${formattedField}: ${errors}`);
    }
  }
  return messages.join(' | ');
};
