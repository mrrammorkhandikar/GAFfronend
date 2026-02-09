"use client";

import React, { useState, useEffect } from 'react';
import SiteApiService from '../services/site-api';

export default function DebugPage() {
  const [config, setConfig] = useState({
    apiUrl: '',
    nodeEnv: '',
  });
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualEndpoint, setManualEndpoint] = useState('/api/health');

  useEffect(() => {
    // Capture environment variables available on the client
    setConfig({
      apiUrl: process.env.NEXT_PUBLIC_API_URL || '(Not Set)',
      nodeEnv: process.env.NODE_ENV || '(Not Set)',
    });
  }, []);

  const handleTestConnection = async () => {
    setLoading(true);
    setTestResult(null);
    try {
      const startTime = Date.now();
      // We use SiteApiService to test generic connectivity, but we can also do a direct fetch
      // Let's do a direct fetch first to test the raw URL
      const url = `${process.env.NEXT_PUBLIC_API_URL || ''}${manualEndpoint}`;
      
      console.log(`Testing connection to: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      setTestResult({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        duration: `${duration}ms`,
        url: url,
        data: data,
        headers: Object.fromEntries([...response.headers]),
      });

    } catch (error) {
      setTestResult({
        success: false,
        error: error.message,
        details: error.toString(),
        hint: error.message.includes('Failed to fetch') ? 'Possible CORS issue or Backend is down' : 'Unknown Error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 font-sans max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Deployment Debug Dashboard</h1>

      <div className="bg-gray-100 p-4 rounded mb-6 border border-gray-300">
        <h2 className="font-semibold mb-2">Client-Side Environment Config</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-mono text-sm text-gray-600">NEXT_PUBLIC_API_URL:</span>
            <div className="font-mono font-bold bg-white p-2 rounded border break-all">
              {config.apiUrl}
            </div>
          </div>
          <div>
            <span className="font-mono text-sm text-gray-600">NODE_ENV:</span>
            <div className="font-mono font-bold bg-white p-2 rounded border">
              {config.nodeEnv}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded border border-gray-300 shadow-sm mb-6">
        <h2 className="font-semibold mb-4">Connectivity Test</h2>
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            value={manualEndpoint}
            onChange={(e) => setManualEndpoint(e.target.value)}
            className="flex-1 p-2 border rounded font-mono text-sm"
            placeholder="/api/health"
          />
          <button 
            onClick={handleTestConnection}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </button>
        </div>

        {testResult && (
          <div className={`p-4 rounded border ${testResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`font-bold ${testResult.success ? 'text-green-700' : 'text-red-700'}`}>
                {testResult.success ? 'SUCCESS' : 'FAILED'}
              </span>
              {testResult.status && (
                <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                  Status: {testResult.status} ({testResult.statusText})
                </span>
              )}
              {testResult.duration && (
                <span className="text-sm text-gray-500">
                  Time: {testResult.duration}
                </span>
              )}
            </div>
            
            <div className="mb-2">
              <span className="text-xs font-bold uppercase text-gray-500">Requested URL:</span>
              <div className="font-mono text-xs break-all">{testResult.url}</div>
            </div>

            {testResult.error && (
              <div className="mb-2">
                 <span className="text-xs font-bold uppercase text-gray-500">Error:</span>
                 <div className="text-red-600 font-mono text-sm">{testResult.error}</div>
                 {testResult.hint && <div className="text-orange-600 text-sm mt-1">💡 {testResult.hint}</div>}
              </div>
            )}

            {testResult.data && (
              <div className="mt-2">
                <span className="text-xs font-bold uppercase text-gray-500">Response Body:</span>
                <pre className="bg-white p-2 rounded border text-xs overflow-auto max-h-60 mt-1">
                  {typeof testResult.data === 'object' 
                    ? JSON.stringify(testResult.data, null, 2) 
                    : testResult.data}
                </pre>
              </div>
            )}
            
            {testResult.headers && (
               <div className="mt-2">
                <details>
                  <summary className="text-xs font-bold uppercase text-gray-500 cursor-pointer">Response Headers (Click to expand)</summary>
                  <pre className="bg-white p-2 rounded border text-xs overflow-auto max-h-40 mt-1">
                    {JSON.stringify(testResult.headers, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-500 mt-8 border-t pt-4">
        <p>This page is for debugging purposes only. Ensure it is not accessible in production if it exposes sensitive info.</p>
      </div>
    </div>
  );
}
