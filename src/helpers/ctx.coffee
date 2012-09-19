define ->
	###
		getCtx: init a new context from a canvas, and append it to the
		parent DOM element

		@param {String} (parent) The parent selector.
		@param {Number} (width) The height of the canvas.
		@param {Number} (height) The width of the canvas.
	###

	getCtx = (parent, width, height) ->
		canvas = document.createElement "canvas"
		ctx = canvas.getContext "2d"

		canvas.width 	= ctx.width  = width
		canvas.height = ctx.height = height
		document.querySelector(parent).appendChild canvas

		return ctx

	###
		clear: Clear all the canvas. (if has color param, fill with color)

		@param {String} (color) The color string
	###

	CanvasRenderingContext2D::clear = (color) ->
		@clearRect 0, 0, @width, @height
		if color
			save = @fillStyle
			@fillStyle = color
			@fillRect 0, 0, @width, @height
			@fillStyle = save

	###
		roundRect: Draws a rounded rectangle in the canvas.

		@param {Number} (x) The top left x coordinate
		@param {Number} (y) The top left y coordinate 
		@param {Number} (width) The width of the rectangle 
		@param {Number} (height) The height of the rectangle
		@param {Number} (radius) The corner radius. Defaults to 10px.
		@param {Boolean} (fill) Fill the rectangle or not. Default to true.
	###

	CanvasRenderingContext2D::roundRect = (x, y, width, height, radius, fill) ->
		radius ?= 10
		fill ?= true

		@beginPath()
		@moveTo x + radius, y

		@lineTo x + width - radius, y
		@quadraticCurveTo x + width, y, x + width, y + radius

		@lineTo x + width, y + height - radius
		@quadraticCurveTo x + width, y + height, x + width - radius, y + height

		@lineTo x + radius, y + height
		@quadraticCurveTo x, y + height, x, y + height - radius

		@lineTo x, y + radius
		@quadraticCurveTo x, y, x + radius, y

		if fill is true then @fill()

	return getCtx