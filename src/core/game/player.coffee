define [
	"core/game/platform"
	"core/game/sprite"
	], (Platform, Sprite) ->

	class Player

		SPEED = 10
		PLATFORM_WIDTH = 80
		PLATFORM_HEIGHT = 20

		constructor: (@ctx, src, x, y) ->
			@width = 90
			@height = 80

			nbFrame = 1
			timeInterval = 5

			@playerSprite = new Sprite src, @width, @height, nbFrame, timeInterval

			@key = new KEvent

			@score = 0

			@x = 0
			@y = 0

			@isJumping = true
			@isFalling = false
			@jumpSpeed = 21
			@fallSpeed = 0

			x ?= @ctx.width >> 1
			y ?= @ctx.height - @height

			@move x, y

		move: (@x, @y) ->

		start: ->
			@isFalling = false
			@fallSpeed = 0
			@isJumping = true
			@jumpSpeed = 21

		randType: ->
			i = ~~(Math.random() * 10)
			if score > 250
				return [0, 0, 0, 0, 1, 1, 1, 1, 2, 2][i]
			if score > 500
				return [0, 0, 1, 1, 1, 1, 1, 1, 1, 2][i]
			if score > 1000
				return [0, 1, 1, 1, 1, 1, 1, 1, 1, 1][i]
			return [0, 0, 0, 0, 0, 0, 1, 1, 2, 2][i]
		jump: (platforms) ->
			if @y > @ctx.height * 0.4
				@move @x, @y - @jumpSpeed
			else
				if @jumpSpeed > 10
					@score++
				# if player is at half of the screen, move blocks instead
				for i, platform of platforms
					platform.y += @jumpSpeed
					if platform.y > @ctx.height
						x = ~~(Math.random() * (@ctx.width - platform.width))
						y = ~~(platform.y - @ctx.height)
						type = @randType()
						platforms[i] = new Platform x, y, platform.width, platform.height, type
			@jumpSpeed--
			if @jumpSpeed is 0
				@isJumping = false
				@isFalling = true
				@fallSpeed = 1

		fall: (callback) ->
			if @y < @ctx.height - @height
				@move @x, @y + @fallSpeed
				@fallSpeed++
			else
				if @score is 0
					@start()
				else
					callback() # this callback is triggered if you loose

		update: (platforms, callback) ->
			if @key.pressed("left") and @x > 0
				@move @x - SPEED, @y
			if @key.pressed("right") and @x + @width < @ctx.width
				@move @x + SPEED, @y

			if @isJumping then @jump platforms
			if @isFalling then @fall callback

		draw: ->
			@playerSprite.anim @ctx, @x, @y
			@ctx.fillStyle = "rgba(0, 0, 0, .42)"
			@ctx.font = 'Bold 10px Sans-Serif'
			@ctx.fillText "SCORE " + @score, 21, 21