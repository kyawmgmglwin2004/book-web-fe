// src/pages/PrivacyPolicy.js
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Cookie, 
  UserCheck, 
  Globe, 
  FileText,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  AlertCircle
} from "lucide-react";

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [lastUpdated] = useState("November 15, 2023");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const policySections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: FileText,
      content: [
        "Welcome to our Privacy Policy. At [Your Bookstore Name], we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, protect, and share your personal information when you visit our website and purchase books from us.",
        "This Privacy Policy applies to all information collected through our website, including but not limited to: when you browse our site, create an account, make a purchase, sign up for our newsletter, or contact us for support."
      ]
    },
    {
      id: "information",
      title: "Information We Collect",
      icon: Database,
      content: [
        "We collect several types of information from and about users of our website, including:",
        "• Personal Information: Name, email address, shipping address, billing address, phone number, and payment information when you make a purchase.",
        "• Account Information: Username, password, and preferences when you create an account.",
        "• Usage Information: Pages visited, time spent on pages, click patterns, and browsing history.",
        "• Device Information: IP address, browser type, operating system, and device identifiers.",
        "• Communication Information: Emails you send us, support requests, and feedback."
      ]
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "We use the information we collect to:",
        "• Process and fulfill your book orders",
        "• Provide customer support and respond to your inquiries",
        "• Personalize your shopping experience and recommend books",
        "• Send transactional emails and promotional communications",
        "• Improve our website, products, and services",
        "• Detect and prevent fraud or abuse",
        "• Comply with legal obligations"
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      icon: Cookie,
      content: [
        "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.",
        "Types of cookies we use:",
        "• Essential Cookies: Required for the website to function properly",
        "• Performance Cookies: Help us understand how visitors interact with our website",
        "• Functional Cookies: Enable enhanced functionality and personalization",
        "• Advertising Cookies: Used to deliver relevant advertisements"
      ]
    },
    {
      id: "sharing",
      title: "Information Sharing",
      icon: Globe,
      content: [
        "We may share your personal information with:",
        "• Payment processors to handle transactions securely",
        "• Shipping carriers to deliver your orders",
        "• Book publishers and distributors for order fulfillment",
        "• Analytics providers to help us understand website usage",
        "• Marketing platforms for promotional communications",
        "• Legal authorities when required by law",
        "We do not sell your personal information to third parties."
      ]
    },
    {
      id: "security",
      title: "Data Security",
      icon: Lock,
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:",
        "• SSL/TLS encryption for data transmission",
        "• Secure payment processing through PCI-compliant providers",
        "• Regular security audits and vulnerability assessments",
        "• Employee training on data protection practices",
        "• Limited access to personal information on a need-to-know basis"
      ]
    },
    {
      id: "rights",
      title: "Your Privacy Rights",
      icon: UserCheck,
      content: [
        "Depending on your location, you may have the following rights:",
        "• Access: Request access to your personal information",
        "• Correction: Request correction of inaccurate information",
        "• Deletion: Request deletion of your personal information",
        "• Portability: Request a copy of your information in a portable format",
        "• Objection: Object to processing of your personal information",
        "• Restriction: Request restriction of processing your information",
        "To exercise these rights, please contact us using the information provided below."
      ]
    },
    {
      id: "children",
      title: "Children's Privacy",
      icon: Shield,
      content: [
        "Our website is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us so we can delete such information.",
        "For children aged 13-17, we may collect limited personal information with parental consent for account creation and purchases."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <Shield size={48} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl font-light opacity-90">
              Your privacy is important to us. Learn how we protect your data.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm">
              <Calendar size={16} />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {policySections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center gap-3 p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <section.icon className="text-indigo-600" size={20} />
                  <span className="text-gray-700">{section.title}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {policySections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <section.icon className="text-indigo-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-gray-400" size={24} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t pt-4">
                          {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-gray-600 leading-relaxed mb-3">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-6">Questions About Your Privacy?</h3>
            <p className="mb-6 opacity-90">
              If you have any questions or concerns about this Privacy Policy or our data practices, please don't hesitate to contact us.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <span>privacy@yourbookstore.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <span>1-800-PRIVACY</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm opacity-75">
                [Your Bookstore Name]<br />
                123 Book Street, Reading City, RC 12345<br />
                United States
              </p>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Important Notice</h4>
                <p className="text-gray-600 text-sm">
                  By using our website and purchasing from us, you acknowledge that you have read and understood this Privacy Policy and agree to our collection, use, and sharing of your information as described herein.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}