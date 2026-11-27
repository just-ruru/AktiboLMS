import { Link } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";

const benefits = [
  { number: "01", title: "Your courses, together", description: "Spend less time looking around and more time finding the learning that matters to you." },
  { number: "02", title: "A clear place to start", description: "From exploring a course to returning to your account, know where to go next." },
  { number: "03", title: "Your own learning space", description: "Keep your profile and contact details organised, so you can focus on your next step." },
];

const steps = [
  { number: "01", title: "Create your account", description: "Start with a profile that is yours." },
  { number: "02", title: "Explore a course", description: "Find the right next step for your goals." },
  { number: "03", title: "Keep coming back", description: "Make learning part of your routine." },
];

const faqs = [
  { question: "How do I get started?", answer: "Choose Create an account, then complete your registration." },
  { question: "Already have an account?", answer: "Use Log in to return to your AKTIBO account." },
  { question: "What if I forget my password?", answer: "Choose Forgot Password on the login page to request a reset link." },
];

function WorkspacePreview() {
  return (
    <div className="relative h-[426px] w-full max-w-[620px] overflow-hidden rounded-[14px] bg-white text-text-primary">
      <div className="flex h-[52px] items-center justify-between bg-surface-light px-5 font-sans text-[13px] font-semibold text-aktif-navy">
        <span>AKTIBO / My learning</span><span className="text-[10px] text-text-secondary">EXAMPLE</span>
      </div>
      <div className="grid h-[374px] grid-cols-1 gap-6 sm:grid-cols-[140px_minmax(0,1fr)]">
        <aside className="hidden space-y-4 bg-surface-light px-3 pt-7 font-sans text-[12px] text-text-secondary sm:block">
          <p className="pl-1.5 text-[9px] font-bold">WORKSPACE</p>
          <p className="flex h-[38px] items-center rounded-[6px] bg-aktif-navy px-3 font-semibold text-white">My learning</p>
          <p className="pl-3">My account</p><p className="pl-3">Get help</p>
        </aside>
        <div className="min-w-0 pr-5 pt-6 font-sans">
          <h2 className="text-[23px] font-semibold leading-[1.45]">Welcome back.</h2>
          <p className="text-[13px] leading-[1.45] text-text-secondary">A small step forward starts here.</p>
          <article className="mt-5 flex h-[226px] flex-col items-start rounded-[10px] border border-[#dee4ee] bg-white px-5 pt-[18px]">
            <p className="text-[9px] font-bold text-text-secondary">YOUR LEARNING SPACE</p>
            <h3 className="mt-3 text-[19px] font-semibold">Courses in one place</h3>
            <p className="mt-2 max-w-[330px] text-[12px] leading-[1.45] text-text-secondary">Explore courses and find the right next step for you.</p>
            <Link to="/courses" className="mt-4 mb-4 inline-flex h-9 shrink-0 items-center rounded-[6px] bg-aktif-navy px-4 text-[12px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#162a75]">Explore courses</Link>
          </article>
        </div>
      </div>
      <div className="absolute bottom-[10px] right-2 h-[100px] w-[min(266px,calc(100%-16px))] rounded-[12px] bg-aktif-gold px-6 py-[18px] text-[21px] font-semibold leading-[1.45] text-aktif-navy shadow-md sm:right-6">
        <p>A little progress.</p><p>Every day.</p>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-text-primary animate-page-fade">
      <Navbar />
      <main>
        <section className="min-h-[656px] bg-aktif-navy px-6 pb-12 pt-10 text-text-inverse md:px-[72px] md:pt-[72px]">
          <div className="mx-auto max-w-page">
            <div className="mb-[18px] flex max-w-[895px] items-center justify-between gap-4">
              <p className="text-[12px] font-bold leading-[1.45] text-aktif-gold">A MORE FOCUSED WAY TO LEARN</p>
              <p className="hidden text-[11px] font-medium leading-[1.45] text-[#d1d8ee] sm:block">AN EXAMPLE OF YOUR LEARNING SPACE</p>
            </div>
            <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,600fr)_minmax(0,620fr)] xl:gap-[clamp(24px,5.27vw,76px)]">
              <div className="flex flex-col items-start pt-0.5">
                <h1 className="text-[clamp(44px,4.45vw,64px)] font-semibold leading-[1.1] tracking-[-1.92px]">
                  Less searching.<br /><span className="text-aktif-gold">More learning.</span>
                </h1>
                <p className="mt-[22px] max-w-[520px] pt-3 text-[18px] leading-[1.45] text-[#d1d8ee] sm:text-[20px]">Make room for your next step. Bring your courses and your learning journey together with AKTIBO LMS.</p>
                <div className="mt-[50px] flex flex-wrap gap-4">
                  <Link to="/register" className="flex h-14 w-[216px] items-center justify-center rounded-lg bg-aktif-gold px-4 text-center text-[16px] font-semibold text-aktif-navy transition hover:-translate-y-0.5 hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aktif-gold">Create an account</Link>
                  <Link to="/courses" className="flex h-14 w-[200px] items-center justify-center rounded-lg border border-[#5d6994] px-4 text-center text-[16px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aktif-gold">Explore courses</Link>
                </div>
                <Link to="/login" className="mt-3 text-[14px] leading-[1.45] text-[#d1d8ee] underline-offset-4 hover:underline">Already learning with us? Log in to continue.</Link>
                <div className="mt-7 flex items-center gap-3"><span className="flex h-6 w-16 items-center justify-center rounded-full bg-[#ffb600] text-[10px] font-medium text-aktif-navy">NEW</span><span className="text-[12px] text-[#cfd6e5]">Start your learning journey</span></div>
              </div>
              <div className="relative mt-1"><WorkspacePreview /></div>
            </div>
          </div>
        </section>
        <section className="bg-aktif-gold px-6 py-7 md:px-[72px]">
          <div className="mx-auto grid max-w-page gap-6 md:grid-cols-3 md:gap-0">
            {[["Find your direction.", "Explore what comes next."], ["Build your momentum.", "Make time for learning."], ["Keep moving forward.", "One step at a time."]].map(([title, description], index) => <article key={title} className={`min-h-[66px] md:px-8 ${index === 0 ? "md:pl-0" : "md:border-l md:border-[#c28b00]"}`}><h2 className="text-[20px] font-semibold text-aktif-navy">{title}</h2><p className="mt-1 text-[14px] text-aktif-navy">{description}</p></article>)}
          </div>
        </section>
        <section className="bg-white px-6 py-[58px] md:px-[72px]">
          <div className="mx-auto max-w-page">
            <p className="text-[12px] font-bold text-text-secondary">LEARNING, WITH LESS FRICTION</p>
            <h2 className="mt-3 text-[32px] font-semibold sm:text-[38px]">More focus. Fewer distractions.</h2>
            <p className="mt-1 text-[18px] text-text-secondary">A simpler starting point for the things that matter.</p>
            <div className="mt-[39px] grid gap-6 md:grid-cols-3">
              {benefits.map((benefit) => <article key={benefit.number} className="min-h-[208px] rounded-[12px] bg-surface-light px-6 py-[22px]"><p className="text-[14px] font-bold text-aktif-navy">{benefit.number}</p><h3 className="mt-3 text-[21px] font-semibold">{benefit.title}</h3><p className="mt-3 text-[16px] leading-[1.45] text-text-secondary">{benefit.description}</p></article>)}
            </div>
          </div>
        </section>
        <section className="bg-surface-light px-6 py-[54px] md:px-[72px]">
          <div className="mx-auto max-w-page">
            <p className="text-[12px] font-bold text-text-secondary">MAKE YOUR NEXT MOVE</p>
            <h2 className="mt-2 text-[32px] font-semibold sm:text-[38px]">A simple start. A steady rhythm.</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {steps.map((step) => <article key={step.number} className="relative"><span className="relative z-[1] inline-flex size-12 items-center justify-center rounded-[10px] bg-aktif-navy text-[16px] font-semibold text-white">{step.number}</span><h3 className="mt-4 text-[22px] font-semibold">{step.title}</h3><p className="mt-2 text-[16px] text-text-secondary">{step.description}</p></article>)}
            </div>
          </div>
        </section>
        <section className="bg-white px-6 py-[52px] md:px-[72px]">
          <div className="mx-auto grid max-w-page gap-8 md:grid-cols-2 md:gap-8">
            <article className="min-h-[336px] rounded-2xl bg-aktif-navy p-8 text-white"><p className="text-[11px] font-bold text-aktif-gold">EXPLORE AKTIBO</p><h2 className="mt-4 text-[32px] font-semibold leading-[1.45]">Make space for<br />something new.</h2><p className="mt-3 text-[16px] leading-[1.45] text-[#d1d8ee]">Your next chapter starts with curiosity.<br />Take a look at the courses on AKTIBO.</p><Link to="/courses" className="mt-4 inline-flex h-[52px] items-center rounded-lg bg-aktif-gold px-5 font-semibold text-aktif-navy transition hover:-translate-y-0.5 hover:bg-amber-400">Explore courses</Link></article>
            <article className="min-h-[336px] rounded-2xl bg-surface-light p-8"><p className="text-[11px] font-bold text-text-secondary">FIND YOUR FIT</p><h2 className="mt-4 text-[32px] font-semibold leading-[1.45]">Your goals.<br />Your next step.</h2><p className="mt-3 text-[16px] leading-[1.45] text-text-secondary">Review pricing before you get started<br />and choose what works for you.</p><Link to="/pricing" className="mt-4 inline-flex h-[52px] items-center rounded-lg border border-[#dee4ee] bg-white px-5 font-semibold text-aktif-navy transition hover:-translate-y-0.5 hover:bg-slate-50">View pricing</Link></article>
          </div>
        </section>
        <section className="bg-surface-light px-6 py-[56px] md:px-[72px]">
          <div className="mx-auto grid max-w-page gap-8 md:grid-cols-[217px_minmax(0,1fr)] md:gap-[75px]">
            <div><p className="text-[12px] font-bold text-text-secondary">A LITTLE CLARITY</p><h2 className="mt-4 text-[34px] font-semibold leading-[1.35]">Before you<br />get started.</h2><p className="mt-4 text-[16px] leading-[1.45] text-text-secondary">A few helpful answers for your first steps on AKTIBO.</p></div>
            <div>{faqs.map((faq, index) => <article key={faq.question} className={`min-h-[112px] py-5 ${index < faqs.length - 1 ? "border-b border-[#dee4ee]" : ""}`}><h3 className="text-[20px] font-semibold">{faq.question}</h3><p className="mt-2 text-[16px] text-text-secondary">{faq.answer}</p></article>)}</div>
          </div>
        </section>
        <section className="bg-aktif-navy px-6 py-[52px] text-white md:px-[72px]">
          <div className="mx-auto max-w-page">
            <p className="text-[12px] font-bold text-aktif-gold">YOUR NEXT CHAPTER</p>
            <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><h2 className="text-[36px] font-semibold sm:text-[44px]">Start small. Go further.</h2><Link to="/register" className="flex h-14 w-full items-center justify-center rounded-lg bg-aktif-gold px-6 font-semibold text-aktif-navy transition hover:-translate-y-0.5 hover:bg-amber-400 md:w-[288px]">Create an account</Link></div>
            <div className="mt-3 flex flex-col gap-3 text-[16px] text-[#d1d8ee] sm:flex-row sm:items-center sm:justify-between"><p>Make your next step a learning step with AKTIBO.</p><Link to="/login" className="text-[14px] underline underline-offset-4">Already registered? Log in</Link></div>
          </div>
        </section>
      </main>
      <footer className="bg-aktif-navy px-6 pb-8 pt-8 text-white md:px-[72px]">
        <div className="mx-auto max-w-page border-t border-[#304074] pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="flex items-center gap-3"><img src="/assets/aktibo-symbol.png" alt="" className="size-10 object-contain" /><span className="font-display text-[18px]">AKTIBO LMS</span></Link>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-2">{[{ to: "/", label: "Home" }, { to: "/courses", label: "Courses" }, { to: "/pricing", label: "Pricing" }, { to: "/login", label: "Log in" }].map((item) => <Link key={item.label} to={item.to} className="flex min-h-11 items-center justify-center rounded-lg px-4 text-[14px] font-medium hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-aktif-gold">{item.label}</Link>)}</nav>
          </div>
          <div className="mt-3 flex flex-col gap-2 text-[14px] text-[#d1d8ee] sm:flex-row sm:items-center sm:justify-between"><p>A more focused way to learn.</p><p>Learning, with focus.</p></div>
        </div>
      </footer>
    </div>
  );
}
