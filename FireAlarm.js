class FireAlarm {
    #detection_threshold = {
        'light': 0,
        'heat': 0,
        'smoke': 0
    };
    
    #fire_elements_value = {
        'light': 0,
        'heat': 0,
        'smoke': 0
    };

    #fires = []

    setThresholdValue(light, heat, smoke) {
        this.#detection_threshold['light'] = light;
        this.#detection_threshold['heat'] = heat;
        this.#detection_threshold['smoke'] = smoke;

        console.log(this.#detection_threshold);
        
    }

    getThresholdValue() {
        return this.#detection_threshold;
    }

    addFire(fire) {
        this.#fires.push(fire);
    }

    alarm() {
        console.log('THIERE IS FIRE');
    }
}