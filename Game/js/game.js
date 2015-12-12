/*global Phaser LD34*/

LD34.Game = function (aGame)
{
    
};

LD34.Game.prototype = {
    
    create: function ()
    {
        this.add.sprite(0, 0, 'grid');
        
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tiles');
        
        this.map.setCollisionBetween(0, 1);
        
        this.mapLayer = this.map.createLayer('tiles');
        this.cursors = this.input.keyboard.createCursorKeys();
    },
    
    update: function ()
    {
        if(this.cursors.left.isDown && this.cursors.right.isDown)
        {
            console.log('both keys down');
        }
    },
    
    render: function ()
    {
        this.game.debug.text(this.time.fps || '--', 2, 14, '#00ff00');
    },
    
    shutdown: function ()
    {
        
    }
};