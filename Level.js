function Level(){
  this.sprites =[];
  this.speed = 50;
  
}

Level.prototype.init = function(){
	this.insereInimigos();
};

Level.prototype.insereInimigos = function() {
    var inimigo = new Sprite();

    var rand = Math.random();
    if(rand <= 0.33){
    	inimigo.img = il.images["enemy1"];
    }else if (rand > 0.33 && rand <= 0.66){
    	inimigo.img = il.images["enemy2"];
    }else{
    	inimigo.img = il.images["enemy3"];
    }

    
	inimigo.y = -10;
	inimigo.x = Math.floor((Math.random() * 480) + 1)
	inimigo.vy = this.speed;
	inimigo.g = 10;
	this.sprites.push(inimigo);
};

Level.prototype.mover = function (dt){
	for (var i = 0; i < this.sprites.length; i++) {
		if(this.sprites[i].y > 530){
			this.sprites.splice(i,1);
		}else{
			this.sprites[i].mover(dt);
		}
	}
};

Level.prototype.desenhar = function (ctx){
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].desenhar(ctx, this.sprites[i].img);
  }
};

Level.prototype.colidiuCom = function (alvo, resolveColisao){
  for (var i = 0; i < this.sprites.length; i++) {
    if(this.sprites[i].colodiuCom(alvo)){
      resolveColisao(this.sprites[i], alvo);
    }
  }
};

Level.prototype.colidiuComTiro = function (alvo, resolveColisao){
  for (var i = 0; i < this.sprites.length; i++) {
	for(var j =0; j < alvo.length; j++){
		if(this.sprites[i].colodiuComTiro(alvo[j])){
			resolveColisao(i, j);
		}
	}
  }
};