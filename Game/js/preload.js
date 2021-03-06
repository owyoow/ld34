/*global Phaser LD34*/

LD34.Preload = function (aGame)
{
    
};

LD34.Preload.prototype = {
    
    preload: function ()
    {
        this.load.image('grid', 'assets/images/grid.png');
        this.load.tilemap('map', 'assets/tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON);
    
        this.load.image('tiles', 'assets/images/tiles.png');
        
        this.load.image('head', 'assets/images/head.png');
        this.load.image('body', 'assets/images/body.png');
        this.load.image('food', 'assets/images/food.png');
        this.load.image('projectile', 'assets/images/projectile.png');
        
        // this is used for the framerate counter
        this.time.advancedTiming = true;
    },
    
    create: function ()
    {
        this.state.start('game');
    }
};