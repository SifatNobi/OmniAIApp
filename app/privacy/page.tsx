import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "OmniAIApp Privacy Policy - how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-4xl font-bold text-white sm:text-5xl">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
            <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
            <p>
              OmniAIApp (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>

            <h2 className="text-xl font-semibold text-white">2. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as your name and email address when you sign up, and usage data automatically collected when you interact with our platform.
            </p>

            <h2 className="text-xl font-semibold text-white">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to send you technical notices and support messages, and to communicate with you about our platform.
            </p>

            <h2 className="text-xl font-semibold text-white">4. Data Privacy & Security</h2>
            <p>
              Your privacy is our top priority. All data processing happens locally on your device when possible. We use end-to-end encryption for data in transit and at rest. We never train on your personal data or conversations.
            </p>

            <h2 className="text-xl font-semibold text-white">5. Third-Party Services</h2>
            <p>
              When you use BYOK (Bring Your Own Key), your requests are sent directly to the respective AI providers. We do not store your API keys or the content of your requests on our servers.
            </p>

            <h2 className="text-xl font-semibold text-white">6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. You can export your data or delete your account from within the application settings.
            </p>

            <h2 className="text-xl font-semibold text-white">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our website or email us at privacy@omniai.app.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
