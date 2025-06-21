import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; 
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaPhone, FaCreditCard, FaChartPie,FaEnvelope, FaCalendarAlt, FaSpinner, FaCheckCircle, FaExclamationCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const DashboardPage = () => {
  const { t, i18n } = useTranslation(); 
  const { user, userToken, isAuthenticated } = useAuth(); 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || !userToken) {
        setLoading(false);
        setError(t('not_authorized_dashboard'));
        return;
      }

      try {
          const response = await axios.get(+import.meta.env.VITE_BACKEND_URL+'/api/users/me', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        console.error('Failed to fetch user data:', err.response?.data?.message || err.message);
        setError(err.response?.data?.message || t('failed_to_load_user_data'));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, userToken, t]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
        <p className="ml-4 text-xl text-gray-700 dark:text-gray-300">{t('loading_user_data')}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center text-red-600 dark:text-red-400">
        <FaExclamationCircle className="text-5xl mb-4" />
        <p className="text-xl">{error}</p>
        {!isAuthenticated && <Link to="/login" className="mt-4 text-blue-600 hover:underline">{t('login_to_view_dashboard')}</Link>}
      </div>
    );
  }

  if (!userData) {
      return (
          <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
              <FaExclamationCircle className="text-5xl mb-4" />
              <p className="text-xl">{t('no_user_data_available')}</p>
              {!isAuthenticated && <Link to="/login" className="mt-4 text-blue-600 hover:underline">{t('login_to_view_dashboard')}</Link>}
          </div>
      );
  }

  const tokensUsedPercentage = userData.monthlyTokenQuota > 0 ?
    Math.min(100, (userData.tokensConsumed / userData.monthlyTokenQuota) * 100) : 0;

  const subscriptionEndDate = userData.subscriptionEndDate ? 
    new Date(userData.subscriptionEndDate).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 
    t('not_applicable');

  return (
    <div className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-[calc(100vh-180px)]">
    
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700"
      >
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center mb-8 pb-6 border-b border-gray-200 dark:border-gray-700"
        >
            <div className="text-center sm:text-right" >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white capitalize">{userData.name}</h2>
                
            </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
                initial={{ opacity: 0, x: i18n.language === 'ar' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center p-3 md:p-5 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md transition-transform duration-300"
            >
                <FaEnvelope className="text-black dark:text-white text-2xl md:text-4xl mx-2 md:mx-4" />
                <div className="flex-grow text-right" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
                    <p className="text-sm md:text-xl font-semibold text-gray-800 dark:text-white break-all">{userData.email}</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: i18n.language === 'ar' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center p-3 md:p-5 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md transition-transform duration-300"
            >
                <FaPhone className="text-blue-600 dark:text-blue-400 text-2xl md:text-4xl mx-2 md:mx-4" />
                <div className="flex-grow text-right" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
                    <p className="text-sm md:text-xl font-semibold text-gray-800 dark:text-white">{userData.phone}</p>
                </div>
            </motion.div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
                initial={{ opacity: 0, x: i18n.language === 'ar' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center p-3 md:p-5 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md transition-transform duration-300"
            >
                <FaCreditCard className="text-green-600 dark:text-green-400 text-2xl md:text-4xl mx-2 md:mx-4" />
                <div className="flex-grow text-right" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t('subscription_status')}:</p>
                    <p className="text-sm md:text-xl font-semibold text-gray-800 dark:text-white break-all">{t(userData.subscriptionStatus)}</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: i18n.language === 'ar' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center p-3 md:p-5 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md transition-transform duration-300"
            >
                <FaCalendarAlt className="text-purple-600 dark:text-purple-400 text-2xl md:text-4xl mx-2 md:mx-4" />
                <div className="flex-grow text-right" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t('subscription_end_date')}:</p>
                    <p className="text-sm md:text-xl font-semibold text-gray-800 dark:text-white">{subscriptionEndDate}</p>
                </div>
            </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-5 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md"
        >
            <div className="flex items-center mb-3">
                <FaChartPie className="text-yellow-600 dark:text-yellow-400 text-4xl mx-4" />
                <div className="flex-grow text-right" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t('monthly_token_usage')}:</p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    </p>
                </div>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3">
                <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${tokensUsedPercentage}%` }}
                ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-right" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
                {tokensUsedPercentage.toFixed(2)}% {t('used')}
            </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm text-center"
        >
            {userData.isVerified ? (
                <p className="text-green-600 dark:text-green-400 font-semibold flex items-center justify-center gap-2">
                    <FaCheckCircle /> {t('account_verified')}
                </p>
            ) : (
                <p className="text-red-600 dark:text-red-400 font-semibold flex items-center justify-center gap-2">
                    <FaExclamationCircle /> {t('account_not_verified')}
                    <Link to="/verify-account" className="underline hover:no-underline flex items-center gap-1">
                        {t('verify_now')}
                        {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}
                    </Link>
                </p>
            )}
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-center"
        >
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                {t('upgrade_plan')}
            </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;