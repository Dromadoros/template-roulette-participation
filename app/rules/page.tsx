import Link from "next/link";
import { settings } from "@/lib/settings";
import Footer from "@/components/Footer";

export default function RulesPage() {
  return (
    <div className={settings.classes.rulesContainer}>
      <div
      className={settings.classes.rules.content}
      style={{
        '--bg-image-mobile': `url(${settings.images.backgroundImage})`,
        '--bg-image-desktop': `url(${settings.images.backgroundDesktop})`
      } as React.CSSProperties}
      >
        <div className={settings.classes.rules.main}>
          {/* Header */}
          <div className={settings.classes.rules.header}>
            <h1 className={settings.classes.rules.title}>
              {settings.content.menu.rulesConditionsLabel}
            </h1>
          </div>

          {/* Rules Content */}
          <div className={settings.classes.rules.contentCard}>
            <div>
              <section className={settings.classes.rules.section}>
                <p className={settings.classes.rules.subtitle}>
                  {settings.content.menu.rulesText}
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <Link
                    href={settings.content.menu.rulesConditionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '1.1rem', textDecoration: 'underline' }}
                  >
                    Télécharger le règlement complet (PDF)
                  </Link>
                </p>
                <p className={settings.classes.rules.subtitle} style={{ marginTop: '2rem', fontWeight: 'bold' }}>
                  {settings.content.menu.rulesAcceptance}
                </p>
              </section>
            </div>
          </div>

          {/* Back to Game Button */}
          <div>
            <Link
              href="/"
              className={settings.classes.rules.backButton}
            >
              {settings.content.win.goHomeButton}
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
