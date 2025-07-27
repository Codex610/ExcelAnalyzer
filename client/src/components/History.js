import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function History() {
  const [files, setFiles] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('/api/files/myfiles', { headers: { Authorization: `Bearer ${token}` } });
        setFiles(res.data);
      } catch {}
    };

    const fetchAnalyses = async () => {
      try {
        const res = await axios.get('/api/analysis/my', { headers: { Authorization: `Bearer ${token}` } });
        setAnalyses(res.data);
      } catch {}
    };

    fetchFiles();
    fetchAnalyses();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Upload History</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {files.map(file => (
          <li key={file._id}>
            {file.originalname} - <time>{new Date(file.uploadDate).toLocaleString()}</time>
          </li>
        ))}
        {files.length === 0 && <p>No uploads yet.</p>}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">Analysis History</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {analyses.map(a => (
          <li key={a._id} className="border border-gray-200 rounded p-3">
            <p>
              <strong>File:</strong> {a.file?.originalname || 'N/A'}<br />
              <strong>X:</strong> {a.xColumn} &nbsp; <strong>Y:</strong> {a.yColumn} &nbsp; <strong>Type:</strong> {a.chartType} <br />
              <strong>Date:</strong> <time>{new Date(a.createdAt).toLocaleString()}</time>
            </p>
            <p className="mt-1 italic text-gray-600">Insights: {a.insights || 'N/A'}</p>
          </li>
        ))}
        {analyses.length === 0 && <p>No analyses yet.</p>}
      </ul>
    </div>
  );
}

export default History;