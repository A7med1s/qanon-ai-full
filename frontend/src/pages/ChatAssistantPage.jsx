import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperclip, FaPaperPlane, FaSpinner, FaRobot, FaUser, FaDownload, FaCopy, FaExclamationCircle } from 'react-icons/fa'; // تم إضافة FaExclamationCircle هنا
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useNavigate ,Link} from 'react-router-dom'; 

const ChatAssistantPage = () => {
  const { t, i18n, } = useTranslation();
  const { userToken, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]); 
  const [inputMessage, setInputMessage] = useState(''); 
  const [selectedFile, setSelectedFile] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [currentConversationId, setCurrentConversationId] = useState(null); 
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); 
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageToBackend = async () => {
    if (!inputMessage.trim() && !selectedFile) {
      alert(t('empty_message_error')); 
      return;
    }

    setLoading(true);
    setError(''); 

    const formData = new FormData();
    formData.append('conversationId', currentConversationId || '');
    formData.append('message', inputMessage);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('outputFormat', 'text'); 

    const headers = {
      'Authorization': `Bearer ${userToken}`,
    };

    const newUserMessage = {
      sender: 'user',
      content: inputMessage || (selectedFile ? selectedFile.name : ''),
      type: selectedFile ? 'file' : 'text',
      fileDetails: selectedFile ? { fileName: selectedFile.name, fileType: selectedFile.type } : undefined,
      timestamp: new Date().toISOString()
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    setInputMessage('');
    setSelectedFile(null);

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/chat/send-message', formData, {
        headers: { ...headers },
        responseType: 'json', 
      });

      const aiResponse = response.data;
      const newAiMessage = {
        sender: 'ai',
        content: aiResponse.message,
        type: aiResponse.responseType || 'text',
        toolResultDetails: aiResponse.toolResultDetails,
        fileDetails: aiResponse.fileDetails,
        timestamp: new Date().toISOString()
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
      setCurrentConversationId(aiResponse.conversation._id);

    } catch (error) {
      console.error('Error sending message:', error.response?.data || error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'ai',
          content: t('failed_to_process_request_chat'),
          type: 'text',
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault();
      sendMessageToBackend();
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDownloadFile = (fileUrl, fileName, fileType) => {
      if (fileUrl) {
          window.open(fileUrl, '_blank');
      } else {
          alert(t('download_not_implemented')); 
      }
  };

  if (!isAuthenticated && !loading) {
      return (
        <div className="min-h-[calc(100vh-180px)] flex items-center justify-center text-red-600 dark:text-red-400">
            <FaExclamationCircle className="text-5xl mb-4" />
            <p className="text-xl">{t('login_required_to_use_tool')}</p>
            <Link to="/login" className="mt-4 text-blue-600 hover:underline">{t('login_to_view_dashboard')}</Link>
        </div>
      );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
        <p className="ml-4 text-xl text-gray-700 dark:text-gray-300">{t('loading')}...</p>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-[calc(100vh-180px)] flex">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto flex flex-col h-[70vh] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="bg-blue-600 dark:bg-blue-800 text-white p-4 text-lg font-semibold flex justify-between items-center shadow-md">
          <span>{t('ai_assistant')}</span>
        </div>

        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
                }`}
              >
                <div className="flex items-center text-sm mb-1">
                  {msg.sender === 'user' ? <FaUser className="mr-1" /> : <FaRobot className="mr-1" />}
                  <span className="font-semibold">{msg.sender === 'user' ? t('you') : t('ai_assistant_short')}</span>
                  <span className="text-xs ml-auto opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {msg.type === 'text' && (
                  <p className="whitespace-pre-wrap" style={{ textAlign: msg.sender === 'user' ? 'left' : 'right' }}>{msg.content}</p>
                )}
                {msg.type === 'file' && (
                  <div className="bg-blue-100 dark:bg-blue-700 p-2 rounded-md flex items-center justify-between text-blue-800 dark:text-blue-200">
                    <FaPaperclip className="mr-2" />
                    <span>{msg.fileDetails?.fileName || t('attached_file')}</span>
                    {msg.fileDetails?.fileUrl && (
                      <button onClick={() => handleDownloadFile(msg.fileDetails.fileUrl, msg.fileDetails.fileName, msg.fileDetails.fileType)} className="ml-2 p-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-600">
                        <FaDownload />
                      </button>
                    )}
                  </div>
                )}
                {msg.type === 'tool_result' && (
                    <div className="bg-green-100 dark:bg-green-700 p-2 rounded-md text-green-800 dark:text-green-200">
                        <p className="font-semibold">{t('tool_result')}: {msg.toolResultDetails?.toolName || t('unknown_tool')}</p>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        {msg.fileDetails?.fileName && (
                          <button onClick={() => handleDownloadFile(msg.fileDetails.fileUrl, msg.fileDetails.fileName, msg.fileDetails.fileType)} className="mt-2 bg-blue-200 dark:bg-blue-600 hover:bg-blue-300 dark:hover:bg-blue-500 text-blue-800 dark:text-blue-100 py-1 px-2 rounded-md flex items-center gap-1">
                            <FaDownload /> {t('download_result')}
                          </button>
                        )}
                    </div>
                )}
              </motion.div>
            </div>
          ))}
          {loading && (
            <div className={`flex justify-start`} style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
                <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none">
                    <FaSpinner className="animate-spin text-xl" />
                    <span className="ml-2">{t('typing')}...</span>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} /> 
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex items-center gap-3">
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={handleFileChange}
            accept=".docx,.pdf,.txt,.jpg,.jpeg,.png" 
          />
          <label htmlFor="file-input" className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 cursor-pointer">
            <FaPaperclip className="text-xl" />
          </label>
          {selectedFile && (
            <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <FaPaperclip /> {selectedFile.name}
              <button onClick={() => setSelectedFile(null)} className="ml-1 text-red-500 hover:text-red-700">
                <FaTimes />
              </button>
            </span>
          )}
          <textarea
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden max-h-24"
            placeholder={t('type_your_message')}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          ></textarea>
          <button
            onClick={sendMessageToBackend}
            className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
            disabled={loading || (!inputMessage.trim() && !selectedFile)}
          >
            <FaPaperPlane className="text-xl" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatAssistantPage;