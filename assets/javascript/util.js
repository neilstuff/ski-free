export const Util = {

    randomStartPosition() {
        let x_coord = Math.floor(Math.random() * 500);
        let y_coord = 500;
        let position = [x_coord, y_coord];
        return position
    },

    randomPosition() {
        var position = [];
        for (var i = 0; i < 2; i++) {
            position.push(Math.floor(Math.random() * 500));
        }

        return position;
    }


}