const balls = {
        list:[],
        limit:200,
        init:function(){
            balls.list = []
            for(var i = 0; i < this.limit; i ++){
                balls.add(
                    new Ball(Math.random()*c.width, Math.random()*c.height,
                     2*(Math.random()-0.5), 2*(Math.random()-0.5))
                )
            }
        },
        getvalidloc:function(){
            let loc = {x:
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
            return loc
        },
        add:function(ball){
            this.list.push(ball)
            if(this.list.length > this.limit + Math.random()*100){
                this.list.splice(0,Math.trunc(Math.random()*(this.list.length-this.limit)))
            }
        },
        iterate:function(dtime){
            for(var i = 0; i < this.list.length; i ++){
                balls.list[i].iterate(dtime)
            }

            if(Math.random() < 0.3){
                let loc = this.getvalidloc()
                balls.add(new Ball(loc.x, loc.y, Math.random() * 3, Math.random()* 3))
            }

            if(Math.random()<0.02){
                let loc = this.getvalidloc()
                this.burst(loc.x, loc.y, Math.trunc(5+Math.random()*10))
            }
            if(Math.random() < 0.01){
                let loc = this.getvalidloc()
                const an = Math.atan2(player.y-loc.y, player.x-loc.x) + 1.57
                this.line(loc.x, loc.y, 500*Math.cos(an), 500*Math.sin(an), 8, Math.random()>0.5)
                this.add(new Homer(loc.x, loc.y, 0, 0))
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
                balls.add(new Ball(
                    x,y,speed*Math.cos(an),speed*Math.sin(an)
                ))
            }
        },
        line:function(x,y,dx,dy,n,seeking=false){
            let idx = dx/n
            let idy = dy/n
            const speed = 2
            const off = 3.14 * Math.random()
            for(var i = 0; i < n; i ++){
                const an = seeking ? Math.atan2(player.y-y-idy*i,player.x-x-idx*i) : 
                Math.atan2(dy,dx) + off
                balls.add(new Ball(
                    x+idx*i,y+idy*i,speed*Math.cos(an),speed*Math.sin(an)
                ))
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

        // if(this.x > c.width - this.r){this.vx*=-1;this.x=c.width - this.r}
        // if(this.x < this.r){this.vx*=-1;this.x=this.r}
        // if(this.y > c.height - this.r){this.vy*=-1;this.y=c.height - this.r}
        // if(this.y < this.r){this.vy*=-1;this.y=this.r}
        if(this.x > c.width + this.r){this.destroy()}
        if(this.x < -this.r){this.destroy()}
        if(this.y > c.height + this.r){this.destroy()}
        if(this.y < -this.r){this.destroy()}
        

        if(Math.abs(this.x - player.x) < this.r + player.r){
            if(Math.abs(this.y - player.y) < this.r + player.r){
                player.hit()
            }
        }
    }
    destroy(){
        balls.list.splice(balls.list.indexOf(this), 1)
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

// class Expirer extends Ball{
//     constructor(x,y,vx,vy,time){
//         super(x,y,vx,vy)
//         this.age = 0
//         this.lifetime = time
//     }
//     iterate(dtime){
//         super.iterate(dtime)
//         this.age+=dtime
//         if(this.age > this.lifetime){
//             this.destroy()
//         }
//     }
//     destroy(){
//         balls.list.splice(balls.list.indexOf(this), 1)
//     }
// }