let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'audio/bgm.mp3'

    this.swapAudio     = new Audio()
    this.swapAudio.src = 'audio/swap.mp3'

    this.clearAudio     = new Audio()
    this.clearAudio.src = 'audio/clear.mp3'
    this.isAudio     = new Audio()
    this.isAudio.src = 'audio/yes.mp3'
     this.playBgm()
  }

  playBgm() {
    this.bgmAudio.play()
  
  }
  secen2() {

    this.bgmAudio.pause()
   
   
  }

  playswapAudio() {
    this.swapAudio.play()
  }

  playclearAudio() {
    this.clearAudio.play()
  }
  playisAudio() {
    this.isAudio.play()
  }
}
