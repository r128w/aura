const player = {
    x:200,y:200,vx:0,vy:0,
    r:10,
    input:{w:false,a:false,s:false,d:false},
    hitTimer:0,
    iterate:function(dtime){
        this.x+=this.vx*dtime
        this.y+=this.vy*dtime

        this.hitTimer+=dtime
        
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
    },
    render:function(){
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.x-this.r, this.y-this.r, this.r*2, this.r*2)


            const alpha = Math.max(0,Math.trunc(20-this.hitTimer))
            ctx.fillStyle="#ff0000" + (alpha < 16 ? "0" + alpha.toString(16) : alpha.toString(16))
            ctx.fillRect(0,0,c.width,c.height)
    },
    hit:function(){
        if(this.hitTimer > 60){
            fx.list.push(new Num(this.hitTimer/60, this.x, this.y))
        }
        this.hitTimer = 0
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