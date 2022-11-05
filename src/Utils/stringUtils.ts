function convertTime(secondsLeft: number): string {
    let output = "";
    const secs = secondsLeft % 60;
    const mins = Math.floor(secondsLeft / 60) % 60;
    const hours = Math.floor(secondsLeft / 3600);

    function addLeadingZeroes(time: number) {
        return time < 10 ? `0${time}` : time;
    }
    if (hours > 0) {
        output += `${hours}:`;
    }
    output += `${addLeadingZeroes(mins)}:${addLeadingZeroes(secs)}`;

    return output;
}

export {convertTime};