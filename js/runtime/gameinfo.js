const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
import Element from './element'
let atlas = new Image()
atlas.src = 'images/bg.jpg'
const scalx = canvas.width/375
const scaly=canvas.height/ 667
export default class GameInfo {
  renderGameScore(ctx, score) {
    this.info = new Element(ctx);
    ctx.font      = "15px Arial bold"
    ctx.strokeStyle = '#fff';  
    ctx.strokeText('第:'+1+'关',10*scalx,15*scaly)  
    ctx.fillStyle = "#ffcf00"
    ctx.fillText(
      '第:'+1+'关',
      10*scalx,
      15*scaly
    )
      
  
  }

  renderImage(ctx,score) {
    this.info.render(ctx,0,0,148*scalx,5*scaly);
  
    ctx.font      = "16px Arial bold"
    ctx.strokeStyle = '#eee';  
    ctx.strokeText(score,183*scalx,50*scaly)  
    ctx.fillStyle = "#ffcf00"
    ctx.fillText(score,183*scalx,50*scaly)
  

  }

  renderGameOver(ctx, score) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 255
    }
  }
}

