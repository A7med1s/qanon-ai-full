import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaPaperclip, FaDownload, FaSpinner, FaCopy } from 'react-icons/fa';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext'; 
const CaseAnalysisPage = () => {
  const { t } = useTranslation();
  const [caseText, setCaseText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [outputFormat, setOutputFormat] = useState('text');
 const { userToken } = useAuth();

  useEffect(() => {
    setResult('');
    setSelectedFile(null);
    setCaseText('');
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userToken) {
        setResult(t('login_required_to_use_tool')); 
        return;
    }

    setLoading(true);
    setResult('');
    const formData = new FormData();

    const headers = {
    'Authorization': `Bearer ${userToken}`, 
};

    if (selectedFile) {
        formData.append('file', selectedFile);
    } else {
        formData.append('caseText', caseText);
    }
    formData.append('outputFormat', outputFormat);

    try {
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/case-analysis/analyze-case', formData, {
            headers: { ...headers },
            responseType: outputFormat === 'docx' ? 'blob' : 'json',
        });

        if (outputFormat === 'docx') {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `case_analysis_${Date.now()}.docx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            setResult(t('docx_generated_success'));
        } else {
            setResult(response.data.analysis || t('no_result_available'));
        }
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        setResult(`${t('error_occurred')}: ${error.response?.data?.message || error.message}`);
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
        {t('case_analysis')}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
      >
        {t('description_case_analysis')}
      </motion.p>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="caseText" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {t('enter_case_text')}
            </label>
            <textarea
              id="caseText"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 h-32 resize-y"
              placeholder={t('paste_case_placeholder')}
              value={caseText}
              onChange={(e) => setCaseText(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {t('or_upload_file')}
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="fileUpload"
                type="file"
                accept=".docx,.pdf,.txt"
                className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200 cursor-pointer"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  <FaPaperclip className="inline-block mx-1" /> {selectedFile.name}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {t('output_format')}
            </label>
            <select
              id="outputFormat"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              <option value="text">{t('plain_text')}</option>
              <option value="docx">{t('word_document')}</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mx-2" />
                {t('processing')}...
              </>
            ) : (
              <>
                <FaGavel className="mx-2" /> {t('analyze_case_button')}
              </>
            )}
          </button>
        </form>

        {result && outputFormat === 'text' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-inner"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {t('result_title')}:
            </h3>
            <div className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>
              {result}
            </div>
            <button
                onClick={() => { navigator.clipboard.writeText(result); alert(t('text_copied_alert')); }}
                className="mt-4 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white py-2 px-4 rounded-lg flex items-center gap-2 transition duration-200"
            >
                <FaCopy className="mr-2" /> {t('copy_text')}
            </button>
          </motion.div>
        )}
        {result && outputFormat === 'docx' && !loading && (
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
      </div>
    </div>
  );
};

export default CaseAnalysisPage;