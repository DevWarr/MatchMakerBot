class enmap {
    constructor(attrs) {
        this.attrs = attrs
    }

    get(prop) {
        prop = String(prop)
        return this.attrs[prop] ? this.attrs[prop] : "No property by this name"
    }

    set (prop, value) {
        prop = String(prop)
        if (!this.attrs[prop]) {
            return "This property does not exist. Did you mean to create a new property with 'setNew()'?"
        }
        if (typeof this.attrs[prop] !== typeof value) {
            return `You are trying to assign a ${typeof value} value to a ${typeof this
                .attrs[prop]}.\nAre you sure?\nIf so, use 'setForce()'.`
        }
        this.attrs[prop] = value
        return `${prop} is now set to ${value}!`
    }

    setForce (prop, value) {
        prop = String(prop)
        if (!this.attrs[prop]) {
            return "This property does not exist. Did you mean to create a new property with 'setNew()'?"
        }
        this.attrs[prop] = value
        return `${this.attrs[prop]}(type: ${typeof this.attrs[prop]}) is now set to ${value}(type: ${typeof value})!`
    }

    setNew (prop, value) {
        prop = String(prop)
        if (this.attrs[prop]) {
            return `${this.attrs[prop]} already exists. Did you mean to set it with 'set()' or 'setForce()'?`
        }
        this.attrs[prop] = value
        return `Assigned a new property ${prop} with value ${value}`
    }
}

module.exports = enmap