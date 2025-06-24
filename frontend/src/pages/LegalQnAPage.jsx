// frontend/src/pages/LegalQnAPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuestion, FaPaperPlane, FaSpinner, FaCopy, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LegalQnAPage = () => {

  const { t, i18n } = useTranslation();
  const { userToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();
const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [outputFormat, setOutputFormat] = useState('text');

  // توجيه المستخدم إذا لم يكن مسجل دخول
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // تنظيف الحالة عند تحميل المكون
  useEffect(() => {
    setAnswer('');
    setQuestion('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');
    setError(''); // تأكد من وجود state لـ error (يمكنك إضافتها: const [error, setError] = useState('');)

    if (!userToken) {
      setError(t('login_required_to_use_tool'));
      setLoading(false);
      return;
    }

    if (!question.trim()) {
      setError(t('empty_question_error')); // رسالة لو السؤال فاضي
      setLoading(false);
      return;
    }

    const headers = {
        'Authorization': `Bearer ${userToken}`,
    };

      const formData = new FormData();
  formData.append('question', question);
  formData.append('outputFormat', outputFormat);

  // **أضف هذا الجزء الجديد لـ Debugging FormData**
  console.log('DEBUG (Frontend - QnA): FormData content:');
  for (let pair of formData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]);
  }
  console.log('DEBUG (Frontend - QnA): Sending request to:', `http://localhost:5000/api/legal-qna/ask`);
  // **نهاية جزء Debugging FormData**

  try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+ `/api/legal-qna/ask`, formData, {
          headers: {
              'Authorization': `Bearer ${userToken}`,
          },
          responseType: outputFormat === 'docx' ? 'blob' : 'json',
      })
        if (outputFormat === 'docx') {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `legal_qna_answer_${Date.now()}.docx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            setAnswer(t('docx_generated_success')); 
        } else {
            setAnswer(response.data.answer || t('no_result_available'));
        }
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        setAnswer(`${t('error_occurred')}: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-[calc(100vh-180px)]">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-8"
      >
        {t('ask_question_title')}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
      >
        {t('description_legal_qna_simple')}
      </motion.p>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="questionInput" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {t('enter_your_question')}
            </label>
            <textarea
              id="questionInput"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 h-32 resize-y"
              placeholder={t('ask_question_placeholder')}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            disabled={loading || !question.trim()}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mx-2" />
                {t('processing')}...
              </>
            ) : (
              <>
                <FaQuestion className="mx-2" /> {t('ask_button')}
              </>
            )}
          </button>
        </form>

        {answer && outputFormat === 'text' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-inner"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {t('result_title')}:
            </h3>
            <div className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
              {answer}
            </div>
            <button
                onClick={() => { navigator.clipboard.writeText(answer); alert(t('text_copied_alert')); }}
                className="mt-4 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white py-2 px-4 rounded-lg flex items-center gap-2 transition duration-200"
            >
                <FaCopy className="mr-2" /> {t('copy_text')}
            </button>
          </motion.div>
        )}
        {answer && outputFormat === 'docx' && !loading && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-inner text-center"
            >
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">{t('docx_generated_success')}</p>
                <FaDownload className="text-blue-600 text-5xl mx-auto" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('docx_download_info')}</p>
            </motion.div>
        )}
        {error && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 bg-red-100 dark:bg-red-700 rounded-lg border border-red-200 dark:border-red-600 shadow-inner text-center text-red-800 dark:text-red-200"
            >
                <p className="text-lg font-semibold mb-2">{t('error_occurred')}:</p>
                <p className="text-base">{error}</p>
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default LegalQnAPage;