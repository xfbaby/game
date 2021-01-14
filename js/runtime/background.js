import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const BG_WIDTH     = 375
const BG_HEIGHT    =  667


/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx,BG_IMG_SRC) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)
    this.render(ctx)
  }


  /**
   
   */
  render(ctx,sx=0,sy=0,scalX=1,scalY=1) {
  
    ctx.drawImage(
      this.img,
      sx,
      sy,
      this.width*scalX,
      this.height*scalY,
      0,
      0,
      screenWidth,
      screenHeight
    )

 
  }
}
