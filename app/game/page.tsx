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
  const [sessionId] = useState(() => crypto.randomUUID()); // Generate session ID
  
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

  // Fetch and log current DynamoDB stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('🎯 Fetching current DynamoDB statistics...');
        
        const response = await fetch('/api/admin/stats', {
          headers: {
            'Authorization': 'Bearer admin-secret-key'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('📊 Current DynamoDB Statistics:', {
            totalGames: data.statistics.totalGames,
            wins: data.statistics.wins,
            losses: data.statistics.losses,
            winRate: `${data.statistics.winRate.toFixed(1)}%`,
            timestamp: data.timestamp
          });
        } else {
          console.log('⚠️ Unable to fetch stats (might be first game):', response.status);
        }
      } catch (error) {
        console.log('⚠️ Error fetching DynamoDB stats:', error);
      }
    };

    fetchStats();
  }, []);

  const spinRoulette = async () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Play spinning sound
    if (spinningAudioRef.current) {
      spinningAudioRef.current.currentTime = 0;
      spinningAudioRef.current.play().catch(console.error);
    }

    // Fetch current stats to determine if this should be a win
    let isWin = false;
    try {
      const statsResponse = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': 'Bearer admin-secret-key'
        }
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        const totalGames = statsData.statistics.totalGames;
        const nextGameNumber = totalGames + 1;

        console.log(`🎮 Game #${nextGameNumber} starting...`);

        // Determine win based on client's requirements
        if (nextGameNumber <= 11200) {
          // First 11200 games: 1 winner every 112 games
          isWin = nextGameNumber % 112 === 0;
          console.log(`📊 First 11200 games rule: Game ${nextGameNumber} ${isWin ? 'WINS' : 'loses'} (every 112th game wins)`);
        } else {
          // After 11200 games: 1 winner every 242 games
          const gamesAfter11200 = nextGameNumber - 11200;
          isWin = gamesAfter11200 % 242 === 0;
          console.log(`📊 After 11200 games rule: Game ${nextGameNumber} ${isWin ? 'WINS' : 'loses'} (every 242nd game after 11200 wins)`);
        }
      } else {
        // Fallback if stats unavailable (first game)
        console.log('⚠️ Stats unavailable, assuming this is game #1 (lose)');
        isWin = false;
      }
    } catch (error) {
      console.error('Error fetching stats for win determination:', error);
      // Fallback to lose if error
      isWin = false;
    }

    isWin = false; // Force lose for testing

    const randomizedSegments = Object.entries(settings.game.wheelSegments).sort(() => Math.random() - 0.5);

    const choosenSegment = randomizedSegments.find(([index, value]) => isWin === value)?.[0] || 0;

    const finalRotation = (settings.game.numberOfSpins * 360) + (parseInt(String(choosenSegment)) * 60) + (Math.random() * 30 - 15);
    setRotation(finalRotation);

    try {
      const response = await fetch('/api/game/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          result: isWin ? 'win' : 'lose',
          sessionId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Game play recorded:', data.gameId);
        // Store gameId in sessionStorage for the winner form
        if (isWin) {
          sessionStorage.setItem('currentGameId', data.gameId);
        }
      } else {
        console.error('Failed to record game play:', data.error);
      }
    } catch (error) {
      console.error('Error recording game play:', error);
    }

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
        style={{ 
          '--bg-image-mobile': `url(${settings.images.backgroundImage})`,
          '--bg-image-desktop': `url(${settings.images.backgroundDesktop})`
        } as React.CSSProperties}
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
