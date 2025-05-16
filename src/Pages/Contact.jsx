import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Linkedin, Instagram, Sparkles } from "lucide-react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all required fields correctly',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/tahabatoul76@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] overflow-hidden" id="Contact">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
            Contact
          </span>
          <span className="text-white ml-2">
            Me
          </span>
        </h2>
        <p 
          className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
          data-aos="zoom-in-up"
          data-aos-duration="800"
        >
          <Sparkles className="w-5 h-5 text-purple-400" />
          Let&apos;s create something beautiful together — drop me a line!
          <Sparkles className="w-5 h-5 text-purple-400" />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6" data-aos="fade-right" data-aos-duration="1000">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <a href="mailto:tahabatoul76@gmail.com" className="text-slate-300 hover:text-white transition-colors">
                  tahabatoul76@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <a href="tel:+96176719155" className="text-slate-300 hover:text-white transition-colors">
                  +961 76 719 155
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <MapPin className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span className="text-slate-300">Bekaa, Lebanon</span>
              </div>
            </div>
            </div>

          {/* Connect with Me Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-4">Connect with Me</h3>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/batoul-taha-9b2b2b2b2/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6 text-purple-400" />
              </a>
              <a
                href="https://www.instagram.com/batoul.taha/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-6 h-6 text-purple-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300" data-aos="fade-left" data-aos-duration="1000">
          <h3 className="text-xl font-semibold text-white mb-4">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                className={`w-full px-4 py-2 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300 hover:border-purple-500/30`}
                />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            <div className="group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                className={`w-full px-4 py-2 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300 hover:border-purple-500/30`}
                />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            <div className="group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                rows="4"
                className={`w-full px-4 py-2 bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300 hover:border-purple-500/30 resize-none`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;