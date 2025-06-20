import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const AccordionItem = ({ title, content, isOpen, toggleAccordion, delay }) => {
  const { i18n } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="mb-4 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      <button
        className="flex justify-between items-center w-full p-5 text-lg font-semibold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        onClick={toggleAccordion}
        style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />}
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-5 text-gray-700 dark:text-gray-300"
            style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Accordion = () => {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState(null); 

  const toggleAccordion = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    {
      question: t('why_qanon_ai_q'),
      answer: t('why_qanon_ai_a'),
    },
    {
      question: t('what_are_ai_tools_q'),
      answer: t('what_are_ai_tools_a'),
    },
    {
      question: t('data_security_q'),
      answer: t('data_security_a'),
    },
    {
      question: t('how_to_subscribe_q'),
      answer: t('how_to_subscribe_a'),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-12"
      >
        {t('frequently_asked_questions')}
      </motion.h2>

      {faqItems.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.question}
          content={item.answer}
          isOpen={openItem === index}
          toggleAccordion={() => toggleAccordion(index)}
          delay={0.2 + index * 0.1}
        />
      ))}
    </div>
  );
};

export default Accordion;