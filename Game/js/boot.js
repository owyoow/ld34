/*global Phaser LD34*/

LD34.Boot = function (aGame)
{
    
};

LD34.Boot.prototype = {
    
    preload: function ()
    {
        this.scale.pageAlignHorizontally = true;
        this.scale.setUserScale(2, 2);
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
    },
    
    create: function ()
    {
        this.state.start('preload');
    }
};