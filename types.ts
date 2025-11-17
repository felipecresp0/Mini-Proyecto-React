
export interface Lesson {
  id: string;
  title: string;
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  description: string;
  lessons: Lesson[];
  author?: {
    name: string;
    avatarUrl: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}
