export class Board {
    name = "default";
    height = 10;
    width = 10;
    hoverMap = [];
    boatMap = [];
    hitMap = [];
    okSelected = false;

    constructor() {
        this.boatMap = this._resetMap();
        this.hitMap = this._resetMap();
        this.hoverMap = this._resetMap();
    }

    hoverSquare(square, boatGroup) {
        var selectedBoat = boatGroup.selectedBoat;
        if (selectedBoat === null) {
            return false;
        } else {
            this.hoverMap = this._resetMap();

            var posX = Number(square.dataset.x) - 1,
                posY = Number(square.dataset.y) - 1,
                boatSize = Number(selectedBoat.size) - 1,
                half = Math.floor(boatSize / 2),
                remain = boatSize % 2;

            if (selectedBoat.horizontal) {
                var min = posX - half >= 0 ? posX - half : 0,
                    max = posX + half + remain <= 9 ? posX + half + remain : 9;


                for (let i = min; i <= max; i++) {
                    this.hoverMap[posY].splice(i,1,true)
                    if (this.boatMap[posY][i]) {
                        this.okSelected = false;
                    }
                }

                if (posX + half + remain > 9 || posX - half < 0) {
                    this.okSelected = false;
                }
            } else {
                (min = posY - half >= 0 ? posY - half : 0),
                    (max = posY + half + remain <= 9 ? posY + half + remain : 9);

                for (let i = min; i <= max; i++) {
                    this.hoverMap[i].splice(posX, 1, true);

                    if (this.boatMap[i][posX]) {
                        this.okSelected = false;
                    }
                }

                if (posY + half + remain > 9 || posY - half < 0) {
                    this.okSelected = false;
                }
            }
        }
    }

    putBoat(square, boatGroup) {
        var selectedBoat = boatGroup.selectedBoat;

        if (selectedBoat === null || !this.okSelected) {
            return false;
        } else {
            var posX = Number(square.dataset.x) - 1,
                posY = Number(square.dataset.y) - 1,
                boatSize = Number(selectedBoat.size) - 1,
                half = Math.floor(boatSize / 2),
                remain = boatSize % 2;

            if (selectedBoat.horizontal) {
                var min = posX - half >= 0 ? posX - half : 0,
                    max = posX + half + remain <= 9 ? posX + half + remain : 9;

                for (let i = min; i <= max; i++) {
                    this.boatMap[i].splice(posY, 1, selectedBoat.id);
                    selectedBoat.position.push([posX, i]);
                }

            } else {
                (min = posY - half >= 0 ? posY - half : 0),
                    (max = posY + half + remain <= 9 ? posY + half + remain : 9);

                for (let i = min; i <= max; i++) {
                    this.boatMap[i].splice(posX, 1, selectedBoat.id);
                    selectedBoat.position.push([posX,i]);
                }
            }

            selectedBoat.unselect();
            selectedBoat.disable();
            selectedBoat.placed = true;
            boatGroup.placedBoats++;
            boatGroup.selectBoat(null);
        }
    }

    removeBoat(boat, boatGroup) {
        var _this = this;

        boat.position.forEach(function(coord) {
            _this.boatMap[coord[1]].splice(coord[0], 1, false);
        });

        boat.x = null;
        boat.y = null;
        boat.enable();
        boat.placed = false;
        boatGroup.selectBoat(boat);
    }

    _resetMap() {
        var array = [];
        for (let i = 0; i < this.height; i++) {
            var line = [];

            for (let j = 0; j < this.width; i++) {
                line[j] = false;
            }
            array[i] = line;
        }

        return array;
    }

    createFixedShips(boatGroup) {
        var _this = this;
        boatGroup.addFixedBoats();
        boatGroup.boats.reverse().forEach(function(boat) {
            _this.boatMap[boat.y][boat.x] = boat.id;
            boat.placedBoat();
            boatGroup.placedBoats++;
        });

        boatGroup.boats.reverse();
    }

}
