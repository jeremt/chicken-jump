// Generated by CoffeeScript 1.3.3
(function() {

  require.config({
    "kevent": "libs/kevent"
  });

  require(["core/menu", "core/game/main", "helpers/socialshare", "libs/zepto"], function(Menu, Game, share, $) {
    var gameMenu, message, pages, runGame;
    message = "";
    runGame = function() {
      var game;
      game = new Game("#game");
      return game.run(function(score) {
        gameMenu.switchPage("#end");
        document.querySelector("#score").innerHTML = score;
        return message = "I just scored " + score + " to chicken-jump :) Try to do better !";
      });
    };
    pages = {
      "#menu": null,
      "#game": runGame,
      "#credits": null,
      "#help": null,
      "#end": null
    };
    gameMenu = new Menu("#main", "#menu", pages);
    return $(".twitter, .facebook").click(function() {
      return share($(this).attr("class"), "Yeah !", message);
    });
  });

}).call(this);
