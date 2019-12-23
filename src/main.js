// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Qs from 'qs'
import router from './router.js'
// 轮播
import { Swipe, SwipeItem } from 'vant';
import 'vant/lib/swipe/style'
import 'vant/lib/swipe-item/style'
// 弹框
import { Dialog } from 'vant';
import 'vant/lib/dialog/style'
// 轻提示
import { Toast } from 'vant';
import 'vant/lib/toast/style'

Vue.use(Swipe).use(SwipeItem);
Vue.use(Dialog);
Vue.use(Toast);
import '../static/normalize.css';
/* import { Button } from 'vant';

Vue.use(Button); */

Vue.config.productionTip = false
// axios配置
Vue.prototype.$http = axios
axios.defaults.transformRequest = [
  function (data) {
    return Qs.stringify(data);
  }
]
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 响应拦截器
axios.interceptors.response.use(function (response){
  return response.data;
}, function (error) {
  Toast('请求失败，请稍后重试！');
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
