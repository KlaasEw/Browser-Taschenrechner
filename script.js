const display = document.querySelector("#display");
const keysContainer = document.querySelector(".keys");
const themeToggleButton = document.querySelector("#theme-toggle");

const state = {
  currentInput: "0",
  previousInput: "",
  operator: null,
  shouldResetDisplay: false,
};

const THEME_STORAGE_KEY = "calculator-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  if (!themeToggleButton) {
    return;
  }

  const isDark = theme === "dark";
  themeToggleButton.textContent = isDark ? "Hellmodus" : "Dunkelmodus";
  themeToggleButton.setAttribute("aria-label", isDark ? "Hellmodus aktivieren" : "Dunkelmodus aktivieren");
}

function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  applyTheme(savedTheme === "dark" ? "dark" : "light");
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
}

function updateDisplay() {
  if (state.currentInput === "Fehler") {
    display.textContent = "Fehler";
    return;
  }

  if (!state.operator) {
    display.textContent = state.currentInput;
    return;
  }

  if (state.shouldResetDisplay) {
    display.textContent = `${state.previousInput}${state.operator}`;
    return;
  }

  display.textContent = `${state.previousInput}${state.operator}${state.currentInput}`;
}

function clearAll() {
  state.currentInput = "0";
  state.previousInput = "";
  state.operator = null;
  state.shouldResetDisplay = false;
  updateDisplay();
}

function backspace() {
  if (state.currentInput === "Fehler") {
    clearAll();
    return;
  }

  if (!state.operator) {
    if (state.shouldResetDisplay) {
      state.shouldResetDisplay = false;
    }

    if (state.currentInput.length <= 1) {
      state.currentInput = "0";
    } else {
      state.currentInput = state.currentInput.slice(0, -1);
    }

    updateDisplay();
    return;
  }

  if (state.shouldResetDisplay) {
    state.operator = null;
    state.currentInput = state.previousInput;
    state.previousInput = "";
    updateDisplay();
    return;
  }

  if (state.currentInput.length <= 1) {
    state.currentInput = "0";
    state.shouldResetDisplay = true;
  } else {
    state.currentInput = state.currentInput.slice(0, -1);
  }

  updateDisplay();
}

function appendNumber(value) {
  if (state.currentInput === "Fehler") {
    clearAll();
  }

  if (state.shouldResetDisplay) {
    state.currentInput = "0";
    state.shouldResetDisplay = false;
  }

  if (value === "." && state.currentInput.includes(".")) {
    return;
  }

  if (state.currentInput === "0" && value !== ".") {
    state.currentInput = value;
    updateDisplay();
    return;
  }

  state.currentInput += value;
  updateDisplay();
}

function calculate(previousValue, currentValue, operator) {
  const prev = Number(previousValue);
  const current = Number(currentValue);

  if (!Number.isFinite(prev) || !Number.isFinite(current)) {
    return "Fehler";
  }

  let result;
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        return "Fehler";
      }
      result = prev / current;
      break;
    default:
      return currentValue;
  }

  return Number.isInteger(result) ? String(result) : String(Number(result.toFixed(10)));
}

function chooseOperator(nextOperator) {
  if (state.currentInput === "Fehler") {
    return;
  }

  if (state.operator && !state.shouldResetDisplay) {
    const computed = calculate(state.previousInput, state.currentInput, state.operator);
    state.currentInput = computed;
    updateDisplay();
    if (computed === "Fehler") {
      state.previousInput = "";
      state.operator = null;
      state.shouldResetDisplay = true;
      return;
    }
  }

  state.previousInput = state.currentInput;
  state.operator = nextOperator;
  state.shouldResetDisplay = true;
  updateDisplay();
}

function compute() {
  if (!state.operator || state.previousInput === "" || state.shouldResetDisplay) {
    return;
  }

  const computed = calculate(state.previousInput, state.currentInput, state.operator);
  state.currentInput = computed;
  state.previousInput = "";
  state.operator = null;
  state.shouldResetDisplay = true;
  updateDisplay();
}

keysContainer.addEventListener("click", (event) => {
  const key = event.target.closest("button");
  if (!key) {
    return;
  }

  const action = key.dataset.action;
  const value = key.dataset.value;

  if (action === "number" && value) {
    appendNumber(value);
    return;
  }

  if (action === "operator" && value) {
    chooseOperator(value);
    return;
  }

  if (action === "equals") {
    compute();
    return;
  }

  if (action === "clear") {
    clearAll();
    return;
  }

  if (action === "backspace") {
    backspace();
  }
});

document.addEventListener("keydown", (event) => {
  const { key } = event;

  if (/^[0-9]$/.test(key)) {
    appendNumber(key);
    return;
  }

  if (key === ".") {
    appendNumber(".");
    return;
  }

  if (["+", "-", "*", "/"].includes(key)) {
    chooseOperator(key);
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    compute();
    return;
  }

  if (key === "Backspace") {
    event.preventDefault();
    backspace();
    return;
  }

  if (key === "Escape") {
    event.preventDefault();
    clearAll();
  }
});

themeToggleButton?.addEventListener("click", toggleTheme);
initializeTheme();
clearAll();
