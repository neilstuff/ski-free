import { createView } from './game_view';
import { createGame } from './game';

document.addEventListener('DOMContentLoaded', function() {
    var skierGraphics = document.getElementById('skier');
    var obstaclesGraphics = document.getElementById('obstacles');
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var game = createGame(skierGraphics, obstaclesGraphics)
    var gameView = createView(game, context)

    document.addEventListener("keydown", function(e) {
        console.log("pressed a key");

        if (e.keyCode == 39) {
            game.keysPressed.right = true;
        } else if (e.keyCode == 37) {
            game.keysPressed.left = true;
        } else if (e.keyCode == 38) {
            game.keysPressed.up = true
        }
    }, false);

    document.addEventListener("keyup", function(e) {
        if (e.keyCode == 39) {
            game.keysPressed.right = false;
        } else if (e.keyCode == 37) {
            game.keysPressed.left = false;
        } else if (e.keyCode == 38) {
            game.keysPressed.up = false
        } else if (e.keyCode == 13) {
            $("canvas").removeClass("pre-canvas").addClass("play-canvas");
            $("instructions").removeClass("pre-instructions").addClass("post-instructions");
            $("key").removeClass("key").addClass("post-key");
            gameView.startGame();
        } else if (e.keyCode == 82) {
            game.reset()
        }
    }, false);

})