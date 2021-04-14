<template>
  <div class="notify-place" v-if="ishow">
    <div class="content">
      <div class="title">
        <span>{{ title }}</span>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <div v-if="title==='保险条款'" class="clause-menu">
        <ul>
          <li v-for="item in tk" :key="item.id" @click="clickBar(item.title,item.images)">{{ item.title }}<i
              class="el-icon-arrow-right"></i>
          </li>
        </ul>
        <Notify :ishow="innerIshow" :title="innerTitle" :images="innerImages"
                @update:close="handleCloseInner"></Notify>
      </div>
      <div class="image-group" v-else>
        <img v-lazy="item" v-for="item in images" :key="item" border="0">
      </div>
    </div>
  </div>
</template>
<script>
import {reactive, toRefs, watch} from "vue";
import imagesJs from "./images.js"

export default {
  name: "Notify",
  props: {
    images: {
      type: Array
    },
    title: {
      type: String,
    },
    ishow: {
      type: Boolean
    }
  },
  emits: ["update:close"],
  setup(props, ctx) {
    const state = reactive({
      innerIshow: false,
      innerTitle: "",
      innerImages: []
    })
    const tk = [
      {
        id: 1,
        title: "个人住院医疗保险条款（2021）",
        images: imagesJs.bxtkImages
      },
      {
        id: 2,
        title: "营运交通工具乘客意外伤害保险条款（2018）",
        images: imagesJs.yinyunImages
      },
      {
        id: 3,
        title: "附加健康险保费分期缴付条款（2019）",
        images: imagesJs.jkxianImages
      },
      {
        id: 4,
        title: "附加意外险保费分期缴付条款（2019）",
        images: imagesJs.yiwaiImages
      },
      {
        id: 5,
        title: "个人信息保护政策",
        images: imagesJs.xinxibhImages
      },
      {
        id: 6,
        title: "授权委托书及代扣服务协议",
        images: imagesJs.shouquanImages
      }
    ]
    watch(() => props.ishow, (newValue) => {
      document.body.style.overflow = newValue ? "hidden" : "auto"
    })
    const handleClose = () => {
      ctx.emit('update:close', false);
    }
    const clickBar = (title, images) => {
      state.innerIshow = true;
      state.innerTitle = title;
      state.innerImages = images
    }
    const handleCloseInner = () => {
      state.innerIshow = false
    }
    return {
      tk,
      ...toRefs(state),
      handleClose,
      clickBar,
      handleCloseInner
    }
  }
}
</script>
<style lang="scss" scoped>
.notify-place {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  z-index: 101;
  bottom: 0;
  background-color: rgba(#000, 0.5);

  .content {
    position: relative;
    top: 40%;
    width: 100%;
    height: 60%;

    .title {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      width: 100%;
      position: relative;
      height: 60px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 60px;

      span {
        font-size: 14px;
      }

      img {
        display: block;
        position: absolute;
        right: 30px;
        top: 20px;
        width: 20px;
      }
    }

    .image-group {
      position: relative;
      height: calc(100% - 60px);
      overflow: auto;
      background-color: white;
      font-size: 0;

      img {
        display: block;
        width: 100%;
      }
    }

    .clause-menu {
      position: relative;
      height: calc(100% - 60px);
      overflow: auto;
      background-color: white;
      font-size: 18px;

      ul {
        li {
          font-size: 14px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          padding: 0 15px;
          height: 50px;
          border-bottom: 1px solid #f2f2f2;
        }
      }
    }
  }


}

</style>