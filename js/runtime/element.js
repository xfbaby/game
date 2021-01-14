
let atlas = new Image()
atlas.src = 'images/sprit.png'
let atlas2 = new Image()
atlas2.src = 'images/sprit3.png'
let atlas3 = new Image()
atlas3.src = 'images/boom.png'
const screenWidth  = window.innerWidth
const scalX = (47/375)*screenWidth
const scalY = scalX
export default class Element   {
  
    render(ctx,x,y,screenX,screenY,hide) {
        if(hide) return
        ctx.drawImage(
            atlas,
            x, y, 95, 93 ,screenX,screenY,scalX,scalY
          )
    

      }
    renderHover(ctx,x,y,screenX,screenY,hide) {
     
        if(hide) return
        ctx.drawImage(
            atlas2,
            x, y, 95, 93 ,screenX,screenY,scalX,scalY
          )
    
          
      }
     renderBoom(ctx,x,y,screenX,screenY,hide) {
     
        if(hide) return
        ctx.drawImage(
            atlas3,
            x, y+5, 95, 82 ,screenX,screenY,scalX,scalY
          )
    
          
      }
}