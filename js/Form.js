class Form
{
    static isReset = false;

    constructor()
    {
       this.input = createInput("Name");
       this.button = createButton("Play");
       this.title = createElement("h2");
       this.reset = createButton("Reset");
       this.help = createButton("Help");
    }

    hide()
    {
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }

    display()
    {
        this.title.html("KABBADDI");
        this.title.position(500, 50);
        this.title.style("font-size", "70px");
        this.title.style("color", "skyblue");

        this.input.position(530, 400);
        this.input.style("width", "200px");
        this.input.style("height", "20px");

        this.button.position(590, 450);
        this.button.style("width", "100px");
        this.button.style("height", "40px");
        this.button.style("font-size", "20px");
        this.button.style("font-weight", "bold");

        this.reset.position(850, 580);
        this.reset.style("width", "80px");
        this.reset.style("height", "30px");
        this.reset.style("font-size", "15px");
        this.reset.style("font-weight", "bold");

        this.help.position(350, 580);
        this.help.style("width", "70px");
        this.help.style("height", "30px");
        this.help.style("font-size", "15px");
        this.help.style("font-weight", "bold");

        this.button.mousePressed(() =>
        {
            this.title.hide();
            this.input.hide();
            this.button.hide();

            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            Player.updateCount(playerCount);
        });

        this.reset.mousePressed(() =>
        {
            game.update(0);

            Player.updateCount(0);
            Player.resetDB();

            isReset = true;
        });

        this.help.mousePressed(() =>
        {
            alert("RED moves with Arrow keys. " +
            "YELLOW moves with 'a', 'd', 'w', 's' keys." +
            "\n\nWhen RED RIDEs, then " +
            "\n- RED Player can move in all directions." +
            "\n- YELLOW Player can move only up and down." +
            "\n\nWhen YELLOW RIDEs, then " +
            "\n- YELLOW Player can move in all directions." +
            "\n- RED Player can move only up and down.");
        });
    }
}