define ->

	class Platform

		COLORS = [
			"#77a1b5" # gray  - basic platform
			"#ec5d5d" # red   - broken platform
			"#8bba58" # green - for jump x2
		]

		constructor: (@x, @y, @width, @height, @type) ->
			@color = COLORS[@type]
			@isMoving = ~~(Math.random() * 2);
			@direction = @isMoving or -1
			@destroy = false

		draw: (ctx) ->
			return if @destroy
			ctx.fillStyle = @color
			ctx.roundRect @x, @y, @width, @height, 10

		hasHit: (player) ->
			hasCollide = player.isFalling
			hasCollide = hasCollide and player.x < @x + @width
			hasCollide = hasCollide and player.x + player.width > @x
			hasCollide = hasCollide and player.y + player.height > @y
			hasCollide = hasCollide and player.y + player.height < @y + @height
			return hasCollide

		hitWith: (player) ->
			return if @destroy or not @hasHit player
			player.start()
			if @type is 2
				player.jumpSpeed = 42
			else if @type is 1
				@destroy = true