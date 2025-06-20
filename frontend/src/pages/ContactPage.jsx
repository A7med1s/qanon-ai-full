import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaQuestionCircle, FaDollarSign, FaInfoCircle } from 'react-icons/fa'; // أيقونات جديدة
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const ContactPage = () => {
  const { t } = useTranslation();

  const contactInfo = [
    { icon: FaPhone, label: t('phone_for_calls'), value: '+201119821401', link: 'tel:+201119821401' },
    { icon: FaWhatsapp, label: t('whatsapp'), value: '+201090370836', link: 'https://wa.me/201090370836' },
    { icon: FaEnvelope, label: t('email_address'), value: 'qanon.ai12@gmail.com', link: 'mailto:qanon.ai12@gmail.com' },
  ];

  const inquiryTypes = [
    { icon: FaQuestionCircle, title: t('general_inquiries'), description: t('general_inquiries_desc') },
    { icon: FaDollarSign, title: t('subscription_inquiries'), description: t('subscription_inquiries_desc') },
    { icon: FaInfoCircle, title: t('technical_issues'), description: t('technical_issues_desc') },
  ];

  return (
    <div className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-[calc(100vh-180px)]">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-12"
      >
        {t('contact_us_page_title')}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
      >
        {t('contact_page_slogan_extended')} 
      </motion.p>

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 border-b pb-4 border-gray-200 dark:border-gray-700"
        >
          {t('reach_us_directly')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md transform hover:scale-102 transition-transform duration-300 ease-in-out text-center"
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-200">
                <item.icon className="text-5xl mb-3" />
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{item.label}</p>
                <p className="text-md text-gray-600 dark:text-gray-300">{item.value}</p>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 border-b pb-4 border-gray-200 dark:border-gray-700"
        >
          {t('inquiry_types_title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inquiryTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md text-center"
            >
              <type.icon className="text-blue-600 dark:text-blue-400 text-5xl mb-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{type.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{type.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;