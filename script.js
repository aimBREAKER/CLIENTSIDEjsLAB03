// JavaScript for Pizza Order Form

document.addEventListener("DOMContentLoaded", function () {
  // Dynamically add student information
  const studentInfo = document.getElementById("studentInfo");
  studentInfo.textContent = "Student ID: 200508182, Name: Ashish Arora";

  // Event listener for the order button
  document
    .getElementById("submitOrder")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default form submission
      console.log("Submit button clicked"); // Debugging log

      if (!validateForm()) {
        console.log("Validation failed"); // Debugging log
        return;
      }

      const pizzaOrder = new PizzaOrder();
      pizzaOrder.captureFormData();
      pizzaOrder.displayOrderSummary();
    });
});

// Function to validate the form
function validateForm() {
  let errors = [];
  const email = document.getElementById("email").value;
  if (!email.match(/[^@]+@[^@]+\.[^@]+/)) {
    errors.push("Please enter a valid email address.");
  }

  const name = document.getElementById("name").value;
  if (!name.match(/[A-Za-z ]+/)) {
    errors.push("Name should contain only letters.");
  }

  const toppingElements = document.querySelectorAll(
    'input[name="toppings"]:checked'
  );
  if (toppingElements.length === 0) {
    errors.push("Please select at least one topping.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }
  return true;
}
// PizzaOrder class
class PizzaOrder {
  constructor() {
    this.name = "";
    this.email = "";
    this.address = "";
    this.size = "";
    this.crust = "";
    this.sauce = "";
    this.toppings = [];
    this.specialInstructions = "";
  }

  captureFormData() {
    this.name = document.getElementById("name").value;
    this.email = document.getElementById("email").value;
    this.address = document.getElementById("address").value;
    this.size = document.getElementById("pizza-size").value;
    this.crust = document.getElementById("crust").value;
    this.sauce = document.getElementById("sauce").value;
    this.specialInstructions = document.getElementById("instructions").value;

    // Capture toppings
    const toppingElements = document.querySelectorAll(
      'input[name="toppings"]:checked'
    );
    this.toppings = Array.from(toppingElements).map((element) => element.value);
  }

  displayOrderSummary() {
    let orderSummary = `
            <h2>Order Summary</h2>
            <p>Name: ${this.name}</p>
            <p>Email: ${this.email}</p>
            <p>Address: ${this.address}</p>
            <p>Size: ${this.size}</p>
            <p>Crust: ${this.crust}</p>
            <p>Sauce: ${this.sauce}</p>
            <p>Toppings: ${this.toppings.join(", ")}</p>
            <p>Special Instructions: ${this.specialInstructions}</p>
        `;

    document.getElementById("orderConfirmation").innerHTML = orderSummary;
  }
}
