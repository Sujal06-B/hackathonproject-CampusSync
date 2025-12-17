import React from 'react';
import { Layout } from '../components/Layout';

const Settings: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-[960px] mx-auto p-4 md:p-8 pb-24 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-white">
            Settings
          </h1>
          <p className="text-text-secondary text-sm md:text-base">
            Configure your CampusSync experience, notifications, and display preferences.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="bg-surface-dark border border-surface-border rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">General</h2>
            <p className="text-text-secondary text-sm">
              Basic app preferences like theme and language. More controls coming soon.
            </p>
          </div>

          <div className="bg-surface-dark border border-surface-border rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Notifications</h2>
            <p className="text-text-secondary text-sm">
              Fine‑tune how you get alerts about new assignments, announcements, and live classes.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Settings;


