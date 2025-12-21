document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bg-music');
    const storageKey = 'birthday_song_time';
    const playStateKey = 'birthday_song_playing';

    // 1. Retrieve the saved time from the previous page
    const savedTime = localStorage.getItem(storageKey);
    
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // 2. Check if music was already playing in the session
    const shouldPlay = localStorage.getItem(playStateKey) === 'true';

    if (shouldPlay) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented. Waiting for user interaction.");
            });
        }
    }

    // 3. Save the current timestamp every 1 second
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem(storageKey, audio.currentTime);
            localStorage.setItem(playStateKey, 'true');
        }
    }, 1000);

    // 4. Global function to start music (call this on your first button click)
    window.startMusic = function() {
        audio.play();
        localStorage.setItem(playStateKey, 'true');
    };
});