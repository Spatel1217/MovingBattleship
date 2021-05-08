const Boat = require("./Boat");

class BoatGroup {
    size = 5;
    placedBoats = 0;
    selectedBoat = null;
    boatSizes = [1, 2, 3, 4, 5];
    boats = [];
    _representedMap = [];

    constructor() {
        // this.addFixedBoats()
        this.addRandomBoats();
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

    addRandomBoats() {
        //determine positions (horizontal or vertical)
        //make sure they dont overlap
        //boats.push(new Boat(x, y, size, id))
        //x -> 1-10 (A-J)
        //y -> 1-10
        //size -> from 1-5
        //id -> 0-4
        this._representedMap = Array.from({length: 10}, () =>
            Array.from({length: 10}, () => ''))
        //placing boats into representedMap
        let validBoatPositions;
        let horizontal;
        let boatFits;
        for (let j = 0; j < this.boatSizes.length; j++) {
            validBoatPositions = [];
            //j is the id of each boat, this.boatSizes[j] is the size
            //im sorry to whoever teaches algorithms and sees this
            //finding valid positions for every boat size
            for (const h in [0, 1]) {
                horizontal = h == 0
                //for horizontal and vertical placement
                for (let x = 1; x <= 10; x++) {
                    //for every x
                    for (let y = 1; y <= 10; y++) {
                        //for every y
                        if (this._representedMap[x - 1][y - 1] !== 'boat') {
                            //for every empty spot
                            boatFits = true;
                            for (let k = 0; k < this.boatSizes[j]; k++) {
                                //for each segment in the boat
                                if (horizontal) {
                                    //check if pos is on the grid
                                    if ((x + this.boatSizes[j] - 1) <= 10) {
                                        //check if pos is already a boat
                                        if (this._representedMap[x - 1 + k][y - 1] === 'boat') {
                                            boatFits = false;
                                            break;
                                        }
                                    } else {
                                        boatFits = false;
                                        break;
                                    }
                                } else {
                                    if ((y + this.boatSizes[j] - 1) <= 10) {
                                        if (this._representedMap[x - 1][y - 1 + k] === 'boat') {
                                            boatFits = false;
                                            break;
                                        }
                                    } else {
                                        boatFits = false;
                                        break;
                                    }
                                }
                            }
                            //if pos is valid, add to list
                            if (boatFits) {
                                validBoatPositions.push([x, y, horizontal])
                            }
                        }
                    }
                }
            }
            let max = Math.floor(validBoatPositions.length);
            let validPosIndex = Math.floor(Math.random() * max);
            let boatPosition = validBoatPositions[validPosIndex]
            // creating a new boat with new Boat(x, y, size, horizontal, id) from list of valid positions
            let newBoat = new Boat(boatPosition[0],
                boatPosition[1], this.boatSizes[j],
                boatPosition[2], j)
            this.addBoat(newBoat)
            for (let l = 0; l < this.boatSizes[j]; l++) {
                if (newBoat.horizontal) {
                    this._representedMap[newBoat.getX() - 1 + l][newBoat.getY() - 1] = 'boat'
                } else {
                    this._representedMap[newBoat.getX() - 1][newBoat.getY() - 1 + l] = 'boat'
                }
            }
        }
    }

    addBoat(boat) {
        this.boats.push(boat);
    }

    getBoats() {
        return this.boats;
    }

    get representedMap() {
        return this._representedMap;
    }

    hitBoat(x, y) {
        for (let i = 0; i < this.boats.length; i++) {
            if (this.boats[i].testHit(x, y)) {
                return this.boats[i];
            }
        }
        return null;
    }

    allDestroyed() {
        for (let i = 0; i < this.boats.length; i++) {
            if (!this.boats[i].isDestroyed()) {
                return false;
            }
        }
        return true;
    }
}

module.exports = BoatGroup
