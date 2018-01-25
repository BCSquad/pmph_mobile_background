import Vue from 'vue'
import Message from './message.vue'

var typeClass = {
  success: 'msg-success',
  warning: 'msg-warning',
  info   : 'msg-info',
  error  : 'msg-error'
};
var zindexN = 1;

/* istanbul ignore next */
export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};


Message.installMessage = function(options) {
  if (options === undefined || options === null) {
    options = {
      message: ''
    }
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = {
      message: options
    }
  }
  var message = Vue.extend(Message)

  var component = new message({
    data: options
  }).$mount();
  let activeClass = typeClass[options.type]||typeClass.success;
  component.$el.style.zIndex = 1000+zindexN;
  zindexN++;
  addClass(component.$el,activeClass);
  document.querySelector('body').appendChild(component.$el);


}
const types = ['success', 'info', 'warning', 'error'];
types.forEach((type)=>{
  Message.installMessage[type] = options =>{
    if(typeof options === 'string'){
      options = {
        message: options
      }
    }
    options.type = type;
    return Message.installMessage(options);
  }
})
Vue.component(Message.name, Message)
export default Message.installMessage
