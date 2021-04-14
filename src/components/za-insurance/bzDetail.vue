<template>
  <div class="bz-detail">
    <div class="bz-title">
      <span>保险详情</span>
      <el-button class="btn" type="text" @click="handelBzDetail">查看详情</el-button>
    </div>
    <ul class="bz-content">
      <li>
        <span class="responsibility">一般医疗保险责任</span> <span class="amount">300万</span>
      </li>
      <li>
        <span class="responsibility">重大疾病医疗保险责任</span> <span class="amount">600万</span>
      </li>
      <li>
        <span class="responsibility">营运交通意外保险金</span> <span class="amount">最高200万</span>
      </li>
      <li v-if="bzMore" class="bz-more">
        <div @click="bzMore = !bzMore">
          展开全部
          <i class="el-icon-arrow-down"></i>
        </div>
      </li>
      <template v-else>
        <li>
          <span class="responsibility">医疗垫付（增值服务）</span> <span class="amount strong">免费赠送</span>
        </li>
        <li>
          <span class="responsibility">重疾通道（增值服务）</span> <span class="amount strong">免费赠送</span>
        </li>
        <li>
          <span class="responsibility">肿瘤特药（增值服务）</span> <span class="amount strong">免费赠送</span>
        </li>
        <li>
          <span class="responsibility">术后家庭护理（增值服务）</span> <span class="amount strong">免费赠送</span>
        </li>
        <li>
          <span class="responsibility">图文咨询服务（增值服务）</span> <span class="amount strong">免费赠送</span>
        </li>
        <li>
          <span class="responsibility">视频问诊服务（增值服务）</span> <span class="amount strong">免费赠送</span>
        </li>
        <li>
          <span class="responsibility">健康资讯服务（增值服务）</span> <span class="amount strong">免费赠送</span>
        </li>
      </template>

    </ul>
  </div>
  <Notify :ishow="ishow" :title="title" :images="images" @update:close="handleClose"></Notify>
</template>

<script>
import {reactive, toRefs} from "vue";
import images from "./images.js"

import Notify from "@/components/za-insurance/notify"

export default {
  components: {
    Notify
  },
  setup() {
    const state = reactive({
      ishow: false,
      title: "",
      images: [],
      bzMore: true,
      bzDetail: images.bzDetailImages
    })
    const handelBzDetail = () => {
      state.ishow = true;
      state.title = "保障详情";
      state.images = state.bzDetail;
    }
    const handleClose = () => {
      state.ishow = false
    }
    return {
      ...toRefs(state),
      handelBzDetail,
      handleClose
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-detail {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: #f7f8fa solid 10px;

  .bz-title {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px;
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 20px;
      color: #333333;
      font-weight: 550;
      font-family: Helvetica Neue;
    }

    .btn{
      color: #ff901b;
    }
  }

  .bz-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 14px;


    li {
      box-sizing: border-box;
      padding: 0 20px;
      display: flex;
      width: 100%;
      height: 36px;
      justify-content: space-between;
      align-items: center;

      .responsibility {
        font-weight: 400;
      }

      .amount {
        font-weight: bold;
      }

      .strong {
        color: #ff8d17;
      }
    }

    .bz-more {
      display: flex;
      justify-content: center;
      color: #ff901b;
      border-top: 1px solid #f9f9f9;
    }
  }

  .tips {
    box-sizing: border-box;
    padding: 0 5px;
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: space-between;
    background: #fffbf8;

    li {
      height: 36px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 20px;
      color: #ff8d17;
    }

    img {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }

  }
}


</style>