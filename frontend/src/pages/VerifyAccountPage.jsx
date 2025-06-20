import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

const VerifyAccountPage = () => {
  const { t } = useTranslation();
  const location = useLocation(); 
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
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

    if (!email || !verificationCode) {
      setError(t('please_enter_email_code')); 
      setLoading(false);
      return;
    }

    try {
        const res = await axios.post(import.meta.env.VITE_BACKEND_URL+ '/api/users/verify-account', { email, verificationCode });
  setMessage(res.data.message); 
  setVerificationCode('');
 
  setTimeout(() => window.location.assign('/login'), 3000);

    } catch (err) {
      console.error('Verification failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || t('verification_failed')); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-180px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('activate_your_account')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('enter_code_from_email')}
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
            <label htmlFor="code" className="sr-only">{t('verification_code')}</label>
            <input
              id="code"
              name="code"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700"
              placeholder={t('verification_code_placeholder')}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
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
              <>{t('activate_account_button')}</>
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
  );
};

export default VerifyAccountPage;