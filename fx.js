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

    },
    add:function(fx){
        if(fx instanceof Num){
            for(var i = 0; i < this.list.length; i ++){
                let oiq = this.list[i]
                if((oiq.x-fx.x)*(oiq.x-fx.x)+(oiq.y-fx.y)*(oiq.y-fx.y)<800){
                    oiq.n += fx.n
                    oiq.x = fx.x + 10 * (Math.random()-0.5)
                    oiq.y = fx.y + 10 * (Math.random()-0.5)
                    oiq.vy = -4
                    oiq.age = 0
                    return
                }
            }
        }
        this.list.push(fx)
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
        if(Math.trunc(this.n)==0){return}
        ctx.font="16px monospace"
        ctx.textAlign='center'
        const d = Math.trunc((Math.random() + ((this.age/2 % 16) - 1))/1.5).toString(16)
        ctx.fillStyle = this.n > 0 ?  `#44${d}fff` : `#ff${d+d}00`
        ctx.fillText( (this.n > 0?"+":"") + Math.trunc(this.n) + " aura", this.x, this.y)
    }
}