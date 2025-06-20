import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const HomePageContent = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl lg:text-5xl font-extrabold text-center text-gray-800 dark:text-white mt-12 mb-8"
      >
        {t('slogan')}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
      >
        {t('app_name')} {t('slogan_extended')}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center mt-8 flex justify-center gap-4"
      >
          {!isAuthenticated && (
              <Link to="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl text-lg flex items-center gap-2">
                  <FaSignInAlt className="text-xl" /> {t('login')}
              </Link>
          )}
          {!isAuthenticated && (
              <Link to="/register" className="inline-block border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl text-lg flex items-center gap-2">
                  <FaUserPlus className="text-xl" /> {t('register')}
              </Link>
          )}
          {isAuthenticated && (
              <Link to="/tools" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl text-lg">
                  {t('discover_tools')}
              </Link>
          )}
      </motion.div>
    </>
  );
};

export default HomePageContent;