(() => {
  const start = document.querySelector('#decision-start');
  const evidence = document.querySelector('#decision-evidence');
  const result = document.querySelector('#decision-result');
  const initialChoice = document.querySelector('#initial-choice');
  const revisedChoice = document.querySelector('#revised-choice');
  const reset = document.querySelector('#reset-decision');

  if (!start || !evidence || !result || !initialChoice || !revisedChoice || !reset) return;

  const showStage = (visible, hiddenA, hiddenB) => {
    hiddenA.hidden = true;
    hiddenB.hidden = true;
    visible.hidden = false;
    const heading = visible.querySelector('[tabindex="-1"]');
    if (heading) heading.focus({ preventScroll: true });
  };

  document.querySelectorAll('[data-initial-decision]').forEach((button) => {
    button.addEventListener('click', () => {
      initialChoice.textContent = button.dataset.initialDecision;
      showStage(evidence, start, result);
    });
  });

  document.querySelectorAll('[data-revised-decision]').forEach((button) => {
    button.addEventListener('click', () => {
      revisedChoice.textContent = button.dataset.revisedDecision;
      showStage(result, start, evidence);
    });
  });

  reset.addEventListener('click', () => {
    initialChoice.textContent = '';
    revisedChoice.textContent = '';
    showStage(start, evidence, result);
    start.querySelector('[data-initial-decision]').focus({ preventScroll: true });
  });
})();
