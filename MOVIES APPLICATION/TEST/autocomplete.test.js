// For Node.js tests: Add the --globals flag to your test run command.
// For browser tests: Keep the mocha.setup() at the top of your script and ensure Mocha is properly initialized.
mocha.setup({
  globals: [
    "__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__",
    "__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__",
    "__REACT_DEVTOOLS_COMPONENT_FILTERS__",
    "__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__",
    "__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__",
    "__REACT_DEVTOOLS_BROWSER_THEME__",
  ],
});
// The above code snippet is useful if the React Dev Tools Extension is active in browser.
// That step should ignore the React DevTools global variables and stop the global leak detection error.

//HOOK THAT SHOULD RUN BEFORE EACH TASK.
beforeEach(() => {
  document.querySelector("#target").innerHTML = "";
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Dark Knight" },
        { Title: "Other Movies" },
      ];
    },
    renderOption(movie) {
      return `<h2><i>${movie.Title}</i></h2>`;
    },
  });
});

it("Initially Dropdown must be close", () => {
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).not.to.include("is-active");
});

const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 30);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 2000);
  });
};

const dispatchEvent = async (event) => {
  const input = document.querySelector("input");
  input.value = "avengers";
  input.dispatchEvent(new Event(event));
  await waitFor(".dropdown-item");
};

it("After searching, Dropdown opens up", async () => {
  //Enter the event name you want.
  await dispatchEvent("input");

  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).to.include("is-active");
});

it("After searching, display some results", async () => {
  await dispatchEvent("input");
  const items = document.querySelectorAll(".dropdown-item");
  expect(items.length).to.equal(3);
});
