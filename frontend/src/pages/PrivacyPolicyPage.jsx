import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PrivacyPolicyPage = () => {
 const { t, i18n } = useTranslation(); 

  return (
    <div className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-[calc(100vh-180px)]">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-8"
      >
        {t('privacy_policy_title')}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700"
      >
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('privacy_policy_intro')}
        </p>

        {/* Section 1: Information We Collect */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('info_collection_title')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('info_collection_desc')}
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          <li>{t('personal_data')}</li>
          <li>{t('usage_data')}</li>
          <li>{t('legal_document_data')}</li>
        </ul>

        {/* Section 2: How We Use Your Information */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('how_we_use_info_title')}
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          <li>{t('service_provision')}</li>
          <li>{t('service_improvement')}</li>
          <li>{t('security')}</li>
          <li>{t('communication')}</li>
          <li>{t('compliance')}</li>
        </ul>

        {/* Section 3: Data Sharing and Disclosure */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('data_sharing_title')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('data_sharing_desc')}
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          <li>{t('ai_providers_sharing')}</li>
          <li>{t('service_providers_sharing')}</li>
          {/* <li>{t('legal_requirements_sharing')}</li> */}
        </ul>

        {/* Section 4: Data Security */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('data_security_section_title')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('data_security_section_desc')}
        </p>

        {/* Section 5: Your Rights */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('your_rights_title')}
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          <li>{t('access_right')}</li>
          <li>{t('correction_right')}</li>
          <li>{t('deletion_right')}</li>
        </ul>

        {/* Section 6: Changes to This Privacy Policy */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('policy_changes_title')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('policy_changes_desc')}
        </p>

        {/* Section 7: Contact Us */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('contact_us_section_title')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('contact_us_section_desc')}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
          {t('email_address')}: qanon.ai12@gmail.com
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;