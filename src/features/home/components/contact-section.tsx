"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import Link from "next/link";

const ContactSection = () => {
  // Keep your original keys, and add the form field keys you're using.
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    // original keys you had
    name: "",
    email: "",
    subject: "",
    message: "",
    // fields used by your inputs
    first_name: "",
    last_name: "",
    user_email: "",
  });

  const [status, setStatus] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "n.sakibnss@gmail.com",
      description: "Best for detailed inquiries",
      href: "mailto:n.sakibnss@gmail.com",
      primary: true,
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+880 1923 248529",
      description: "Available Mon–Fri",
      href: "tel:+8801923248529",
      primary: false,
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Jashore, Khulna, Bangladesh",
      description: "Open to remote opportunities",
      href: "#",
      primary: false,
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nsshan98/",
      color: "bg-blue-600",
    },
    {
      name: "GitHub",
      url: "https://github.com/nsshan98/",
      color: "bg-gray-800",
    },
  ];

  // Added a generic change handler that works with all your inputs by "name"
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Build the values that your EmailJS templates expect
    // - name: use original "name" if set, else combine first + last
    const combinedName =
      formData.name?.trim() ||
      `${formData.first_name || ""} ${formData.last_name || ""}`.trim();

    // - email: use original "email" if set, else use user_email from the input
    const userEmail = (formData.email || formData.user_email || "").trim();

    try {
      // 1️⃣ Send to YOU — your owner template MUST have a fixed "To email" in the EmailJS dashboard
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_OWNER!, // Template for you
        {
          from_name: combinedName,
          user_email: userEmail, // lets you use {{user_email}} in the email body (and set Reply-To in template)
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // 2️⃣ Auto reply to USER — your auto-reply template MUST have "To email" = {{user_email}}
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER!, // Template for user
        {
          to_name: combinedName,
          user_email: userEmail, // required so {{user_email}} resolves
          subject: formData.subject, // optional if you use it in auto-reply
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus("✅ Message sent successfully!");
      // Reset all fields you use
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        first_name: "",
        last_name: "",
        user_email: "",
      });
    } catch (error) {
      console.log(error);
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className=" py-10 px-4 bg-slate-800/50 backdrop-blur-sm"
      id="contact"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Ready to start a project together? I&apos;d love to hear from you.
            Let&apos;s create something amazing!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact methods */}
            <Card className="p-8 bg-slate-700/50 border-slate-600 backdrop-blur-sm hover:bg-slate-700/70 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-white">
                  Let&apos;s Connect
                </CardTitle>
                <p className="text-slate-300">
                  I&apos;m always open to discussing new opportunities,
                  interesting projects, or just having a chat about technology.
                </p>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 text-white group-hover:scale-110 transition-transform`}
                    >
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white">
                          {method.title}
                        </h3>
                      </div>
                      <Link
                        href={method.href}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                      >
                        {method.value}
                      </Link>
                      <p className="text-sm text-slate-400 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social links */}
            <Card className="p-8 bg-slate-700/50 border-slate-600 backdrop-blur-sm hover:bg-slate-700/70 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-xl text-white">
                  Find Me Online
                </CardTitle>
                <p className="text-slate-300 text-sm">
                  Connect with me on social platforms
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-200 bg-transparent"
                      asChild
                    >
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-slate-700/50 border-slate-600 backdrop-blur-sm hover:bg-slate-700/70 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl text-white">
                Send a Message
              </CardTitle>
              <p className="text-slate-300">
                Fill out the form below and I&apos;ll get back to you as soon as
                possible.
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    placeholder="Project Inquiry"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your project or just say hello..."
                    required
                  ></textarea>
                </div>

                <Button
                  disabled={loading}
                  type="submit"
                  size="lg"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  {loading ? "Sending Email..." : (<><Send className="w-5 h-5 mr-2" /> Send Email</>)}
                </Button>

                {status && (
                  <p className="text-center text-sm mt-4 text-cyan-400">
                    {status}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
