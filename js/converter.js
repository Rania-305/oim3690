const categorySelect = document.getElementById('category-select');
const fromUnitSelect = document.getElementById('from-unit-select');
const toUnitSelect = document.getElementById('to-unit-select');
const valueInput = document.getElementById('value-input');
const swapButton = document.getElementById('swap-button');
const form = document.getElementById('converter-form');
const resultText = document.getElementById('result-text');

// Linear categories convert via a factor to a base unit; temperature needs its own formulas.
const categories = {
    temperature: {
        label: 'Temperature',
        units: {
            celsius: { label: 'Celsius (°C)' },
            fahrenheit: { label: 'Fahrenheit (°F)' },
        },
        convert(value, from, to) {
            if (from === to) {
                return value;
            }
            if (from === 'celsius') {
                return (value * 9 / 5) + 32;
            }
            return (value - 32) * 5 / 9;
        },
    },
    length: {
        label: 'Length',
        units: {
            kilometers: { label: 'Kilometers (km)', factor: 1 },
            miles: { label: 'Miles (mi)', factor: 0.621371 },
        },
        convert(value, from, to) {
            const base = value / this.units[from].factor;
            return base * this.units[to].factor;
        },
    },
    volume: {
        label: 'Volume',
        units: {
            liters: { label: 'Liters (L)', factor: 1 },
            gallons: { label: 'Gallons (gal)', factor: 0.264172 },
        },
        convert(value, from, to) {
            const base = value / this.units[from].factor;
            return base * this.units[to].factor;
        },
    },
    weight: {
        label: 'Weight',
        units: {
            kilograms: { label: 'Kilograms (kg)', factor: 1 },
            pounds: { label: 'Pounds (lb)', factor: 2.20462 },
        },
        convert(value, from, to) {
            const base = value / this.units[from].factor;
            return base * this.units[to].factor;
        },
    },
};

function populateCategorySelect() {
    Object.entries(categories).forEach(([key, category]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = category.label;
        categorySelect.appendChild(option);
    });
}

function populateUnitSelects() {
    const units = categories[categorySelect.value].units;
    [fromUnitSelect, toUnitSelect].forEach((select) => select.innerHTML = '');

    Object.entries(units).forEach(([key, unit]) => {
        [fromUnitSelect, toUnitSelect].forEach((select) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = unit.label;
            select.appendChild(option);
        });
    });

    toUnitSelect.selectedIndex = Object.keys(units).length > 1 ? 1 : 0;
}

categorySelect.addEventListener('change', () => {
    populateUnitSelects();
    resultText.textContent = 'Enter a value above to see the conversion.';
});

swapButton.addEventListener('click', () => {
    const from = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = from;
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = parseFloat(valueInput.value);
    if (Number.isNaN(value)) {
        return;
    }

    const category = categories[categorySelect.value];
    const from = fromUnitSelect.value;
    const to = toUnitSelect.value;
    const result = category.convert(value, from, to);

    const fromLabel = category.units[from].label;
    const toLabel = category.units[to].label;
    resultText.textContent = `${value} ${fromLabel} = ${result.toFixed(4)} ${toLabel}`;
});

populateCategorySelect();
populateUnitSelects();
