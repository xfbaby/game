import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {

    this.score  = 0
    this.animations = []
    this.gameOver   = false
    this.box    = []

    
  }



}
