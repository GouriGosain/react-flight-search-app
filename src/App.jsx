import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [iata, setIata] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = '19ed3570c5b566e84a6ecfb031339974'; // 🔑 Replace with your aviationstack API key

  const handleSearch = async () => {
    if (!iata) return;
    setLoading(true);
    try {
      const response = await axios.get('https://api.aviationstack.com/v1/flights', {
        params: {
          access_key: API_KEY,
          dep_iata: iata.toUpperCase(),
          limit: 10,
        },
      });
      setFlights(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch flights:', error);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Flight Search</h1>
      <div className="search-box">

      
      <input
        type="text"
        placeholder="Enter IATA Code (e.g. JFK)"
        value={iata}
        onChange={(e) => setIata(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading flights...</p>}

      {flights.length > 0 && (
        <ul>
          {flights.map((flight, idx) => (
            <li key={idx}>
              <strong>{flight.airline.name}</strong> — {flight.flight.iata}
              <br />
              {flight.departure.iata} ➡ {flight.arrival.iata}
              <br />
              Status: {flight.flight_status}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
