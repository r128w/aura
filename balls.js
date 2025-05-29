const balls = {
        list:[],
        init:function(){
            balls.list = []
            for(var i = 0; i  < 300; i ++){
                balls.list.push(
                    new Ball(Math.random()*c.width, Math.random()*c.height, 3*(Math.random()-0.5), 3*(Math.random()-0.5))
                )
            }
        },
        iterate:function(dtime){
            for(var i = 0; i < this.list.length; i ++){
                balls.list[i].iterate(dtime)
            }
        },
        render:function(){
            for(var i = 0; i < this.list.length; i ++){
                balls.list[i].render()
            }
        }
}


class Ball {
    constructor(x,y,vx,vy){
        this.x=x
        this.y=y
        this.vx=vx
        this.vy=vy
        this.r = 5
    }
    iterate(dtime){
        this.x+=this.vx*dtime
        this.y+=this.vy*dtime

        if(this.x > c.width - this.r){this.vx*=-1;this.x=c.width - this.r}
        if(this.x < this.r){this.vx*=-1;this.x=this.r}
        if(this.y > c.height - this.r){this.vy*=-1;this.y=c.height - this.r}
        if(this.y < this.r){this.vy*=-1;this.y=this.r}

        if(Math.abs(this.x - player.x) < this.r + player.r){
            if(Math.abs(this.y - player.y) < this.r + player.r){
                player.hitTimer = 1
            }
        }
    }
    render(){
        ctx.fillStyle="#ff0000"
        ctx.fillRect(this.x-this.r,this.y-this.r,2*this.r,2*this.r)
    }
}