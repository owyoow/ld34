/*global Phaser LD34*/

LD34.Game = function (aGame)
{
    this.snake = [];
    this.bodyPositions = [];
    
    this.nextPosition;
    
    this.canStop;
    
    this.snakeHead;
    
    this.currentDir = 0;
    this.desiredDir = 0;
    this.directions = [Phaser.DOWN, Phaser.LEFT, Phaser.UP, Phaser.RIGHT];
    
    this.goingLeft = false;
    this.goingRight = false;
};

LD34.Game.prototype = {
    
    create: function ()
    {
        this.add.sprite(0, 0, 'grid');
        
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tiles');
        
        this.map.setCollisionBetween(0, 1);
        
        this.mapLayer = this.map.createLayer('tiles');
        
        this.currentDir = 2;
        this.desiredDir = 2;
        this.nextPosition = new Phaser.Point();
        this.canStop = true;
        
        this.bodyParts = this.add.group();
        this.bodyParts.enableBody = true;
        this.bodyParts.physicsBodyType = Phaser.Physics.ARCADE;
        this.bodyParts.createMultiple(100, 'body');
        this.bodyParts.setAll('anchor.x', 0.5);
        this.bodyParts.setAll('anchor.y', 0.5);
        
        var foundPos = false;
        var foodPos = new Phaser.Point();
        
        while(!foundPos)
        {
            var rndX = this.game.rnd.between(1, this.map.width - 2);
            var rndY = this.game.rnd.between(1, this.map.height - 2);
            
            if(this.map.getTile(rndX, rndY).index === 1)
            {
                foodPos.x = rndX;
                foodPos.y = rndY;
                foundPos = true;
            }
        }
        
        this.food = this.add.sprite(this.gridToWorld(foodPos.x), this.gridToWorld(foodPos.y), 'food');
        this.food.anchor.set(0.5);
        this.physics.arcade.enableBody(this.food);
        
        this.snakeHead = this.add.sprite(this.gridToWorld(5), this.gridToWorld(6), 'head');
        this.snakeHead.anchor.set(0.5);
        this.physics.arcade.enableBody(this.snakeHead);
        //this.snake.push(this.snakeHead);
        //this.bodyPositions.push(new Phaser.Point(this.snakeHead.x, this.snakeHead.y));
        
        for(var i = 0; i < 3; i++)
        {
            var snakeBody = this.bodyParts.getFirstExists(false);
            snakeBody.reset(this.snakeHead.x, this.snakeHead.y);
            this.snake.push(snakeBody);
            this.bodyPositions.push(new Phaser.Point(snakeBody.x, snakeBody.y));
        }
        
        var leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        leftKey.onDown.add(this.leftKeyDown, this);
        leftKey.onUp.add(this.leftKeyUp, this);

        var rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rightKey.onDown.add(this.rightKeyDown, this);
        rightKey.onUp.add(this.rightKeyUp, this);
        
        this.loopTimer = this.time.events.loop(100, this.updateSnake, this);
        console.log(this.snake.length);
    },
    
    update: function ()
    {
        this.physics.arcade.overlap(this.snakeHead, this.food, this.eatFood, null, this);
    },
    
    render: function ()
    {
        this.game.debug.text(this.time.fps || '--', 2, 14, '#00ff00');
    },
    
    shutdown: function ()
    {
        
    },
    
    updateSnake: function ()
    {
        if(this.goingLeft && this.goingRight && this.canStop)
        {
            return;
        }
        else if(this.goingRight)
        {
            this.goingRight = false;
            this.goingLeft = false;
            
            this.desiredDir = this.currentDir + 1;
            if(this.desiredDir > this.directions.length - 1)
            {
                this.desiredDir = 0;
            }
        }
        else if(this.goingLeft)
        {
            this.goingLeft = false;
            this.goingRight = false;
            
            this.desiredDir = this.currentDir - 1;
            if(this.desiredDir < 0)
            {
                this.desiredDir = this.directions.length - 1;
            }
        }
        else
        {
            this.desiredDir = this.currentDir;
        }
        
        var headPos = new Phaser.Point(this.worldToGrid(this.snakeHead.x), this.worldToGrid(this.snakeHead.y));
        
        // set the next position according to the desired direction
        switch(this.directions[this.desiredDir])
        {
            case Phaser.DOWN:
                this.nextPosition.x = headPos.x;
                this.nextPosition.y = headPos.y + 1;
                break;
            
            case Phaser.LEFT:
                this.nextPosition.x = headPos.x - 1;
                this.nextPosition.y = headPos.y;
                break;
                
            case Phaser.UP:
                this.nextPosition.x = headPos.x;
                this.nextPosition.y = headPos.y - 1;
                break;
                
            case Phaser.RIGHT:
                this.nextPosition.x = headPos.x + 1;
                this.nextPosition.y = headPos.y;
                break;
        }
        
        if(this.map.getTile(this.nextPosition.x, this.nextPosition.y).index > 1) 
        {
            return;
        }
        
        this.nextPosition.x = this.gridToWorld(this.nextPosition.x);
        this.nextPosition.y = this.gridToWorld(this.nextPosition.y);
        
        var hitSelf = false;
        for(var i = 0; i < this.snake.length; i++)
        {
            if(this.nextPosition.x === this.snake[i].x && this.nextPosition.y === this.snake[i].y)
            {
                hitSelf = true;
            }
        }
        
        if(hitSelf)
        {
            return;
        }
        
        // if(this.nextPosition.x === this.food.x && this.nextPosition.y === this.food.y)
        // {
        //     this.eatFood();
        // }
        
        this.bodyPositions.push(new Phaser.Point(this.snakeHead.x, this.snakeHead.y));
        this.bodyPositions.shift();
        
       
        for(var i = 0; i < this.snake.length; i++)
        {
            this.snake[i].x = this.bodyPositions[i].x;
            this.snake[i].y = this.bodyPositions[i].y;
        }
        
        this.snakeHead.x = this.nextPosition.x;
        this.snakeHead.y = this.nextPosition.y;
        // update the current direction
        this.currentDir = this.desiredDir;
        
    },
    
    eatFood: function ()
    {
        var foundPos = false;
        var foodPos = new Phaser.Point();
        
        while(!foundPos)
        {
            var rndX = this.game.rnd.between(1, this.map.width - 2);
            var rndY = this.game.rnd.between(1, this.map.height - 2);
            
            if(this.map.getTile(rndX, rndY).index === 1)
            {
                var foodOnBody = false;
                this.bodyParts.forEach(function (aPart)
                {
                    if(this.gridToWorld(rndX) === aPart.x && this.gridToWorld(rndY) === aPart.y)
                    {
                        foodOnBody = true;
                    }
                }, this);
                
                if(!foodOnBody)
                {
                    foodPos.x = rndX;
                    foodPos.y = rndY;
                    foundPos = true;
                }
                
            }
        }
        
        this.food.reset(this.gridToWorld(foodPos.x), this.gridToWorld(foodPos.y));
        
        var bodyPart = this.bodyParts.getFirstExists(false);
        bodyPart.reset(this.snakeHead.x, this.snakeHead.y);
        
        this.snake.unshift(bodyPart);
        this.bodyPositions.unshift(new Phaser.Point(bodyPart.x, bodyPart.y));
    },
    
    leftKeyDown: function ()
    {
        this.goingLeft = true;
        //this.goingRight = false;
    },
    
    leftKeyUp: function ()
    {
        this.goingLeft = false;
    },
    
    rightKeyDown: function ()
    {
        this.goingRight = true;
        //this.goingLeft = false;
    },
    
    rightKeyUp: function ()
    {
        this.goingRight = false;
    },
    
    gridToWorld: function (aN)
    {
        return aN * LD34.TILESIZE + LD34.TILESIZE * 0.5;
    },
    
    worldToGrid: function (aN)
    {
        return (aN - LD34.TILESIZE * 0.5) / LD34.TILESIZE;
    }
};