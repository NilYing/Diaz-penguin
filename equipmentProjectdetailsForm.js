document.querySelectorAll(".gallery-item").forEach((item) => {
  item.setAttribute("data-title", item.querySelector("img").alt);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("projectDetailsForm");
  const formMessage = document.getElementById("formMessage");

  function generateRequestId() {
    return "REQ-" + Date.now().toString(36).toUpperCase();
  }

  function validateForm() {
    let isValid = true;
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      const formGroup = input.closest(".form-group");
      if (!input.value.trim()) {
        formGroup.classList.add("error");
        formGroup.classList.remove("success");
        isValid = false;
      } else {
        formGroup.classList.remove("error");
        formGroup.classList.add("success");
      }
    });

    return isValid;
  }

  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validateForm()) {
      showMessage("Please fill in all required fields.", "error");
      return;
    }

    // Add loading state
    form.classList.add("loading");
    const submitBtn = form.querySelector(".submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const requestId = generateRequestId();
      const formData = {
        requestId: requestId,
        location: form.location.value,
        scope: form.scope.value,
        hours: form.hours.value,
        timestamp: new Date().toLocaleString(),
      };

      console.log("Form submission:", formData);

      // Show success message
      showMessage(
        `Request submitted successfully!\n
                        Request ID: ${requestId}\n
                        We will contact you shortly at the provided details.`,
        "success"
      );

    
      form.reset();
      form.querySelectorAll(".form-group").forEach((group) => {
        group.classList.remove("success", "error");
      });
    } catch (error) {
      showMessage("An error occurred. Please try again later.", "error");
      console.error("Form submission error:", error);
    } finally {
     
      form.classList.remove("loading");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Request";
    }
  });

 
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", function () {
      const formGroup = this.closest(".form-group");
      if (this.value.trim()) {
        formGroup.classList.remove("error");
        formGroup.classList.add("success");
      } else {
        formGroup.classList.add("error");
        formGroup.classList.remove("success");
      }
    });
  });
});
