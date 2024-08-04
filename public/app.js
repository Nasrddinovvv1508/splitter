"use strict";
// elements
let amountInput = document.getElementById("amount");
let percentageAmount = document.querySelectorAll(`.percentage`);
let customInput = document.getElementById("custom");
let error = document.getElementById(`error`);
let numberOfPeople = document.getElementById("numberOfPeople");
let tipAmount = document.getElementById("tipAmount");
let total = document.getElementById("total");
let resetBtn = document.getElementById("reset");
let dataValue = 0;
// percentage
percentageAmount.forEach((value) => {
    value.addEventListener('click', () => {
        const isActive = value.classList.contains('active');
        percentageAmount.forEach(el => el.classList.remove('active'));
        if (!isActive) {
            value.classList.add('active');
            dataValue = Number(value.getAttribute('data-value'));
            customInput.value = ''; // Reset custom input value when percentage is selected
        }
        else {
            dataValue = 0;
        }
        calculate(); // Recalculate on percentage change
        console.log("Selected Percentage:", dataValue);
    });
});
// functions
function getValues() {
    return {
        amount: Number(amountInput.value) || 0,
        custom: Number(customInput.value) || dataValue || 0,
        numberOfPeople: Number(numberOfPeople.value) || 0,
    };
}
function validate(values) {
    let amountInputParent = amountInput.parentElement;
    let customInputParent = customInput.parentElement;
    let numberOfPeopleParent = numberOfPeople.parentElement;
    let isValid = true;
    // Reset previous error states
    if (amountInputParent) {
        amountInputParent.classList.remove('no-value');
    }
    if (customInputParent) {
        customInputParent.classList.remove('no-value');
    }
    if (numberOfPeopleParent) {
        numberOfPeopleParent.classList.remove('no-value');
    }
    // Validate amount
    if (values.amount <= 0) {
        if (amountInputParent) {
            amountInputParent.classList.add('no-value');
        }
        isValid = false;
    }
    // Validate custom percentage
    if (values.custom <= 0) {
        if (customInputParent) {
            customInputParent.classList.add('no-value');
        }
        isValid = false;
    }
    // Validate number of people
    if (values.numberOfPeople <= 0) {
        if (numberOfPeopleParent) {
            numberOfPeopleParent.classList.add('no-value');
        }
        if (values.numberOfPeople === 0) {
            error.innerText = "Can't be zero";
        }
        isValid = false;
    }
    else {
        error.innerText = "";
    }
    console.log("Data Value:", dataValue);
    console.log("Custom Value:", values.custom);
    return isValid;
}
function calculate() {
    const values = getValues();
    if (validate(values)) {
        const totalTip = (values.amount * values.custom) / 100;
        const tipPerPerson = values.numberOfPeople > 0 ? totalTip / values.numberOfPeople : 0;
        const totalAmountPerPerson = values.numberOfPeople > 0 ? (values.amount + totalTip) / values.numberOfPeople : 0;
        tipAmount.innerText = `$${tipPerPerson.toFixed(2)}`;
        total.innerText = `$${totalAmountPerPerson.toFixed(2)}`;
    }
    else {
        // Reset results if validation fails
        tipAmount.innerText = "$0.00";
        total.innerText = "$0.00";
    }
}
// Events
if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        // Resetting values
        amountInput.value = "";
        customInput.value = "";
        numberOfPeople.value = "";
        // Clear all active classes
        percentageAmount.forEach(el => el.classList.remove('active'));
        // Clear dataValue
        dataValue = 0;
        // Reset button state
        resetBtn.classList.add("btn-disabled");
        // Clear results
        tipAmount.innerText = "$0.00";
        total.innerText = "$0.00";
        // Reset error message
        error.innerText = "";
        console.log("Reset button clicked");
    });
}
else {
    console.log("Reset button not found");
}
// Input events
amountInput && amountInput.addEventListener(`input`, () => {
    resetBtn.classList.remove("btn-disabled");
    calculate(); // Recalculate on amount input change
});
customInput && customInput.addEventListener(`input`, () => {
    resetBtn.classList.remove("btn-disabled");
    // Clear percentage selection if custom input is used
    percentageAmount.forEach((percentage) => percentage.classList.remove("active"));
    calculate(); // Recalculate on custom input change
});
numberOfPeople && numberOfPeople.addEventListener(`input`, () => {
    resetBtn.classList.remove("btn-disabled");
    calculate(); // Recalculate on number of people input change
});
