// 想用这个 content 的样式，只引用 css 就可以了
import { escapeHtml } from '../utils.js'

export default {
  info: createShow('info'),
  success: createShow('success'),
  warn: createShow('warn'),
  error: createShow('error'),
  loading: createShow('loading', {
    duration: 0
  })
}

function createShow(className, defaults) {
  return function(text, options = {}) {
    if(defaults)
      Object.assign(options, defaults)
    if(options.duration != undefined)
      this.duration = options.duration
    this.onClose = options.onClose
    
    const div = Div('', // content 部分再包一层，避免之上的样式影响动画效果
      `<div class='ppz-noty-item1 ppz-noty-item1-${className}'>
        <i class = 'ppz-noty-icon ppz-noty-icon-${className}'></i>
        <span>${escapeHtml(text)}</span>
      </div>`
    )
    if(options.closeBtn) {
      const btn = Div('close-btn', 'x')
      btn.onclick = this.close
      div.querySelector('.ppz-noty-item1').append(btn)
    }
    return div
  }
}

function Div(className, innerHTML) {
  const div = document.createElement('div')
  div.className = className
  div.innerHTML = innerHTML
  return div
}