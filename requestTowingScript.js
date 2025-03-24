function handleTowingRequest(event) {
  event.preventDefault();

  // Get form elements
  const form = document.getElementById("towingRequestForm");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const submitButton = form.querySelector(".submit-btn");

  // Get input values
  const pickupPoint = document.getElementById("pickupPoint").value;
  const dropoffPoint = document.getElementById("dropoffPoint").value;
  const vehicleType = document.getElementById("vehicleType").value;

  submitButton.textContent = "Processing...";
  form.classList.add("loading");

  setTimeout(() => {
    const requestData = {
      pickupPoint,
      dropoffPoint,
      vehicleType,
      timestamp: new Date().toISOString(),
      requestId: generateRequestId(),
    };

    console.log("Towing Request:", requestData);

    // Show success message
    confirmationMessage.innerHTML = `
                    <strong>Request Submitted Successfully!</strong><br>
                    Request ID: ${requestData.requestId}<br>
                    Our team will contact you shortly at the emergency hotline number.<br>
                    Pick up: ${pickupPoint}<br>
                    Drop off: ${dropoffPoint}<br>
                    Vehicle: ${vehicleType}
                `;
    confirmationMessage.className = "confirmation-message success";

    // Reset form
    form.reset();
    submitButton.textContent = "Submit Request";
    form.classList.remove("loading");

    confirmationMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, 1500); 
}

function generateRequestId() {
  return "TOW-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Add input validation
const inputs = document.querySelectorAll("#towingRequestForm input");
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (this.value.trim() === "") {
      this.classList.add("error");
    } else {
      this.classList.remove("error");
    }
  });
});
