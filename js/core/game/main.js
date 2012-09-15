// Generated by CoffeeScript 1.3.3
(function() {

  define(["helpers/ctx", "core/game/platform", "core/game/player", "libs/kevent", "libs/requestAnimationFrame"], function(getCtx, Platform, Player, KEvent) {
    var Game;
    return Game = (function() {
      var HEIGHT, MAX_PLATEFORMS, PLATFORM_HEIGHT, PLATFORM_WIDTH, WIDTH;

      WIDTH = window.innerWidth < 400 ? 320 : 400;

      HEIGHT = window.innerWidth < 400 ? 480 : 600;

      MAX_PLATEFORMS = 8;

      PLATFORM_WIDTH = 80;

      PLATFORM_HEIGHT = 20;

      function Game(selector) {
        this.ctx = getCtx(selector, WIDTH, HEIGHT);
        this.platforms = [];
        this.player = new Player(this.ctx, "img/tux.png");
        console.log(this.player);
        this.createPlatforms();
        window.onresize = function() {
          return console.warn("Cannot resize in game !");
        };
      }

      Game.prototype.createPlatforms = function() {
        var i, type, x, y, _results;
        y = 0;
        i = 0;
        _results = [];
        while (i < MAX_PLATEFORMS) {
          x = ~~(Math.random() * (this.ctx.width - PLATFORM_WIDTH));
          type = this.player.randType();
          this.platforms.push(new Platform(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT, type));
          if (y < this.ctx.height - PLATFORM_HEIGHT) {
            y += ~~(this.ctx.height / MAX_PLATEFORMS);
          }
          _results.push(++i);
        }
        return _results;
      };

      Game.prototype.run = function(callback) {
        var _run,
          _this = this;
        _run = function() {
          var id, index, platform, speed, _i, _len, _ref, _ref1;
          id = requestAnimationFrame(_run);
          _this.ctx.clear();
          _ref = _this.platforms;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            platform = _ref[_i];
            platform.hitWith(_this.player);
          }
          _this.player.update(_this.platforms, function() {
            cancelAnimationFrame(id);
            return callback(_this.player.score);
          });
          _ref1 = _this.platforms;
          for (index in _ref1) {
            platform = _ref1[index];
            if (platform.isMoving) {
              if (platform.x < 0) {
                platform.direction = 1;
              } else if (platform.x > _this.ctx.width - PLATFORM_WIDTH) {
                platform.direction = -1;
              }
              speed = ~~(_this.player.score / 100);
              platform.x += platform.direction * (index >> 1) * speed;
            }
            platform.draw(_this.ctx);
          }
          return _this.player.draw();
        };
        return _run();
      };

      return Game;

    })();
  });

}).call(this);
