import React, { useEffect } from 'react'; 
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from './context/AuthContext'; 

// import HomePageContent from './components/HomePageContent';
import Accordion from './components/Accordion';
import ToolsPage from './pages/ToolsPage';
import ChatAssistantPage from './pages/ChatAssistantPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyAccountPage from './pages/VerifyAccountPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; 
import ResetPasswordPage from './pages/ResetPasswordPage'; 
import ContactPage from './pages/ContactPage';
import DocumentAnalysisPage from './pages/DocumentAnalysisPage';
import ContractManagementPage from './pages/ContractManagementPage';
import RiskAnalysisPage from './pages/RiskAnalysisPage';
import CaseAnalysisPage from './pages/CaseAnalysisPage';
import LegalQnAPage from './pages/LegalQnAPage'; 
import NotFoundPage from './pages/NotFoundPage'; 
import DashboardPage from './pages/DashboardPage'; 
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ScrollToTop from './components/ScrollToTop';
function App() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuth(); 
  
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
       
          <Route path="/" element={
            <>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl lg:text-5xl mt-32 font-extrabold text-center text-gray-800 dark:text-white mb-8"
              >
                {t('slogan')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
              >
                {t('slogan_extended')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-center mt-8 mb-32 flex justify-center gap-4"
              >
                  {!isAuthenticated && ( 
                      <Link to="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl text-lg flex items-center gap-2 py-2 px-5 md:py-3 md:px-6 text-sm">
                          <FaSignInAlt className="text-base md:text-lg" /> {t('login')}
                      </Link>
                  )}

                  {!isAuthenticated && (
                      <Link to="/register" className="inline-block border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl text-lg flex items-center gap-2 py-2 px-5 md:py-3 md:px-6 text-sm">
                          <FaUserPlus className="text-base md:text-lg" /> {t('register')}
                      </Link>
                  )}

                  {isAuthenticated && (
                      <Link to="/tools" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl text-lg">
                          {t('discover_tools')}
                      </Link>
                  )}
              </motion.div>
              <div class="w-full h-px my-8 bg-blue-600 dark:bg-white"></div>
              <Accordion/>
            </>
          } />

          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/document-analysis" element={<DocumentAnalysisPage />} />
          <Route path="/tools/contract-management" element={<ContractManagementPage />} />
          <Route path="/tools/risk-analysis" element={<RiskAnalysisPage />} />
          <Route path="/tools/case-analysis" element={<CaseAnalysisPage />} />
          <Route path="/tools/legal-qna" element={<LegalQnAPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-account" element={<VerifyAccountPage />} /> 
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
<Route path="/reset-password" element={<ResetPasswordPage />} />   
<Route path="/dashboard" element={<DashboardPage />} /> 
<Route path="/chat-assistant" element={<ChatAssistantPage />} />
<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;