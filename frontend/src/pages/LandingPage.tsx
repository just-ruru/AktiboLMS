import { Link } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'

const BENEFITS = [
  {
    number: '01',
    title: 'Your courses, together',
    description:
      'Spend less time looking around and more time finding the learning that matters to you.',
  },
  {
    number: '02',
    title: 'A clear place to start',
    description:
      'From exploring a course to returning to your account, know where to go next.',
  },
  {
    number: '03',
    title: 'Your own learning space',
    description:
      'Keep your profile and contact details organised, so you can focus on your next step.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Create your account',
    description: 'Start with a profile that is yours.',
  },
  {
    number: '02',
    title: 'Explore a course',
    description: 'Find the right next step for your goals.',
  },
  {
    number: '03',
    title: 'Keep coming back',
    description: 'Make learning part of your routine.',
  },
]

const QUESTIONS = [
  {
    question: 'How do I get started?',
    answer: 'Create an account, then explore the courses available to you.',
  },
  {
    question: 'Already have an account?',
    answer: 'Log in to return to your AKTIBO account.',
  },
  {
    question: 'What if I forget my password?',
    answer: 'Use Forgot Password on the login page to request a reset link.',
  },
]

export function LandingPage() {
  return (
    <div className="landing-page animate-page-fade">
      <Navbar />

      <main>
        <section className="landing-hero">
          <div className="landing-hero__inner">
            <div className="landing-hero__copy">
              <p className="eyebrow">A more focused way to learn</p>
              <h1>
                Less searching.
                <span>More learning.</span>
              </h1>
              <p className="landing-hero__description">
                Make room for your next step. Bring your courses and your
                learning journey together with AKTIBO LMS.
              </p>
              <div className="landing-hero__actions">
                <Link to="/register" className="button button--primary">
                  Create an account
                </Link>
                <Link to="/register" className="button button--outline">
                  Explore courses
                </Link>
              </div>
              <p className="landing-hero__login">
                Already learning with us? <Link to="/login">Log in</Link> to
                continue.
              </p>
            </div>

            <div className="learning-preview" aria-label="Example learning dashboard">
              <div className="learning-preview__topbar">
                <span>AKTIBO / My learning</span>
                <span className="learning-preview__tag">Example</span>
              </div>
              <div className="learning-preview__body">
                <aside className="learning-preview__sidebar">
                  <span className="learning-preview__label">Workspace</span>
                  <span className="learning-preview__selected">My learning</span>
                  <span>My account</span>
                  <span>Get help</span>
                </aside>
                <div className="learning-preview__content">
                  <h2>Welcome back.</h2>
                  <p>A small step forward starts here.</p>
                  <div className="learning-preview__course">
                    <span className="learning-preview__label">Continue learning</span>
                    <h3>Learning essentials</h3>
                    <p>Lesson 3 of 5</p>
                    <div className="learning-preview__progress">
                      <span />
                    </div>
                    <div className="learning-preview__next">
                      <div>
                        <span className="learning-preview__label">Up next</span>
                        <p>Build your learning routine</p>
                      </div>
                      <Link to="/register">Continue lesson</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="learning-preview__note">
                A little progress.
                <br />
                Every day.
              </div>
            </div>
          </div>
        </section>

        <section className="learning-principles" aria-label="Learning principles">
          <div>
            <h2>Find your direction.</h2>
            <p>Explore what comes next.</p>
          </div>
          <div>
            <h2>Build your momentum.</h2>
            <p>Make time for learning.</p>
          </div>
          <div>
            <h2>Keep moving forward.</h2>
            <p>One step at a time.</p>
          </div>
        </section>

        <section className="landing-section landing-benefits">
          <div className="landing-section__inner">
            <p className="eyebrow">Learning, with less friction</p>
            <h2>More focus. Fewer distractions.</h2>
            <p className="landing-section__intro">
              A simpler starting point for the things that matter.
            </p>
            <div className="benefit-grid">
              {BENEFITS.map((benefit) => (
                <article className="benefit-card" key={benefit.number}>
                  <span>{benefit.number}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section landing-steps">
          <div className="landing-section__inner">
            <p className="eyebrow">Make your next move</p>
            <h2>A simple start. A steady rhythm.</h2>
            <ol className="steps-grid">
              {STEPS.map((step) => (
                <li className="step-card" key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="landing-section landing-choices">
          <div className="landing-section__inner choice-grid">
            <article className="choice-card choice-card--primary">
              <p className="eyebrow">Explore AKTIBO</p>
              <h2>Make space for something new.</h2>
              <p>
                Your next chapter starts with curiosity. Take a look at the
                courses on AKTIBO.
              </p>
              <Link to="/register" className="button button--primary">
                Explore courses
              </Link>
            </article>
            <article className="choice-card">
              <p className="eyebrow">Find your fit</p>
              <h2>Your goals. Your next step.</h2>
              <p>
                Get started with a learning space that helps you stay focused.
              </p>
              <Link to="/register" className="button button--light">
                Create an account
              </Link>
            </article>
          </div>
        </section>

        <section className="landing-section landing-faq">
          <div className="landing-section__inner faq-layout">
            <div>
              <p className="eyebrow">A little clarity</p>
              <h2>Before you get started.</h2>
              <p>A few helpful answers for your first steps on AKTIBO.</p>
            </div>
            <div className="faq-list">
              {QUESTIONS.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-cta" id="get-started">
          <div className="landing-cta__inner">
            <div>
              <p className="eyebrow">Your next chapter</p>
              <h2>Start small. Go further.</h2>
              <p>Make your next step a learning step with AKTIBO.</p>
            </div>
            <div className="landing-cta__actions">
              <Link to="/register" className="button button--primary">
                Create an account
              </Link>
              <p>
                Already registered? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer__inner">
          <div className="landing-footer__brand">
            <Link to="/" className="site-nav__brand">
              <img src="/assets/aktibo-symbol.png" alt="" />
              <span>AKTIBO LMS</span>
            </Link>
            <p>A more focused way to learn.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <Link to="/student/courses">Courses</Link>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </nav>
          <p>Learning, with focus.</p>
        </div>
      </footer>
    </div>
  )
}
