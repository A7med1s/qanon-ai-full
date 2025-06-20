import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { t , i18n} = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 
  const { register, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [agreedToTerms, setAgreedToTerms] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tools');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (password !== confirmPassword) {
      setError(t('passwords_do_not_match'));
      return;
    }
     if (!agreedToTerms) {
    setError(t('agree_to_terms_required')); 
    return;
  }


const success = await register(name, email,phone, password);
if (success) {
  console.log('Register successful, redirecting to verification.');
  navigate(`/verify-account?email=${encodeURIComponent(email)}`); 
} else {
  setError(t('register_failed_message'));
}
};

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-180px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('create_new_account')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('or')} <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">{t('login_to_your_account')}</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                {t('name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700"
                placeholder={t('name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                {t('email')}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700"
                placeholder={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
  <label htmlFor="phone-number" className="sr-only">
    {t('phone_number')} 
  </label>
  <input
    id="phone-number"
    name="phone"
    type="number"
    autoComplete="tel"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700"
    placeholder={t('phone_number')}
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
</div>
            <div className="relative">
  <label htmlFor="password" className="sr-only">
    {t('password')}
  </label>
  <input
    id="password"
    name="password"
    type={showPassword ? 'text' : 'password'}
    autoComplete="new-password"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700 pr-10"
    placeholder={t('password')}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400 focus:outline-none"
    aria-label={showPassword ? t('hide_password') : t('show_password')}
  >
    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
  </button>
</div>
           <div className="relative">
  <label htmlFor="confirm-password" className="sr-only">
    {t('confirm_password')}
  </label>
  <input
    id="confirm-password"
    name="confirm-password"
    type={showConfirmPassword ? 'text' : 'password'} 
    autoComplete="new-password"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50 dark:bg-gray-700 pr-10" // أضف pr-10
    placeholder={t('confirm_password')}
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400 focus:outline-none"
    aria-label={showConfirmPassword ? t('hide_password') : t('show_password')}
  >
    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
  </button>
</div>
          </div>
<div className="flex items-center mt-4">
  <input
    id="agree-to-terms"
    name="agree-to-terms"
    type="checkbox"
    required 
    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 mx-1"
    checked={agreedToTerms}
    onChange={(e) => setAgreedToTerms(e.target.checked)}
  />
  <label htmlFor="agree-to-terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
    {t('i_agree_to')}
    <Link to="/privacy-policy" className="font-medium text-blue-600 hover:text-blue-500 mr-1 ml-1">
      {t('terms_and_conditions')}
    </Link>
    {t('and')}
    <Link to="/privacy-policy" className="font-medium text-blue-600 hover:text-blue-500 mr-1 ml-1">
      {t('privacy_policy_title')}
    </Link>
    .
  </label>
</div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed" // أضف disabled styles
  disabled={!agreedToTerms} 
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaUserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
              </span>
              {t('register')}
            </button>
          </div>
        </form>
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;