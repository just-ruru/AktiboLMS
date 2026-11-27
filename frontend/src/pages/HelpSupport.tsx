import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";

interface HelpTopic {
  id: string;
  question: string;
  answer: string;
  /** Optional next step. Topics without one render no action button. */
  action?: { label: string; to: string };
}

const HELP_TOPICS: HelpTopic[] = [
  {
    id: "join-course",
    question: "How do I join a course?",
    answer:
      "Open Courses, choose Enroll course, and enter the code shared by your instructor. Check the course preview before confirming.",
    action: { label: "GO TO COURSES", to: "/courses" },
  },
  {
    id: "choose-role",
    question: "Which role should I choose?",
    answer:
      "Choose the Student role for a student workspace with lessons, practice, and progress. Choose the Instructor role for course authoring and learner analytics.",
    action: { label: "GO TO ROLE SELECTION", to: "/choose-role" },
  },
  {
    id: "reset-password",
    question: "How do I reset my password?",
    answer:
      "Open Password Recovery and enter the email address on your account. Password recovery is not connected yet, so no reset email is sent.",
    action: { label: "GO TO PASSWORD RECOVERY", to: "/forgot-password" },
  },
  {
    id: "run-activity",
    question: "Why can’t I run an activity?",
    answer:
      "An activity needs a signed-in account and a published lesson. Signing in is not connected yet, so activities can only be previewed.",
  },
];

const SAMPLE_DETAILS = {
  name: "Test Learner",
  email: "student@example.invalid",
  message: "This is a sample support request used to preview the form.",
};

const NOTE = {
  title: "TRY THE FLOW",
  body: "Click a field to fill an example, or use sample details. Support submission is not connected yet, so no message is sent.",
};

export function HelpSupport() {
  const navigate = useNavigate();
  const [activeTopicId, setActiveTopicId] = useState(HELP_TOPICS[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const activeTopic = HELP_TOPICS.find((topic) => topic.id === activeTopicId) ?? HELP_TOPICS[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("Name, email, and a message are required before a request can be prepared.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("Enter a valid email address so the request has somewhere to go.");
      return;
    }

    setStatus("");
    navigate("/help/request-sent", { state: { email: email.trim() } });
  }

  function fillSampleDetails() {
    setName(SAMPLE_DETAILS.name);
    setEmail(SAMPLE_DETAILS.email);
    setMessage(SAMPLE_DETAILS.message);
    setStatus("TEST-ONLY sample details filled. They are not a real request.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar />

      <section className="flex flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:h-[176px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">HELP & SUPPORT</p>
        <h1 className="font-['Castoro_Titling'] text-[36px] leading-[1.2] text-text-inverse">
          A little help, right here
        </h1>
        <p className="font-display text-[13px] text-[#d1d8ee]">
          Find an answer or prepare a support request without leaving your workspace.
        </p>
      </section>

      <main className="flex w-full max-w-[1368px] flex-1 flex-col px-6 pt-8 lg:pl-[72px] lg:pr-0">
        <div className="grid w-full grid-cols-1 gap-6 lg:h-[748px] lg:grid-cols-2">
          <section
            aria-labelledby="quick-answer-title"
            className="flex w-full flex-col gap-4 rounded-lg border border-[#dfe5f0] bg-surface-white p-6 lg:h-[748px]"
          >
            <h2 id="quick-answer-title" className="font-display text-[20px] font-bold text-aktif-navy">
              Find a quick answer
            </h2>

            <div className="flex flex-col gap-3">
              {HELP_TOPICS.map((topic) => {
                const isActive = topic.id === activeTopic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveTopicId(topic.id)}
                    className={`flex h-11 w-full items-center justify-center rounded-[9px] border px-[10px] font-display text-[11px] font-bold leading-[1.5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                      isActive
                        ? "border-aktif-navy bg-aktif-navy text-text-inverse"
                        : "border-[#dfe5f0] bg-surface-white text-aktif-navy hover:border-aktif-navy hover:bg-surface-light"
                    }`}
                  >
                    {topic.question}
                  </button>
                );
              })}
            </div>

            <div className="flex min-h-[244px] flex-col gap-[14px] rounded-lg bg-surface-light p-5">
              <h3 className="font-display text-[17px] font-bold text-aktif-navy">{activeTopic.question}</h3>
              <p className="font-display text-[13px] leading-[1.5] text-text-secondary">{activeTopic.answer}</p>
            </div>

            {activeTopic.action && (
              <Link
                to={activeTopic.action.to}
                className="flex h-11 w-full max-w-[300px] items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                {activeTopic.action.label}
              </Link>
            )}
          </section>

          <section
            aria-labelledby="support-title"
            className="flex w-full flex-col gap-4 rounded-lg border border-[#dfe5f0] bg-surface-white p-6 lg:h-[748px]"
          >
            <h2 id="support-title" className="font-display text-[20px] font-bold text-aktif-navy">
              Still need a hand?
            </h2>
            <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
              Describe what happened so the support team has the context they need.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <label className="flex flex-col gap-2 font-display text-[12px] font-bold text-[#15203a]" htmlFor="support-name">
                  Name <span aria-hidden="true">*</span>
                  <input
                    id="support-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setStatus("");
                    }}
                    placeholder="Your name"
                    className="h-12 w-full rounded-lg border border-[#dfe5f0] bg-surface-white px-3 font-display text-[12px] font-normal text-text-primary placeholder:text-text-secondary focus:border-aktif-navy focus:outline-none focus:ring-2 focus:ring-border-focus"
                  />
                </label>

                <label className="flex flex-col gap-2 font-display text-[12px] font-bold text-[#15203a]" htmlFor="support-email">
                  Email <span aria-hidden="true">*</span>
                  <input
                    id="support-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setStatus("");
                    }}
                    placeholder="name@example.com"
                    className="h-12 w-full rounded-lg border border-[#dfe5f0] bg-surface-white px-3 font-display text-[12px] font-normal text-text-primary placeholder:text-text-secondary focus:border-aktif-navy focus:outline-none focus:ring-2 focus:ring-border-focus"
                  />
                </label>

                <label className="flex flex-col gap-2 font-display text-[12px] font-bold text-[#15203a]" htmlFor="support-message">
                  What do you need help with? <span aria-hidden="true">*</span>
                  <textarea
                    id="support-message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      setStatus("");
                    }}
                    placeholder="How can we help?"
                    className="h-[128px] w-full resize-none rounded-lg border border-[#dfe5f0] bg-surface-white px-3 py-3 font-display text-[12px] font-normal leading-[1.5] text-text-primary placeholder:text-text-secondary focus:border-aktif-navy focus:outline-none focus:ring-2 focus:ring-border-focus"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={fillSampleDetails}
                  className="flex h-11 flex-1 items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  USE SAMPLE DETAILS
                </button>
                <button
                  type="submit"
                  className="flex h-11 flex-1 items-center justify-center rounded-[9px] border border-aktif-navy bg-aktif-gold px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  SEND REQUEST
                </button>
              </div>

              <p role="status" aria-live="polite" className="min-h-[20px] font-display text-[11px] text-state-danger">
                {status}
              </p>

              <div className="flex min-h-[96px] flex-col gap-2 rounded-lg bg-[#fff4cd] p-4">
                <p className="font-display text-[10px] font-bold text-aktif-navy">{NOTE.title}</p>
                <p className="font-display text-[11px] leading-[1.5] text-text-secondary">{NOTE.body}</p>
              </div>
            </form>
          </section>
        </div>
      </main>

      <div className="pt-8">
        <SiteFooter />
      </div>
    </div>
  );
}
