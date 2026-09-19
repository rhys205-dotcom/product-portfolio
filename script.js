(() => {
  const start = document.querySelector('#decision-start');
  const result = document.querySelector('#decision-result');
  const choiceSummary = document.querySelector('#visitor-choice-summary');
  const choice = document.querySelector('#visitor-choice');
  const showReasoning = document.querySelector('#show-reasoning');
  const reconsider = document.querySelector('#reconsider-decision');

  if (!start || !result || !choiceSummary || !choice || !showReasoning || !reconsider) return;

  const revealReasoning = (decision) => {
    if (decision) {
      choice.textContent = decision;
      choiceSummary.hidden = false;
    } else {
      choice.textContent = '';
      choiceSummary.hidden = true;
    }

    start.hidden = true;
    result.hidden = false;
    result.querySelector('[tabindex="-1"]').focus({ preventScroll: true });
  };

  document.querySelectorAll('[data-decision]').forEach((button) => {
    button.addEventListener('click', () => revealReasoning(button.dataset.decision));
  });

  showReasoning.addEventListener('click', () => revealReasoning(''));

  reconsider.addEventListener('click', () => {
    result.hidden = true;
    start.hidden = false;
    start.querySelector('[data-decision]').focus({ preventScroll: true });
  });
})();
