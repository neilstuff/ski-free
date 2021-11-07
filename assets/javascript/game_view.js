export const createView = function(game, ctx) {

    return new GameView(game, ctx);

}

var GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.gameStarted = false
}

GameView.prototype.startGame = function() {
    if (this.gameStarted) {} else {
        this.gameStarted = true;
        setInterval(() => {
            this.game.updateBoard();
            this.game.draw(this.ctx);
        }, 30)
    }
}