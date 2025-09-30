import Image from "next/image";
import Link from "next/link";
import { settings } from "@/lib/settings";

export default function Footer() {
  return (
    <footer 
      className={settings.classes.footer.footer}
      style={{
        backgroundImage: `url(${settings.images.footerBackground})`
      }}
    >
      {/* Overlay for better text readability */}
      <div className={settings.classes.footer.overlay}></div>
      
      <div className={settings.classes.footer.content}>
        <div className={settings.classes.footer.container}>
          {/* Rules & Conditions Link */}
          <div className={settings.classes.footer.links}>
            <Link
              href='/rules'
              className={settings.classes.footer.link}
              title={settings.content.menu.rulesText}
            >
              {settings.content.menu.rulesConditionsLabel}
            </Link>
            <span className={settings.classes.footer.separator}>|</span>
            <Link
              href={settings.content.menu.leclercStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={settings.classes.footer.link}
            >
              {settings.content.menu.leclercStoreLabel}
            </Link>
            <span className={settings.classes.footer.separator}>|</span>
            <Link
              href={settings.content.menu.universalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={settings.classes.footer.link}
            >
              {settings.content.menu.universalLabel}
            </Link>
          </div>

          {/* Copyright */}
          <div>
            <p className={settings.classes.footer.copyright}>
              {settings.content.menu.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
