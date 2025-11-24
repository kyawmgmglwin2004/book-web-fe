// src/pages/About.js
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  Book, 
  Sparkles, 
  Globe, 
  Zap, 
  Target,
  Users,
  TrendingUp,
  Award,
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Play,
  Pause
} from "lucide-react";

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const milestones = [
    { year: "2015", title: "Founded", description: "Started as a small family bookstore" },
    { year: "2017", title: "First Award", description: "Recognized for excellence in children's literature" },
    { year: "2019", title: "Expanded Online", description: "Launched our e-commerce platform" },
    { year: "2021", title: "10,000+ Books", description: "Reached a milestone in book curation" },
    { year: "2023", title: "Global Reach", description: "Now serving customers worldwide" }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "10K+", label: "Books Curated", icon: Book },
    { number: "25+", label: "Awards Won", icon: Award },
    { number: "99%", label: "Satisfaction Rate", icon: Heart }
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Curated Excellence",
      description: "Every book is handpicked by our expert team for quality and educational value",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Diverse Stories",
      description: "We celebrate diversity through books that represent all cultures and backgrounds",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly evolving to bring you the best in children's literature",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Focused on fostering a lifelong love of reading in every child",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Where Stories
            <span className="block text-yellow-300">Come Alive</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            We're not just selling books – we're nurturing young minds and creating magical reading experiences that last a lifetime.
          </motion.p>
          
          <motion.button
            onClick={navigate.bind(null, '/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 mx-auto hover:shadow-xl transition-shadow"
          >
            Discover Our Story
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <stat.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">From a small bookstore to a global community of readers</p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-600 to-purple-600"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-1/2"></div>
                <div className="relative z-10 w-12 h-12 bg-white border-4 border-indigo-600 rounded-full"></div>
                <div className="w-1/2 px-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="text-2xl font-bold text-indigo-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Values Grid */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What We Stand For</h2>
            <p className="text-xl text-gray-600">Our core values guide everything we do</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
                  <div className={`h-2 bg-gradient-to-r ${value.color}`}></div>
                  <div className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <value.icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      {/* <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 font-light">
              Get exclusive access to new arrivals, special discounts, and reading tips for your little ones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-shadow"
              >
                Sign Up Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Contact Cards */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Let's Connect</h2>
            <p className="text-xl text-gray-600">We're here to help with any questions or recommendations</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.a
              href="mailto:hello@bookstore.com"
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center h-full hover:shadow-xl transition-all group-hover:bg-indigo-50">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 transition-colors">
                  <Mail className="text-indigo-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
                <p className="text-gray-600">kyawmgmglwin146018@gmail.com</p>
              </div>
            </motion.a>
            
            <motion.a
              href="tel:1800-BOOKS"
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center h-full hover:shadow-xl transition-all group-hover:bg-indigo-50">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 transition-colors">
                  <Phone className="text-indigo-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
                <p className="text-gray-600">09796582826</p>
              </div>
            </motion.a>
            
            <motion.a
              href="#"
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center h-full hover:shadow-xl transition-all group-hover:bg-indigo-50">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 transition-colors">
                  <MapPin className="text-indigo-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Visit Us</h3>
                <p className="text-gray-600">NO-5, ThatyetTaw Street, Yangon City</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}