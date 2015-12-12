/*global Phaser LD34*/

LD34.Game = function (aGame)
{
    
};

LD34.Game.prototype = {
    
    create: function ()
    {
        
    },
    
    update: function ()
    {
        
    },
    
    render: function ()
    {
        this.game.debug.text(this.time.fps || '--', 2, 14, '#00ff00');
    },
    
    shutdown: function ()
    {
        
    }
};