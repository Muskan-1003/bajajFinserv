import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Numbers');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch('https://bajajfinserv-x1em.onrender.com/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const filterResponse = () => {
    if (!response) return null;

    // Mapping selectedFilter to match the response key
    const filterMap = {
      'Numbers': 'numbers',
      'Alphabets': 'alphabets',
      'Highest lowercase alphabet': 'highest_lowercase_alphabet',
    };

    const key = filterMap[selectedFilter];
    return { [selectedFilter]: response[key] };
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-6 font-sans">
      <div className="mb-4 relative">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="API Input"
        />
      </div>
      <button 
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {response && (
        <div className="mt-4">
          <div className="mb-4 relative">
            <div className="inline-block relative w-full">
              <select 
                value={selectedFilter} 
                onChange={handleFilterChange}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Numbers">Numbers</option>
                <option value="Alphabets">Alphabets</option>
                <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">Filtered Response</h3>
            {filterResponse() && Object.entries(filterResponse()).map(([key, value]) => (
              <div key={key} className="mb-1">
                <span className="font-medium">{key}:</span> {Array.isArray(value) ? value.join(', ') : value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;