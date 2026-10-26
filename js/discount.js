const form = document.getElementById('discount-form');
const totalInput = document.getElementById('total-input');
const memberCheckbox = document.getElementById('member-checkbox');
const resultText = document.getElementById('result-text');


function getDiscount(total, isMember) {
    if (total >= 300 && isMember) {
        return 25;
    } else if (total >= 100 && isMember) {
        return 20;
    } else if (total >= 100 || isMember) {
        return 10;
    } else {
        return 0;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const total = parseFloat(totalInput.value);
    const isMember = memberCheckbox.checked;
    const discount = getDiscount(total, isMember);

    resultText.textContent = `Cart total: $${total.toFixed(2)} — You saved ${discount}%!`;
});
