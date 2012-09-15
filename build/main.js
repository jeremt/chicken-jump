(function(){define("core/menu",[],function(){var e;return e=function(){function e(e,t,n){var r,i,s,o,u,a,f,l;this.pages=n,o=this,l=this.pages;for(u in l)r=l[u],this.pages[u]={callback:r,elem:document.querySelector(u)};this.switchPage(t),s=document.querySelectorAll(e+" button[data-target]");for(a=0,f=s.length;a<f;a++)i=s[a],i.onclick=function(e){return u="#"+this.dataset.target,o.switchPage(u)}}return e.prototype.switchPage=function(e){var t,n,r,i;i=this.pages;for(t in i)n=i[t],n.elem.style.display=t===e?"block":"none";return typeof (r=this.pages[e]).callback=="function"?r.callback():void 0},e}()})}).call(this),function(){define("helpers/ctx",[],function(){var e;return e=function(e,t,n){var r,i;return r=document.createElement("canvas"),i=r.getContext("2d"),r.width=i.width=t,r.height=i.height=n,document.querySelector(e).appendChild(r),i},CanvasRenderingContext2D.prototype.clear=function(){return this.clearRect(0,0,this.width,this.height)},CanvasRenderingContext2D.prototype.roundRect=function(e,t,n,r,i,s){i==null&&(i=10),s==null&&(s=!0),this.beginPath(),this.moveTo(e+i,t),this.lineTo(e+n-i,t),this.quadraticCurveTo(e+n,t,e+n,t+i),this.lineTo(e+n,t+r-i),this.quadraticCurveTo(e+n,t+r,e+n-i,t+r),this.lineTo(e+i,t+r),this.quadraticCurveTo(e,t+r,e,t+r-i),this.lineTo(e,t+i),this.quadraticCurveTo(e,t,e+i,t);if(s===!0)return this.fill()},e})}.call(this),function(){define("core/game/platform",[],function(){var e;return e=function(){function t(t,n,r,i,s){this.x=t,this.y=n,this.width=r,this.height=i,this.type=s,this.color=e[this.type],this.isMoving=~~(Math.random()*2),this.direction=this.isMoving||-1,this.destroy=!1}var e;return e=["rgba(0, 0, 0, .1)","#ec5d5d","#bae1ad"],t.prototype.draw=function(e){if(this.destroy)return;return e.fillStyle=this.color,e.roundRect(this.x,this.y,this.width,this.height,10)},t.prototype.hasHit=function(e){var t;return t=e.isFalling,t=t&&e.x<this.x+this.width,t=t&&e.x+e.width>this.x,t=t&&e.y+e.height>this.y,t=t&&e.y+e.height<this.y+this.height,t},t.prototype.hitWith=function(e){if(this.destroy||!this.hasHit(e))return;e.start();if(this.type===2)return e.jumpSpeed=42;if(this.type===1)return this.destroy=!0},t}()})}.call(this),function(){define("core/game/sprite",[],function(){var e;return e=function(){function e(e,t,n,r,i){this.size=r,this.interval=i,this.img=new Image,this.img.src=e,this.width=t,this.height=n,this.current=0,this.time=0}return e.prototype.anim=function(e,t,n){return e.drawImage(this.img,0,this.height*this.current,this.width,this.height,t,n,this.width,this.height),this.time===this.interval&&(this.current++,this.current%=this.size,this.time=0),this.time++},e}()})}.call(this),function(){define("core/game/player",["core/game/platform","core/game/sprite"],function(e,t){var n;return n=function(){function s(e,n,r,i){var s,o;this.ctx=e,this.width=65,this.height=71,s=1,o=5,this.playerSprite=new t(n,this.width,this.height,s,o),this.key=new KEvent,this.score=0,this.x=0,this.y=0,this.isJumping=!0,this.isFalling=!1,this.jumpSpeed=21,this.fallSpeed=0,r==null&&(r=this.ctx.width>>1),i==null&&(i=this.ctx.height-this.height),this.move(r,i)}var n,r,i;return i=10,r=80,n=20,s.prototype.move=function(e,t){this.x=e,this.y=t},s.prototype.start=function(){return this.isFalling=!1,this.fallSpeed=0,this.isJumping=!0,this.jumpSpeed=21},s.prototype.randType=function(){var e;return e=~~(Math.random()*10),score>250?[0,0,0,0,1,1,1,1,2,2][e]:score>500?[0,0,1,1,1,1,1,1,1,2][e]:score>1e3?[0,1,1,1,1,1,1,1,1,1][e]:[0,0,0,0,0,0,1,1,2,2][e]},s.prototype.jump=function(t){var n,r,i,s,o;if(this.y>this.ctx.height*.4)this.move(this.x,this.y-this.jumpSpeed);else{this.jumpSpeed>10&&this.score++;for(n in t)r=t[n],r.y+=this.jumpSpeed,r.y>this.ctx.height&&(s=~~(Math.random()*(this.ctx.width-r.width)),o=~~(r.y-this.ctx.height),i=this.randType(),t[n]=new e(s,o,r.width,r.height,i))}this.jumpSpeed--;if(this.jumpSpeed===0)return this.isJumping=!1,this.isFalling=!0,this.fallSpeed=1},s.prototype.fall=function(e){return this.y<this.ctx.height-this.height?(this.move(this.x,this.y+this.fallSpeed),this.fallSpeed++):this.score===0?this.start():e()},s.prototype.update=function(e,t){this.key.pressed("left")&&this.x>0&&this.move(this.x-i,this.y),this.key.pressed("right")&&this.x+this.width<this.ctx.width&&this.move(this.x+i,this.y),this.isJumping&&this.jump(e);if(this.isFalling)return this.fall(t)},s.prototype.draw=function(){return this.playerSprite.anim(this.ctx,this.x,this.y),this.ctx.fillStyle="rgba(0, 0, 0, .42)",this.ctx.font="Bold 10px Sans-Serif",this.ctx.fillText("SCORE "+this.score,21,21)},s}()})}.call(this);var MODIFIERS=["shift","ctrl","alt","altgr"],ALIAS={left:[37,81,65],up:[38,90,87],right:[39,68],down:[40,83],space:[32],pageup:[33],pagedown:[34],tab:[9],escape:[27]},KEvent=function(){var e=this;this.keyCodes=new Array(256),this.modifiers=new Array(4),this._onKeyDown=function(t){e._onKey(t,!0)},this._onKeyUp=function(t){e._onKey(t,!1)},document.addEventListener("keydown",this._onKeyDown,!1),document.addEventListener("keyup",this._onKeyUp,!1)};KEvent.prototype.destroy=function(){document.removeEventListener("keydown",this._onKeyDown,!1),document.removeEventListener("keyup",this._onKeyUp,!1)},KEvent.prototype._onKey=function(e,t){this.isPressed=t,this.keyCodes[e.keyCode]=t;switch(e.keyIdentifier){case"U+0000":this.modifiers.altgr=t;break;case"Alt":this.modifiers.alt=t;break;case"Control":this.modifiers.ctrl=t;break;case"Shift":this.modifiers.shift=t}},KEvent.prototype.pressed=function(e){var t,n,r,s;switch(typeof e){case"undefined":return this.isPressed;case"number":return this.byCode(e);case"string":t=e.split("+");break;default:throw Error("The key `"+e+"` have to be undefined, a number or a string.")}r=t.length==1?t[0]:t[1],s=t.length==1?null:t[0];if(Object.keys(ALIAS).indexOf(r)!==-1)for(i in ALIAS[r]){i=ALIAS[r][i],n=this.keyCodes[i];if(n==1)break}else n=this.keyCodes[r.toUpperCase().charCodeAt(0)];return n==1&&s!==null&&MODIFIERS.indexOf(t[0])!==-1&&(n=this.modifiers[s]),n},KEvent.prototype.byCode=function(e){return this.keyCodes[e]},KEvent.prototype.setAlias=function(e){if(arguments.length<2)return console.error("setAlias need a key and some keyCode values.");ALIAS[e]=[];for(var t=1;t<arguments.length;++t)ALIAS[e].push(arguments[t]);console.log(ALIAS[e])},KEvent.prototype.getAlias=function(e){return ALIAS[e]},KEvent.prototype.showAlias=function(){console.log(JSON.stringify(ALIAS))},typeof define!="undefined"&&define("libs/kevent",[],function(){return KEvent}),function(){var e=0,t=["ms","moz","webkit","o"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var r=(new Date).getTime(),i=Math.max(0,16-(r-e)),s=window.setTimeout(function(){t(r+i)},i);return e=r+i,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),define("libs/requestAnimationFrame",function(){}),function(){define("core/game/main",["helpers/ctx","core/game/platform","core/game/player","libs/kevent","libs/requestAnimationFrame"],function(e,t,n,r){var i;return i=function(){function a(t){this.ctx=e(t,u,r),this.platforms=[],this.player=new n(this.ctx,"img/tux.png"),this.createPlatforms(),window.onresize=function(){return console.warn("Cannot resize in game !")}}var r,i,s,o,u;return u=window.innerWidth<400?320:400,r=window.innerWidth<400?480:600,i=8,o=80,s=20,a.prototype.createPlatforms=function(){var e,n,r,u,a;u=0,e=0,a=[];while(e<i)r=~~(Math.random()*(this.ctx.width-o)),n=this.player.randType(),this.platforms.push(new t(r,u,o,s,n)),u<this.ctx.height-s&&(u+=~~(this.ctx.height/i)),a.push(++e);return a},a.prototype.run=function(e){var t,n=this;return t=function(){var r,i,s,u,a,f,l,c;r=requestAnimationFrame(t),n.ctx.clear(),l=n.platforms;for(a=0,f=l.length;a<f;a++)s=l[a],s.hitWith(n.player);n.player.update(n.platforms,function(){return cancelAnimationFrame(r),e(n.player.score)}),c=n.platforms;for(i in c)s=c[i],s.isMoving&&(s.x<0?s.direction=1:s.x>n.ctx.width-o&&(s.direction=-1),u=~~(n.player.score/100),s.x+=s.direction*(i>>1)*u),s.draw(n.ctx);return n.player.draw()},t()},a}()})}.call(this),function(){require.config({kevent:"libs/kevent"}),require(["core/menu","core/game/main"],function(e,t){var n,r,i;return i=function(){var e;return e=new t("#game"),e.run(function(e){return n.switchPage("#end"),document.querySelector("#score").innerHTML=e})},r={"#menu":null,"#game":i,"#credits":null,"#help":null,"#end":null},n=new e("#main","#menu",r)})}.call(this),define("main",function(){})