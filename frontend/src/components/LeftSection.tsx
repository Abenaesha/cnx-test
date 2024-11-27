import React, { useEffect, useState, useCallback } from 'react';
import { fetchServerTime } from '../services/api';
import '../styles/Components.css';

const LeftSection = () => {
  const [serverTime, setServerTime] = useState<number | null>(null);
  const [timeDiff, setTimeDiff] = useState<string>('00:00:00');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchServerTime();
      setServerTime(data.epoch);
    } catch (error) {
      console.error('Error fetching server time:', error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (serverTime === null) return;

    const updateTimeDiff = () => {
      const diff = Math.floor(Date.now() / 1000) - serverTime;
      const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const seconds = String(diff % 60).padStart(2, '0');
      setTimeDiff(`${hours}:${minutes}:${seconds}`);
    };

    updateTimeDiff();
    const timeDiffInterval = setInterval(updateTimeDiff, 1000);

    return () => clearInterval(timeDiffInterval);
  }, [serverTime]);

  useEffect(() => {
    fetchData();
    const fetchInterval = setInterval(fetchData, 30000);

    return () => clearInterval(fetchInterval);
  }, [fetchData]);

  return (
    <div className='container'>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="time-container">
          <div className="data-row">
            <h2>Server Time</h2>
            <p className="data-value">{serverTime}</p>
          </div>
          <div className="data-row">
            <h2>Time Difference</h2>
            <p className="data-value">{timeDiff}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSection;
