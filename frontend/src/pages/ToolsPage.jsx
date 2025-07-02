import { FaRobot, FaFileAlt, FaHandshake, FaQuestion, FaExclamationTriangle, FaGavel } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ToolsPage = () => {
  const { t } = useTranslation();

  const tools = [
    {
      id: 1,
      name: t('case_analysis'),
      description: t('description_case_analysis'),
      icon: FaGavel,
      path: '/tools/case-analysis',
      isUnderDevelopment: false 
    },
    {
      id: 2,
      name: t('risk_analysis'),
      description: t('description_risk_analysis'),
      icon: FaExclamationTriangle,
      path: '/tools/risk-analysis',
      isUnderDevelopment: false
    },
    {
      id: 3,
      name: t('document_analysis'),
      description: t('description_document_analysis'),
      icon: FaFileAlt,
      path: '/tools/document-analysis',
      isUnderDevelopment: false 
    },
    {
      id: 4,
      name: t('contract_management'),
      description: t('description_contract_management'),
      icon: FaHandshake,
      path: '/tools/contract-management',
      isUnderDevelopment: false 
    },
    {
      id: 5,
      name: t('legal_qna'),
      description: t('description_legal_qna'),
      icon: FaQuestion,
      path: '/tools/legal-qna',
      isUnderDevelopment: false 
    },
    {
      id: 6,
      name: t('ai_assistant_title'),
      description: t('description_ai_assistant'),
      icon: FaRobot,
      path: '/chat-assistant',
      isUnderDevelopment: true 
    },
  ];

  return (
    <div className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-[calc(100vh-180px)]">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-12"
      >
        {t("legal_ai_tools")}
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 text-center transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-200 dark:border-gray-700"
          >
            <tool.icon className="text-blue-600 dark:text-blue-400 text-5xl mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{tool.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-md">{tool.description}</p>
            <div className='mt-6'>
              {tool.isUnderDevelopment ? (
                <button
                  className="bg-gray-400 dark:bg-gray-600 text-white font-bold py-2 px-6 rounded-full cursor-not-allowed"
                  disabled 
                >
                  {t("under_development")} 
                </button>
              ) : (
                <Link to={tool.path} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                  {t("go_to_tool")}
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;