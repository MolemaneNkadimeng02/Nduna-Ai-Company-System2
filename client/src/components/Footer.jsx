import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Nduna AI</h4>
          <p>{COMPANY_INFO.name}</p>
          <p className="footer-desc">{COMPANY_INFO.tagline}</p>
          <p className="footer-desc">{COMPANY_INFO.description}</p>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>AI Readiness Assessment</li>
            <li>AI Pilot Program</li>
            <li>AI Strategic Advisory</li>
            <li>Enterprise Integration</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>📍 {COMPANY_INFO.location}</li>
            <li>📧 <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a></li>
            <li>📱 <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a></li>
            <li>🌐 <a href={COMPANY_INFO.website} target="_blank" rel="noopener noreferrer">nduna.site</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Our Team</li>
            <li>Partnerships</li>
            <li>Enterprise Security</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {COMPANY_INFO.year} Nduna AI. All rights reserved.</p>
        <p>Enterprise AI Integration | Outcomes-based Solutions | Risk Reduction</p>
        <p className="footer-tagline">Structured delivery. Measured outcomes. Enterprise-grade security.</p>
      </div>
    </footer>
  );
}
