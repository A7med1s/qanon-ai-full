import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus, FaSun, FaMoon, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, logout } = useAuth(); 
  const navigate = useNavigate();

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('tools'), path: '/tools' },
    { name: t('contact_us'), path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); 
    navigate('/'); 
  };

  const sidebarVariants = {
    hidden: { x: '100%' }, 
    visible: { x: 0, transition: { type: 'tween', duration: 0.3 } },
    exit: { x: '100%', transition: { type: 'tween', duration: 0.3 } },
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-3 px-4 md:px-6 flex justify-between items-center z-20 relative transition-colors duration-300"> {/* تم تقليل الـ padding الرأسي py-3 */}
      <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white "
            style={{ direction: 'ltr' }}> 
        <span className="text-blue-600">Qanon</span>.ai
      </Link>

      <nav className="hidden md:block">
        <ul className="flex space-x-4 lg:space-x-6"> 
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mx-4 font-medium transition duration-300">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
          aria-label="Toggle dark/light mode"
        >
          {theme === 'dark' ? <FaSun className="text-yellow-500 text-xl" /> : <FaMoon className="text-gray-600 text-xl" />}
        </button>

        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
          aria-label="Toggle language"
        >
          {i18n.language === 'ar' ? <span className="font-bold">En</span> : <span className="font-bold">عربي</span>}
        </button>

        <div className="hidden md:flex items-center gap-3"> 
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center gap-1.5 text-sm"> {/* تقليل padding وحجم الخط */}
                <FaUserCircle /> {t('dashboard')}
              </Link>
              <button onClick={handleLogout} className="border border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-700 hover:text-red-700 font-bold py-2 px-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex items-center gap-1.5 text-sm"> {/* تقليل padding وحجم الخط */}
                <FaSignOutAlt /> {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center gap-1.5 text-sm"> {/* تقليل padding وحجم الخط */}
                <FaSignInAlt /> {t('login')}
              </Link>
              <Link to="/register" className="border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 font-bold py-2 px-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex items-center gap-1.5 text-sm"> {/* تقليل padding وحجم الخط */}
                <FaUserPlus /> {t('register')}
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 border-l-2 dark:border-white border-blue-400 shadow-lg p-6 md:hidden flex flex-col z-50 transform"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-end mb-8">
              <button
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-lg font-medium py-2 transition duration-300"
                  onClick={() => setIsMobileMenuOpen(false)} 
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 flex flex-col space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2">
                      <FaUserCircle /> {t('dashboard')}
                    </Link>
                    <button onClick={handleLogout} className="border border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-700 hover:text-red-700 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2">
                      <FaSignOutAlt /> {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2">
                      <FaSignInAlt /> {t('login')}
                    </Link>
                    <Link to="/register" className="border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2">
                      <FaUserPlus /> {t('register')}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;