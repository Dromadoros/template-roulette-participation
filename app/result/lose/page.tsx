"use client";

import Image from "next/image";
import Link from "next/link";
import { settings, getRandomColoring } from "@/lib/settings";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function LosePage() {
  const [randomColoring, setRandomColoring] = useState<{ image: string, pdf: string, filename: string } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate a random coloring when the component mounts
  useEffect(() => {
    setImageLoaded(false); // Reset loading state
    setRandomColoring(getRandomColoring());
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDownloadPDF = () => {
    if (!randomColoring) return;
    
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = randomColoring.pdf;
    link.download = randomColoring.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!randomColoring) {
    return <div className={settings.classes.loseContainer}>
      <div
        className={settings.classes.lose.content}
        style={{
          '--bg-image-mobile': `url(${settings.images.backgroundImage})`,
          '--bg-image-desktop': `url(${settings.images.backgroundDesktop})`
        } as React.CSSProperties}
      ></div>
      <Footer />
    </div>
  }

  return (
    <div className={settings.classes.loseContainer}>
      <div
        className={settings.classes.lose.content}
        style={{
          '--bg-image-mobile': `url(${settings.images.backgroundImage})`,
          '--bg-image-desktop': `url(${settings.images.backgroundDesktop})`
        } as React.CSSProperties}
      >
        <div className={settings.classes.lose.main}>
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

          <div className={settings.classes.lose.form} style={{ display: imageLoaded ? 'block' : 'none' }}>
            {/* Title */}
            <h1 className={settings.classes.lose.title}>
              {settings.content.lose.title}
            </h1>

            {/* Description */}
            <p className={settings.classes.lose.description}>
              {settings.content.lose.description}
            </p>

            <img
              src={randomColoring.image}
              alt="Dessiner pour gagner"
              className="drawing-image"
              onLoad={handleImageLoad}
            />

            {/* Action Buttons */}
            <div className={settings.classes.lose.buttons}>
              <button
                onClick={handleDownloadPDF}
                className={settings.classes.lose.download}
                type="button"
              >
                {settings.content.lose.downloadButton}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
