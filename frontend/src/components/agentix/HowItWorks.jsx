const steps = [
  { n: '01', t: 'Tell Agentix your goal', d: 'Voice, chat, or text. Plain language — no setup.' },
  { n: '02', t: 'Choose a workflow', d: 'Pick a stack template, or let the assistant build one.' },
  { n: '03', t: 'Connect knowledge', d: 'RAG-grounded answers from your approved sources.' },
  { n: '04', t: 'Generate & route', d: 'AI does the work; humans review where it matters.' },
  { n: '05', t: 'Measure & improve', d: 'Outcomes flow back into the operating system.' },
];

export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="container-wide">
        <div className="sec-head sec-head-center">
          <span className="eyebrow">05 / How it works</span>
          <h2 className="h-1">From a goal to a working system in five steps.</h2>
        </div>
        <div className="how-steps">
          {steps.map((s) => (
            <div key={s.n} className="how-step">
              <div className="how-step-num">{s.n}</div>
              <div className="how-step-title">{s.t}</div>
              <div className="how-step-desc">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
