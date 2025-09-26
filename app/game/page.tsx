"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { settings } from "@/lib/settings";
import Footer from "@/components/Footer";

export default function GamePage() {
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  // Audio references
  const spinningAudioRef = useRef<HTMLAudioElement | null>(null);
  const revealAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    spinningAudioRef.current = new Audio(settings.audio.spinningWheel);
    revealAudioRef.current = new Audio(settings.audio.reveal);
    
    // Preload audio files
    spinningAudioRef.current.preload = 'auto';
    revealAudioRef.current.preload = 'auto';
    
    // Cleanup function
    return () => {
      if (spinningAudioRef.current) {
        spinningAudioRef.current.pause();
        spinningAudioRef.current = null;
      }
      if (revealAudioRef.current) {
        revealAudioRef.current.pause();
        revealAudioRef.current = null;
      }
    };
  }, []);

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Play spinning sound
    if (spinningAudioRef.current) {
      spinningAudioRef.current.currentTime = 0;
      spinningAudioRef.current.play().catch(console.error);
    }

    // Determine win/lose based on probability
    const isWin = Math.random() < settings.game.winProbability;

    const randomizedSegments = Object.entries(settings.game.wheelSegments).sort(() => Math.random() - 0.5);

    const choosenSegment = randomizedSegments.find(([index, value]) => isWin === value)?.[0] || 0;

    const finalRotation = (settings.game.numberOfSpins * 360) + (parseInt(String(choosenSegment)) * 60) + (Math.random() * 30 - 15);
    setRotation(finalRotation);

    // Keep button locked for the entire duration including navigation delay
    setTimeout(() => {
      // Stop spinning sound and play reveal sound
      if (spinningAudioRef.current) {
        spinningAudioRef.current.pause();
      }
      if (revealAudioRef.current) {
        revealAudioRef.current.currentTime = 0;
        revealAudioRef.current.play().catch(console.error);
      }
      
      setTimeout(() => {
        router.push(isWin ? "/result/win" : "/result/lose");
      }, 1000);
      // Note: We don't setIsSpinning(false) here to keep button locked until navigation
    }, settings.game.spinDuration);
  };

  return (
    <div className={settings.classes.gameContainer}>
      <div
        className={settings.classes.game.content}
        style={{ '--bg-image': `url(${settings.images.backgroundImage})` } as React.CSSProperties}
      >
        <div className={settings.classes.game.main}>
          <div className={settings.classes.game.logo}>
            <Image
              src={settings.images.titleImage}
              alt={settings.title}
              width={400}
              height={80}
              priority
            />
          </div>

          <div className={settings.classes.game.wheelContainer}>
            <button
              onClick={spinRoulette}
              disabled={isSpinning}
              className={`${settings.classes.game.playButton} ${isSpinning ? 'spinning' : ''}`}
            >
              <img
                src={settings.images.play}
                alt="Play Button"
              />
              <img
                src={settings.images.pointer}
                alt="Pointer"
                className={settings.classes.game.pointer}
              />
            </button>
            <div
            >
              <img
                className={`${settings.classes.game.wheel} ${isSpinning ? 'spinning' : ''}`}
                src={settings.images.rouletteWheel}
                alt="Roulette Wheel"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  '--spin-duration': `${settings.game.spinDuration}ms`
                } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        <img
          src={settings.images.characters}
          alt="Characters"
          className={settings.classes.game.characters}
        />
      </div>

      <Footer />
    </div>
  );
}
