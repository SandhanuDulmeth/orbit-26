import { Component, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Check,
  Code2,
  Command,
  Download,
  ExternalLink,
  Github,
  Globe2,
  Menu,
  Minus,
  Pause,
  Play,
  Plus,
  Radio,
  Rocket,
  Sparkles,
  Terminal,
  Users,
  X,
  Zap,
  Crosshair,
  Layers3,
} from 'lucide-react';
import Orb from './components/react-bits/Orb/Orb';
import DecryptedText from './components/react-bits/DecryptedText/DecryptedText';
import SpotlightCard from './components/react-bits/SpotlightCard/SpotlightCard';
import Magnet from './components/react-bits/Magnet/Magnet';
import CountUp from './components/react-bits/CountUp/CountUp';
import ScrollVelocity from './components/react-bits/ScrollVelocity/ScrollVelocity';
import Registration from './components/Registration';
import { asset, faqs, missions, schedule } from './data';

class VisualBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, children, right }) {
  return (
    <div className="section-label">
      <span>
        <i /> {number} / {children}
      </span>
      <span>{right}</span>
    </div>
  );
}

function OrbitalDiagram({ type = 'human', active = false }) {
  return (
    <div className={`diagram diagram-${type} ${active ? 'diagram-active' : ''}`} aria-hidden="true">
      <div className="diagram-grid" />
      {type === 'human' ? (
        <>
          <div className="core core-a" />
          <div className="core core-b" />
          <div className="core core-c" />
          <div className="core-center">
            <Command size={38} strokeWidth={1} />
          </div>
          <span className="diagram-dot dot-a" />
          <span className="diagram-dot dot-b" />
        </>
      ) : type === 'earth' ? (
        <>
          <div className="wire-globe">
            <i />
            <i />
            <i />
            <b />
            <b />
            <b />
          </div>
          <div className="globe-orbit" />
          <span className="diagram-dot dot-a" />
        </>
      ) : (
        <>
          <div className="cube cube-one" />
          <div className="cube cube-two" />
          <div className="cube cube-three" />
          <div className="core-center">
            <ArrowUpRight size={57} strokeWidth={0.8} />
          </div>
        </>
      )}
      <span className="diagram-corner">+</span>
      <span className="diagram-corner corner-right">+</span>
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const remaining = Math.max(0, new Date('2026-12-19T08:00:00+05:30').getTime() - now);
  const values = [
    Math.floor(remaining / 86400000),
    Math.floor(remaining / 3600000) % 24,
    Math.floor(remaining / 60000) % 60,
    Math.floor(remaining / 1000) % 60,
  ];
  return (
    <div className="countdown-panel">
      <div className="countdown-label">
        <span className="live-dot" />
        <span>{remaining ? 'NEXT LAUNCH IN' : 'DEMO LAUNCH WINDOW REACHED'}</span>
        <span className="countdown-year">T—026</span>
      </div>
      <div className="countdown" role="timer" aria-label="Time until the fictional build weekend">
        {values.map((value, index) => (
          <div key={index}>
            <strong>{String(value).padStart(2, '0')}</strong>
            <small>{['DAYS', 'HOURS', 'MINUTES', 'SECONDS'][index]}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ openRegistration, motionOff, setMotionOff }) {
  const [boost, setBoost] = useState(false);
  const heroRef = useRef(null);
  const visible = useInView(heroRef, { margin: '100px' });
  const reduce = useReducedMotion();
  const off = motionOff || reduce;
  useEffect(() => {
    if (!boost) return;
    const timer = setTimeout(() => setBoost(false), 5000);
    return () => clearTimeout(timer);
  }, [boost]);
  return (
    <section
      className={`hero ${boost ? 'boosting' : ''}`}
      id="home"
      ref={heroRef}
      aria-labelledby="hero-title"
    >
      <div className="starfield" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-topline mono">
        <span>
          <span className="live-dot" />{' '}
          {off ? (
            'THE NEXT GENERATION OF BUILDERS'
          ) : (
            <DecryptedText
              text="THE NEXT GENERATION OF BUILDERS"
              animateOn="view"
              sequential
              speed={25}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            />
          )}
        </span>
        <span>6.9022° N &nbsp; 79.8611° E</span>
      </div>
      <div className="hero-visual" aria-label="Interactive plasma orbit">
        <div className="orb-fallback" aria-hidden="true" />
        <VisualBoundary>
          <Orb
            colors={['#ff502c', '#ffbe7d', '#703a7d']}
            backgroundColor="#09090d"
            size={0.92}
            glow={1.4}
            bleed={1.2}
            wobble={1.15}
            trail={1.4}
            speed={boost ? 3 : 0.55}
            forceHoverState={boost}
            hoverIntensity={0.45}
            tiltX={12}
            tiltY={-15}
            paused={off || !visible}
            dpr={1.25}
          />
        </VisualBoundary>
        <div className="orb-axis axis-one" />
        <div className="orb-axis axis-two" />
        <div className="orb-center">
          <span className="orb-cross">
            <Crosshair size={22} strokeWidth={1} />
          </span>
          <span className="mono">{boost ? 'WARP DRIVE' : 'IDEAS HAVE GRAVITY'}</span>
          <strong>{boost ? 'ENGAGED' : 'O—26'}</strong>
        </div>
        <div className="orb-coordinate coordinate-a">
          <i />
          <span>
            CREATIVITY
            <br />
            <b>UNRESTRICTED</b>
          </span>
        </div>
        <div className="orb-coordinate coordinate-b">
          <span>SIGNAL STRENGTH</span>
          <div className="signal-bars">
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} style={{ '--i': i }} />
            ))}
          </div>
          <b>
            {boost ? '∞' : '98.6'}
            <small>%</small>
          </b>
        </div>
        <div className="orb-caption mono">
          <span className="cross">+</span> MOVE TO DISTORT. CLICK TO PULSE.
        </div>
      </div>
      <div className="hero-content">
        <div className="event-pill">
          <span className="pill-icon">
            <Rocket size={12} />
          </span>
          36-HOUR STUDENT HACKATHON<span className="pill-edition">EDITION 01</span>
        </div>
        <h1 id="hero-title">
          <span>BEYOND</span>
          <span>
            THE <span className="outlined">POSSIBLE</span>
            <span className="hero-period">.</span>
          </span>
        </h1>
        <p className="hero-subtitle">
          The future doesn’t build itself.
          <br />
          Find your people. Break the expected.
          <br />
          <span>Make something that matters.</span>
        </p>
        <div className="hero-buttons">
          <Magnet padding={35} magnetStrength={7} maxOffset={7} disabled={off}>
            <button className="button primary" onClick={openRegistration}>
              Join the mission <ArrowUpRight size={19} />
            </button>
          </Magnet>
          <button
            className={`button ghost ${boost ? 'engaged' : ''}`}
            onClick={() => setBoost((current) => !current)}
            aria-pressed={boost}
          >
            <span className="play-circle">
              {boost ? <Pause size={11} /> : <Play size={11} fill="currentColor" />}
            </span>
            {boost ? 'Warp drive engaged' : 'Experience the orbit'}
          </button>
        </div>
        <div className="hero-event">
          <span>
            <i />
            18—20 DEC 2026
          </span>
          <span>
            <Globe2 size={13} />
            UCSC · COLOMBO, LK
          </span>
        </div>
      </div>
      <div className="hero-footer">
        <a href="#mission" className="discover">
          <span className="mouse-scroll">
            <i />
          </span>
          SCROLL TO EXPLORE
          <ArrowDown size={13} />
        </a>
        <span className="hero-note mono">
          FOR THE CURIOUS.
          <br />
          BUILT BY THE RESTLESS.
        </span>
        <button
          className="motion-control"
          onClick={() => setMotionOff((value) => !value)}
          disabled={!!reduce}
          aria-pressed={!!off}
          aria-label={reduce ? 'Reduced motion enabled' : off ? 'Enable motion' : 'Pause motion'}
        >
          {off ? <Play size={12} /> : <Pause size={12} />}
          <span>{reduce ? 'REDUCED MOTION' : off ? 'MOTION OFF' : 'MOTION ON'}</span>
        </button>
      </div>
    </section>
  );
}

function MissionSection({ motionOff }) {
  return (
    <section className="mission-section section" id="mission">
      <SectionLabel number="01" right="IDEAS ARE ONLY THE BEGINNING">
        THE MISSION
      </SectionLabel>
      <div className="mission-layout">
        <Reveal>
          <span className="eyebrow">THIS IS YOUR LAUNCHPAD.</span>
          <h2>
            Some ideas
            <br />
            are too good
            <br />
            to stay <em>ideas.</em>
          </h2>
          <p className="intro-copy">
            For the “what if” thinkers. The midnight makers.
            <br />
            The ones who just have to try.
          </p>
        </Reveal>
        <Reveal className="mission-description" delay={0.15}>
          <div className="mission-quote">
            <span className="quote-star">✳</span>
            <p>
              36 hours to turn
              <br />
              <span>“imagine if”</span> into
              <br />
              <span>“look what we built.”</span>
            </p>
          </div>
          <p>
            ORBIT brings curious minds into one room with a shared mission: build something beyond what you
            thought possible. Find your crew, pick a challenge, and go from first spark to working prototype.
          </p>
          <p>
            No perfect résumés. No prescribed answers.
            <br />
            Just the space to experiment, together.
          </p>
          <span className="concept-label">
            <Radio size={12} /> A FICTIONAL IEEE CS UCSC RECRUITMENT CONCEPT
          </span>
        </Reveal>
      </div>
      <div className="stat-grid">
        {[
          { value: 36, unit: 'HOURS', label: 'One focused build sprint', Icon: Zap },
          { value: 3, unit: 'MISSIONS', label: 'Different paths. Shared ambition.', Icon: Crosshair },
          {
            value: 4,
            prefix: '2–',
            unit: 'CREW MEMBERS',
            label: 'Better ideas happen together',
            Icon: Users,
          },
          { value: 1, unit: 'GIANT LEAP', label: 'A new trajectory starts here', Icon: Rocket },
        ].map(({ value, unit, label, Icon, prefix }, i) => (
          <Reveal className="stat" key={unit} delay={i * 0.06}>
            <Icon size={17} />
            <div>
              <strong>
                {prefix}
                {motionOff ? value : <CountUp to={value} duration={1.5} />}
              </strong>
              <span>{unit}</span>
            </div>
            <p>{label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Tracks({ selected, setSelected, openRegistration, motionOff }) {
  const current = missions.find((mission) => mission.id === selected);
  return (
    <section className="tracks-section section" id="tracks">
      <SectionLabel number="02" right="CHOOSE YOUR COORDINATES">
        THE FRONTIERS
      </SectionLabel>
      <Reveal className="section-heading">
        <h2>
          Different missions.
          <br />
          <span className="dim">The same restless spirit.</span>
        </h2>
        <p>
          Pick a problem that keeps you thinking.
          <br />
          Build the thing you wish existed.
        </p>
      </Reveal>
      <div className="track-grid">
        {missions.map((mission, index) => (
          <Reveal key={mission.id} delay={index * 0.08}>
            <SpotlightCard
              className={`track-card ${selected === mission.id ? 'selected' : ''}`}
              spotlightColor={mission.color}
              intensity={0.1}
              borderGlow={0.7}
              style={{ '--track-color': mission.color }}
            >
              <button
                onClick={() => setSelected(mission.id)}
                aria-pressed={selected === mission.id}
                aria-controls="mission-brief"
              >
                <div className="track-card-top mono">
                  <span>MISSION / {mission.number}</span>
                  <ArrowUpRight size={17} />
                </div>
                <OrbitalDiagram type={mission.id} active={!motionOff} />
                <span className="track-category mono">{mission.category}</span>
                <h3>{mission.name}</h3>
                <p>{mission.tagline}</p>
                <div className="track-select mono">
                  <span>{selected === mission.id ? 'MISSION SELECTED' : 'EXPLORE MISSION'}</span>
                  {selected === mission.id ? (
                    <span className="selected-dot">
                      <Check size={11} />
                    </span>
                  ) : (
                    <Plus size={16} />
                  )}
                </div>
              </button>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      <div
        className="mission-brief"
        id="mission-brief"
        aria-live="polite"
        style={{ '--track-color': current.color }}
      >
        <div className="brief-terminal">
          <div className="terminal-header">
            <span className="terminal-dots">
              <i />
              <i />
              <i />
            </span>
            <span>orbit / mission-{current.number}.brief</span>
            <Terminal size={13} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              className="terminal-content"
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <p>
                <span className="terminal-command">$</span> initialize <span>--{current.id}</span>
              </p>
              <h3>{current.name}</h3>
              <p className="brief-copy">{current.brief}</p>
              <div className="brief-tags">
                {current.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <span className="terminal-ready">
                <i />
                MISSION BRIEF LOADED<span className="terminal-caret">▌</span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="brief-prompt">
          <span className="eyebrow">
            <Sparkles size={13} /> YOUR FIRST SPARK
          </span>
          <p>{current.prompt}</p>
          <button className="text-button" onClick={openRegistration}>
            This is my mission <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

function FlightPlan() {
  const [day, setDay] = useState(0);
  const tabRefs = useRef([]);
  function moveTab(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % 3;
    if (event.key === 'ArrowLeft') next = (index + 2) % 3;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = 2;
    if (next === undefined) return;
    event.preventDefault();
    setDay(next);
    tabRefs.current[next].focus();
  }
  return (
    <section className="flight-section section" id="flight-plan">
      <SectionLabel number="03" right="18—20 DECEMBER / ALL TIMES SLST">
        FLIGHT PLAN
      </SectionLabel>
      <div className="flight-layout">
        <Reveal className="flight-intro">
          <span className="eyebrow">FROM ZERO TO SOMETHING REAL.</span>
          <h2>
            A weekend.
            <br />A whole new
            <br />
            <em>trajectory.</em>
          </h2>
          <p>
            Great things don’t happen on autopilot.
            <br />
            Here’s your path from first hello to final demo.
          </p>
          <a className="text-button" href={asset('orbit-26.ics')} download>
            <Download size={15} /> Add build weekend to calendar <ArrowUpRight size={15} />
          </a>
          <div className="flight-orbit" aria-hidden="true">
            <div className="flight-path">
              <i />
              <i />
              <i />
            </div>
            <Rocket size={25} />
            <span>36H / NO SMALL IDEAS</span>
          </div>
        </Reveal>
        <Reveal className="schedule" delay={0.12}>
          <div className="schedule-tabs" role="tablist" aria-label="Event day">
            {schedule.map((item, index) => (
              <button
                key={item.date}
                role="tab"
                aria-selected={day === index}
                aria-controls="schedule-panel"
                id={`day-tab-${index}`}
                tabIndex={day === index ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                onKeyDown={(event) => moveTab(event, index)}
                onClick={() => setDay(index)}
              >
                <span>
                  <strong>{item.date}</strong> DEC
                </span>
                <small>{item.label}</small>
                {day === index && <motion.i layoutId="schedule-indicator" />}
              </button>
            ))}
          </div>
          <div role="tabpanel" id="schedule-panel" aria-labelledby={`day-tab-${day}`} tabIndex={0}>
            <AnimatePresence mode="wait">
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 9 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -9 }}
                transition={{ duration: 0.18 }}
              >
                <div className="schedule-title">
                  <span className="live-dot" />
                  <h3>{schedule[day].title}</h3>
                </div>
                <div className="schedule-items">
                  {schedule[day].items.map((item, index) => (
                    <article key={item.time}>
                      <div className="schedule-time">
                        <span>{item.time}</span>
                        <i />
                      </div>
                      <div>
                        <span className="schedule-tag">{item.tag}</span>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                      <span className="schedule-index">0{index + 1}</span>
                    </article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="schedule-foot">
            <Globe2 size={12} /> SRI LANKA STANDARD TIME · UTC+5:30<span>CONCEPT SCHEDULE</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Payload() {
  return (
    <section className="payload-section section">
      <SectionLabel number="04" right="MORE THAN A LINE ON YOUR RÉSUMÉ">
        THE REAL PAYLOAD
      </SectionLabel>
      <Reveal className="section-heading">
        <h2>
          Come for the build.
          <br />
          <span className="dim">Leave with momentum.</span>
        </h2>
      </Reveal>
      <div className="payload-grid">
        <Reveal className="payload-feature">
          <div className="code-window">
            <div>
              <span className="terminal-dots">
                <i />
                <i />
                <i />
              </span>
              <small>your-next-chapter.js</small>
              <Code2 size={15} />
            </div>
            <pre>
              <span className="code-purple">const</span> nextChapter = {'{'}
              <br /> idea: <span className="code-orange">'something that matters'</span>,<br /> crew:{' '}
              <span className="code-green">'your kind of people'</span>,<br /> limits:{' '}
              <span className="code-purple">null</span>,<br /> status:{' '}
              <span className="code-green">'ready to ship'</span>
              <br />
              {'};'}
              <br />
              <br />
              <span className="code-muted">// the rest is up to you.</span>
              <br />
              <span className="code-orange">launch</span>(nextChapter);
              <span className="terminal-caret">▌</span>
            </pre>
            <div className="code-status">
              <span>
                <Check size={11} /> BUILD SUCCESSFUL
              </span>
              <span>36h well spent</span>
            </div>
          </div>
          <div className="payload-copy">
            <span className="eyebrow">01 / PROOF, NOT JUST POTENTIAL</span>
            <h3>Something you actually shipped.</h3>
            <p>
              A working prototype. A portfolio story. And the confidence that comes from turning a blank
              screen into something real.
            </p>
          </div>
        </Reveal>
        <div className="payload-side">
          <Reveal>
            <SpotlightCard className="payload-card" spotlightColor="#b9a3ff">
              <div className="crew-avatars" aria-hidden="true">
                <span>
                  <Code2 />
                </span>
                <span>
                  <Layers3 />
                </span>
                <span>
                  <Command />
                </span>
                <span>YOU</span>
              </div>
              <span className="eyebrow">02 / FIND YOUR FREQUENCY</span>
              <h3>
                Your people.
                <br />
                Your next crew.
              </h3>
              <p>Meet the minds you’ll want to build the next thing with.</p>
              <ArrowUpRight className="payload-arrow" size={22} />
            </SpotlightCard>
          </Reveal>
          <Reveal>
            <SpotlightCard className="payload-card" spotlightColor="#91d7ba">
              <Zap className="payload-zap" size={38} strokeWidth={1} />
              <span className="eyebrow">03 / RESET YOUR LIMITS</span>
              <h3>
                A bigger idea
                <br />
                of what’s possible.
              </h3>
              <p>New tools. Fresh perspectives. A little more belief in yourself.</p>
              <ArrowUpRight className="payload-arrow" size={22} />
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <section className="faq-section section" id="faq">
      <SectionLabel number="05" right="A LITTLE CLARITY BEFORE TAKEOFF">
        PRE-FLIGHT CHECK
      </SectionLabel>
      <div className="faq-layout">
        <Reveal>
          <h2>
            Good questions.
            <br />
            <span className="dim">Clear signals.</span>
          </h2>
          <p>Curiosity is kind of the whole point.</p>
          <div className="faq-mark" aria-hidden="true">
            ?<span>↗</span>
          </div>
        </Reveal>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className={`faq-item ${active === index ? 'open' : ''}`} key={question}>
              <h3>
                <button
                  aria-expanded={active === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  onClick={() => setActive(active === index ? null : index)}
                >
                  <span className="faq-index">0{index + 1}</span>
                  {question}
                  <span className="faq-toggle">
                    {active === index ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
              </h3>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                hidden={active !== index}
              >
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [registration, setRegistration] = useState(false);
  const [selected, setSelected] = useState('human');
  const [menu, setMenu] = useState(false);
  const [motionOff, setMotionOff] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const nav = [
    ['mission', 'The mission'],
    ['tracks', 'The frontiers'],
    ['flight-plan', 'Flight plan'],
    ['faq', 'FAQs'],
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -60% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function escape(event) {
      if (event.key === 'Escape') {
        setMenu(false);
        document.querySelector('.menu-toggle')?.focus();
      }
    }
    if (menu) document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [menu]);
  const openRegistration = () => {
    setMenu(false);
    setRegistration(true);
  };
  return (
    <MotionConfig reducedMotion={motionOff ? 'always' : 'user'}>
      <div className={`app ${motionOff || reduce ? 'motion-off' : ''}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <motion.div className="reading-progress" style={{ scaleX: progress }} />
        <div className="concept-banner">
          <span>IEEE COMPUTER SOCIETY · UCSC</span>
          <span>
            FICTIONAL HACKATHON / WEB TEAM CHALLENGE <ArrowUpRight size={10} />
          </span>
        </div>
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="ORBIT 26 home">
            <span className="brand-symbol" />
            ORBIT<span className="brand-year">’26</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map(([id, title]) => (
              <a href={`#${id}`} key={id} aria-current={activeSection === id ? 'location' : undefined}>
                {title}
              </a>
            ))}
          </nav>
          <div className="header-end">
            <span className="header-status mono">
              <span className="live-dot" /> OPEN FOR EXPLORERS
            </span>
            <button className="button header-cta" onClick={openRegistration}>
              Get on board <ArrowUpRight size={15} />
            </button>
            <button
              className="menu-toggle icon-button"
              onClick={() => setMenu((value) => !value)}
              aria-expanded={menu}
              aria-controls={menu ? 'mobile-nav' : undefined}
              aria-label={menu ? 'Close navigation' : 'Open navigation'}
            >
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
          <AnimatePresence>
            {menu && (
              <motion.nav
                id="mobile-nav"
                className="mobile-nav"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {nav.map(([id, title], i) => (
                  <a href={`#${id}`} key={id} onClick={() => setMenu(false)}>
                    <span>0{i + 1}</span>
                    {title}
                    <ArrowUpRight size={20} />
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
        <main id="main">
          <Hero openRegistration={openRegistration} motionOff={motionOff} setMotionOff={setMotionOff} />
          <div className="launch-status">
            <div className="launch-status-intro">
              <span className="mono">YOUR NEXT BIG THING</span>
              <strong>Starts in T-minus.</strong>
              <span>19 DEC 2026 · 08:00 SLST</span>
            </div>
            <Countdown />
            <div className="launch-status-location">
              <Crosshair size={22} strokeWidth={1} />
              <div>
                <span className="mono">LAUNCH COORDINATES</span>
                <strong>UCSC, Colombo</strong>
                <span>SRI LANKA / PLANET EARTH</span>
              </div>
            </div>
          </div>
          <MissionSection motionOff={motionOff || reduce} />
          <div className="velocity-band" aria-label="Think boldly. Build fearlessly. Launch together.">
            {motionOff || reduce ? (
              <div className="static-marquee">THINK BOLDLY. ✳ BUILD FEARLESSLY.</div>
            ) : (
              <ScrollVelocity
                texts={['THINK BOLDLY.  ✳  BUILD FEARLESSLY.  ✳  LAUNCH TOGETHER.  ✳']}
                velocity={28}
                numCopies={3}
                className="velocity-text"
                pauseOnHover
                skewWithVelocity={0.04}
              />
            )}
          </div>
          <Tracks
            selected={selected}
            setSelected={setSelected}
            openRegistration={openRegistration}
            motionOff={motionOff || reduce}
          />
          <FlightPlan />
          <Payload />
          <FAQ />
          <section className="final-cta">
            <div className="cta-grid" aria-hidden="true" />
            <div className="cta-star" aria-hidden="true">
              ✳
            </div>
            <Reveal>
              <span className="eyebrow">
                <span className="live-dot" /> YOUR NEXT CHAPTER IS WAITING
              </span>
              <h2>
                YOU WEREN’T MADE
                <br />
                FOR <span>ORDINARY.</span>
              </h2>
              <p>36 hours. Your crew. A whole new orbit.</p>
              <Magnet padding={35} magnetStrength={8} maxOffset={6} disabled={motionOff || reduce}>
                <button className="button primary" onClick={openRegistration}>
                  Let’s build what’s next <ArrowUpRight size={19} />
                </button>
              </Magnet>
              <span className="cta-caption mono">NO PERFECT IDEAS REQUIRED. JUST YOU.</span>
            </Reveal>
            <div className="cta-bottom mono">
              <span>ORBIT / EDITION 01</span>
              <span>COLOMBO, SRI LANKA ↗</span>
            </div>
          </section>
        </main>
        <footer>
          <div className="footer-main">
            <div>
              <a className="wordmark" href="#home" aria-label="ORBIT 26 back to top">
                <span className="brand-symbol" />
                ORBIT<span className="brand-year">’26</span>
              </a>
              <p>
                For the curious.
                <br />
                Built for what comes next.
              </p>
            </div>
            <div className="footer-links">
              <span className="mono">EXPLORE THE MISSION</span>
              {nav.map(([id, title]) => (
                <a href={`#${id}`} key={id}>
                  {title}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
            <div className="footer-credits">
              <span className="mono">A RECRUITMENT CONCEPT FOR</span>
              <img
                src={asset('logos/ieee-cs-white.png')}
                alt="IEEE Computer Society UCSC Student Branch Chapter"
                width="190"
                height="104"
                loading="lazy"
              />
              <a href="https://reactbits.dev" target="_blank" rel="noreferrer">
                Made with React Bits <ExternalLink size={11} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ORBIT. A fictional hackathon concept.</span>
            <span>NO REAL REGISTRATIONS. JUST REAL POSSIBILITIES.</span>
            <a href="#home">
              BACK TO TOP <ArrowUpRight size={12} />
            </a>
          </div>
        </footer>
        <Registration open={registration} selectedMission={selected} onClose={() => setRegistration(false)} />
      </div>
    </MotionConfig>
  );
}
