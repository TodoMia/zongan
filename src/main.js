import {createApp} from "vue";
import App from "@/App.vue";

import VueLazyloadNext from "vue-lazyload-next"
import ElementPlus from "element-plus";
import {ElMessage, ElMessageBox, ElLoading } from "element-plus";

import locale from "element-plus/lib/locale/lang/zh-cn";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
// 设置语言
dayjs.locale("zh-cn");

import "element-plus/lib/theme-chalk/index.css";
import "@/assets/scss/index.scss";

// import "@/assets/font/font.scss"
import router from "@/router/index.js";
import {store} from "@/store/index.js";

const app = createApp(App);

app.use(router);

app.provide("message", ElMessage);
app.provide("confirm", ElMessageBox.confirm);
app.provide("loading", ElLoading );

app
    .use(VueLazyloadNext, {
        preLoad: 1.1,
        loading: require('@static/baoxian/load.gif'),//加载中显示的图片
        attempt: 3 // 图片加载失败，最多重试的次数
    })
    .use(store)
    .use(ElementPlus, {locale})
    .mount("#app");
