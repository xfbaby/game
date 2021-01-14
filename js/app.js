import Element from './runtime/element'
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
import BackGround from './runtime/background'
import Login  from './runtime/login'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
let ctx   = canvas.getContext('2d')
const scalx =  screenWidth/375
const scaly= screenHeight/ 667
const numberY = 6; //行
const numberX = 6 ; //
const imgW = 47.5*scalx ;
const imgH = 46.5*scaly;
const ceilX = 45*scalx;
const ceilY = 128*scaly;
const fixedW = 95;
const animal = [0,1,2,3,4];//元素种类
const BG_IMG_SRC   = 'images/bg.jpg'
const BG_IMG_SRC2   = 'images/play.png'
let minute = 0;//控制动画速度

export default class App {
  constructor() {
    this.aniId    = 0
    this.boxData = []; // 消消乐数据
    this.startCoordinates = [0, 0]; // 开始的坐标位置
    this.endCoordinates =  [0, 0]; // 结束的坐标位置
    this.clickbox =  []; // 点击的方块位置
    this.click = 0;
    this.isSwaping  = false;
    this.isClear = false;
    this.boxArray = {}
    this.speed = 0;
    this.anB = 0;
    this.maxx = 0;
    this.repeat = false;
    this.score ={num:0,animal:0}
    this.hoverImage = {animal:0,x:0,y:0};
    this.hoverSpeed = 0;
    this.timer = 0;
    this.fill = false;
    this.w = 0;
    this.draw = false;
    this.restart();


  }

  restart() {
    this.login = new Login()
    this.bindLoop     = this.loop.bind(this)
    this.bg  = new BackGround(ctx,BG_IMG_SRC);
    this.bg2  = new BackGround(ctx,BG_IMG_SRC2);
    this.ele = new Element(ctx);
    this.gameinfo = new GameInfo(ctx);
    this.bindLoop     = this.loop.bind(this);
    this.music = new Music();
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
 
  
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )

  }
  step1() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx);
    this.login.render(ctx);
    this.touchHandler = this.touchEventHandler.bind(this)
    canvas.addEventListener('touchstart', this.touchHandler)
  }
  touchEventHandler(e) {
    e.preventDefault()
   let x = e.touches[0].clientX
   let y = e.touches[0].clientY

   let area = this.login.btnArea

   if (   x >= area.startX
       && x <= area.endX
       && y >= area.startY
       && y <= area.endY  ) {
           this.secenceChange()
       }
      
 }
 secenceChange() {
        canvas.removeEventListener(
          'touchstart',
          this.touchHandler
        )
        this.boxArray = {}
        window.cancelAnimationFrame(this.aniId);
        console.log(this.aniId)
        this.up = this.update.bind(this)
        this.bgupdate()
        this.aniId =  window.requestAnimationFrame(this.up,canvas)
        this.music.secen2()
    

  }

   initEvent() {
    canvas.addEventListener('touchstart', this.touchHandlerStart.bind(this))
    canvas.addEventListener('touchmove', this.touchHanderMove.bind(this))
    canvas.addEventListener('touchend', this.touchEnd.bind(this))

   }
   touchHandlerStart(e) {
     if(this.fill) {
        return;
     }
      e.preventDefault()
      this.isSwaping = false
      this.repeat = false;
      this.boxArray = {}
      let x = e.touches[0].clientX-ceilX
      let y = e.touches[0].clientY-ceilY
      this.draw = false
      if(x>0&&y>0&&x<(imgW*numberX+ceilX)&&y<imgH*numberY+ceilY){
        this.startCoordinates = [x, y];
        this.clickbox[0] = Math.ceil(x/imgW)-1
        this.clickbox[1] =  Math.ceil(y/imgH)-1
        let col = this.clickbox[1]
        let row = this.clickbox[0]
        this.hoverImage = {animal:this.boxData[row][col].animal,x:row,y:col}
        console.log("start1")
        setTimeout(() => {
          this.hover();
          this.date1 = new Date();
        }, 0);
       
        
      }
      
  
      //点击重玩区域
      this.againPalyArea(e)
      
     
 
   }
   hover() {
   this.bgupdate();
   this.boxData.forEach((item,x)=>{
     item.forEach((it,y)=>{
     this.ele.render(ctx,it['animal']*fixedW,0,imgW*x+ceilX,imgH*y+ceilY);
     })
   })
   this.ele.renderHover(ctx,this.hoverImage.animal*95,0,imgW*this.hoverImage.x+ceilX,imgH*this.hoverImage.y+ceilY);

  }
  

  
   againPalyArea(e) {
    let x = [],y = [];
    x[0] = 214*scalx;
    x[1] = 214*scalx+100*scalx;
    y[0] = screenHeight-107*scaly;
    y[1] =screenHeight-36*scaly ;
     //点击重玩区域
    if(e.touches[0].clientX>x[0]&&e.touches[0].clientY>y[0]&&e.touches[0].clientX<x[1]&&e.touches[0].clientY<y[1]){
       this.secenceChange()
   }

  }
 //交换
   touchHanderMove(e) {
    this.date2 = new Date();
    console.log((this.date2-this.date1)*3600/24*60*60, "start2")
     e.preventDefault()
      let x = e.touches[0].clientX-ceilX
      let y = e.touches[0].clientY-ceilY
      this.endCoordinates = [x, y];
      //点击 交换区域
       if(x>0&&y>0&&x<(ceilX+imgW*numberX)&&y<ceilY+imgH*numberY) {
        this.swap() //交换位置
        this.isReapet(); 
      
   
      if( this.repeat) {
             
         this.isSwaping = true;
         if(this.draw) return
         this.music.playswapAudio()
          this.drawBlock();

       
      }
     
       }
    
   }

    touchEnd(e) {
          window.requestAnimationFrame(()=>{
            if(this.isSwaping) {
                 this.clear();
                 this.down();
                 this.fillBlock();
              
            }
           
          },canvas)
        
   }
   //
   drawBlock() {
      this.bgupdate();
      this.draw = true;
      
      this.boxData.forEach((item,x)=>{
        item.forEach((it,y)=>{
          this.ele.render(ctx,it['animal']*fixedW,0,imgW*x+ceilX,imgH*y+ceilY);
        })
      })
    
   }


   //swap 二二交换
   swap() {
    const moveX = this.endCoordinates[0] - this.startCoordinates[0];
    const moveY = this.endCoordinates[1] - this.startCoordinates[1];
    const col = this.clickbox[0];//y
    const row = this.clickbox[1];  //x
         if(Math.abs(moveX) > Math.abs(moveY) && moveX > 0 ) { // 从左到右
          let tmp = this.boxData[col+1][row];
          this.boxData[col+1][row] = this.boxData[col][row];
          this.boxData[col][row] = tmp;
         }
         else if ( Math.abs(moveX)> Math.abs(moveY) && moveX < 0 ) {  // 从右到左
          let tmp = this.boxData[col-1][row]
          this.boxData[col-1][row] = this.boxData[col][row];
          this.boxData[col][row] = tmp;
     
           
           
         }
       else if ( Math.abs(moveY)> Math.abs(moveX) && moveY > 0) { // 从上到下
        let tmp = this.boxData[col][row+1]
        this.boxData[col][row+1] = this.boxData[col][row];
        this.boxData[col][row] = tmp;
     
       }
       else if ( Math.abs(moveY)> Math.abs(moveX) && moveY < 0 ) {  // 从下到上
        let tmp = this.boxData[col][row-1]
        this.boxData[col][row-1] = this.boxData[col][row];
        this.boxData[col][row] = tmp;
       }
          
     
     
     
   }
  bgupdate() {
          ctx.clearRect(0,0,screenWidth,screenHeight);
          this.bg2.render(ctx,0,0,2,2);
          this.gameinfo.renderGameScore(ctx)
  }

  downgame() {
    this.bgupdate();
   
    this.boxData.forEach((item,x)=>{
     item.forEach((it,y)=>{
       if(this.boxData[x][y]['match']>0) {
     //  this.ele.render(ctx,it['animal']*fixedW,0,imgW*x+ceilX,imgH*y+ceilY,true);
       if(this.score.animal==it['animal']) {
        this.score.num++;
       }
        let key = x+''+y
        this.boxArray[key] = {  x:imgW*x+ceilX, y:ceilY+imgH*y,animal:animal[Math.floor(Math.random() * 5)],match:0}
        this.maxx = this.max(y,this.maxx)
     
      
        
       }
       else {
        this.ele.render(ctx,it['animal']*fixedW,0,imgW*x+ceilX,imgH*y+ceilY);
       }
     })
   })
   this.gameinfo.renderImage(ctx,this.score.num)
   console.log(this.score.num,"xxxxxxxxxxx")
  }
  //隐藏要消灭的元素
   clear() { 
    
    this.bgupdate();
    this.boxData.forEach((item,x)=>{
      item.forEach((it,y)=>{
        if(this.boxData[x][y]['match']>0) {
         this.ele.render(ctx,it['animal']*fixedW,0,imgW*x+ceilX,imgH*y+ceilY,true);

        }
        else {
         this.ele.render(ctx,it['animal']*fixedW,0,imgW*x+ceilX,imgH*y+ceilY);
        }
      })
    })
   
   
      
    
   }
   //检测是否重复
   isReapet() {
    this.boxData.forEach((item,x)=>{
      item.forEach((it,y)=>{
         let vb = x+2<numberX&&this.boxData[x][y]['animal']==this.boxData[x+1][y]['animal']&&this.boxData[x+1][y]['animal']==this.boxData[x+2][y]['animal'];
         let vy = y+2<numberY&&this.boxData[x][y]['animal']==this.boxData[x][y+2]['animal']&&this.boxData[x][y+1]['animal']==this.boxData[x][y+2]['animal'];
         if(vb){
          ++this.boxData[x][y].match;
          ++this.boxData[x+1][y].match;
          ++this.boxData[x+2][y].match;
       
         }
         if(vy) {
          ++this.boxData[x][y].match;
          ++this.boxData[x][y+1].match;
          ++this.boxData[x][y+2].match;
       
         }
         if(vb||vy) {
           this.repeat = true;
         }
       
      })
  })
 
   }
    //方块下落
   down() {
        for(let x =numberY-1;x>-1;x--) { //行
          for(let y=0 ; y<numberX;y++) { //列
          if(this.boxData[y][x].match) {
            for( let k = x-1;k>-1;k--) {
              if(this.boxData[y][k].match==0) {
                let temp = this.boxData[y][k];
                this.boxData[y][k] = this.boxData[y][x]
                this.boxData[y][x] = temp;
                break;
  
              }
  
            }
           
           }
          }
  
        }
      this.downgame();
  


   }
   
    fillBlock() {
      this.fill = true;
  
      for(let key in this.boxArray) {

      this.ele.renderBoom(ctx,this.speed*93,0,this.boxArray[key].x,this.boxArray[key].y);
      if(this.isauto) {
        this.music.playisAudio()
      }
      else {this.music.playclearAudio()}
      this.ele.render(ctx,this.boxArray[key]['animal']*fixedW,0,this.boxArray[key].x,minute- parseInt((this.maxx+1)*imgH)+this.boxArray[key].y)
     
      }
      this.loopBlock();
  
    }
   max(a,b) {
     return a>b?a:b
   }

   loopBlock() {
    this.anB  = window.requestAnimationFrame(()=>{
       minute+=4;
    
      if( minute< parseInt((this.maxx+1)*imgH)){
        this.clear()
        ++this.speed

        this.fillBlock()
      }
      else  {
        window.cancelAnimationFrame(this.anB);
        this.clear()
        for(let key in this.boxArray) {
          console.log(key,"key11")
          let ma = this.boxArray[key]['animal']*fixedW
          this.ele.render(ctx,ma,0,this.boxArray[key].x,this.boxArray[key].y)
          let x = key.substring(0,1);
          let y = key.substring(1,2);
          this.boxData[x][y]['animal'] = this.boxArray[key]['animal']
          this.boxData[x][y]['match'] = this.boxArray[key]['match']
          }
          minute = 0;
          this.isauto = false
          this.speed = 0;
          this.repeat = false;
          this.isReapet()
          console.log(this.boxData,this.repeat,"下落")
          if(this.repeat) {
            this.boxArray = {}
            setTimeout(()=>{
              this.clear()
              this.down()
              this.isauto = true;
              this.fillBlock()
            },1000)
          
          }
          else {
            this.fill = false
          }

       }
  
    
     
    },canvas)
   
  
 }
   touchHanderEnd(e) {
    e.preventDefault();
    canvas.removeEventListener('touchstart',this.touchHandlerStart.bind(this))
    canvas.removeEventListener('touchmove', this.touchHanderMove.bind(this))
   
   }
 
 
   update() {
      this.enemyGenerate();
      this.initEvent();
      this.gameinfo.renderImage(ctx,this.score.num)
   }
   loop() {
     this.step1();
     this.aniId = window.requestAnimationFrame( this.bindLoop,canvas)
   }
      /**
   * 随机方块生成逻辑
   * 帧数取模定义成生成的频率
   * 左边和左边的左边
   * 下边和下边的下边
   */
  enemyGenerate() {
    this.boxData = [];
    for (let i = 0; i < numberX; i++) {
        for (let j = 0; j < numberY; j++) {
          if(j==0)  this.boxData[i] = new Array(numberY)
          this.boxData[i][j] = {animal:animal[Math.floor(Math.random() * 5)],match:0}
           while(i>1&&this.boxData[i][j]['animal']==this.boxData[i-2][j]['animal']||j>1&&this.boxData[i][j]['animal']==this.boxData[i][j-2]['animal']) this.boxData[i][j]['animal'] = animal[Math.floor(Math.random() * 4)]
          
 
  }
}

this.boxData.forEach((item,x)=>{
  item.forEach((it,y)=>{
    this.ele.render(ctx,it['animal']*fixedW,0,imgW*x+ceilX,imgH*y+ceilY);
  })

})

  }

}
  