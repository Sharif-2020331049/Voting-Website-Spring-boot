import React, { useState } from 'react';
import { vote } from '../api';

const PollList = ({ polls, setPolls }) => {
  const [voting, setVoting] = useState(null);

  const handleVote = async (pollId, optionIndex) => {
    setVoting(`${pollId}-${optionIndex}`);
    try {
      await vote(pollId, optionIndex);
      // Update local state to reflect the vote
      const updatedPolls = polls.map(poll => {
        if (poll.id === pollId) {
          const newOptions = [...poll.options];
          newOptions[optionIndex].voteCount += 1;
          return { ...poll, options: newOptions };
        }
        return poll;
      });
      setPolls(updatedPolls);
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to submit vote. Please try again.');
    } finally {
      setVoting(null);
    }
  };

  const getTotalVotes = (options) => {
    return options.reduce((total, option) => total + (option.voteCount || 0), 0);
  };

  if (!polls || polls.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-lg">No polls available yet.</p>
        <p className="text-sm mt-1">Be the first to create one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
        Active Polls
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {polls.map((poll) => {
          const totalVotes = getTotalVotes(poll.options);
          
          return (
            <div key={poll.id} className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-gray-600 transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-white line-clamp-2">
                {poll.question}
              </h3>
              
              <div className="space-y-3">
                {poll.options.map((option, index) => {
                  const percentage = totalVotes > 0 
                    ? Math.round((option.voteCount / totalVotes) * 100) 
                    : 0;
                  
                  const isVoting = voting === `${poll.id}-${index}`;

                  return (
                    <button
                      key={index}
                      onClick={() => handleVote(poll.id, index)}
                      disabled={voting !== null}
                      className="w-full relative overflow-hidden group text-left p-3 rounded-lg border border-gray-600 hover:border-blue-500 bg-gray-900 transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {/* Progress bar background */}
                      <div 
                        className="absolute inset-0 bg-blue-500/20 transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                      
                      <div className="relative flex justify-between items-center z-10">
                        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          {option.optionText}
                        </span>
                        <div className="flex items-center gap-3">
                          {isVoting && (
                            <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                          )}
                          <span className="text-sm font-semibold text-gray-400">
                            {percentage}% <span className="text-xs font-normal opacity-70">({option.voteCount})</span>
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 text-sm text-gray-500 text-right">
                Total votes: {totalVotes}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollList;
