const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const status = document.getElementById('message-status');

async function postMessage(text) {
    const response = await fetch('https://oim.zhili.dev/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Token': 'Rania-305'
        },
        body: JSON.stringify({ message: text })
    });
    return response.json();
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) {
        return;
    }

    status.textContent = 'Sending...';

    try {
        const result = await postMessage(text);
        status.textContent = `Sent! Server replied: ${JSON.stringify(result)}`;
        form.reset();
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
    }
});
