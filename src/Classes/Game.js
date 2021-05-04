var Player = require('./Player')

function battleshipGame(idPlayer1, idPlayer2) {
    this.currentPlayer = Math.floor(Math.random() * 2);
    this.winningPlayer = null;

    this.players = [new Player(idPlayer1), new Player(idPlayer2)];
}

battleshipGame.prototype.getPlayerId = function (player) {
    return this.players[player].id;
};

battleshipGame.prototype.getWinnerID = function () {
    if (this.winningPlayer === null) {
        return null;
    }
    return this.players[this.winningPlayer].id;
};

battleshipGame.prototype.getLoserID = function () {
    if(this.winningPlayer === null) {
        return null;
    }
    var loser = this.winningPlayer === 0 ? 1 : 0;
    return this.players[loser].id;
};

battleshipGame.prototype.switchPlayer = function () {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
}