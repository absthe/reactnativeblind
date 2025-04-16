import React, { useState } from 'react';
import './styles/Quiz.css';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setQuizData([]);
    setCurrent(0);
    setError('');
    setSelected(null);
    setScore(0);
    setAnswers([]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://138d-2402-3a80-469-f421-8e8-5c45-ce1c-fa5a.ngrok-free.app/quiz', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('API Response:', data);

      const questions = data.questions || data.quiz;
      if (!Array.isArray(questions)) {
        setError('❌ Invalid quiz format from server.');
        return;
      }

      const filtered = questions.filter(q =>
        q.question &&
        q.correct_answer &&
        typeof q.correct_answer.key === 'string' &&
        typeof q.correct_answer.value === 'string' &&
        q.options &&
        Object.keys(q.options).length >= 2
      );

      if (filtered.length === 0) {
        setError('❌ No complete questions with at least 2 options found.');
      } else {
        setQuizData(filtered);
      }
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch quiz.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (optionKey) => {
    if (selected) return;
    setSelected(optionKey);

    const correctKey = quizData[current]?.correct_answer?.key;
    const correctText = quizData[current]?.correct_answer?.value;
    const selectedText = quizData[current]?.options[optionKey];
    const isCorrect = optionKey === correctKey;

    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => [
      ...prev,
      {
        question: quizData[current].question,
        correctAnswer: correctText,
        selectedAnswer: selectedText,
        isCorrect,
      },
    ]);

    setTimeout(() => {
      setSelected(null);
      setCurrent((prev) => prev + 1);
    }, 1200);
  };

  const getOptionClass = (optionKey) => {
    const correct = quizData[current]?.correct_answer?.key;
    if (!selected) return '';
    if (optionKey === correct) return 'correct';
    if (optionKey === selected) return 'incorrect';
    return 'dim';
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Upload PDF to Generate Quiz</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button className="quiz-upload-btn" onClick={handleUpload} disabled={!file || loading}>
        {loading ? 'Loading Quiz...' : 'Generate Quiz'}
      </button>

      {error && <div className="quiz-error">❌ {error}</div>}

      {!loading && quizData.length > 0 && current < quizData.length && (
        <div className="quiz-card">
          <div className="question">{quizData[current].question}</div>
          <div className="data">{quizData[current].data}</div>
          <div className="options">
            {quizData[current].options &&
              Object.entries(quizData[current].options).map(([key, value]) => (
                <button
                  key={key}
                  className={`option ${getOptionClass(key)}`}
                  onClick={() => handleOptionClick(key)}
                >
                  {value}
                </button>
              ))}
          </div>
        </div>
      )}

      {!loading && quizData.length > 0 && current >= quizData.length && (
        <div className="quiz-results">
          <h2>✅ Quiz Completed!</h2>
          <h3>
            Your Score: {score} / {quizData.length}
          </h3>
          <div className="quiz-review">
            {answers.map((item, index) => (
              <div key={index} className="review-card">
                <p><strong>Q{index + 1}:</strong> {item.question}</p>
                <p>
                  <span className="correct-label">✔ Correct Answer:</span> {item.correctAnswer}
                </p>
                <p className={item.isCorrect ? 'correct' : 'incorrect'}>
                  Your Answer: {item.selectedAnswer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
