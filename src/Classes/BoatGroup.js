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

    //Setup 5 boats with fixed sizes and fixed starting positions and orientations
    _addFixedBoats() {
        this.boats.push(new Boat(1, 1, 1, 0));
        this.boats[0].flip(); // vertical
        this.boats.push(new Boat(3, 2, 2, 1));
        this.boats.push(new Boat(5, 5, 3, 2));
        this.boats[2].flip(); //vertical
        this.boats.push(new Boat(8, 2, 4, 3));
        this.boats[3].flip(); //vertical
        this.boats.push(new Boat(8, 8, 5, 4));
    }

    addBoat(boat) {
        this.boats.push(boat);
    }

    getBoats() {
        return this.boats;
    }
}

module.exports = BoatGroup