define [
	"helpers/ctx"
	"core/game/platform"
	"core/game/player"
	"libs/kevent"
	"libs/requestAnimationFrame"
], (getCtx, Platform, Player, KEvent) ->

	class Game

		_isMobile = window.innerWidth < 400

		PADDING = if _isMobile then 20 else 40
		WIDTH 	= (if _isMobile then 320 else 400) - PADDING
		HEIGHT 	= (if _isMobile then 480 else 600) - PADDING

		MAX_PLATEFORMS = 6
		PLATFORM_WIDTH = 80
		PLATFORM_HEIGHT = 20

		MAX_SPEED = 21

		constructor: (selector) ->
			@ctx = getCtx selector, WIDTH, HEIGHT
			@platforms = []
			@player = new Player @ctx, "img/tux.gif", 90, 80
			@createPlatforms()
			window.onresize = -> console.warn "Cannot resize in game !"

		createPlatforms: ->
			y = 0
			i = 0
			while i < MAX_PLATEFORMS
				x = ~~(Math.random() * (@ctx.width - PLATFORM_WIDTH))
				type = @player.randType()
				@platforms.push new Platform x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT, type
				if y < @ctx.height - PLATFORM_HEIGHT
					y += ~~(@ctx.height / MAX_PLATEFORMS)
				++i


		run: (callback) ->
			_run = =>
				id = requestAnimationFrame _run

				@ctx.clear()

				for platform in @platforms
					platform.hitWith @player

				@player.update @platforms, =>
					cancelAnimationFrame id
					callback @player.score

				for index, platform of @platforms
					if platform.isMoving
						if platform.x < 0
							platform.direction = 1
						else if platform.x > @ctx.width - PLATFORM_WIDTH
							platform.direction = -1
						speed = ~~(@player.score / 100)
						speed = if speed > MAX_SPEED then MAX_SPEED else speed
						platform.x += platform.direction * (index >> 1) * speed;
					platform.draw @ctx

				@player.draw()

			_run()