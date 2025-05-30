const fx = {
    list:[],
    iterate:function(dtime){
        for(var i = 0; i < fx.list.length; i ++){
            fx.list[i].iterate(dtime)
        }
    },
    render:function(){
        for(var i = 0; i < fx.list.length; i ++){
            fx.list[i].render()
        }


        ctx.fillStyle = "#000000"
        ctx.font="20px monospace"
        ctx.fillText(Math.trunc(player.hitTimer/60), 20, 40)
    }
}

class Num {
    constructor(n, x, y){
        this.x = x
        this.y = y
        this.vx = (Math.random()-0.5)*2
        this.vy = Math.random() * -5 - 2
        this.age = 0
        this.lifetime = 60
        this.n = n
    }
    iterate(dtime){
        this.x += this.vx * dtime
        this.y += this.vy * dtime
        this.vy += 0.31 * dtime
        this.age += dtime
        if(this.age > this.lifetime){
            this.destroy()
        }
    }
    destroy(){
        fx.list.splice(fx.list.indexOf(this), 1)
    }
    render(){
        ctx.font="20px monospace"
        const d = Math.trunc((Math.random() + ((this.age/2 % 16) - 1))/1.5).toString(16)
        ctx.fillStyle = `#ff${d+d}00`
        ctx.fillText(Math.trunc(this.n), this.x, this.y)
    }
}