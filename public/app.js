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
            customInput.value = ``;
        }
        else {
            dataValue = 0;
        }
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
    // Clear previous error state
    let amountInputParent = amountInput.parentElement;
    let customInputParent = customInput.parentElement;
    let numberOfPeopleParent = numberOfPeople.parentElement;
    if (amountInputParent) {
        amountInputParent.classList.remove('no-value');
    }
    if (customInputParent) {
        customInputParent.classList.remove('no-value');
    }
    if (numberOfPeopleParent) {
        numberOfPeopleParent.classList.remove('no-value');
    }
    let isValid = true;
    if (values.amount <= 0) {
        if (amountInputParent) {
            amountInputParent.classList.add('no-value');
        }
        isValid = false;
    }
    // Check if dataValue is greater than 0
    if (dataValue > 0) {
        values.custom = dataValue;
    }
    else if (values.custom <= 0) {
        if (customInputParent) {
            customInputParent.classList.add('no-value');
        }
        isValid = false;
    }
    if (values.numberOfPeople <= 0) {
        if (numberOfPeopleParent) {
            numberOfPeopleParent.classList.add('no-value');
        }
        if (values.numberOfPeople == 0) {
            error.innerText = "Can't be zero";
        }
        isValid = false;
    }
    else {
        error.innerText = "";
    }
    // Debug: log dataValue and values.custom
    console.log("Data Value:", dataValue);
    console.log("Custom Value:", values.custom);
    return isValid;
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
        console.log("Reset button clicked");
    });
}
else {
    console.log("Reset button not found");
}
amountInput && amountInput.addEventListener(`input`, () => {
    resetBtn.classList.remove("btn-disabled");
});
customInput && customInput.addEventListener(`input`, () => {
    resetBtn.classList.remove("btn-disabled");
    percentageAmount.forEach((percentage) => percentage.classList.remove("active"));
});
numberOfPeople && numberOfPeople.addEventListener(`input`, () => {
    resetBtn.classList.remove("btn-disabled");
});
