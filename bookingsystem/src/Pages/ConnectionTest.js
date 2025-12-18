import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const ConnectionTest = () => {
  const [status, setStatus] = useState({
    backend: 'checking...',
    database: 'checking...',
    message: ''
  });

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setStatus({
      backend: 'Testing...',
      database: 'Testing...',
      message: 'Checking connection...'
    });
    
    try {
      const result = await api.testConnection();
      console.log('Connection test result:', result);
      
      setStatus({
        backend: result.status === 'success' ? '✅ Connected' : '❌ Failed',
        database: '✅ Connected (if backend shows DB success)',
        message: `${result.message} (${result.timestamp})`
      });
    } catch (error) {
      console.error('Connection test error:', error);
      setStatus({
        backend: '❌ Not Connected',
        database: '❌ Cannot check',
        message: `Error: ${error.message}. Make sure backend is running on http://localhost:5000`
      });
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Connection Status</h1>
      <div style={{ background: '#f9fafb', padding: '2rem', borderRadius: '12px', marginTop: '2rem' }}>
        <p><strong>Backend API:</strong> {status.backend}</p>
        <p><strong>Database:</strong> {status.database}</p>
        <p><strong>Message:</strong> {status.message}</p>
        <button 
          onClick={testConnection}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Test Again
        </button>
      </div>
      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <h3>To start backend:</h3>
        <code style={{ background: '#f3f4f6', padding: '0.5rem', display: 'block', borderRadius: '4px' }}>
          cd backend && npm start
        </code>
      </div>
    </div>
  );
};

export default ConnectionTest;