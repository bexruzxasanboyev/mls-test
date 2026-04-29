function startTimer(durationInSeconds) {
    let timer = durationInSeconds;
    const display = document.querySelector('#timer');

    const interval = setInterval(function () {
        let hours = Math.floor(timer / 3600);
        let minutes = Math.floor((timer % 3600) / 60);
        let seconds = Math.floor(timer % 60);

        // Raqamlar 10 dan kichik bo'lsa, oldiga 0 qo'shish (01, 02...)
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "00:00:00";
            // Vaqt tugaganda nima bo'lishini shu yerga yozsang bo'ladi
        }
    }, 1000);
}

// Taymerni 2 soat, 5 minut, 35 soniyaga sozlash (jami soniyalarda)
const totalSeconds = (2 * 3600) + (5 * 60) + 35;
startTimer(totalSeconds);