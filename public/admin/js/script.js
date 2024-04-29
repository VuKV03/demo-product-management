// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonsStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if(status != "") {
        url.searchParams.set("status", status);
      }
      else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}

// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn ngừa hành vi mặc định (load lại trang)
    const value = e.target.elements.keyword.value;

    if(value != "") {
      url.searchParams.set("keyword", value);
    }
    else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  })
}

// End Form Search 