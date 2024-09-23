const createAutoComplete = (config) => {
  //TODO: function start
  const { root, renderOption, onOptionSelect, selectInputValue, fetchData } =
    config;
  root.innerHTML = `
       <label><b>Search For Movies</b></label>
        <input  class="input" >
        <div class="dropdown">
          <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
          </div>
        </div>
    `;
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultWrapper = root.querySelector(".results");
  const onInput = async (event) => {
    const items = await fetchData(event.target.value);
    // console.log(items);
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = selectInputValue(item);
        onOptionSelect(item);
      });
      resultWrapper.appendChild(option);
    }
  };
  input.addEventListener("input", deBounce(onInput, 1000));
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
  //FIXME: FUNCTION END
};
