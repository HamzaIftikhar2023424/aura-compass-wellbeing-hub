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
  getMoods: async (userId: number) => {
    return api.get(`/moods?user_id=${userId}`);
  },
};

// Journal services
export const journalService = {
  createJournal: async (content: string, userId: number) => {
    return api.post('/journals', { content, user_id: userId });
  },
  getJournals: async (userId: number) => {
    return api.get(`/journals?user_id=${userId}`);
  },
};

// Therapy session services
export const therapyService = {
  getAllSessions: async () => {
    return api.get('/sessions');
  },
  getUserSessions: async (userName: string) => {
    return api.get(`/sessions?user_name=${userName}`);
  },
  createSession: async (userName: string, mood: string, notes: string) => {
    return api.post('/sessions', { user_name: userName, mood, notes });
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

// Therapist services
export const therapistService = {
  getTherapists: async () => {
    // This would connect to a real endpoint in production
    // For now we'll mock the response
    return Promise.resolve({
      data: [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          specialty: "Cognitive Behavioral Therapy",
          languages: ["English", "Spanish"],
          availability: ["Monday", "Wednesday", "Friday"],
          imageUrl: "https://i.pravatar.cc/150?img=1"
        },
        {
          id: 2,
          name: "Dr. Michael Chen",
          specialty: "Trauma and PTSD",
          languages: ["English", "Mandarin"],
          availability: ["Tuesday", "Thursday"],
          imageUrl: "https://i.pravatar.cc/150?img=2"
        },
        {
          id: 3,
          name: "Dr. Aisha Patel",
          specialty: "Anxiety and Depression",
          languages: ["English", "Hindi", "Urdu"],
          availability: ["Monday", "Tuesday", "Thursday"],
          imageUrl: "https://i.pravatar.cc/150?img=3"
        },
        {
          id: 4,
          name: "Dr. James Wilson",
          specialty: "Family Therapy",
          languages: ["English"],
          availability: ["Wednesday", "Friday"],
          imageUrl: "https://i.pravatar.cc/150?img=4"
        },
        {
          id: 5,
          name: "Dr. Maria Rodriguez",
          specialty: "Child and Adolescent Psychology",
          languages: ["English", "Spanish"],
          availability: ["Monday", "Wednesday", "Friday"],
          imageUrl: "https://i.pravatar.cc/150?img=5"
        }
      ]
    });
  },
  bookAppointment: async (therapistId: number, date: string, time: string, userId: number) => {
    // This would connect to a real endpoint in production
    return Promise.resolve({
      data: {
        id: Math.floor(Math.random() * 1000),
        therapistId,
        userId,
        date,
        time,
        status: "confirmed"
      }
    });
  }
};

// Prescription services
export const prescriptionService = {
  getPrescriptions: async (userId: number) => {
    // Mock data for prescriptions
    return Promise.resolve({
      data: [
        {
          id: 1,
          userId,
          medicationName: "Fluoxetine",
          dosage: "20mg",
          frequency: "Once daily",
          startDate: "2023-05-01",
          endDate: "2023-07-01",
          instructions: "Take with food in the morning",
          prescribedBy: "Dr. Johnson"
        },
        {
          id: 2,
          userId,
          medicationName: "Alprazolam",
          dosage: "0.5mg",
          frequency: "Twice daily",
          startDate: "2023-05-15",
          endDate: "2023-06-15",
          instructions: "Take as needed for anxiety",
          prescribedBy: "Dr. Wilson"
        }
      ]
    });
  }
};

// Chatroom services
export const chatroomService = {
  getMessages: async () => {
    return Promise.resolve({
      data: [
        {
          id: 1,
          userId: 1,
          username: "RecoveryJourney",
          message: "I've been using the breathing exercises for a month now, and they've made a huge difference for my anxiety attacks.",
          timestamp: "2023-05-01T12:00:00Z"
        },
        {
          id: 2,
          userId: 2,
          username: "HealingSteps",
          message: "Has anyone tried the gratitude journal feature? I'm wondering if it's worth adding to my routine.",
          timestamp: "2023-05-01T12:05:00Z"
        },
        {
          id: 3,
          userId: 3,
          username: "NewBeginning",
          message: "I just started therapy last week. Feeling nervous but hopeful.",
          timestamp: "2023-05-01T12:10:00Z"
        },
        {
          id: 4,
          userId: 4,
          username: "SunriseHope",
          message: "The meditation guides on here have been a lifesaver during my insomnia episodes.",
          timestamp: "2023-05-01T12:15:00Z"
        }
      ]
    });
  },
  sendMessage: async (userId: number, username: string, message: string) => {
    return Promise.resolve({
      data: {
        id: Math.floor(Math.random() * 1000),
        userId,
        username,
        message,
        timestamp: new Date().toISOString()
      }
    });
  }
};

// Feedback services
export const feedbackService = {
  submitFeedback: async (userId: number, rating: number, comments: string) => {
    return Promise.resolve({
      data: {
        id: Math.floor(Math.random() * 1000),
        userId,
        rating,
        comments,
        timestamp: new Date().toISOString()
      }
    });
  },
  getCurrentMood: async (userId: number, mood: string) => {
    return Promise.resolve({
      data: {
        id: Math.floor(Math.random() * 1000),
        userId,
        mood,
        timestamp: new Date().toISOString(),
        suggestion: mood === "happy" ? "Great! Keep up the positive activities!" : 
                    mood === "neutral" ? "Consider a short mindfulness exercise." : 
                    "Would you like to talk to someone? We're here to help."
      }
    });
  }
};

// Goals and achievements services
export const goalsService = {
  getUserAchievements: async (userId: number) => {
    return Promise.resolve({
      data: {
        userId,
        badges: [
          {
            id: 1,
            name: "Journal Master",
            description: "Completed 7 consecutive days of journaling",
            dateEarned: "2023-04-10",
            iconName: "book"
          },
          {
            id: 2,
            name: "Mood Tracker",
            description: "Tracked mood for 14 days",
            dateEarned: "2023-04-15",
            iconName: "trending-up"
          },
          {
            id: 3,
            name: "Meditation Guru",
            description: "Completed 10 meditation sessions",
            dateEarned: "2023-04-20",
            iconName: "heart"
          }
        ],
        goals: [
          {
            id: 1,
            title: "30-Day Journaling",
            progress: 60,
            total: 30,
            completed: false
          },
          {
            id: 2,
            title: "Weekly Therapy Attendance",
            progress: 3,
            total: 4,
            completed: false
          },
          {
            id: 3,
            title: "Daily Mood Check-in",
            progress: 21,
            total: 21,
            completed: true
          }
        ]
      }
    });
  }
};

// Motivational quotes service
export const motivationalService = {
  getDailyQuote: async () => {
    return Promise.resolve({
      data: {
        id: Math.floor(Math.random() * 10),
        quote: "You are not alone in this journey. Every small step counts.",
        author: "Mentora Team"
      }
    });
  },
  getQuotes: async () => {
    return Promise.resolve({
      data: [
        {
          id: 1,
          quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
          author: "Nelson Mandela"
        },
        {
          id: 2,
          quote: "Life is 10% what happens to us and 90% how we react to it.",
          author: "Charles R. Swindoll"
        },
        {
          id: 3,
          quote: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
          author: "Noam Shpancer"
        },
        {
          id: 4,
          quote: "There is hope, even when your brain tells you there isn't.",
          author: "John Green"
        },
        {
          id: 5,
          quote: "The most beautiful people we have known are those who have known defeat, known suffering, known struggle, known loss, and have found their way out of the depths.",
          author: "Elisabeth Kübler-Ross"
        }
      ]
    });
  }
};

// Peer support wall service
export const peerSupportService = {
  getPosts: async () => {
    return Promise.resolve({
      data: [
        {
          id: 1,
          content: "Today I finally went outside for a walk after weeks of not leaving the house. Small victory!",
          hearts: 15,
          comments: [
            {
              id: 1,
              content: "That's wonderful! Proud of you for taking that step.",
              timestamp: "2023-05-01T14:30:00Z"
            }
          ],
          timestamp: "2023-05-01T12:00:00Z"
        },
        {
          id: 2,
          content: "I'm struggling with motivation lately. Any tips that have worked for others?",
          hearts: 8,
          comments: [
            {
              id: 2,
              content: "Breaking tasks into tiny steps helped me a lot.",
              timestamp: "2023-05-01T13:05:00Z"
            },
            {
              id: 3,
              content: "I set a timer for just 5 minutes of an activity. Often I end up continuing after the timer ends.",
              timestamp: "2023-05-01T13:10:00Z"
            }
          ],
          timestamp: "2023-05-01T12:30:00Z"
        }
      ]
    });
  },
  createPost: async (content: string) => {
    return Promise.resolve({
      data: {
        id: Math.floor(Math.random() * 1000),
        content,
        hearts: 0,
        comments: [],
        timestamp: new Date().toISOString()
      }
    });
  },
  addHeart: async (postId: number) => {
    return Promise.resolve({ success: true });
  },
  addComment: async (postId: number, content: string) => {
    return Promise.resolve({
      data: {
        id: Math.floor(Math.random() * 1000),
        content,
        timestamp: new Date().toISOString()
      }
    });
  }
};

export default api;
