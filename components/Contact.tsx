"use client";

import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { SiteConfig } from "@/lib/types";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({ site }: { site: SiteConfig }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) return;

    setStatus("sending");
    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
      });
      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error("Failed to save message:", err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-line py-16 md:py-24">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 md:grid-cols-[0.4fr_0.6fr] md:px-10">
        <div>
          <h2 className="font-display text-2xl font-medium text-ink">Let&apos;s talk</h2>
          <p className="mt-4 max-w-xs leading-relaxed text-muted">
            Open to new roles and cross-platform projects. The fastest way to
            reach me is email.
          </p>
          <ul className="mt-8 space-y-3 font-mono text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="text-teal hover:underline">
                {site.email}
              </a>
            </li>
            <li className="text-muted">{site.phone}</li>
            <li>
              <a href={site.social.github} className="text-muted hover:text-ink" target="_blank" rel="noreferrer">
                github.com/UmerMujtaba
              </a>
            </li>
            <li>
              <a href={site.social.linkedin} className="text-muted hover:text-ink" target="_blank" rel="noreferrer">
                linkedin.com/in/umermujtaba9
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-muted">Name</span>
              <input
                name="name"
                type="text"
                required
                className="mt-1.5 w-full border-b border-line bg-transparent py-2 text-ink outline-none focus:border-teal"
              />
            </label>
            <label className="block">
              <span className="text-sm text-muted">Email</span>
              <input
                name="email"
                type="email"
                required
                className="mt-1.5 w-full border-b border-line bg-transparent py-2 text-ink outline-none focus:border-teal"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm text-muted">Message</span>
            <textarea
              name="message"
              required
              rows={4}
              className="mt-1.5 w-full resize-none border-b border-line bg-transparent py-2 text-ink outline-none focus:border-teal"
            />
          </label>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-sm bg-amber px-6 py-3 text-sm font-medium text-bg transition-opacity disabled:opacity-60"
            >
              {status === "sending" ? "Sending" : "Send message"}
            </button>
            {status === "sent" && (
              <p className="text-sm text-teal">Message sent. I&apos;ll reply by email.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-amber">
                Something went wrong. Please email me directly instead.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
