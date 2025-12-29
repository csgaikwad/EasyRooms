import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Github, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: "Popular Destinations" },
      { name: "Unique Stays" },
      { name: "Experiences" },
      { name: "Reviews" },
    ],
    hosting: [
      { name: "List Your Property" },
      { name: "Host Resources" },
      { name: "Pricing" },
      { name: "Safety" },
    ],
    support: [
      { name: "Help Center" },
      { name: "Contact Us" },
      { name: "Cancellation Policy" },
      { name: "Trust & Safety" },
    ],
    company: [
      { name: "About Us" },
      { name: "Careers" },
      { name: "Press" },
      { name: "Blog" },
    ],
  };

  const socialLinks = [
    { Icon: Github, label: "GitHub" },
    { Icon: Linkedin, label: "LinkedIn" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand & Social */}
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-0.5">
                <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Home className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white">EasyRooms</span>
            </a>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs cursor-default">
              Find your perfect place to stay. Trusted by thousands of travelers and property owners across India.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="font-semibold text-white mb-5 capitalize cursor-default">{key}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 inline-block after:content-[''] after:block after:h-px after:w-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all hover:after:w-full cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <p className="text-gray-500">
            © {currentYear} EasyRooms. All rights reserved.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6 text-gray-400">
            <button
              onClick={() => navigate("/terms")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms and Conditions
            </button>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}