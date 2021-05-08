class Boat {
    id = 0;
    size = 0;
    hitpoints = 0;
    x = 0;
    y = 0;
    position = []; //not sure how we are going to store position. will we use coordinates within the code? and only use the a-j 0-9 system for user input?
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
        this.setupPositions();
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

    //returns true if successful hit
    testHit(x, y) {
        for (const i in this.position) {
            // console.log('x ' + x + ' otherx ' + this.position[i][0])
            if (x == this.position[i][0] && y == this.position[i][1]) {
                this.hit();
                return true;
            }
        }
        return false;
    }

    isDestroyed() {
        return this.destroyed;
    }

    setupPositions() {
        for (let i = 0; i < this.size; i++) {
            if (this.horizontal) {
                this.position.push([this.x + i, this.y]);
            } else {
                this.position.push([this.x, this.y + i]);
            }
        }
    }

    getPosition() {
        return this.position;
    }
}

module.exports = Boat
