const asyncHandler = require('express-async-handler');
const { chatModel } = require('../config/aiConfig');
const User = require('../models/User');


const askLegalQuestion = asyncHandler(async (req, res) => {
    const { question } = req.body; 

    if (!question) {
        res.status(400);
        throw new Error('Please provide a legal question.');
    }

    const prompt = `
    أنت خبير قانوني متخصص في القانون المصري ومساعد ذكاء اصطناعي.
    أجب على السؤال القانوني التالي بدقة ووضوح بناءً على معرفتك بالقانون المصري.
    إذا لم تكن الإجابة ضمن معرفتك أو إذا كان السؤال غير قانوني/أخلاقي، اذكر ذلك بوضوح واعتذر عن الإجابة.
    قدم إجابة شاملة ومفصلة قدر الإمكان.

    السؤال: "${question}"

    الإجابة:
    `;

    try {
        const response = await chatModel.invoke(prompt);
        const generatedAnswer = response.content;

        if (req.user) {
            const estimatedTokens = question.length / 4 + generatedAnswer.length / 4;
            req.user.tokensConsumed += Math.ceil(estimatedTokens);
            await req.user.save();
        }

        res.json({ answer: generatedAnswer });

    } catch (error) {
        console.error('Error asking legal question:', error.message);
        res.status(500).json({ message: 'Failed to process your legal question.', error: error.message });
    }
});

module.exports = {
    askLegalQuestion,
};