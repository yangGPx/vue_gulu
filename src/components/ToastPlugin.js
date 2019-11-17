import Toast from './toast.vue';

let currentToast = null;

export default{
  install(vue, options) {
    vue.prototype.$toast = function(message, options) {
      if (currentToast) {
        currentToast.close();//只写这一次 是有一个问题的，就是组件close之后，这里的currentToast 没有变成null 或者 undefined 会在这里在调用一次close方法
        // 解决问题 通过 $on 监听 组件自定义的close事件,我们在关闭组件的时候 通过$emit('close') 触发事件
      }
      currentToast = createToast({vue, message, options});
    }
  }
}



const onclose = () => {
  currentToast = null;
}



function createToast({vue, message, options,}) {
  const Constructor = vue.extend(Toast);
  let toast = new Constructor({
    propsData:{
      ...options
    }
  });
  toast.$slots.default = [message];
  toast.$on('close', onclose)
  toast.$mount();
  document.body.appendChild(toast.$el);
  return toast;
}
