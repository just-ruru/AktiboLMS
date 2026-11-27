import { Link } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";

interface AccessPlan {
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  action: string;
  to: string;
}

interface NextStep {
  title: string;
  description: string;
  action: string;
  to: string;
}

const ACCESS_PLANS: AccessPlan[] = [
  {
    eyebrow: "FOR LEARNERS",
    title: "Student access",
    tagline: "Your next learning step",
    description: "Join a course and turn concepts into practice.",
    capabilities: [
      "Interactive reading and video lessons",
      "In-lesson programming activities",
      "Quick checks with immediate feedback",
      "Personal progress and activity history",
    ],
    action: "GET STARTED AS A STUDENT",
    to: "/register",
  },
  {
    eyebrow: "FOR EDUCATORS",
    title: "Instructor access",
    tagline: "Build an active classroom",
    description: "Create focused lessons and understand learner progress.",
    capabilities: [
      "Course, subject, and module authoring",
      "Rich-media and programming blocks",
      "Practice questions with explanations",
      "Learner progress and engagement data",
    ],
    action: "GET STARTED AS AN INSTRUCTOR",
    to: "/choose-role",
  },
  {
    eyebrow: "FOR TEAMS",
    title: "Institution access",
    tagline: "Explore a shared rollout",
    description: "Discuss how AktiboLMS could support your learning community.",
    capabilities: [
      "Align learning and teaching workflows",
      "Plan course and enrollment access",
      "Discuss onboarding needs",
      "Review requirements with your team",
    ],
    action: "DISCUSS YOUR NEEDS",
    to: "/help",
  },
];

const NEXT_STEPS: NextStep[] = [
  {
    title: "Already have an account?",
    description: "Sign in and choose your student or instructor workspace.",
    action: "LOG IN",
    to: "/login",
  },
  {
    title: "Not sure where to start?",
    description: "Find answers about enrollment, roles, and getting help.",
    action: "HELP & SUPPORT",
    to: "/help",
  },
];

const NOTICE = {
  title: "ACCESS OPTIONS",
  body: "Monetary pricing has not been defined for this project and no payment is collected. Each option below lists what the workspace includes.",
};

export function Pricing() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/pricing" navIndicator="full" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">PRICING & ACCESS</p>
        <h1 className="font-['Castoro_Titling'] text-[36px] leading-[1.2] text-text-inverse">
          Plans for active learning
        </h1>
        <p className="font-display text-[13px] text-[#d1d8ee]">
          Explore the workspace that fits your learning or teaching needs.
        </p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-8 lg:px-[72px]">
        <section className="flex w-full flex-col gap-2 rounded-lg bg-[#fff4cd] p-5 lg:h-[84px]">
          <p className="font-display text-[10px] font-bold text-aktif-navy">{NOTICE.title}</p>
          <p className="font-display text-[12px] leading-[1.5] text-text-primary">{NOTICE.body}</p>
        </section>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ACCESS_PLANS.map((plan) => (
            <article
              key={plan.title}
              className="flex w-full flex-col justify-between gap-4 rounded-lg border border-[#dfe5f0] bg-surface-white p-6 xl:h-[432px]"
            >
              <div className="flex flex-col gap-2">
                <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">
                  {plan.eyebrow}
                </p>
                <h2 className="font-display text-[21px] font-bold leading-[1.5] text-aktif-navy">
                  {plan.title}
                </h2>
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-display text-[13px] font-bold leading-[1.5] text-text-primary">
                  {plan.tagline}
                </p>
                <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {plan.capabilities.map((capability) => (
                  <li key={capability} className="flex gap-2 font-display text-[11px] leading-[1.5] text-text-primary">
                    <span aria-hidden="true">•</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.to}
                className="flex h-11 w-full items-center justify-center rounded-[9px] border border-[#000e53] bg-aktif-gold px-[10px] py-[10px] text-center font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                {plan.action}
              </Link>
            </article>
          ))}
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {NEXT_STEPS.map((step) => (
            <article
              key={step.title}
              className="flex w-full flex-col gap-4 rounded-lg border border-[#dfe5f0] bg-surface-white p-6 xl:h-[184px]"
            >
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-[18px] font-bold leading-[1.5] text-text-primary">
                  {step.title}
                </h2>
                <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                  {step.description}
                </p>
              </div>

              <Link
                to={step.to}
                className="flex h-11 w-full items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] py-[10px] text-center font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus lg:w-fit lg:px-6"
              >
                {step.action}
              </Link>
            </article>
          ))}
        </div>
      </main>

      <div className="pt-8">
        <SiteFooter />
      </div>
    </div>
  );
}
