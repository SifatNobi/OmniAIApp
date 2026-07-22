import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the OmniAIApp team. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-24">
        <div className="absolute inset-0 bg-grid-white" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-text-secondary">
            Have a question, feedback, or want to collaborate? We&apos;d love to hear from you.
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
