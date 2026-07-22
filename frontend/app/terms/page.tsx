import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "OmniAIApp Terms of Service - the terms governing your use of the platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-4xl font-bold text-white sm:text-5xl">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
            <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using OmniAIApp (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Platform.
            </p>

            <h2 className="text-xl font-semibold text-white">2. Description of Service</h2>
            <p>
              OmniAIApp provides an AI-native platform that unifies multiple AI models, agents, extensions, MCP servers, and workflows into a single desktop and Android application.
            </p>

            <h2 className="text-xl font-semibold text-white">3. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to use the Platform in compliance with all applicable laws.
            </p>

            <h2 className="text-xl font-semibold text-white">4. Bring Your Own Key (BYOK)</h2>
            <p>
              When using BYOK, you are solely responsible for your API keys and any usage charges incurred from third-party AI providers. OmniAIApp does not store your keys on our servers.
            </p>

            <h2 className="text-xl font-semibold text-white">5. Intellectual Property</h2>
            <p>
              The Platform and its original content, features, and functionality are owned by OmniAIApp and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-xl font-semibold text-white">6. Limitation of Liability</h2>
            <p>
              OmniAIApp shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Platform.
            </p>

            <h2 className="text-xl font-semibold text-white">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Platform.
            </p>

            <h2 className="text-xl font-semibold text-white">8. Contact</h2>
            <p>
              For questions about these Terms, please contact us at legal@omniai.app.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
