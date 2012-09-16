// Generated by CoffeeScript 1.3.3
(function() {

  define(function() {
    var Platform;
    return Platform = (function() {
      var COLORS;

      COLORS = ["#77a1b5", "#ec5d5d", "#bae1ad"];

      function Platform(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.color = COLORS[this.type];
        this.isMoving = ~~(Math.random() * 2);
        this.direction = this.isMoving || -1;
        this.destroy = false;
      }

      Platform.prototype.draw = function(ctx) {
        if (this.destroy) {
          return;
        }
        ctx.fillStyle = this.color;
        return ctx.roundRect(this.x, this.y, this.width, this.height, 10);
      };

      Platform.prototype.hasHit = function(player) {
        var hasCollide;
        hasCollide = player.isFalling;
        hasCollide = hasCollide && player.x < this.x + this.width;
        hasCollide = hasCollide && player.x + player.width > this.x;
        hasCollide = hasCollide && player.y + player.height > this.y;
        hasCollide = hasCollide && player.y + player.height < this.y + this.height;
        return hasCollide;
      };

      Platform.prototype.hitWith = function(player) {
        if (this.destroy || !this.hasHit(player)) {
          return;
        }
        player.start();
        if (this.type === 2) {
          return player.jumpSpeed = 42;
        } else if (this.type === 1) {
          return this.destroy = true;
        }
      };

      return Platform;

    })();
  });

}).call(this);
