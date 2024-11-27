import React, { useEffect, useState } from 'react';
import { fetchMetrics } from '../services/api';
import '../styles/Components.css';

const RightSection = () => {
  const [metrics, setMetrics] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setMetrics('Error fetching metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loading">Loading metrics...</div>
      ) : (
        <pre className="metrics-display">{metrics}</pre>
      )}
    </div>
  );
};

export default RightSection;
