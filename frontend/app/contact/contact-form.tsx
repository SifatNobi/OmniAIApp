"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <ScrollReveal>
      <motion.form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg space-y-5 text-left"
      >
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-text-secondary">
            Name
          </label>
          <Input
            id="name"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-text-secondary">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm text-text-secondary">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell us what's on your mind..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="w-full rounded-xl border border-border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all duration-300 resize-none"
          />
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={submitted}
          >
            {submitted ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Sent Successfully
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </motion.div>
      </motion.form>
    </ScrollReveal>
  );
}
