let lasers = {
    list:[],
    cooldown:1000,
    iterate:function(dtime){
        for(var i = 0; i < this.list.length; i ++){
            this.list[i].iterate(dtime)
        }
        this.cooldown-=dtime

        if(this.cooldown < 0){
            this.cooldown = 300 + Math.random()*1000
            let type = Math.trunc(Math.random()*6)
            let spacing = Math.random()*75 + 70
            switch(type){
                case 0:
                    this.laserX(spacing)
                    break
                case 1:
                    this.laserY(spacing)
                    break
                case 2:
                    this.laserX(spacing)
                    this.laserY(spacing)
                    break
                case 3:
                    this.laserAngle(spacing, Math.random())
                    break
                case 4:
                    this.laserAngle(spacing, Math.random())
                    this.laserY(spacing)
                    break
                case 5:
                    this.laserAngle(spacing, Math.random())
                    this.laserX(spacing)
                    break
            }
        }
    },
    render:function(){
        for(var i = 0; i < this.list.length; i ++){
            this.list[i].render()
        }
    },
    telegraph:120,
    ripple:3,
    laserX:function(spacing){
        let n = c.height / spacing

        let margin = (c.height % spacing )/2
        for(var i = 0; i < n; i ++){
            this.list.push(new Laser(0, i * spacing + margin, 0, {
                re:this.telegraph + this.ripple*i, ac:15
            }))
        }
    },
    laserY:function(spacing){
        let n = c.width / spacing
        let margin = (c.width % spacing )/2
        for(var i = 0; i < n; i ++){
            this.list.push(new Laser(i * spacing + margin, 0 , 1.57, {
                re:this.telegraph + this.ripple*i, ac:15
            }))
        }
    },
    laserAngle:function(spacing, angle){
        let dx = spacing/(Math.sin(angle)+0.01)
        let dy = spacing/(Math.cos(angle)+0.01)
        let nw = (c.width )/dx
        let nh = c.height/dy
        for(var i = 0; i < nw; i ++){
            this.list.push(new Laser(dx*i,0,angle, {re:this.telegraph + this.ripple*i, ac:15}))
        }
        for(var i = 1; i < nh; i ++){
            this.list.push(new Laser(0,dy*i,angle, {re:this.telegraph + this.ripple*i, ac:15}))
        }
    }
}

class Laser {
    constructor (x, y, angle, timing = {re:60, ac:15}){
        this.x = x
        this.y = y
        this.angle = angle
        this.timing = timing
        this.age = 0
    }
    iterate(dtime){
        this.age += dtime
        if(this.age > this.timing.re){

                let dx = Math.cos(this.angle)
                let dy = Math.sin(this.angle)
                let distance = 100000

                // ts making megag
                let o = player
                let dot = ((o.x-this.x)*(dx*distance) + (o.y-this.y)*(dy*distance))
                let ddot = dot/(distance*distance)
                if(ddot > 0 && ddot < 1){// vector projection to check if its within line
                    // find dist from line -> magnitude of (o-this) - proj_this(o-this)
                    let x = (o.x-this.x) - ddot*(dx*distance)
                    let y = (o.y-this.y) - ddot*(dy*distance)
                    let magdist = Math.sqrt(x*x+y*y)
                    if(magdist < 10+player.r){
                        // damage
                        player.hit()
                    }
            }
            if(this.age > this.timing.re + this.timing.ac){
                this.destroy()
            }
        }
    }
    destroy(){
        lasers.list.splice(lasers.list.indexOf(this), 1)
    }
    render(){
        ctx.strokeStyle = "#ff0000"
        if(this.age > this.timing.re){
            ctx.lineWidth = 10
        }else {ctx.lineWidth = 2}
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + 10000 * Math.cos(this.angle), this.y + 10000 * Math.sin(this.angle))
        ctx.stroke()
    }
}