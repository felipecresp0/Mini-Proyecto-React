
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

import OnboardingPage from './pages/OnboardingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import CreateCoursePage from './pages/CreateCoursePage';

import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <HashRouter>
            <Main />
          </HashRouter>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  console.log('location.pathname =>', location.pathname);


  const authRoutes = ['/', '/signup', '/signin'];
  const showBottomNav = user && !authRoutes.includes(location.pathname);

  return (
    <div className="bg-light-bg min-h-screen font-sans">
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-lg pb-24">
        {/*<Routes>
          <Route path="/" element={!user ? <OnboardingPage /> : <Navigate to="/home" />} />
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/home" />} />
          <Route path="/signin" element={!user ? <SignInPage /> : <Navigate to="/home" />} />
          
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/course/:id" element={<ProtectedRoute><CourseDetailPage /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/create-course" element={<ProtectedRoute><CreateCoursePage /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
        </Routes>*/}
        <Routes>
  <Route path="/" element={<Navigate to="/home" />} />

  {/* Puedes comentar/signup/signin mientras pruebas */}
  {/* <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/home" />} /> */}
  {/* <Route path="/signin" element={!user ? <SignInPage /> : <Navigate to="/home" />} /> */}
  
  <Route path="/home" element={<HomePage />} />
  <Route path="/course/:id" element={<CourseDetailPage />} />
  {/* resto igual o comentado mientras pruebas */}
</Routes>
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};


export default App;
