const BASE_URL = 'http://localhost:8080/api/polls';

export const createPoll = async (poll) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(poll),
  });
  if (!response.ok) throw new Error('Failed to create poll');
  return response.json();
};

export const getPolls = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch polls');
  return response.json();
};

export const vote = async (pollId, optionIndex) => {
  const response = await fetch(`${BASE_URL}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pollId, optionIndex }),
  });
  if (!response.ok) throw new Error('Failed to vote');
};
