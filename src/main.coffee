require.config
	"kevent": "libs/kevent"

require [
	"core/menu"
	"core/game/main"
], (Menu, Game) ->

	runGame = ->
		game = new Game "#game"
		game.run (score) ->
			gameMenu.switchPage "#end"
			document.querySelector("#score").innerHTML = score

	pages =
		"#menu"		 : null
		"#game"		 : runGame
		"#credits" : null
		"#help"		 : null
		"#end" 		 : null

	gameMenu = new Menu "#main", "#menu", pages