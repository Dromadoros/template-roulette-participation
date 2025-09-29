import Image from "next/image";
import Link from "next/link";
import { settings } from "@/lib/settings";
import Footer from "@/components/Footer";

export default function LosePage() {
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

          <div className={settings.classes.lose.form}>
            {/* Title */}
            <h1 className={settings.classes.lose.title}>
              {settings.content.lose.title}
            </h1>

            {/* Description */}
            <p className={settings.classes.lose.description}>
              {settings.content.lose.description}
            </p>

            <img 
              src={settings.images.drawingDownload}
              alt="Dessiner pour gagner"
              className="drawing-image"
            />

            {/* Action Buttons */}
            <div className={settings.classes.lose.buttons}>
              <Link
                href="/"
                className={settings.classes.lose.download}
              >
                {settings.content.lose.downloadButton}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
