require.config
	"kevent": "libs/kevent"

require [
	"core/menu"
	"core/game/main"
	"helpers/socialshare",
	"libs/zepto"
], (Menu, Game, share, $) ->

	message = ""

	runGame = ->
		game = new Game "#game"
		game.run (score) ->
			gameMenu.switchPage "#end"
			document.querySelector("#score").innerHTML = score
			message = "I just scored #{score} to chicken-jump :) Try to do better !"

	pages =
		"#menu"		 : null
		"#game"		 : runGame
		"#credits" : null
		"#help"		 : null
		"#end" 		 : null

	gameMenu = new Menu "#main", "#menu", pages


	# handle social share

	$(".twitter, .facebook").click ->
		share $(@).attr("class"), "Yeah !", message