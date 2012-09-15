require.config
	"kevent": "libs/kevent"

require ["core/game"], (Game) ->
	game = new Game "#game"

	game.run (score) ->
		console.log "score: #{score}"