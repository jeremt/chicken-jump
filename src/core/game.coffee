define [
	"helpers/ctx"
	"core/platform"
	"core/player"
	"libs/kevent"
	"libs/requestAnimationFrame"
], (getCtx, Platform, Player, KEvent) ->

	class Game

		WIDTH 	= 400
		HEIGHT 	= 600

		MAX_PLATEFORMS = 8
		PLATFORM_WIDTH = 80
		PLATFORM_HEIGHT = 20;

		constructor: (selector) ->
			@ctx = getCtx selector, WIDTH, HEIGHT
			@platforms = []
			@player = new Player @ctx, "img/tux.png"
			@createPlatforms()

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
						platform.x += platform.direction * (index >> 1) * speed;
					platform.draw(@ctx)

				@player.draw()

			_run()