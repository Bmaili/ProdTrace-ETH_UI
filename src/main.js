import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './permission'
import { dateFormat, resetForm, addDateRange, selectDictLabel } from "@/utils/gq";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Pagination from "@/components/Pagination.vue";
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/gq.scss' // 通用 css

// import  './assets/icons' // icon
import './permission' // permission control

Vue.use(ElementUI);
Vue.config.productionTip = false

// 全局方法挂载
Vue.prototype.dateFormat = dateFormat
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
