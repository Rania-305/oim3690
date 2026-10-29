const jokeButton = document.getElementById('joke-button');
const jokeText = document.getElementById('joke-text');

const API_URL = 'https://v2.jokeapi.dev/joke/Programming?type=single&safe-mode';

async function getJoke() {
    jokeButton.disabled = true;
    jokeText.classList.remove('error');
    jokeText.textContent = 'Loading joke...';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error('JokeAPI returned an error.');
        }

        jokeText.textContent = data.joke;
    } catch (error) {
        jokeText.classList.add('error');
        jokeText.textContent = `Could not load a joke: ${error.message}`;
    } finally {
        jokeButton.disabled = false;
    }
}

jokeButton.addEventListener('click', getJoke);
