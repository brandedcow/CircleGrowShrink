class Circle {
    constructor(min, max, initialX, initialY, intervals, id, color) {
        this.id = id
        this.class = "circle"
        this.minDiameter = min;
        this.maxDiameter = max;
        this.posX = initialX;
        this.posY = initialY;
        this.initInterval = intervals
        this.numInterval = intervals

        if (color.length === 0) {
            this.color = randomColor()
        } else {
            this.color = pickRandom(color)
        }
        this.cssText = `
            position: fixed; 
            left: calc(${this.posX}px - ${this.minDiameter / 2}px); 
            top: calc(${this.posY}px - ${this.minDiameter / 2}px);
            height: ${this.minDiameter}px;
            width: ${this.minDiameter}px;
            background-color: ${this.color};
            border-radius: 50%;
        `
        this.intervalSize = (max - min) / intervals

        this._currentStep = 1
        this._isInc = true

        console.log('click')
    }

    getCSSText = () => {
        return this.cssText
    }

    update = () => {
        const newDiameter = Math.floor(this.minDiameter + (this.intervalSize * this._nextStep()))

        this.cssText = `
        position: fixed;
        background-color: ${this.color};
        border-radius: 50%;
        height: ${newDiameter}px;
        width: ${newDiameter}px;
        left: calc(${this.posX}px - ${newDiameter / 2}px); 
        top: calc(${this.posY}px - ${newDiameter / 2}px);
        `
    }

    _nextStep() {
        if (this._isInc) this._currentStep += 1
        else this._currentStep -= 1

        if (this._currentStep === 1) this._isInc = true
        if (this._currentStep === this.initInterval) this._isInc = false

        return this._currentStep
    }

}
