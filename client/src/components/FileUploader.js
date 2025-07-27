import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const { token } = useSelector(state => state.auth);

  const onFileChange = e => setFile(e.target.files[0]);

  const uploadFile = async () => {
    if (!file) return alert('Select a file');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/files/upload', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setData(res.data.data);
      setMessage('File uploaded and parsed successfully');
    } catch (error) {
      setMessage('Upload failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={onFileChange}
        className="mb-4 block w-full border border-gray-300 rounded px-3 py-2 cursor-pointer"
      />
      <button
        onClick={uploadFile}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Upload
      </button>
      <p className="mt-4 text-green-600">{message}</p>

      {data.length > 0 && (
        <div className="overflow-x-auto mt-6 border rounded">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(data[0]).map(col => (
                  <th key={col} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((cell, idx) => (
                    <td key={idx} className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                      {cell?.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FileUploader;