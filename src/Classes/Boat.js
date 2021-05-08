
class Boat {
    id = 0;
    size = 0;
    hitpoints = 0;
    x = 0;
    y = 0;
    // position = []; //not sure how we are going to store position. will we use coordinates within the code? and only use the a-j 0-9 system for user input?
    placed = false;
    horizontal = true;
    selected = false;
    active = true;
    destroyed = false;

    constructor(x, y, size, horizontal, id) {
        this.x = x;
        this.y = y;
        this.horizontal = horizontal;
        this.id = id;
        this.size = size;
        this.hitpoints = size; //segments of the ship equal hitpoints as in regular battleship
    }

    select() {
        if (this.active) {
            this.selected = true;
        }
    }

    unselect() {
        this.selected = false;
    }

    disable() {
        this.active = false;
    }

    hit() {
        this.hitpoints--;
        console.log("hit")
        if (this.hitpoints === 0) {
            this.destroyed = true;
        }
    }

    flip() {
        this.horizontal = !this.horizontal;
    }

    placedBoat() {
        this.placed = !this.placed;
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    getSize() {
        return this.size
    }

    //returns true if the boat was destroyed
    testHit(x, y) {
        if (this.horizontal) {
            if (this.getY() === y && x >= this.getX() && x <= this.getX() + this.getSize() - 1){
                this.hit();
                return true;
            }
        }
        else{
            if (this.getX() === x && y >= this.getY() && y <= this.getY() + this.getSize() - 1){
                this.hit();
                return true;
            }
        }
        return false;
    }

    isDestroyed() {
        return this.destroyed;
    }
}

module.exports = Boat
