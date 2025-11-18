const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const api = {
  async getCourses() {
    const res = await fetch(`${API_URL}/courses`);
    if (!res.ok) throw new Error('Failed to load courses');
    return res.json();
  },

  async getCourseById(id: string) {
    const res = await fetch(`${API_URL}/courses/${id}`);
    if (!res.ok) throw new Error('Failed to load course');
    return res.json();
  },

  async createCourse(formData: FormData) {
    const res = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      body: formData, // importante: NO pongas Content-Type, el navegador lo pone
    });
    if (!res.ok) throw new Error('Failed to create course');
    return res.json();
  },
};