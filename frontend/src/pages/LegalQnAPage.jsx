import React from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const LegalQnAPage = () => {
  const { t } = useTranslation();

  return (
    <div className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-[calc(100vh-180px)] flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-8"
      >
        {t('legal_qna')}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700 max-w-lg mx-auto"
      >
        <FaQuestionCircle className="text-blue-600 dark:text-blue-400 text-6xl mb-4 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
          {t('tool_under_development')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
          {t('tool_under_development_desc')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('tool_under_development_eta')}
        </p>
      </motion.div>
    </div>
  );
};

export default LegalQnAPage;