const form = document.querySelector(".header__form");
const emailInput = document.querySelector(".header__input");
const submitButton = document.querySelector(".header__button");
const errorSpan = document.getElementById("email-error");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let hasErrors = false;

  if (!validateEmail()) {
    hasErrors = true;
  }

  // If there are no errors, submit the form
  if (!hasErrors) {
    // Use fetch to submit the form data
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    })
      .then(() => {
        // After successful submission, reload the page
        console.log("Form submitted successfully!");
        alert("Thank you for submitting the form!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

function validateEmail() {
  console.log("clicked");

  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    showError("Whoops! It looks like you forgot to add your email");
    return false;
  } else if (!emailRegex.test(email)) {
    showError("Please provide a valid email address");
    return false;
  } else {
    clearError();
    return true;
  }
}

function showError(message) {
  emailInput.setAttribute("aria-invalid", "true");
  errorSpan.textContent = message;
  emailInput.style.border = "1px solid var(--lightRed)";
}

function clearError() {
  emailInput.setAttribute("aria-invalid", "false");
  errorSpan.textContent = "";
  emailInput.style.border = "";
}
