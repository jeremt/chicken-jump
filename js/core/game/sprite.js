// Generated by CoffeeScript 1.3.3
(function() {

  define(function() {
    var Sprite;
    return Sprite = (function() {

      function Sprite(src, width, height, size, interval) {
        this.size = size;
        this.interval = interval;
        this.img = new Image();
        this.img.src = src;
        this.width = width;
        this.height = height;
        this.current = 0;
        this.time = 0;
      }

      Sprite.prototype.anim = function(ctx, x, y) {
        ctx.drawImage(this.img, 0, this.height * this.current, this.width, this.height, x, y, this.width, this.height);
        if (this.time === this.interval) {
          this.current++;
          this.current %= this.size;
          this.time = 0;
        }
        return this.time++;
      };

      return Sprite;

    })();
  });

}).call(this);
