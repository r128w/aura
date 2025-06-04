const balls = {
        list:[],
        init:function(){
            balls.list = []
            for(var i = 0; i < 100; i ++){
                balls.list.push(
                    new Ball(Math.random()*c.width, Math.random()*c.height,
                     2*(Math.random()-0.5), 2*(Math.random()-0.5))
                )
            }
            for(var i = 0; i  < 10; i ++){
                balls.list.push(
                    new Homer(Math.random()*c.width, Math.random()*c.height,
                     2*(Math.random()-0.5), 2*(Math.random()-0.5))
                )
            }
        },
        iterate:function(dtime){
            for(var i = 0; i < this.list.length; i ++){
                balls.list[i].iterate(dtime)
            }

            if(Math.random()<0.01){
                loc = {x:
                    Math.random()*c.width,
                    y:Math.random()*c.height
                }
                const mindist = 300
                if(Math.abs(loc.x-player.x)<mindist){
                    if(loc.x > player.x){loc.x = player.x + mindist}
                    if(loc.x < player.x){loc.x = player.x - mindist}
                }
                if(Math.abs(loc.y-player.y)<mindist){
                    if(loc.y > player.y){loc.y = player.y + mindist}
                    if(loc.y < player.y){loc.y = player.y - mindist}
                }
                this.burst(loc.x, loc.y, Math.trunc(5+Math.random()*10))
            }

        },
        render:function(){
            for(var i = 0; i < this.list.length; i ++){
                balls.list[i].render()
            }
        },
        burst:function(x,y,n){
            const speed = 2
            const spacing = 6.28 / n
            for(var i = 0; i < n; i ++){
                const an = spacing*i + Math.random()*0.1
                balls.list.push(new Expirer(
                    x,y,speed*Math.cos(an),speed*Math.sin(an)
                ,400+Math.random()*300))
            }
        }
}


class Ball {
    constructor(x,y,vx,vy){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.r = Math.random() * 5 + (Math.random() < 0.1 ? 10 : 3)
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
                player.hit()
            }
        }
    }
    render(){
        ctx.fillStyle="#ff0000"
        ctx.fillRect(this.x-this.r,this.y-this.r,2*this.r,2*this.r)
    }
}

class Homer extends Ball {
    // simp son
    constructor(x,y,vx,vy){
        super(x,y,vx,vy)
    }
    iterate(dtime){
        super.iterate(dtime)
        const factor = 0.00005
        this.vx += dtime * factor * (player.x - this.x)
        this.vy += dtime * factor * (player.y - this.y)
        this.vx += (Math.random()-0.5)*0.1
        this.vy += (Math.random()-0.5)*0.1

        this.vx *= 0.995
        this.vy *= 0.995
    }
    // render(){super.render()}
}

class Expirer extends Ball{
    constructor(x,y,vx,vy,time){
        super(x,y,vx,vy)
        this.age = 0
        this.lifetime = time
    }
    iterate(dtime){
        super.iterate(dtime)
        this.age+=dtime
        if(this.age > this.lifetime){
            this.destroy()
        }
    }
    destroy(){
        balls.list.splice(balls.list.indexOf(this), 1)
    }
}