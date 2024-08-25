import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(['Numbers']);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch('YOUR_API_ENDPOINT', {
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

    let filteredData = {};
    if (selectedFilters.includes('Numbers')) filteredData.Numbers = response.numbers;
    if (selectedFilters.includes('Alphabets')) filteredData.Alphabets = response.alphabets;
    if (selectedFilters.includes('Highest lowercase alphabet')) 
      filteredData['Highest lowercase alphabet'] = response.highest_lowercase_alphabet;

    return filteredData;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <div className="mb-6 relative">
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-2 pt-6 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder=" "
        />
        <label className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white text-slate-400 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
          API Input
        </label>
      </div>
      <button 
        onClick={handleSubmit}
        className="w-full mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {response && (
        <div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Multi Filter</label>
            <select 
              multiple 
              value={selectedFilters} 
              onChange={(e) => setSelectedFilters(Array.from(e.target.selectedOptions, option => option.value))}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Numbers">Numbers</option>
              <option value="Alphabets">Alphabets</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
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
