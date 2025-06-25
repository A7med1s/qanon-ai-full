import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaUnlockAlt, FaEye, FaEyeSlash, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import ErrorBoundary from '../components/ErrorBoundary';
const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] =useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromParams = params.get('email');
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    if (newPassword !== confirmNewPassword) {
      setError(t('passwords_do_not_match'));
      setLoading(false);
      return;
    }

      try {
    const res = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/users/reset-password', { email, resetCode, newPassword });
    setMessage(res.data.message);
    console.error('Password reset failed:', err.response?.data || err.message);
    setError(err.response?.data?.message || t('password_reset_failed'));
  } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>    <div className="flex items-center justify-center min-h-[calc(100vh-180px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('reset_password_title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('enter_reset_code_and_new_password')}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">{t('email')}</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700"
              placeholder={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="resetCode" className="sr-only">{t('reset_code')}</label>
            <input
              id="resetCode"
              name="resetCode"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700"
              placeholder={t('reset_code_placeholder')}
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="newPassword" className="sr-only">{t('new_password')}</label>
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700 pr-10"
              placeholder={t('new_password')}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400 focus:outline-none"
              aria-label={showNewPassword ? t('hide_password') : t('show_password')}
            >
              {showNewPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>
          <div className="relative">
            <label htmlFor="confirmNewPassword" className="sr-only">{t('confirm_new_password')}</label>
            <input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type={showConfirmNewPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700 pr-10"
              placeholder={t('confirm_new_password')}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400 focus:outline-none"
              aria-label={showConfirmNewPassword ? t('hide_password') : t('show_password')}
            >
              {showConfirmNewPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <> <FaSpinner className="animate-spin mx-2" /> {t('processing')}... </>
            ) : (
              <> <FaUnlockAlt className="h-5 w-5 mr-2" /> {t('reset_password_button')} </>
            )}
          </button>
        </form>

        {message && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center flex items-center justify-center gap-2">
            <FaCheckCircle /> {message}
          </motion.div>
        )}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center flex items-center justify-center gap-2">
            <FaExclamationCircle /> {error}
          </motion.div>
        )}
      </div>
    </div>
    </ErrorBoundary>

  );
};

export default ResetPasswordPage;