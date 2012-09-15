// Generated by CoffeeScript 1.3.3
(function() {

  define(function() {
    /*
    		getCtx: init a new context from a canvas, and append it to the
    		parent DOM element
    
    		@param {String} (parent) The parent selector.
    		@param {Number} (width) The height of the canvas.
    		@param {Number} (height) The width of the canvas.
    */

    var getCtx;
    getCtx = function(parent, width, height) {
      var canvas, ctx;
      canvas = document.createElement("canvas");
      ctx = canvas.getContext("2d");
      canvas.width = ctx.width = width;
      canvas.height = ctx.height = height;
      document.querySelector(parent).appendChild(canvas);
      return ctx;
    };
    /*
    		clear: Clear all the canvas.
    */

    CanvasRenderingContext2D.prototype.clear = function() {
      return this.clearRect(0, 0, this.width, this.height);
    };
    /*
    		roundRect: Draws a rounded rectangle in the canvas.
    
    		@param {Number} (x) The top left x coordinate
    		@param {Number} (y) The top left y coordinate 
    		@param {Number} (width) The width of the rectangle 
    		@param {Number} (height) The height of the rectangle
    		@param {Number} (radius) The corner radius. Defaults to 10px.
    		@param {Boolean} (fill) Fill the rectangle or not. Default to true.
    */

    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius, fill) {
      if (radius == null) {
        radius = 10;
      }
      if (fill == null) {
        fill = true;
      }
      this.beginPath();
      this.moveTo(x + radius, y);
      this.lineTo(x + width - radius, y);
      this.quadraticCurveTo(x + width, y, x + width, y + radius);
      this.lineTo(x + width, y + height - radius);
      this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      this.lineTo(x + radius, y + height);
      this.quadraticCurveTo(x, y + height, x, y + height - radius);
      this.lineTo(x, y + radius);
      this.quadraticCurveTo(x, y, x + radius, y);
      if (fill === true) {
        return this.fill();
      }
    };
    return getCtx;
  });

}).call(this);
