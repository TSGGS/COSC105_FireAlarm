let fire = new Fire();
let fire_alarm = new FireAlarm();

let selected_room = "";
let alarm_threshold = "";

function checkFireRequirement() {
    let fire_value = fire.getFireValue()
    let alarm_threshold = fire_alarm.getThresholdValue()

    if (fire_value['light'] >= alarm_threshold['light'] && fire_value['heat'] >= alarm_threshold['heat'] && fire_value['smoke'] >= alarm_threshold['smoke']) {
        fire_alarm.alarm();
    }

}

// GET THRESHOLD VALUES
document.addEventListener('DOMContentLoaded', async () => {
    let request = await fetch('http://127.0.0.1:5010/api/getThreshold', {
            method: 'POST'
        })
    
    let response = await request.json();

    fire.setThresholdValue(response['light'], response['heat'], response['smoke']);
    fire_alarm.setThresholdValue(response['light'], response['heat'], response['smoke']);
    alarm_threshold = fire_alarm.getThresholdValue()
});

document.getElementById('fire-control-light').addEventListener('input', () => {
    let light_value = document.getElementById('fire-control-light').value;
    document.getElementById('light-control-value').innerText = parseFloat(light_value).toFixed(2);
    fire.setLightValue(parseFloat(light_value).toFixed(2));

    checkFireRequirement();
});

document.getElementById('fire-control-heat').addEventListener('input', () => {
    let heat_value = document.getElementById('fire-control-heat').value;
    document.getElementById('heat-control-value').innerText = parseFloat(heat_value).toFixed(2);
    fire.setHeatValue(parseFloat(heat_value).toFixed(2));

    checkFireRequirement();
});

document.getElementById('fire-control-smoke').addEventListener('input', () => {
    let smoke_value = document.getElementById('fire-control-smoke').value;
    let parsed_smoke_value = parseFloat(smoke_value).toFixed(2);
    document.getElementById('smoke-control-value').innerText = parsed_smoke_value;
    fire.setSmokeValue(parsed_smoke_value);

    let win = document.querySelector(`#${selected_room}`);
    let smoke = win.querySelector(".smoke");
    if(parsed_smoke_value >= alarm_threshold["smoke"]) {
        smoke.classList.remove("hidden");
        win.append(smoke);
    } else {
        smoke.classList.add("hidden");
    }

    checkFireRequirement();
});

// ADD EVENT LISTENER TO WINDOW DIVS
let windows = document.querySelectorAll(".window");

windows.forEach(window => {
    window.addEventListener('click', () => {
        selected_room = window.id;
        document.querySelector("#selected-room").innerText = selected_room;

    });
});