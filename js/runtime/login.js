
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
let atlas = new Image()
atlas.src = 'images/loginButton.png'
export default class Login  {
    btnArea = {
        startX: screenWidth/2-60,
        startY:screenHeight-60,
        endX  : screenWidth/2-60+138,
        endY  : screenHeight-60+67
    }
    render(ctx) {
        ctx.drawImage(
            atlas,
            0, 0, 138, 67,screenWidth/2-60,screenHeight-60,120, 40
          )
            /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
     

      }

}