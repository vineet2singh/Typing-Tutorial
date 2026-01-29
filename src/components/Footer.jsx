import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Column 1: Brand Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <i className="fa-solid fa-keyboard text-blue-500"></i>
                            Typing<span className="text-yellow-500">Center</span>
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            The #1 platform for government exam typing preparation.
                            Master English & Hindi (Mangal InScript) with real-time analytics.
                        </p>

                        <div className="flex gap-6 pt-2 text-3xl">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="transition transform hover:scale-125 hover:text-sky-500"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="transition transform hover:scale-125 hover:text-blue-600"
                            >
                                <FaFacebook />
                            </a>

                            <a
                                href="https://www.instagram.com/026_vineet?igsh=OTIqZHZoMjUObGI="
                                target="_blank"
                                rel="noreferrer"
                                className="transition transform hover:scale-125 hover:text-pink-500"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/1vineetsingh/"
                                target="_blank"
                                rel="noreferrer"
                                className="transition transform hover:scale-125 hover:text-blue-700"
                            >
                                <FaLinkedin />
                            </a>
                        </div>

                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm">
                            <li><FooterLink to="/">Home</FooterLink></li>
                            <li><FooterLink to="/exam">Typing Test</FooterLink></li>
                            <li><FooterLink to="/">WPM Calculator</FooterLink></li>
                            <li><FooterLink to="/">Typing Games</FooterLink></li>
                            <li><FooterLink to="/">Pricing</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><FooterLink to="/">Blog</FooterLink></li>
                            <li><FooterLink to="/">Help Center</FooterLink></li>
                            <li><FooterLink to="/">Keyboard Shortcuts</FooterLink></li>
                            <li><FooterLink to="/">Privacy Policy</FooterLink></li>
                            <li><FooterLink to="/">Terms of Service</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
                        <h4 className="text-yellow-500 font-semibold mb-3">vineetsingh1080@gmail.com</h4>
                        <p className="text-slate-400 text-sm mb-4">
                            Subscribe to get the latest typing tips and exam updates.
                        </p>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg px-4 py-3 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} TypingCenter. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="Privacy" className="hover:text-white transition-colors">Privacy</a>
                        <a href="Privacy" className="hover:text-white transition-colors">Cookies</a>
                        <a href="Privacy" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Helper Components for cleaner code
const FooterLink = ({ to, children }) => (
    <Link to={to} className="hover:text-blue-400 transition-colors duration-200 block w-fit">
        {children}
    </Link>
);

const SocialIcon = ({ icon }) => (
    <a
        href="#"
        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
    >
        <i className={`fa-brands ${icon}`}></i>
    </a>
);

export default Footer;