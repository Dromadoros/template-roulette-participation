import Image from "next/image";
import Link from "next/link";
import { settings } from "@/lib/settings";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={settings.classes.container}>
      <div 
        className={settings.classes.home.content}
        style={{ 
          '--bg-image-mobile': `url(${settings.images.backgroundImage})`,
          '--bg-image-desktop': `url(${settings.images.backgroundDesktop})`
        } as React.CSSProperties}
      >
        <div className={settings.classes.home.main}>
          {/* Title Image */}
          <div className={settings.classes.home.logo}>
            <Image
              src={settings.images.titleImage}
              alt={settings.title}
              width={400}
              height={80}
              priority
            />
          </div>

          {/* Title */}
          <h1 className={settings.classes.home.title}>
            {settings.content.intro.title}
          </h1>

          {/* Start Button */}
          <Link
            href="/game"
            className={settings.classes.home.startButton}
          >
            {settings.content.intro.startButton}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
