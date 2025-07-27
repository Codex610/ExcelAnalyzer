// client/src/pages/About.js
import React from 'react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto my-16 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">
        About <span className="text-indigo-600">ExcelAnalyze</span>
      </h1>
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        ExcelAnalyze is a cutting-edge platform built to empower users to unlock the full potential of their Excel files. Whether you are an analyst, a business owner, or a student, our tool simplifies the process of uploading, analyzing, and visualizing data using interactive, intuitive charts.
      </p>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Secure Login:</strong> User and admin authentication with JWT tokens for maximum security.</li>
          <li><strong>Excel Upload & Parsing:</strong> Support for .xls and .xlsx files, parsed reliably with SheetJS.</li>
          <li><strong>Data Visualization:</strong> Generate dynamic 2D and immersive 3D charts using Chart.js and Three.js.</li>
          <li><strong>Downloadable Reports:</strong> Export your visualizations as PNG or PDF files.</li>
          <li><strong>History Tracking:</strong> Maintain a history of uploads and analyses for quick reference.</li>
          <li><strong>Admin Dashboard:</strong> Monitor platform usage and manage users efficiently.</li>
          <li><strong>AI Insights (Optional):</strong> Harness OpenAI integration to generate smart, automated insights from your data.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">Why Choose ExcelAnalyze?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Unlike traditional spreadsheet tools, ExcelAnalyze combines powerful backend processing with smooth and interactive frontend visualizations. The platform is designed with user experience and security in mind, ensuring your data is both powerful and safe.
        </p>
        <p className="text-gray-700 leading-relaxed">
          By integrating AI-generated insights, ExcelAnalyze takes your data analysis to the next level, offering suggestions and patterns you might otherwise miss. Our admin tools provide full control and transparency for organizational use.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">Our Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-4">
          {[
            { name: 'MongoDB', logo: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
            { name: 'Express.js', logo: 'https://cdn.worldvectorlogo.com/logos/express-109.svg' },
            { name: 'React', logo: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
            { name: 'Node.js', logo: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg' },
          ].map(({ name, logo }) => (
            <div key={name} className="flex flex-col items-center space-y-2">
              <img src={logo} alt={name} className="h-12 w-12 object-contain" />
              <span className="font-medium text-gray-800">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}