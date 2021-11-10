import Vue from 'vue'
import {
  Form,
  FormItem,
  Input,
  RadioGroup,
  Radio,
  Button,
  Dialog,
  Link,
  Tooltip,
  Tag
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css' // Element UI样式

// 公共组件引用
import App from './App.vue'
// 插件引用
import Request from './custom/plugins/request.js'

Vue.config.productionTip = false

Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Button.name, Button)
Vue.component(Dialog.name, Dialog)
Vue.component(Link.name, Link)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Tag.name, Tag)
Vue.use(Request)

new Vue({
  render: h => h(App),
}).$mount('#app')
