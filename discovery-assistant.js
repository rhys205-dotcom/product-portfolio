(() => {
  const feedback = {
    F001: { source: 'Support', persona: 'Finance', text: 'Month end takes forever because I have to export the payment report and reconcile it against our accounting system manually.' },
    F002: { source: 'Interview', persona: 'Finance', text: 'I normally spend about two hours at the end of the month checking that the payments in the system match our bank records.' },
    F010: { source: 'Support', persona: 'Finance', text: 'I found a failed payment three days later while doing reconciliation. We should have known about it immediately.' },
    F017: { source: 'Interview', persona: 'Finance', text: 'I’d rather review exceptions than reconcile every successful transaction manually.' },
    F020: { source: 'Interview', persona: 'Manager', text: 'I want my team to know about payment problems before a customer has to call us.' },
    F022: { source: 'Support', persona: 'Administrator', text: 'The customer paid successfully but the status didn’t seem to update straight away, so I wasn’t sure what to tell them.' },
    F026: { source: 'Interview', persona: 'Finance', text: 'I don’t necessarily want full automatic reconciliation. I’d be happier if the system just highlighted the transactions that don’t match.' },
    F033: { source: 'Survey', persona: 'Finance', text: 'Please don’t automate everything. I need to be able to check and approve financial adjustments.' },
    F034: { source: 'Support', persona: 'Administrator', text: 'It would help if failed payments showed a reason rather than just saying failed.' },
    F038: { source: 'Interview', persona: 'Finance', text: 'If I could see unmatched transactions in one place that would probably remove most of the manual work.' },
    F040: { source: 'Support', persona: 'Manager', text: 'I want an exception report showing failed, pending or unusual payments so the team knows what needs action.' }
  };

  const findings = [
    {
      id: 'theme-1',
      theme: 'Manual reconciliation creates avoidable month-end effort',
      strength: 'Strong evidence',
      painPoint: 'Finance users repeatedly export data, compare systems line by line and spend significant time locating the transaction behind a discrepancy.',
      evidenceIds: ['F001', 'F002', 'F017', 'F026', 'F038'],
      interpretation: 'The underlying need is not necessarily full automation. Users want the system to identify exceptions so they can focus their judgement where it is needed.',
      opportunity: 'Explore an exception-led reconciliation workspace that highlights unmatched transactions while preserving review and approval.'
    },
    {
      id: 'theme-2',
      theme: 'Payment exceptions are discovered too late',
      strength: 'Strong evidence',
      painPoint: 'Failed, pending or delayed status updates create operational uncertainty and sometimes allow the customer to discover the problem first.',
      evidenceIds: ['F010', 'F020', 'F022', 'F034', 'F040'],
      interpretation: 'Teams need proactive, explainable exception visibility—not simply another aggregate payments dashboard.',
      opportunity: 'Investigate timely alerts, failure reasons and a shared queue of payment exceptions requiring action.'
    },
    {
      id: 'theme-3',
      theme: 'Users value automation but want financial control',
      strength: 'Moderate evidence',
      painPoint: 'Finance users want less manual work while retaining the ability to inspect exceptions and approve consequential adjustments.',
      evidenceIds: ['F017', 'F026', 'F033'],
      interpretation: 'An automation-first solution could undermine trust. Human control should be designed into the workflow rather than added as a fallback.',
      opportunity: 'Prototype configurable approval points, evidence trails and clear boundaries between automated matching and human decisions.'
    }
  ];

  const loadButton = document.querySelector('#load-analysis');
  const analysis = document.querySelector('#analysis');
  const findingsRoot = document.querySelector('#findings');
  const downloadButton = document.querySelector('#download-review');
  const resetButton = document.querySelector('#reset-review');

  if (!loadButton || !analysis || !findingsRoot || !downloadButton || !resetButton) return;

  const createEvidence = (id) => {
    const item = feedback[id];
    const wrapper = document.createElement('div');
    wrapper.className = 'evidence-item';

    const quote = document.createElement('p');
    quote.textContent = '“' + item.text + '”';

    const source = document.createElement('span');
    source.textContent = id + ' · ' + item.source + ' · ' + item.persona;

    wrapper.append(quote, source);
    return wrapper;
  };

  const renderFinding = (finding, index) => {
    const article = document.createElement('article');
    article.className = 'finding-card';
    article.dataset.findingId = finding.id;

    const top = document.createElement('div');
    top.className = 'finding-top';

    const headingGroup = document.createElement('div');
    const label = document.createElement('p');
    label.className = 'section-label';
    label.textContent = 'FINDING ' + String(index + 1).padStart(2, '0');

    const heading = document.createElement('h3');
    heading.textContent = finding.theme;

    const pain = document.createElement('p');
    pain.className = 'pain-point';
    pain.textContent = finding.painPoint;

    headingGroup.append(label, heading, pain);

    const strength = document.createElement('span');
    strength.className = 'strength';
    strength.textContent = finding.strength;
    top.append(headingGroup, strength);

    const evidence = document.createElement('details');
    evidence.className = 'evidence';
    const summary = document.createElement('summary');
    summary.textContent = 'Inspect cited customer evidence (' + finding.evidenceIds.length + ')';
    const evidenceList = document.createElement('div');
    evidenceList.className = 'evidence-list';
    finding.evidenceIds.forEach((id) => evidenceList.append(createEvidence(id)));
    evidence.append(summary, evidenceList);

    const review = document.createElement('div');
    review.className = 'review-grid';

    const interpretationGroup = document.createElement('div');
    const interpretationLabel = document.createElement('label');
    interpretationLabel.htmlFor = finding.id + '-interpretation';
    interpretationLabel.textContent = 'AI interpretation — edit if needed';
    const interpretation = document.createElement('textarea');
    interpretation.id = finding.id + '-interpretation';
    interpretation.className = 'interpretation';
    interpretation.value = finding.interpretation;

    const opportunity = document.createElement('div');
    opportunity.className = 'opportunity';
    const opportunityTitle = document.createElement('strong');
    opportunityTitle.textContent = 'Potential opportunity';
    const opportunityText = document.createElement('span');
    opportunityText.textContent = finding.opportunity;
    opportunity.append(opportunityTitle, opportunityText);
    interpretationGroup.append(interpretationLabel, interpretation, opportunity);

    const decisionGroup = document.createElement('div');
    const decisionLabel = document.createElement('label');
    decisionLabel.htmlFor = finding.id + '-decision';
    decisionLabel.textContent = 'Human review decision';
    const decision = document.createElement('select');
    decision.id = finding.id + '-decision';
    decision.className = 'review-decision';
    ['Needs review', 'Accept', 'Edit and accept', 'Reject'].forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      decision.append(option);
    });

    const noteLabel = document.createElement('label');
    noteLabel.htmlFor = finding.id + '-note';
    noteLabel.textContent = 'Review note';
    noteLabel.style.marginTop = '14px';
    const note = document.createElement('input');
    note.id = finding.id + '-note';
    note.className = 'review-note';
    note.placeholder = 'Why did you make this decision?';

    decisionGroup.append(decisionLabel, decision, noteLabel, note);
    review.append(interpretationGroup, decisionGroup);
    article.append(top, evidence, review);
    return article;
  };

  const renderAnalysis = () => {
    findingsRoot.replaceChildren();
    findings.forEach((finding, index) => findingsRoot.append(renderFinding(finding, index)));
    analysis.hidden = false;
    document.querySelector('#analysis-heading').focus({ preventScroll: true });
    analysis.scrollIntoView({ behavior: 'smooth', block: 'start' });
    loadButton.textContent = 'Sample analysis loaded';
    loadButton.disabled = true;
  };

  const collectReview = () => ({
    demo: true,
    dataset: 'Synthetic sample feedback',
    reviewedAt: new Date().toISOString(),
    findings: findings.map((finding) => ({
      ...finding,
      interpretation: document.querySelector('#' + finding.id + '-interpretation').value,
      humanReview: {
        decision: document.querySelector('#' + finding.id + '-decision').value,
        note: document.querySelector('#' + finding.id + '-note').value
      }
    }))
  });

  loadButton.addEventListener('click', renderAnalysis);

  downloadButton.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(collectReview(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reviewed-discovery-findings.json';
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });

  resetButton.addEventListener('click', () => {
    findingsRoot.replaceChildren();
    analysis.hidden = true;
    loadButton.disabled = false;
    loadButton.textContent = 'Explore the sample analysis';
    loadButton.focus({ preventScroll: true });
    window.scrollTo({ top: loadButton.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  });
})();
