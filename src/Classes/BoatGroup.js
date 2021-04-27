import { Boat } from "@/Classes/Boat.js"

export class BoatGroup {
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

    _addBoats() {
        for (let i = 1; i <= this.size; i++) {
            this.boats.push(new Boat(i+1,i))
        }
    }
}