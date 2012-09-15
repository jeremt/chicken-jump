define ->

	class Sprite

		constructor: (src, width, height, @size, @interval) ->
			# get the image from the url
			@img = new Image()
			@img.src = src

			@width = width
			@height = height

			@current = 0 # the current frame to display

			@time = 0 # the current time

		anim: (ctx, x, y) ->

			ctx.drawImage @img, 0, @height * @current, @width, @height, x, y, @width, @height

			if @time is @interval # time before run next frame
				@current++
				@current %= @size
				@time = 0
			@time++