// client/src/pages/Contact.js
import React, { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e =>
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    // Here you can integrate backend submission logic or email service
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md my-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-green-600">Thank you!</h2>
        <p className="text-gray-700 text-lg">
          Your message has been successfully sent. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md my-16">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Contact <span className="text-indigo-600">Us</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formState.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Write your message here..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}