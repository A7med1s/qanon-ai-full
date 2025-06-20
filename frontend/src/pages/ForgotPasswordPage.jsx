import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaSpinner } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate(); 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/users/forgot-password', { email });
      setMessage(res.data.message);
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error('Forgot password failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || t('forgot_password_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-180px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('forgot_password_title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('enter_email_for_reset')}
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
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700"
              placeholder={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <> <FaSpinner className="animate-spin mx-2" /> {t('processing')}... </>
            ) : (
              <> <FaEnvelope className="h-5 w-5 mr-2" /> {t('send_reset_code')} </>
            )}
          </button>
        </form>

        {message && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
            {message} <Link to={`/reset-password?email=${encodeURIComponent(email)}`} className="font-medium text-blue-600 hover:text-blue-500">{t('enter_reset_code_page')}</Link>
          </motion.div>
        )}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;