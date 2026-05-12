import { useState, useEffect } from 'react';
import CreatePoll from './components/CreatePoll';
import PollList from './components/PollList';
import { getPolls } from './api';

function App() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPolls = async () => {
    try {
      setLoading(true);
      const data = await getPolls();
      setPolls(data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch polls:', err);
      setError('Could not connect to the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handlePollCreated = (newPoll) => {
    setPolls([...polls, newPoll]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
            VoteChain
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Create polls, cast your vote, and see the results in real-time.
          </p>
        </header>

        <main className="space-y-16">
          <section>
            <CreatePoll onPollCreated={handlePollCreated} />
          </section>

          <section>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-medium text-red-400 mb-2">Connection Error</h3>
                <p className="text-red-300/80 mb-4">{error}</p>
                <button 
                  onClick={fetchPolls}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <PollList polls={polls} setPolls={setPolls} />
            )}
          </section>
        </main>
        
        <footer className="text-center pt-12 pb-6 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} VoteChain. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}

export default App;
