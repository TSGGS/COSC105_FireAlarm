let apply_threshold = document.getElementById('apply-threshold');

document.getElementById('light-threshold').addEventListener('input', () => {
    let light_value = document.getElementById('light-threshold').value;
    document.getElementById('light-threshold-value').innerText = parseFloat(light_value).toFixed(2);
    apply_threshold.disabled = false;
});

document.getElementById('heat-threshold').addEventListener('input', () => {
    let heat_value = document.getElementById('heat-threshold').value;
    document.getElementById('heat-threshold-value').innerText = parseFloat(heat_value).toFixed(2);
    apply_threshold.disabled = false;
});

document.getElementById('smoke-threshold').addEventListener('input', () => {
    let smoke_value = document.getElementById('smoke-threshold').value;
    document.getElementById('smoke-threshold-value').innerText = parseFloat(smoke_value).toFixed(2);
    apply_threshold.disabled = false;
});

apply_threshold.addEventListener('click', async (e) => {
    e.preventDefault();

    let data = {
        'lightValue': document.getElementById('light-threshold').value,
        'heatValue': document.getElementById('heat-threshold').value,
        'smokeValue': document.getElementById('smoke-threshold').value
    };

    let request = await fetch('http://127.0.0.1:5010/api/updateThreshold', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    let reponse = await request.json();
    if(reponse['success'] && request.ok) {
        document.getElementById('apply-msg').innerText = 'Settings saved!';
        apply_threshold.disabled = true;    
    } else {
        document.getElementById('apply-msg').innerText = 'Failed to save settings';
    }
    
    
    document.getElementById('apply-msg').innerText = 'Settings saved!';
    apply_threshold.disabled = true;
});