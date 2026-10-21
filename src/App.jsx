import { ArrowDownRight, ArrowUpRight, Dribbble, Github, Linkedin, Menu } from 'lucide-react';

const projects = [
  {
    number: '01',
    name: 'Fieldnotes',
    type: 'Brand identity · Digital product',
    year: '2025',
    className: 'fieldnotes',
    visual: <div className="field-art"><span className="field-sun" /><span className="field-word">field<br />notes<span>®</span></span><span className="field-caption">A little more<br />out there.</span></div>,
  },
  {
    number: '02',
    name: 'Forma Objects',
    type: 'Art direction · E-commerce',
    year: '2024',
    className: 'forma',
    visual: <div className="forma-art"><div className="vase vase-one" /><div className="vase vase-two" /><div className="vase vase-three" /><span>FORM / FUNCTION</span></div>,
  },
  {
    number: '03',
    name: 'Common Ground',
    type: 'Strategy · Web design',
    year: '2024',
    className: 'common',
    visual: <div className="common-art"><div className="common-circle">CG</div><span>GOOD THINGS<br />GROW TOGETHER</span></div>,
  },
];

function App() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Studio home"><span className="brand-mark">S</span><span>STUDIO / 26</span></a>
        <div className="nav-links"><a href="#work">Selected work <span>03</span></a><a href="#about">About</a><a href="mailto:hello@studio.design">Contact <ArrowUpRight size={13} /></a></div>
        <a className="availability" href="mailto:hello@studio.design"><i /> Available for select projects</a>
        <button className="menu-button" aria-label="Open menu"><Menu size={21} /></button>
      </nav>

      <section className="hero shell" id="home">
        <div className="eyebrow"><span>INDEPENDENT DESIGN PRACTICE</span><span>BASED IN BROOKLYN, NY&nbsp; ↗</span></div>
        <div className="hero-copy"><h1>Making<br /><em>meaningful</em><br />things.</h1><div className="hero-aside"><span className="aside-rule" /><p>Thoughtful identities and digital experiences for people building a better kind of future.</p><a href="#work" className="scroll-link">SCROLL TO EXPLORE <ArrowDownRight size={15} /></a></div></div>
        <div className="hero-bottom"><span>STRATEGY&nbsp; · &nbsp;IDENTITY&nbsp; · &nbsp;DIGITAL</span><span>SCROLL A LITTLE, STAY A WHILE ↓</span></div>
        <div className="hero-stamp" aria-hidden="true"><span>GOOD IDEAS<br />TAKE SHAPE</span><b>✳</b></div>
      </section>

      <section className="work shell" id="work">
        <div className="section-heading"><div><span className="section-kicker">A FEW RECENT THINGS</span><h2>Selected work<span className="sup">(03)</span></h2></div><a className="text-link" href="mailto:hello@studio.design">Have a project in mind? <ArrowUpRight size={15} /></a></div>
        <div className="project-list">{projects.map((project) => <a className="project" href="mailto:hello@studio.design" key={project.number}>
          <div className={`project-image ${project.className}`}>{project.visual}<span className="project-open"><ArrowUpRight size={17} /></span></div>
          <div className="project-meta"><span className="project-number">{project.number}</span><div className="project-title"><h3>{project.name}</h3><span>{project.type}</span></div><span className="project-year">{project.year}</span></div>
        </a>)}</div>
      </section>

      <section className="about" id="about"><div className="shell about-inner"><span className="section-kicker">SMALL BY DESIGN, BIG ON INTENTION</span><div className="about-copy"><h2>Good work starts with <em>good questions.</em></h2><div><p>I partner with ambitious people to turn complex ideas into clear, considered design. From the first sketch to the final pixel, every detail has a reason to be here.</p><a className="text-link" href="mailto:hello@studio.design">A little more about me <ArrowUpRight size={15} /></a></div></div><div className="about-note"><span>✳</span><p>Curiosity first.<br />Always.</p></div></div></section>

      <footer className="shell footer"><div className="footer-top"><span className="section-kicker">HAVE SOMETHING GOOD IN MIND?</span><a className="footer-cta" href="mailto:hello@studio.design">Let’s make it<br /><em>matter.</em><ArrowUpRight className="cta-arrow" size={38} /></a></div><div className="footer-bottom"><a className="brand" href="#home"><span className="brand-mark">S</span><span>STUDIO / 26</span></a><span>© 2025 STUDIO / ALL RIGHTS RESERVED</span><div className="socials"><a href="https://www.instagram.com" aria-label="Instagram"><Dribbble size={16} /></a><a href="https://www.linkedin.com" aria-label="LinkedIn"><Linkedin size={16} /></a><a href="https://github.com" aria-label="GitHub"><Github size={16} /></a></div><a className="back-top" href="#home">BACK TO TOP ↑</a></div></footer>
    </main>
  );
}

export default App;
