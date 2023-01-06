class Fire {
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

    setThresholdValue(light, heat, smoke) {
        this.#detection_threshold['light'] = light;
        this.#detection_threshold['heat'] = heat;
        this.#detection_threshold['smoke'] = smoke;

    }

    setFireValue(light, heat, smoke) {
        this.#fire_elements_value['light'] = light;
        this.#fire_elements_value['heat'] = heat;
        this.#fire_elements_value['smoke'] = smoke;
    }

    setLightValue(light) {
        this.#fire_elements_value['light'] = light;
    }

    setHeatValue(heat) {
        this.#fire_elements_value['heat'] = heat;
    }

    setSmokeValue(smoke) {
        this.#fire_elements_value['smoke'] = smoke;
    }

    getFireValue() {
        return this.#fire_elements_value;
    }
}