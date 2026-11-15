interface Timer {
    name: string;
    desc?: string;
    img?: string;
    timestamp: Date;
}

// TODO(asnden): load from json
const subjects: Timer[] = [
    {
        name: "Пути передвигающихся предметов",
        timestamp: new Date(2026, 11, 17, 10, 12),
    },
    {
        name: "Придумывание планов подсчётов",
        timestamp: new Date(2026, 11, 15, 8, 30),
    },
    {
        name: "Подсчёт перспектив произвольных проишествий",
        timestamp: new Date(2026, 10, 26, 11, 50),
    },
    {
        name: "Подсчёт перспектив произвольных проишествий",
        timestamp: new Date(2026, 11, 17, 11, 50),
    },
    {
        name: "Понимание построения предложения приезжих",
        timestamp: new Date(2026, 11, 4, 11, 50),
    },
    {
        name: "Понимание престранных проишествий",
        timestamp: new Date(2026, 11, 16, 8, 30),
    },
];

const timersContainer = document.getElementById(
    "timers-container",
) as HTMLElement;

for (const [index, subject] of subjects.entries()) {
    const html = buildTimerHTML(index, subject);
    addTimerToContainer(html);
}

const timers = document.querySelectorAll(".timer");

setInterval(() => updateTimers(timers), 1000);

// TODO(asnden): simplify
// TODO(asnden): transform "понедельников" properly
function calculateTime(then: Date) {
    const now = new Date();
    if (then <= now) {
        return "Проверка проведена.";
    }
    const thenDay = (then.getDay() - 1) % 7; // 0 is Monday
    const weekStart = new Date(
        then.getFullYear(),
        then.getMonth(),
        then.getDate() - thenDay + 1,
    ); // Tuesday 00:00
    const mondays =
        1 +
        Math.floor(
            (then.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 7),
        );

    const beforeHours = 24 - now.getHours();
    const beforeMimutes = 60 - now.getMinutes();
    const beforeSeconds = 60 - now.getSeconds();

    const afterDiff = then.getTime() - weekStart.getTime();
    const afterHours = Math.floor(afterDiff / (1000 * 60 * 60));
    const afterMimutes = Math.floor(afterDiff / (1000 * 60) - afterHours * 60);
    const afterSeconds = Math.floor(
        afterDiff / 1000 - afterHours * 60 * 60 - afterMimutes * 60,
    );

    const seconds = (beforeSeconds + afterSeconds) % 60;
    const mimutes =
        ((beforeMimutes + afterMimutes) % 60) +
        Math.floor((beforeSeconds + afterSeconds) / 60);
    const hours =
        ((beforeHours + afterHours) % (60 * 60)) +
        Math.floor((beforeSeconds + afterSeconds) / (60 * 60)) +
        Math.floor((beforeMimutes + afterMimutes) / 60);

    const secondsStr = `0${seconds}`.slice(-2);
    const minutesStr = `0${mimutes}`.slice(-2);
    const hoursStr = `0${hours}`.slice(-3);

    return `${mondays} понедельников ${hoursStr}:${minutesStr}:${secondsStr}`;
}

function updateTimer(timerElement: Element) {
    const index = Number(timerElement.id.split("-")[1]);
    const then = subjects[index].timestamp;
    const newTime = calculateTime(then);
    const timer = timerElement.querySelector(".timer-timer") as Element;
    timer.textContent = newTime;
}

function updateTimers(timers: NodeListOf<Element>) {
    for (const timer of timers) {
        updateTimer(timer);
    }
}

function buildTimerHTML(index: number, timer: Timer): string {
    const time = calculateTime(timer.timestamp);
    return `<div id="timer-${index}" class="timer">
                <p class="timer-name">${timer.name}</p>
                <p class="timer-timer">${time}</p>
            </div>`;
}

function addTimerToContainer(html: string) {
    timersContainer.innerHTML += html;
}
