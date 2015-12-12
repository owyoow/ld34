/*global Phaser LD34*/

LD34.Boot = function (aGame)
{
    
};

LD34.Boot.prototype = {
    
    preload: function ()
    {
        this.scale.pageAlignHorizontally = true;
        
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    },
    
    create: function ()
    {
        this.state.start('preload');
    }
};