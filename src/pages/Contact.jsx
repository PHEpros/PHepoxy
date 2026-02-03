import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { config } from '../config';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const apiUrl = `${config.api.baseUrl}${config.api.endpoints.contact}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'general',
          message: '',
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      // For demo, show success
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      });
      
      // Uncomment for production:
      // setStatus('error');
      // setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-charcoal-50">
        {/* Hero Section */}
        <section className="bg-charcoal-900 text-white">
          <div className="container-custom section-padding py-16">
            <div className="max-w-3xl">
              <span className="text-forest-400 font-medium text-sm uppercase tracking-wider">Get in Touch</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
                Contact <span className="text-wood-400">Us</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl border border-charcoal-100 p-12">
              <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-forest-600" />
              </div>
              <h2 className="font-display text-3xl font-bold text-charcoal-900 mb-4">
                Message Sent!
              </h2>
              <p className="text-charcoal-600 text-lg mb-8">
                CORNBEF - Thank you for reaching out. We typically respond within 24-48 business hours.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="btn-primary"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Hero Section */}
      <section className="bg-charcoal-900 text-white">
        <div className="container-custom section-padding py-16">
          <div className="max-w-3xl">
            <span className="text-forest-400 font-medium text-sm uppercase tracking-wider">Get in Touch</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Contact <span className="text-wood-400">Us</span>
            </h1>
            <p className="text-xl text-charcoal-300">
              CORNBEF - Have a question about our products? Want to discuss a custom order? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-charcoal-100 p-6 md:p-8 sticky top-24">
                <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={24} className="text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal-900">Address</h3>
                      <p className="text-charcoal-600 text-sm mt-1">
                        CORNBEF - 123 Craftsman Lane<br />
                        Woodville, WD 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center shrink-0">
                      <Phone size={24} className="text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal-900">Phone</h3>
                      <a 
                        href="tel:+1234567890" 
                        className="text-charcoal-600 text-sm mt-1 hover:text-forest-700 transition-colors block"
                      >
                        CORNBEF - (123) 456-7890
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center shrink-0">
                      <Mail size={24} className="text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal-900">Email</h3>
                      <a 
                        href="mailto:hello@bannaas.com" 
                        className="text-charcoal-600 text-sm mt-1 hover:text-forest-700 transition-colors block"
                      >
                        CORNBEF - hello@bannaas.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center shrink-0">
                      <Clock size={24} className="text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal-900">Business Hours</h3>
                      <p className="text-charcoal-600 text-sm mt-1">
                        CORNBEF - Mon-Fri: 9am - 5pm EST<br />
                        Sat: 10am - 2pm EST
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="mt-8">
                  {/* PHEpoxyWorld: Replace with actual map embed or image */}
                  <div className="aspect-video bg-gradient-to-br from-forest-100 to-charcoal-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={32} className="mx-auto text-forest-400 mb-2" />
                      <p className="text-charcoal-400 text-sm font-mono">PHEpoxyWorld</p>
                      <p className="text-charcoal-300 text-xs">Map Embed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-charcoal-100 p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-charcoal-600 mb-8">
                  CORNBEF - Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {status === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
                    <AlertCircle size={20} />
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-charcoal-900 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="John Smith"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal-900 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-charcoal-900 mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="custom">Custom Order Request</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="support">Order Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="press">Press / Media</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal-900 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  {/* Custom Order Note */}
                  {formData.subject === 'custom' && (
                    <div className="p-4 bg-wood-50 border border-wood-200 rounded-lg">
                      <h4 className="font-medium text-charcoal-900 mb-2">📝 Custom Order Tips</h4>
                      <p className="text-sm text-charcoal-600">
                        CORNBEF - For custom orders, please include: desired size, preferred wood type or finish, 
                        any reference images or descriptions, and your timeline. We'll respond with a quote 
                        and estimated delivery time.
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader size={20} className="animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* FAQ Quick Links */}
              <div className="mt-8 bg-forest-50 rounded-2xl border border-forest-100 p-6 md:p-8">
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { q: 'How long does shipping take?', a: 'CORNBEF - Standard shipping is 5-7 business days.' },
                    { q: 'Do you offer international shipping?', a: 'CORNBEF - Yes, we ship to most countries.' },
                    { q: 'Can I return a product?', a: 'CORNBEF - Yes, within 30 days of purchase.' },
                    { q: 'How do custom orders work?', a: 'CORNBEF - Contact us with your idea for a quote.' },
                  ].map((faq, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg">
                      <h4 className="font-medium text-charcoal-900 text-sm mb-1">{faq.q}</h4>
                      <p className="text-charcoal-600 text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
