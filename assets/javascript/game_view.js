export const createView = function(game, ctx) {

    return new GameView(game, ctx);

}

var GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.gameStarted = false;

    this.game.view = this;

}

GameView.prototype.startGame = function() {
    if (this.gameStarted) {} else {
        this.gameStarted = true;

        this.interval = setInterval(() => {
            this.game.updateBoard();
            this.game.draw(this.ctx);
        }, 30)
    }

}

GameView.prototype.stopGame = function() {

    clearInterval(this.interval);
    this.gameStarted = false

}