const Boat = require("./Boat");

class BoatGroup {
    size = 5;
    placedBoats = 0;
    selectedBoat = null;
    boats = [];

    constructor() {
        this._addBoats();
    }

    selectBoat(target) {
        if (this.selectedBoat !== null) {
            this.selectedBoat.unselect();
        }
        this.selectedBoat = target;

        if (target !== null) {
            target.select;
        }
    }

    //Setup 5 boats with fixed sizes and random starting positions and orientations
    _addBoats() {
        for (let i = 1; i <= this.size; i++) {
            this.boats.push(new Boat(i+1,i))
        }
    }

    addBoat(boat) {
        this.boats.push(boat);
    }

    getBoats() {
        return this.boats;
    }
}

module.exports = BoatGroup