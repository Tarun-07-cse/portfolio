import { useRef } from 'react';
import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Configure EmailJS: https://www.emailjs.com/
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      if (EMAILJS_SERVICE_ID === 'your_service_id' || !EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'your_public_key') {
        await new Promise((r) => setTimeout(r, 1200));
        setStatus({
          type: 'success',
          message: 'Message sent! (Configure EmailJS in .env to receive real emails.)',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          EMAILJS_PUBLIC_KEY
        );
        setStatus({
          type: 'success',
          message: "Message sent! I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send. Try emailing tarun.anand2127@gmail.com directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div ref={sectionRef} className="min-h-screen pt-16 bg-white text-black selection:bg-black selection:text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-4 text-black">
              GET IN TOUCH
            </h1>
            <p className="text-xl text-black/60 max-w-xl">
              Have a project in mind or want to collaborate? Send me a message below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1 space-y-8"
            >
              <h2 className="text-sm font-mono text-black/50 uppercase tracking-widest mb-6">
                Contact
              </h2>
              <a
                href="mailto:tarun.anand2127@gmail.com"
                className="flex items-center gap-3 text-black/80 hover:text-black transition-colors"
                data-cursor="view"
              >
                <Mail className="w-5 h-5 shrink-0" />
                <span className="break-all">tarun.anand2127@gmail.com</span>
              </a>
              <a
                href="https://github.com/Tarun-07-cse"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-black/80 hover:text-black transition-colors"
                data-cursor="view"
              >
                <Github className="w-5 h-5 shrink-0" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tarun-anand-b12bb7329/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-black/80 hover:text-black transition-colors"
                data-cursor="view"
              >
                <Linkedin className="w-5 h-5 shrink-0" />
                <span>LinkedIn</span>
              </a>
            </motion.div>

            {/* Send message form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h2 className="text-sm font-mono text-black/50 uppercase tracking-widest mb-6">
                Send a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black/70 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-black/15 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all text-black placeholder:text-black/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-black/15 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all text-black placeholder:text-black/40"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black/70 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-black/15 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black/30 transition-all text-black placeholder:text-black/40 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-4 rounded-lg ${
                      status.type === 'success'
                        ? 'bg-black/5 text-black/80 border border-black/10'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0" />
                    )}
                    <span className="text-sm">{status.message}</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  data-cursor="explore"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
