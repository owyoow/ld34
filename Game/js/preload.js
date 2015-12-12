/*global Phaser LD34*/

LD34.Preload = function (aGame)
{
    
};

LD34.Preload.prototype = {
    
    preload: function ()
    {
        // preloading assets will go here
        
        // this is used for the framerate counter
        this.time.advancedTiming = true;
    },
    
    create: function ()
    {
        this.state.start('game');
    }
};