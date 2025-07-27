// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 min-h-screen flex flex-col justify-center px-6 sm:px-12 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-6xl font-extrabold leading-tight drop-shadow-lg mb-6">
          Unlock the Power of Your <span className="text-yellow-400">Excel Data</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-10 drop-shadow-md">
          Upload, analyze, and visualize your spreadsheets with interactive 2D and 3D charts.
          Gain insights powered by AI and make data-driven decisions effortlessly.
        </p>

        <div className="flex justify-center space-x-6">
          <Link
            to="/register"
            className="bg-yellow-400 text-indigo-900 font-bold py-4 px-12 rounded-lg shadow-lg hover:bg-yellow-500 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border-2 border-white hover:border-yellow-400 hover:text-yellow-400 px-12 py-4 rounded-lg font-semibold transition"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="mt-20 max-w-7xl mx-auto">
        {/* Illustrative SVG or image */}
        <svg
          className="w-full h-72 mx-auto opacity-80"
          fill="none"
          viewBox="0 0 900 400"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
          <rect width="900" height="400" fill="url(#grad)" rx="20" ry="20" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="64"
            fontWeight="bold"
            fill="white"
            opacity="0.15"
          >
            ExcelAnalyze
          </text>
          <circle cx="300" cy="200" r="80" fill="white" opacity="0.1" />
          <circle cx="600" cy="200" r="100" fill="white" opacity="0.1" />
        </svg>
      </div>
    </div>
  );
}