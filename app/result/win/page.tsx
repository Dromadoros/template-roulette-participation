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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);

    // For demo purposes, just show success message
    setIsSubmitted(true);
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
          style={{ '--bg-image': `url(${settings.images.backgroundImage})` } as React.CSSProperties}
        >
          <div className={settings.classes.win.success}>
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

            <div className={settings.classes.win.icon}>
              <Image
                src={settings.images.winIcon}
                alt="Success"
                width={120}
                height={120}
              />
            </div>

            <h1 className={settings.classes.win.successTitle}>
              Thank You! 🎊
            </h1>

            <p className={settings.classes.win.successDescription}>
              Your prize claim has been submitted successfully. You'll receive an email with further instructions.
            </p>

            <div className={settings.classes.win.successButtons}>
              <Link
                href="/game"
                className={settings.classes.win.successPrimary}
              >
                {settings.content.win.playAgainButton}
              </Link>

              <Link
                href="/"
                className={settings.classes.win.successSecondary}
              >
                Go Home
              </Link>
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
        style={{ '--bg-image': `url(${settings.images.backgroundImage})` } as React.CSSProperties}
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
              >
                {settings.content.win.submitButton}
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
