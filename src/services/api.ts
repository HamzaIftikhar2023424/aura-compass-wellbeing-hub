
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000', // FastAPI backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication services
export const authService = {
  register: async (username: string, email: string, password: string) => {
    return api.post('/register', { username, email, password });
  },
  login: async (username: string, password: string) => {
    return api.post('/login', { username, password });
  },
};

// Mood tracking services
export const moodService = {
  createMood: async (mood: string, userId: number) => {
    return api.post('/moods', { mood, user_id: userId });
  },
  getMoods: async () => {
    return api.get('/moods');
  },
};

// Journal services
export const journalService = {
  createJournal: async (content: string, userId: number) => {
    return api.post('/journals', { content, user_id: userId });
  },
  getJournals: async () => {
    return api.get('/journals');
  },
};

// Therapy session services
export const therapyService = {
  createSession: async (userName: string, mood: string, notes: string) => {
    return api.post('/sessions/', { user_name: userName, mood, notes });
  },
  getSession: async (id: number) => {
    return api.get(`/sessions/${id}`);
  },
  updateSession: async (id: number, userName: string, mood: string, notes: string) => {
    return api.put(`/sessions/${id}`, { user_name: userName, mood, notes });
  },
  deleteSession: async (id: number) => {
    return api.delete(`/sessions/${id}`);
  },
};

export default api;
