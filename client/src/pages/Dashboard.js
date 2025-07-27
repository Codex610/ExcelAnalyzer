import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/upload">Upload Excel File</Link></li>
        <li><Link to="/history">View History</Link></li>
      </ul>
    </div>
  );
}