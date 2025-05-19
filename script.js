const display = document.getElementById('display');
let expression = '';

function updateDisplay() {
  display.textContent = expression || '0';
}

function appendValue(value) {
  if (expression === 'Error') expression = '';
  expression += value;
  updateDisplay();
}

function clearDisplay() {
  expression = '';
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculateResult() {
  try {
    const result = eval(expression);
    expression = parseFloat(result.toFixed(10)).toString();
  } catch {
    expression = 'Error';
  }
  updateDisplay();
}

document.querySelectorAll('.btn').forEach((btn) => {
  const value = btn.dataset.value;
  const action = btn.dataset.action;

  btn.addEventListener('click', () => {
    if (value !== undefined) {
      appendValue(value);
    } else if (action === 'clear') {
      clearDisplay();
    } else if (action === 'delete') {
      deleteLast();
    } else if (action === 'calculate') {
      calculateResult();
    }
  });
});

window.addEventListener('keydown', (e) => {
  const key = e.key;

  if (/[0-9+\-*/.%]/.test(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});