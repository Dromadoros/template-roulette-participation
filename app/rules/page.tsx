import Link from "next/link";
import { settings } from "@/lib/settings";
import Footer from "@/components/Footer";

export default function RulesPage() {
  return (
    <div className={settings.classes.rulesContainer}>
      <div className={settings.classes.rules.content}>
        <div className={settings.classes.rules.main}>
          {/* Header */}
          <div className={settings.classes.rules.header}>
            <h1 className={settings.classes.rules.title}>
              Rules & Conditions
            </h1>
            <p className={settings.classes.rules.subtitle}>
              Please read the following terms and conditions carefully
            </p>
          </div>

          {/* Rules Content */}
          <div className={settings.classes.rules.contentCard}>
            <div>
              <section className={settings.classes.rules.section}>
                <h2 className={settings.classes.rules.sectionTitle}>
                  Game Rules
                </h2>
                <ul className={settings.classes.rules.list}>
                  <li>Each participant is allowed one spin per session</li>
                  <li>The game outcome is determined randomly with a {Math.round(settings.game.winProbability * 100)}% chance of winning</li>
                  <li>Winners must provide valid contact information to claim prizes</li>
                  <li>Prizes must be claimed within 30 days of winning</li>
                </ul>
              </section>

              <section className={settings.classes.rules.section}>
                <h2 className={settings.classes.rules.sectionTitle}>
                  Eligibility
                </h2>
                <ul className={settings.classes.rules.list}>
                  <li>Game is open to participants aged 18 and above</li>
                  <li>Participants must provide accurate personal information</li>
                  <li>One prize per household</li>
                  <li>Employees and their families are not eligible</li>
                </ul>
              </section>

              <section className={settings.classes.rules.section}>
                <h2 className={settings.classes.rules.sectionTitle}>
                  Privacy & Data
                </h2>
                <ul className={settings.classes.rules.list}>
                  <li>Personal information will only be used for prize distribution</li>
                  <li>Data will not be shared with third parties</li>
                  <li>Information will be deleted after prize distribution</li>
                  <li>By participating, you consent to data collection for prize purposes</li>
                </ul>
              </section>

              <section className={settings.classes.rules.section}>
                <h2 className={settings.classes.rules.sectionTitle}>
                  General Terms
                </h2>
                <ul className={settings.classes.rules.list}>
                  <li>Game organizers reserve the right to modify rules at any time</li>
                  <li>Prizes cannot be exchanged for cash value</li>
                  <li>Participation is voluntary and at your own risk</li>
                  <li>Technical issues may affect game availability</li>
                </ul>
              </section>
            </div>
          </div>

          {/* Back to Game Button */}
          <div>
            <Link
              href="/"
              className={settings.classes.rules.backButton}
            >
              ← Back to Game
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
