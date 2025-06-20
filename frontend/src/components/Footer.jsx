import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

const Footer = () => {
  const { t ,i18n } = useTranslation(); 

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white dark:border-t dark:border-white py-6 px-6 mt-auto transition-colors duration-300"> {/* إضافة dark mode colors */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}> {/* تحديد اتجاه النص */}
        <div className="text-lg font-bold">
          <span className="text-blue-400">Qanon</span>.ai
        </div>
        <nav className="my-4 md:my-0">
          <ul className="flex space-x-6">
            {/* <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition duration-300">{t('home')}</Link></li>  */}
            {/* <li><Link to="/tools" className="text-gray-300 hover:text-blue-400 transition duration-300">{t('tools')}</Link></li>  */}
            <li><Link to="/contact" className="text-gray-300 mx-4 hover:text-blue-400 transition duration-300">{t('contact_us')}</Link></li> 
            <li><Link to="/privacy-policy" className="text-gray-300 mx-4 hover:text-blue-400 transition duration-300">{t('privacy_policy_title')}</Link></li>
          </ul>
        </nav>
        <p className="text-sm text-gray-400 text-center md:text-right" style={{ textAlign: i18n.language === 'ar' ? 'right' : 'left' }}> 
          &copy; {new Date().getFullYear()}  {t('footer_rights_reserved')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;