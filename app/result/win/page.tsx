"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { settings } from "@/lib/settings";
import Footer from "@/components/Footer";

export default function WinPage() {
  const [formData, setFormData] = useState({
    childLastName: "",
    childFirstName: "",
    parentEmail: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Get the game ID from session storage
      const gameId = sessionStorage.getItem('currentGameId');
      if (!gameId) {
        throw new Error('No game ID found. Please play again.');
      }

      // Submit form data to API
      const response = await fetch('/api/prize-claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId,
          childFirstName: formData.childFirstName,
          childLastName: formData.childLastName,
          parentEmail: formData.parentEmail,
          sessionId: sessionStorage.getItem('sessionId'), // If you want to track sessions
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Prize claim submitted:', data.submissionId);
        // Clear the game ID from session storage
        sessionStorage.removeItem('currentGameId');
        setIsSubmitted(true);
      } else {
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSubmitted) {
    return (
      <div className={settings.classes.winContainer}>
        <div
          className={settings.classes.win.content}
          style={{ '--bg-image-mobile': `url(${settings.images.backgroundImage})`, '--bg-image-desktop': `url(${settings.images.backgroundDesktop})` } as React.CSSProperties}
        >
          <div className={settings.classes.win.success}>
            <div className={settings.classes.win.main}>
              {/* Logo */}
              <div className={settings.classes.game.logo}>
                <Image
                  src={settings.images.titleImage}
                  alt={settings.title}
                  width={400}
                  height={80}
                  priority
                />
              </div>

              {/* Prize Claim Form */}
              <div className={settings.classes.win.form}>

              <h1 className={settings.classes.win.successTitle}>
                {settings.content.win.successTitle}
              </h1>

              <p className={settings.classes.win.successDescription}>
                {settings.content.win.successDescription}
              </p>
            </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className={settings.classes.winContainer}>
      <div
        className={settings.classes.win.content}
        style={{ '--bg-image-mobile': `url(${settings.images.backgroundImage})`, '--bg-image-desktop': `url(${settings.images.backgroundDesktop})` } as React.CSSProperties}
      >
        <div className={settings.classes.win.main}>
          {/* Logo */}
          <div className={settings.classes.game.logo}>
            <Image
              src={settings.images.titleImage}
              alt={settings.title}
              width={400}
              height={80}
              priority
            />
          </div>

          {/* Prize Claim Form */}
          <div className={settings.classes.win.form}>
            {/* Title */}
            <h1 className={settings.classes.win.title}>
              {settings.content.win.title}
            </h1>

            {/* Description */}
            <p className={settings.classes.win.description}>
              {settings.content.win.description}
            </p>
            <h2 className={settings.classes.win.formTitle}>
              {settings.content.win.formTitle}
            </h2>

            {submitError && (
              <div style={{
                color: '#ff4444',
                marginBottom: '1rem',
                padding: '0.5rem',
                border: '1px solid #ff4444',
                borderRadius: '4px',
                backgroundColor: '#fff5f5'
              }}>
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className={settings.classes.win.formGroup}>
                <label htmlFor="childLastName" className={settings.classes.win.label}>
                  {settings.content.win.childLastNameLabel}
                </label>
                <input
                  type="text"
                  id="childLastName"
                  name="childLastName"
                  value={formData.childLastName}
                  onChange={handleInputChange}
                  required
                  className={settings.classes.win.input}
                />
              </div>

              <div className={settings.classes.win.formGroup}>
                <label htmlFor="childFirstName" className={settings.classes.win.label}>
                  {settings.content.win.childFirstNameLabel}
                </label>
                <input
                  type="text"
                  id="childFirstName"
                  name="childFirstName"
                  value={formData.childFirstName}
                  onChange={handleInputChange}
                  required
                  className={settings.classes.win.input}
                />
              </div>

              <div className={settings.classes.win.formGroup}>
                <label htmlFor="parentEmail" className={settings.classes.win.label}>
                  {settings.content.win.parentEmailLabel}
                </label>
                <input
                  type="email"
                  id="parentEmail"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                  required
                  className={settings.classes.win.input}
                />
              </div>

              <button
                type="submit"
                className={settings.classes.win.submitButton}
                disabled={isSubmitting}
                style={{
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Envoi en cours...' : settings.content.win.submitButton}
              </button>

              <img
                src={settings.images.gabbyWin}
                alt="Gabby Win"
                className={settings.classes.win.icon}
              />
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
