"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

// A contact form that feels like chatting with an assistant.
// It's scripted (no AI behind it): it collects a topic, a name and a message,
// then opens the visitor's own email app with everything filled in.

type Message = { from: "bot" | "you"; text: string };
type Stage = "topic" | "name" | "message" | "done";

const topics = ["Hire you full-time", "An automation project", "A website or app", "Something else"];

const BOT_DELAY_MS = 700;
const firstName = profile.name.split(" ")[0];

export function ContactChat() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: `Hi! I'm ${firstName}'s assistant. What would you like to talk about?` },
  ]);
  const [stage, setStage] = useState<Stage>("topic");
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [answers, setAnswers] = useState({ topic: "", name: "", message: "" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Keep the newest message in view (inside the chat box only, not the whole page).
  useEffect(() => {
    const box = scrollRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [messages, typing]);

  function botSays(text: string, next: Stage) {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text }]);
      setStage(next);
      if (next === "name" || next === "message") inputRef.current?.focus();
    }, BOT_DELAY_MS);
  }

  function pickTopic(topic: string) {
    setAnswers((a) => ({ ...a, topic }));
    setMessages((m) => [...m, { from: "you", text: topic }]);
    botSays("Nice. What's your name?", "name");
  }

  function send() {
    const text = draft.trim();
    if (!text || typing) return;
    setDraft("");
    setMessages((m) => [...m, { from: "you", text }]);
    if (stage === "name") {
      setAnswers((a) => ({ ...a, name: text }));
      botSays(`Thanks, ${text}. Tell me a little about it, and I'll pass it to ${firstName}.`, "message");
    } else if (stage === "message") {
      setAnswers((a) => ({ ...a, message: text }));
      botSays("Got it. Pick how you want to send it below. Nothing is sent until you do.", "done");
    }
  }

  function restart() {
    setMessages([{ from: "bot", text: "Sure, let's start again. What would you like to talk about?" }]);
    setAnswers({ topic: "", name: "", message: "" });
    setStage("topic");
  }

  // Three ways to send, because a plain mailto link does nothing on computers with no email app set up.
  const subject = `${answers.topic}, from ${answers.name}`;
  const body = `${answers.message}\n\n${answers.name}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${profile.email}\nSubject: ${subject}\n\n${body}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard blocked: the other two buttons still work
    }
  };

  const inputOpen = stage === "name" || stage === "message";

  return (
    <div className="mx-auto max-w-xl overflow-hidden rounded-3xl bg-green text-page">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-page/15 px-5 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-page text-sm font-bold text-green">
          {profile.handle[0].toUpperCase()}
        </span>
        <div>
          <p className="font-semibold text-page">{firstName}&apos;s assistant</p>
          <p className="flex items-center gap-1.5 text-xs text-page/70">
            <span className="h-1.5 w-1.5 rounded-full bg-page" />
            Usually replies within a day, by email
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex h-80 flex-col gap-3 overflow-y-auto px-5 py-5" aria-live="polite">
        {messages.map((m, i) => (
          <p
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
              m.from === "bot"
                ? "self-start rounded-bl-md bg-page/10 text-page"
                : "self-end rounded-br-md bg-page text-ink"
            }`}
          >
            {m.text}
          </p>
        ))}
        {typing && (
          <span className="flex gap-1 self-start rounded-2xl rounded-bl-md bg-page/10 px-4 py-3.5" aria-label="Typing">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="h-1.5 w-1.5 rounded-full bg-page/60"
                style={{ animation: `typing 1s ${d * 0.15}s infinite` }}
              />
            ))}
          </span>
        )}
        {stage === "topic" && !typing && (
          <div className="mt-1 flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => pickTopic(t)}
                className="rounded-full border border-page/40 px-4 py-2 text-sm text-page transition-colors hover:bg-page/10"
              >
                {t}
              </button>
            ))}
          </div>
        )}
        {stage === "done" && !typing && (
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <a
              href={gmail}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-page px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-page/80"
            >
              Send with Gmail ↗
            </a>
            <a href={mailto} className="rounded-full border border-page/30 px-4 py-2.5 text-sm text-page hover:border-page">
              Email app
            </a>
            <button type="button" onClick={copy} className="rounded-full border border-page/30 px-4 py-2.5 text-sm text-page hover:border-page">
              {copied ? "Copied" : "Copy message"}
            </button>
            <button type="button" onClick={restart} className="text-sm text-page/70 hover:text-page">
              Start again
            </button>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        className="flex items-end gap-2 border-t border-page/15 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Your reply
        </label>
        <textarea
          id="chat-input"
          ref={inputRef}
          rows={1}
          value={draft}
          disabled={!inputOpen}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={
            stage === "name" ? "Your name" : stage === "message" ? "A few lines about it" : "Pick an option above"
          }
          className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-page/30 bg-transparent px-4 py-2.5 text-page outline-none placeholder:text-page/60 focus:border-page disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputOpen || !draft.trim()}
          className="h-11 rounded-full bg-page px-5 text-sm font-bold text-green transition-colors hover:bg-page/80 disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
