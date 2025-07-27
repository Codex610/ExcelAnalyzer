// client/src/components/Footer.js
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-gray-600">
        <p className="text-sm">&copy; {new Date().getFullYear()} ExcelAnalyze. All rights reserved.</p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://github.com/Codex610"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
            aria-label="GitHub"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.258.82-.577v-2.175c-3.338.727-4.042-1.61-4.042-1.61-.546-1.384-1.333-1.753-1.333-1.753-1.089-.745.083-.73.083-.73 1.205.086 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.997.11-.775.42-1.305.763-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.65 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.378.825 1.116.825 2.256v3.344c0 .32.21.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
            aria-label="Twitter"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.916 4.916 0 00-8.39 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.917 4.917 0 001.523 6.574 4.903 4.903 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.917 4.917 0 004.588 3.417A9.867 9.867 0 010 21.542a13.94 13.94 0 007.548 2.209c9.058 0 14.01-7.513 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
            </svg>
          </a>
          <a
            href="mailto:rajnishchauhan912556@gmail.com"
            className="hover:text-blue-600 transition"
            aria-label="Email"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}