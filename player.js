const player = {
    x:200,y:200,vx:0,vy:0,
    r:10,
    input:{w:false,a:false,s:false,d:false},
    hitTimer:0,
    aura:0,
    stillTimer:0,
    proximity:0,
    init:function(){this.x = c.width/2; this.y = c.height/2},
    addAura:function(amount){
        this.aura+=amount
        fx.add(new Num(amount, this.x, this.y))
    },

    iterate:function(dtime){
        // console.log(dtime)
        this.x+=this.vx*dtime
        this.y+=this.vy*dtime

        if(Math.abs(this.vx) < 0.2 && Math.abs(this.vy) < 0.2){
            this.stillTimer+=dtime
            if(this.stillTimer > 60){
                if(this.stillTimer%30 < 1){
                    this.addAura(3*Math.trunc(this.stillTimer/30))
                }
            }
        }else{this.stillTimer=0}
        

        this.hitTimer+=dtime
        this.aura += dtime/12; // 5 aura per second
        
        const speed = 3
        const acc = 0.2
        const drag = 0.05
        this.vx -= this.vx*drag
        this.vy -= this.vy*drag
        if(this.input.w && this.vy > -speed){
            this.vy -= acc
        }
        if(this.input.s && this.vy < speed){
            this.vy += acc
        }
        if(this.input.a && this.vx > -speed){
            this.vx -= acc
        }
        if(this.input.d && this.vx < speed){
            this.vx += acc
        }
        if(this.x < 0 || this.x > c.width || this.y < 0 || this.y > c.height){this.hit()}

        for(var i = 0; i < balls.list.length; i ++){
            let biq = balls.list[i]
            let dist = (this.x-biq.x)*(this.x-biq.x) + (this.y-biq.y)*(this.y-biq.y)

            // gravity
            // let sdist = Math.sqrt(dist)
            // const factor = 10
            // this.vx += -factor*(this.x-biq.x)/(dist*sdist)
            // this.vy += -factor*(this.y-biq.y)/(dist*sdist)

            if(dist < (this.r+biq.r)*(this.r+biq.r)*2 + 800){
                if(this.hitTimer > 10){
                    if(Math.abs(this.x-biq.x)>this.r+biq.r && Math.abs(this.y-biq.y)>this.r+biq.r){
                        this.proximity+=Math.pow(Math.abs(biq.vx-this.vx)+Math.abs(biq.vy-this.vy), 2)
                        this.proximity+=0.2*Math.max(0,-Math.abs(this.vx)+5)
                        this.proximity+=0.2*Math.max(0,-Math.abs(this.vy)+5)
                    }
                }
            }

        }

        this.proximity --;
        if(this.proximity < 0){this.proximity = 0}

        if(this.proximity > 30){
            this.addAura(2)
            this.proximity -= 10
        }


    },
    render:function(){
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(this.x-this.r, this.y-this.r, this.r*2, this.r*2)

        ctx.font='20px monospace'
        ctx.textAlign='left'
        ctx.fillText(Math.trunc(this.aura) + " aura", 20, 20);

        const alpha = Math.max(0,Math.trunc(20-this.hitTimer))
        ctx.fillStyle="#ff0000" + (alpha < 16 ? "0" + alpha.toString(16) : alpha.toString(16))
        ctx.fillRect(0,0,c.width,c.height)

    },
    hit:function(){
        if(this.aura > 1){
            fx.add(new Num(-this.aura, this.x, this.y))
        }
        this.hitTimer = 0
        this.stillTimer = 0
        this.aura = 0
        this.proximity = 0
    }
}

document.addEventListener('keydown', (e)=>{
    switch(e.key.toLowerCase()){
        case 'w':player.input.w=true;break
        case 'a':player.input.a=true;break
        case 's':player.input.s=true;break
        case 'd':player.input.d=true;break
    }
})
document.addEventListener('keyup', (e)=>{
    switch(e.key.toLowerCase()){
        case 'w':player.input.w=false;break
        case 'a':player.input.a=false;break
        case 's':player.input.s=false;break
        case 'd':player.input.d=false;break
    }
})