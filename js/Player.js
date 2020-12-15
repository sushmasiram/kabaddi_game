class Player
{
    constructor()
    {
        this.index = null;
        this.x = 300;
        this.y = 250;
        this.score = 0;
        this.name = null;
    }

    static createPlayerSprites()
    {
        player1_sprite = createSprite(300, 250, 10, 10);
        player1_sprite.addAnimation("player1", player1_animation);
        player1_animation.frameDelay = 200;
        player1_sprite.scale = 0.5;
        player1_sprite.setCollider("circle", 0, 0, 60);
        playerSprites.push(player1_sprite);
        
        player2_sprite = createSprite(300, 250, 10, 10);
        player2_sprite.addAnimation("player2", player2_animation);
        player2_animation.frameDelay = 200;
        player2_sprite.scale = -0.5;
        player2_sprite.setCollider("circle", 0, 0, 60);
        playerSprites.push(player2_sprite);
    }

    static resetDB()
    {
        database.ref("players/player1").set(
        {
            name: "",
            score: 0,
            position: {x: 300, y: 250}
        });

        database.ref("players/player2").set(
        {
            name: "",
            score: 0,
            position: {x: 300, y: 250}
        });
    }

    static getPlayerInfo(index)
    {
        var positionRef = database.ref("players/player" + index + "/position");
        positionRef.on("value", function(data)
        {
            if(index === 1)
            {
                player1_position = data.val();
                player1_sprite.x = player1_position.x;
                player1_sprite.y = player1_position.y;
            }

            if(index === 2)
            {
                player2_position = data.val();
                player2_sprite.x = player2_position.x;
                player2_sprite.y = player2_position.y;
            }
        });

        var playerScoreRef = database.ref("players/player" + index + "/score");
        playerScoreRef.on("value", function(data)
        {
            if(index === 1)
            {
                player1_score = data.val();
            }

            if(index === 2)
            {
                player2_score = data.val();
            }
        });

        var playerNameRef = database.ref("players/player" + index + "/name");
        playerNameRef.on("value", function(data)
        {
            if(index === 1)
            {
                player1_name = data.val();
            }

            if(index === 2)
            {
                player2_name = data.val();
            }
        });
    }

    static updateCount(count)
    {
        database.ref("/").update(
        {
            playerCount: count
        });
    }

    static updateScore(index, score)
    {
        var node = "players/player" + index;
        database.ref(node).update(
        {
            score: score
        });
    }

    static changePosition()
    {
        database.ref("players/player1/position").update(
        {
            x: 150,
            y: 300
        });

        database.ref("players/player2/position").update(
        {
            x: 450,
            y: 300
        });
    }

    getCount()
    {
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", function(data)
        {
            playerCount = data.val();
        });
    }

    update()
    {
        var node = "players/player" + this.index;
        database.ref(node).set(
        {
            name: this.name,
            score: this.score,
            position: {x: this.x, y: this.y}
        });
    }

    updatePosition(x, y)
    {
        var node = "players/player" + this.index + "/position";
        database.ref(node).update(
        {
            x: this.index === 1 ? player1_position.x + x : player2_position.x + x,
            y: this.index === 1 ? player1_position.y + y : player2_position.y + y
        });
    }
}