import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';
import { Lesson } from '../types';
import { ArrowLeftIcon } from '../components/icons/IconComponents';
import { api } from '../services/api';


const CreateCoursePage: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Science');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [lessons, setLessons] = useState<Partial<Lesson>[]>([{ title: '', duration: '' }]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLessonChange = (index: number, field: keyof Lesson, value: string) => {
        const newLessons = [...lessons];
        newLessons[index] = { ...newLessons[index], [field]: value };
        setLessons(newLessons);
    };

    const addLesson = () => {
        setLessons([...lessons, { title: '', duration: '' }]);
    };

    const removeLesson = (index: number) => {
        const newLessons = lessons.filter((_, i) => i !== index);
        setLessons(newLessons);
    };

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('price', price);
  formData.append('description', description);
  formData.append(
    'lessons',
    JSON.stringify(lessons.filter(l => l.title && l.duration)),
  );
  if (imageFile) {
    formData.append('file', imageFile);
  }

  try {
    const newCourse = await api.createCourse(formData);
    alert(`Curso "${newCourse.title}" creado correctamente`);
    navigate(`/course/${newCourse.id}`);
  } catch (error) {
    console.error(error);
    alert('Error al crear el curso');
  } finally {
    setIsSubmitting(false);
  }
};

    return (
        <div className="p-6">
            <header className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="p-2 mr-4">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Create Course</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-auto rounded-md" />
                            ) : (
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-light focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md">
                            <option>Science</option>
                            <option>Arts</option>
                            <option>Math</option>
                            <option>Commerce</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Lessons</h3>
                    <div className="space-y-4">
                        {lessons.map((lesson, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                                <input type="text" placeholder="Lesson Title" value={lesson.title || ''} onChange={e => handleLessonChange(index, 'title', e.target.value)} className="flex-grow border-gray-300 rounded-md focus:ring-primary focus:border-primary"/>
                                <input type="text" placeholder="Duration (e.g., 10 min)" value={lesson.duration || ''} onChange={e => handleLessonChange(index, 'duration', e.target.value)} className="w-36 border-gray-300 rounded-md focus:ring-primary focus:border-primary"/>
                                <button type="button" onClick={() => removeLesson(index)} className="text-red-500 font-bold text-xl px-2">&times;</button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addLesson} className="mt-2 text-sm font-medium text-primary hover:text-primary-light">
                        + Add Lesson
                    </button>
                </div>

                <div>
                    <PrimaryButton type="submit" isLoading={isSubmitting}>
                        {isSubmitting ? 'Creating Course...' : 'Create Course'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default CreateCoursePage;
