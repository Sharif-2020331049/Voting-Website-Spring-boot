import React, { useState } from 'react';
import { createPoll } from '../api';

const CreatePoll = ({ onPollCreated }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ optionText: '' }, { optionText: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].optionText = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { optionText: '' }]);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Filter out empty options
    const validOptions = options.filter(opt => opt.optionText.trim() !== '');
    if (validOptions.length < 2) {
      setError('Please provide at least 2 options.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const pollData = {
        question,
        options: validOptions.map(opt => ({ optionText: opt.optionText, voteCount: 0 }))
      };
      const newPoll = await createPoll(pollData);
      onPollCreated(newPoll);
      setQuestion('');
      setOptions([{ optionText: '' }, { optionText: '' }]);
    } catch (err) {
      setError('Failed to create poll. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 w-full max-w-2xl mx-auto mb-10 transition-all hover:shadow-purple-500/10">
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Create a New Poll
      </h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What's your favorite programming language?"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={option.optionText}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  aria-label="Remove option"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={addOption}
            className="px-5 py-2.5 rounded-lg font-medium text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 transition-colors duration-200"
          >
            + Add Option
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-5 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 transition-all duration-200"
          >
            {loading ? 'Creating...' : 'Create Poll'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
