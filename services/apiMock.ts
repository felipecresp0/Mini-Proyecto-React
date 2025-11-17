import { Course, User } from '../types';

// Assume the NestJS backend is running on localhost:3001
const API_BASE_URL = 'http://localhost:3001';

// Helper to get the auth token from localStorage
const getAuthToken = (): string | null => {
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { token } = JSON.parse(storedUser);
            return token;
        }
        return null;
    } catch {
        return null;
    }
};

// A wrapper for fetch to handle common settings and error handling
const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    // Handle responses with no content
    if (response.status === 204) {
        return null as T;
    }

    return response.json();
};


export const api = {
  // Course Endpoints
  getCourses: () => apiFetch<Course[]>('/courses'),
  getCourseById: (id: string) => apiFetch<Course>(`/courses/${id}`),
  createCourse: (courseData: FormData) => fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
            // Content-Type is set automatically by browser for FormData
        },
        body: courseData
    }).then(res => res.json()), // Special handling for FormData

  // Auth Endpoints
  signIn: (email: string, password: string): Promise<{ user: User; token: string }> => 
    apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    }),
  signUp: (name: string, email: string, password: string): Promise<{ user: User; token: string }> => 
    apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
    }),
    
  // Favorites Endpoints
  getFavorites: () => apiFetch<Course[]>('/favorites'),
  addToFavorites: (courseId: string) => apiFetch<{ success: true }>(`/favorites/${courseId}`, { method: 'POST' }),
  removeFromFavorites: (courseId: string) => apiFetch<{ success: true }>(`/favorites/${courseId}`, { method: 'DELETE' }),

  // Cart Endpoints
  getCart: () => apiFetch<Course[]>('/cart'),
  addToCart: (courseId:string) => apiFetch<{ success: true }>(`/cart/${courseId}`, { method: 'POST' }),
  removeFromCart: (courseId: string) => apiFetch<{ success: true }>(`/cart/${courseId}`, { method: 'DELETE' }),
  checkout: () => apiFetch<{ success: boolean; orderTotal: number }>('/cart/checkout', { method: 'POST' }),
  
  // File Upload (legacy simulation, real implementation in createCourse)
  getPresignedUrl: (fileName: string, fileType: string) => {
    throw new Error("getPresignedUrl is deprecated. Use FormData with createCourse.");
  },
  uploadFile: (uploadUrl: string, file: File) => {
    throw new Error("uploadFile is deprecated. Use FormData with createCourse.");
  }
};
