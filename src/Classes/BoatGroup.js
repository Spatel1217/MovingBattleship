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

    //Setup 5 boats with fixed sizes and fixed starting positions and orientations for initial testing
    addFixedBoats() {
        this.boats.push(new Boat(1, 1, 1, false, 0));
        this.boats.push(new Boat(3, 2, 2, true, 1));
        this.boats.push(new Boat(5, 5, 3, false, 2));
        this.boats.push(new Boat(8, 2, 4, false, 3));
        this.boats.push(new Boat(2, 9, 5, true, 4));
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
        let validBoatPositions = [];
        for (let j = 0; j < this.boatSizes.length; j++) {
            //j is the id of each boat, this.boatSizes[j] is the size
            //im sorry to whoever teaches algorithms and sees this
            //finding valid positions for every boat size
            for (const hor in [true, false]) {
                for(let x = 1; x <= 10; x++) {
                    for(let y = 1; y <= 10; y++) {
                        if(this.representedMap[x-1][y-1] !== 'boat') {
                            let boatFits = true;
                            for (let k = 0; k < this.boatSizes[j]; k++) {
                                if (hor) {
                                    if(this._representedMap[x - 1 + k][y - 1] == 'boat') {
                                        boatFits = false;
                                        break;
                                    }
                                } else {
                                    if(this._representedMap[x - 1][y - 1 + k] = 'boat') {
                                        boatFits = false;
                                        break;
                                    }
                                }
                            }
                            if(boatFits) {
                                validBoatPositions.push([x, y, hor])
                            }
                        }
                    }
                }
            }
            let max = Math.floor(validBoatPositions.length);
            let validPosIndex = Math.floor(Math.random() * max);
            // creating a new boat with new Boat(x, y, size, horizontal, id) from list of valid positions
            let newBoat = new Boat(validBoatPositions[validPosIndex][0],
                validBoatPositions[validPosIndex][1], this.boatSizes[j],
                validBoatPositions[validPosIndex][2], j)
            this.addBoat(newBoat)
            for (let l = 0; l < this.boatSizes[j]; l++) {
                if (newBoat.horizontal) {
                    this._representedMap[newBoat.getX() - 1 + l][newBoat.getY() - 1] = 'boat'
                } else {
                    this._representedMap[newBoat.getX()- 1][newBoat.getY() - 1 + l] = 'boat'
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
}

module.exports = BoatGroup
