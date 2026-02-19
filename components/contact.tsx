'use client';

import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const contacts = [
    { icon: '📧', label: 'Email', value: 'hello@stellauzima.com' },
    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: '📍', label: 'Address', value: 'Nairobi, Kenya' },
  ];

  return (
    <section id="contact" className="bg-gradient-to-b from-[var(--cream)] to-[var(--warm-white)] py-24 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-[Caveat] text-xl text-[var(--clay)] mb-2">Get In Touch</p>
          <h2 className="font-serif text-5xl lg:text-6xl font-black text-[var(--bark)] leading-tight">
            Let's Build the Future Together
          </h2>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          {/* Left: Contact Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-[var(--bark)] mb-4">
              Get In Touch
            </h3>
            <p className="text-[rgba(44,26,14,0.65)] leading-relaxed mb-8 text-sm lg:text-base">
              Have a question about Stellar Uzima? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            {/* Contact Links */}
            <div className="space-y-3 mb-8">
              {contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-[rgba(44,26,14,0.08)] text-decoration-none text-[var(--bark)] transition-all duration-300 hover:border-[var(--clay)] hover:translate-x-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[rgba(196,98,45,0.08)] flex items-center justify-center text-xl flex-shrink-0">
                    {contact.icon}
                  </div>
                  <div>
                    <div className="text-xs text-[rgba(44,26,14,0.4)]">
                      {contact.label}
                    </div>
                    <div className="text-sm font-medium">
                      {contact.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Blockchain Badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(74,123,157,0.08)] border border-[rgba(74,123,157,0.2)] px-4 py-2 rounded-full text-xs font-medium text-[var(--sky)] mt-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--sky)]"></span>
              Building on Blockchain Technology
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-[var(--cream)] border border-[rgba(196,98,45,0.1)] rounded-3xl p-8">
            <h3 className="font-serif text-2xl font-bold text-[var(--bark)] mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-[rgba(44,26,14,0.6)] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[rgba(44,26,14,0.12)] rounded-2xl text-sm bg-[var(--warm-white)] text-[var(--bark)] outline-none transition-colors duration-200 focus:border-[var(--clay)]"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[rgba(44,26,14,0.6)] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[rgba(44,26,14,0.12)] rounded-2xl text-sm bg-[var(--warm-white)] text-[var(--bark)] outline-none transition-colors duration-200 focus:border-[var(--clay)]"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[rgba(44,26,14,0.6)] mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[rgba(44,26,14,0.12)] rounded-2xl text-sm bg-[var(--warm-white)] text-[var(--bark)] outline-none transition-colors duration-200 focus:border-[var(--clay)]"
                  placeholder="Your Organization"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[rgba(44,26,14,0.6)] mb-1">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[rgba(44,26,14,0.12)] rounded-2xl text-sm bg-[var(--warm-white)] text-[var(--bark)] outline-none transition-colors duration-200 focus:border-[var(--clay)]"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="support">Support Request</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[rgba(44,26,14,0.6)] mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[rgba(44,26,14,0.12)] rounded-2xl text-sm bg-[var(--warm-white)] text-[var(--bark)] outline-none transition-colors duration-200 focus:border-[var(--clay)] resize-none h-32"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--clay)] text-[var(--warm-white)] px-6 py-3 rounded-full font-medium text-sm border-none cursor-pointer transition-all duration-250 hover:bg-[var(--earth)] hover:-translate-y-0.5 hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
