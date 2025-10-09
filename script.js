document.addEventListener('DOMContentLoaded', ()=>{
    c = document.getElementById('maincanvas')
    ctx = c.getContext('2d')
    game.init()
})

let c
let ctx

const game = {
    resize:function(){
        c.width = window.visualViewport.width - 20
        c.height = window.visualViewport.height - 30
    },
    init:function(){

        game.resize()
        window.addEventListener('resize', game.resize)
        ctx.fillStyle = "#000000"
        ctx.fillRect(0,0,c.width,c.height)

        balls.init()
        player.init()

        iterator = setInterval(game.iterate, 16)

    },
    iterator:null,
    lastUpdate:null,
    iterate:function(){
        let dtime
        if(!game.lastUpdate){dtime = 1}else{
            dtime = 60*Math.min(Date.now()-game.lastUpdate,1000)/1000
        }
        game.lastUpdate = Date.now()
        balls.iterate(dtime)
        lasers.iterate(dtime)
        player.iterate(dtime)
        fx.iterate(dtime)
        game.render()
    },
    render:function(){
        ctx.fillStyle="#00000066"
        ctx.fillRect(0,0,c.width,c.height)
        balls.render()
        lasers.render()
        player.render()
        fx.render()
    } 
}
