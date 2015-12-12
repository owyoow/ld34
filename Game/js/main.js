/*global Phaser*/

var LD34 = {
    
};

window.onload = function ()
{
    var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'gameContainer');

    game.state.add('boot', LD34.Boot);
    game.state.add('preload', LD34.Preload);
    game.state.add('menu', LD34.Menu);
    game.state.add('game', LD34.Game);
    
    game.state.start('boot');
};