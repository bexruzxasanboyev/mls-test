function startTimer(durationInSeconds) {
    const display = document.querySelector('#timer');
    const endTime = Date.now() + durationInSeconds * 1000;

    const interval = setInterval(function () {
        const now = Date.now();
        let remaining = Math.max(0, Math.floor((endTime - now) / 1000));

        let hours = Math.floor(remaining / 3600);
        let minutes = Math.floor((remaining % 3600) / 60);
        let seconds = remaining % 60;

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `${hours}:${minutes}:${seconds}`;

        if (remaining <= 0) {
            clearInterval(interval);
            display.textContent = "00:00:00";
        }
    }, 1000);
}

const totalSeconds = (2 * 3600) + (5 * 60) + 35;
startTimer(totalSeconds);