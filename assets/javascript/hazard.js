export const createHazard = function(position, obstacleGraphics) {

    return new Hazard(position, obstacleGraphics);

}

var Hazard = function(position, obstacleGraphics) {
    this.graphics = obstacleGraphics;
    this.variant = Math.floor(Math.random() * 7)
    this.position = position;
    this.radius = 17;
    this.moveSpeed = 5
    this.collided = false;
}

Hazard.prototype.move = function() {
    this.position[1] -= this.moveSpeed
}

Hazard.prototype.draw = function(context) {

    switch (this.variant) {
        case 0:
            context.drawImage(
                this.graphics,
                0, 28, 30, 34,
                this.position[0], this.position[1], 30, 34
            );
            break;
        case 1:
            context.drawImage(
                this.graphics,
                0, 28, 30, 34,
                this.position[0], this.position[1], 30, 34
            );
            break;
        case 2:
            context.drawImage(
                this.graphics,
                95, 66, 32, 64,
                this.position[0], this.position[1], 32, 64
            );
            break;
        case 3:
            context.drawImage(
                this.graphics,
                30, 52, 23, 11,
                this.position[0], this.position[1], 23, 11
            );
            break;
        case 4:
            context.drawImage(
                this.graphics,
                85, 138, 15, 32,
                this.position[0], this.position[1], 15, 32
            );
            break;
        case 5:
            context.drawImage(
                this.graphics,
                110, 56, 30, 9,
                this.position[0], this.position[1], 30, 9
            )
            break;
        case 6:
            context.drawImage(
                this.graphics,
                0, 103, 23, 27,
                this.position[0], this.position[1], 23, 27
            )
    }
};