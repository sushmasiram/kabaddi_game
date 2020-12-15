class Game
{
    constructor(){}

    getState()
    {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data)
        {
            gameState = data.val();
        });
    }

    update(state)
    {
        database.ref("/").update(
        {
            gameState: state
        });
    }

    async join()
    {
        if(gameState === 0 && playerCount < 2)
        {
            player = new Player();
            var playerCountRef = await database.ref("playerCount").once("value");
            if(playerCountRef.exists())
            {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form()
            form.display();

            Player.createPlayerSprites();
        }
    }

    start()
    {
        if(gameState === 1)
        {
            form.hide();
            text("Press space to toss.", 230, 350);

            if(keyDown("space"))
            {
                gameState = Math.round(random(2, 3));
                this.update(gameState);
                Player.changePosition();
            }
        }
        Player.getPlayerInfo(1);
        Player.getPlayerInfo(2);
    }

    redPlay()
    {
        if(gameState === 2)
        {
            if(player.index !== null)
            {
                if(player.index === 1)
                {
                    if(keyDown(LEFT_ARROW))
                    {
                        player.updatePosition(-1, 0);
                    }

                    if(keyDown(RIGHT_ARROW))
                    {
                        player.updatePosition(1, 0);
                    }

                    if(keyDown(UP_ARROW))
                    {
                        player.updatePosition(0, -1);
                    }

                    if(keyDown(DOWN_ARROW))
                    {
                        player.updatePosition(0, 1);
                    }
                }

                if(player.index === 2)
                {
                    if(keyDown("w"))
                    {
                        player.updatePosition(0, -1);
                    }

                    if(keyDown("s"))
                    {
                        player.updatePosition(0, 1);
                    }
                }

                if(player1_sprite.x > 500)
                {
                    player1_score = player1_score + 5;
                    player2_score = player2_score === 0 ? 0 : player2_score - 5;

                    Player.updateScore(1, player1_score);
                    Player.updateScore(2, player2_score);

                    gameState = 4;
                }

                if(player1_sprite.isTouching(player2_sprite))
                {
                    player1_score = player1_score === 0 ? 0 : player1_score - 5;
                    player2_score = player2_score + 5;

                    Player.updateScore(1, player1_score);
                    Player.updateScore(2, player2_score);

                    gameState = 5;
                }
            }
            this.update(gameState);
        }
    }

    yellowPlay()
    {
        if(gameState === 3)
        {
            if(player.index !== null)
            {
                if(player.index === 1)
                {
                    if(keyDown(UP_ARROW))
                    {
                        player.updatePosition(0, -1);
                    }

                    if(keyDown(DOWN_ARROW))
                    {
                        player.updatePosition(0, 1);
                    }
                }

                if(player.index === 2)
                {
                    if(keyDown("a"))
                    {
                        player.updatePosition(-1, 0);
                    }

                    if(keyDown("d"))
                    {
                        player.updatePosition(1, 0);
                    }

                    if(keyDown("w"))
                    {
                        player.updatePosition(0, -1);
                    }

                    if(keyDown("s"))
                    {
                        player.updatePosition(0, 1);
                    }
                }

                if(player2_sprite.x < 100)
                {
                    player1_score = player1_score === 0 ? 0 : player1_score - 5;
                    player2_score = player2_score + 5;

                    Player.updateScore(1, player1_score);
                    Player.updateScore(2, player2_score);

                    gameState = 6;
                }

                if(player1_sprite.isTouching(player2_sprite))
                {
                    player1_score = player1_score + 5;
                    player2_score = player2_score === 0 ? 0 : player2_score - 5;

                    Player.updateScore(1, player1_score);
                    Player.updateScore(2, player2_score);

                    gameState = 7;
                }
            }
            this.update(gameState);
        }
    }
}