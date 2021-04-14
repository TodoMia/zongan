<template>
  <el-divider class="divider" id="form">填写投保信息</el-divider>
  <div class="part-1">
    <div class="part-title">本人信息<span>（投保人）</span></div>

    <el-form
      label-width="25%"
      class="user-form"
      :model="form"
      :rules="rules"
      ref="userForm"
      :show-message="false"
      status-icon
    >
      <el-form-item label="姓名" class="form-item" prop="name">
        <el-input
          ref="name"
          v-model.trim="form.name"
          placeholder="请输入你的姓名"
          @change="tryTogetPrice"
        ></el-input>
      </el-form-item>
      <el-form-item prop="idCard" label="身份证号" class="form-item">
        <el-input
          ref="idCard"
          v-model.trim="form.idCard"
          placeholder="信息保密，仅用于投保"
          @change="tryTogetPrice"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号码" class="form-item">
        <el-input
          ref="phone"
          v-model.trim="form.phone"
          placeholder="信息保密，仅用于投保"
          @change="tryTogetPrice"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="0" class="form-item">
        <div class="relation">
          <div class="title">
            为谁投保<span>（被保人：出生满30天-70周岁）</span>
          </div>
          <div class="btns">
            <div
              class="btn"
              :class="form.relationShip == item.id ? 'active-bt' : ''"
              v-for="item in relations"
              :key="item.id"
              @click="form.relationShip = item.id"
            >
              {{ item.label }}
            </div>
          </div>
          <div class="tips">
            <p v-if="form.relationShip == 1">
              自己健康就是对家人负责，本产品600万高保额，责任内住院医疗100%报销，性价比高！
            </p>
            <p v-else-if="form.relationShip == 2">
              配偶撑起家的半边天，用保障守护另一半。本产品价格便宜，覆盖100种高发重疾，责任内不限医保100%赔付。
            </p>
            <p v-else-if="form.relationShip == 4">
              中老年健康风险高，本产品覆盖100种高发重疾，责任内不限医保100%赔付。
            </p>
            <p v-else>
              孩子生病太遭罪，有保障家人更放心。责任内本产品大病小病都能报，看病无负担。
            </p>
          </div>
        </div>
      </el-form-item>
      <el-form-item label-width="0" class="form-item">
        <div class="insurance-title" v-if="form.relationShip != 1">
          身份信息<span>（被保人）</span>
        </div>
      </el-form-item>
      <el-form-item
        v-if="form.relationShip != 1"
        prop="insuredName"
        label="姓   名"
        class="form-item"
      >
        <el-input
          ref="insuredName"
          v-model.trim="form.insuredName"
          :placeholder="`请输入${familyName}的姓名`"
          @change="tryTogetPrice"
        ></el-input>
      </el-form-item>

      <el-form-item
        v-if="form.relationShip != 1"
        prop="insuredIdCard"
        label="身份证号"
        class="form-item"
      >
        <el-input
          ref="insuredIdCard"
          v-model.trim="form.insuredIdCard"
          placeholder="信息保密，仅用于投保"
          @change="tryTogetPrice"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="social-insurance">
      <div class="title">
        <div class="dot"></div>
        <span>有无社保</span>
      </div>
      <div class="btns">
        <div
          class="btn"
          :class="form.hasSocialInsurance == item ? 'active-bt' : ''"
          v-for="item in [1, 0]"
          :key="item"
          @click="form.hasSocialInsurance = item"
        >
          <div
            class="tip-img"
            v-if="form.hasSocialInsurance == item && form.hasSocialInsurance"
          >
            责任内医保外用药也能赔付
          </div>
          {{ item ? "有社保（新农合）" : "无社保" }}
        </div>
      </div>
    </div>

    <div class="cost-place">
      <div class="cost-content">
        <span class="title">首月保费</span>
        <span class="money strong">1元</span>
      </div>
      <div class="cost-content">
        <span class="title">次月保费</span>
        <span class="money"
          >{{ premium ? premium : "13.0" }}元起/月 共12期</span
        >
      </div>
    </div>

    <div class="check-place">
      <div class="check-icon" @click="handleFormChecked">
        <div v-if="!checkedForm"></div>
        <div v-else class="checked">
          <i class="el-icon-check"></i>
        </div>
      </div>
      <p class="check-p">
        我已阅读并同意
        <span @click="clickTips('健康告知', healthImages)">《健康告知》</span>
        内容均为
        <strong>"否"</strong>
        ，且阅读并同意
        <span @click="clickTips('被保人同意说明', bbrtyImages)"
          >《被保人同意说明》</span
        >
        <span @click="clickTips('免责说明', dutyImages)">《免责说明》</span>
        <span @click="clickTips('重要提示', importantImages)"
          >《重要提示》</span
        >
        <span @click="clickTips('投保须知', xuzhiImages)">《投保须知》</span>
        <!-- <span @click="clickTips('个人信息保护政策', xinxibhImages)"
          >《个人信息保护政策》</span
        > -->
        <!-- <span @click="clickTips('授权委托书及代扣服务协议', shouquanImages)"
          >《授权委托书及代扣服务协议》</span
        > -->
        <span @click="clickTips('保险条款', rateImages)">《保险条款》</span>
        和
        <span @click="clickTips('费率表', rateImages)">《费率表》</span>
      </p>
    </div>
  </div>

  <div class="submit-box" v-show="!ishow && iScrollTop">
    <dl>
      <dd>首月1元</dd>
      <dt>后续每月￥{{ premium ? premium : "13.0" }}元起</dt>
    </dl>
    <div class="submit-btn" @click="handleSubmit">立即投保</div>
  </div>

  <div class="notify-tip black-mask" v-if="tipShow">
    <div class="content">
      <img src="@static/baoxian/health.png" border="0" />
      <div class="tips-content">
        <p>
          我已阅读并同意
          <span @click="clickTips('健康告知', healthImages)">《健康告知》</span>
          内容均为
          <strong>"否"</strong>
          ，且阅读并同意
          <span @click="clickTips('被保人同意说明', bbrtyImages)"
            >《被保人同意说明》</span
          >
          <span @click="clickTips('免责说明', dutyImages)">《免责说明》</span>
          <span @click="clickTips('重要提示', importantImages)"
            >《重要提示》</span
          >
          <span @click="clickTips('投保须知', xuzhiImages)">《投保须知》</span>
          <!-- <span @click="clickTips('个人信息保护政策', xinxibhImages)"
            >《个人信息保护政策》</span
          > -->
          <!-- <span @click="clickTips('授权委托书及代扣服务协议', shouquanImages)"
            >《授权委托书及代扣服务协议》</span
          > -->
          <span @click="clickTips('保险条款', rateImages)">《保险条款》</span>
          和
          <span @click="clickTips('费率表', rateImages)">《费率表》</span>
        </p>
        <div class="submit-btn" @click="handleForceSubmit">
          <span>立即投保</span>
        </div>
      </div>
      <div class="close-btn" @click="tipShow = false">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
  <div class="msg" v-show="msgShow">
    <div class="msg-content">
      {{ msg }}
    </div>
  </div>
  <Notify
    :ishow="ishow"
    :title="title"
    :images="images"
    @update:close="handleClose"
  ></Notify>
</template>

<script>
import { ref, reactive, toRefs, watch, computed, onMounted, inject } from "vue";

import { monthPayment, simpleQuotePrice, saveBehavior } from "@/api/insurance";
import images from "./images.js";

import Notify from "@/components/za-insurance/notify";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import { once } from "@/utils/utils";

export default {
  components: {
    Notify,
  },
  setup() {
    const name = ref(null);
    const idCard = ref(null);
    const phone = ref(null);
    const insuredName = ref(null);
    const insuredIdCard = ref(null);

    const userForm = ref(null);

    const $loading = inject("loading");

    const store = useStore();
    const route = useRoute();
    let { id } = route.params;

    const familyName = computed(() => {
      let name = "";
      state.relations.forEach((relation) => {
        if (relation.id === state.form.relationShip) {
          name = relation.label;
        }
      });
      return name;
    });
    const state = reactive({
      relations: [
        {
          id: 1,
          label: "本人",
        },
        {
          id: 2,
          label: "配偶",
        },
        {
          id: 4,
          label: "父母",
        },
        {
          id: 3,
          label: "子女",
        },
      ],
      paymentWay: true,
      premium: null,

      ishow: false,
      title: "",
      images: [],
      scrollTop: false,

      tipShow: false,

      msg: "",
      msgShow: false,
      form: {
        name: localStorage.getItem("name") || "",
        idCard: localStorage.getItem("idCard") || "",
        phone: localStorage.getItem("phone") || "",
        insuredName: localStorage.getItem("insuredName") || "",
        insuredIdCard: localStorage.getItem("insuredIdCard") || "",
        relationShip: localStorage.getItem("relationShip") || 1,
        hasSocialInsurance: localStorage.getItem("hasSocialInsurance") || 1,
      },
      checkedForm: true,
      healthImages: images.healthTips,
      dutyImages: images.dutyTips,
      importantImages: images.importantTips,
      rateImages: images.rateTips,
      xuzhiImages: images.xuzhiTips,
      bbrtyImages: images.bbrtyTips,
      xinxibhImages: images.xinxibhImages,
      shouquanImages: images.shouquanImages,
    });

    let flagId = ref(true);
    let flagName = ref(true);
    let flagPhone = ref(true);
    const validName = (rule, value, callback) => {
      if (!value) {
        _notify("姓名不能为空");
        return callback(new Error("姓名不能为空"));
      } else {
        if (flagName.value) {
          saveBehavior("填写姓名", 1);
          flagName.value = false;
        }
        return callback();
      }
    };

    const validID = (rule, value, callback) => {
      if (!value) {
        _notify("身份证号码不能为空");
        return callback(new Error("身份证号码不能为空"));
      }
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(value)) {
        if (flagId.value) {
          saveBehavior("填写身份证", 1);
          flagId.value = false;
        }
        callback();
      } else {
        _notify("身份证号码格式不正确");
        callback(new Error("身份证号码格式不正确"));
      }
    };

    const validPhone = (rule, value, callback) => {
      if (!value) {
        _notify("手机号码不能为空");
        return callback(new Error("手机号码不能为空"));
      }
      let reg = /^[1]([3-9])[0-9]{9}$/;
      if (reg.test(value)) {
        if (flagPhone.value) {
          saveBehavior("填写身份证", 1);
          flagPhone.value = false;
        }
        saveBehavior("填写手机号", 1);
        callback();
      } else {
        _notify("手机号码格式错误");
        callback(new Error("手机号码格式错误"));
      }
    };

    const rules = {
      name: [{ validator: validName, trigger: "blur" }],
      idCard: [{ validator: validID, trigger: "blur" }],
      phone: [{ validator: validPhone, trigger: "blur" }],
      insuredName: [{ validator: validName, trigger: "blur" }],
      insuredIdCard: [{ validator: validID, trigger: "blur" }],
    };

    const iScrollTop = computed(() => {
      return state.scrollTop > 400 ? true : false;
    });
    const _handleScroll = () => {
      state.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    };

    const clickTips = (title, images) => {
      saveBehavior(`点击阅读了《${title}》`, 1);
      state.ishow = true;
      state.title = title;
      state.images = images;
    };

    const handleClose = () => {
      state.ishow = false;
    };

    const handleSubmit = async () => {
      await saveBehavior("点击底部立即投保按钮", 1);
      userForm.value.validate(async (valid) => {
        if (valid) {
          await saveBehavior("填写完整信息", 1);
          if (state.checkedForm) {
            let loading = $loading.service({
              lock: true,
              text: "正在出单...",
              spinner: "el-icon-loading",
              background: "rgba(#fff, 0.7)",
            });
            state.form.channelId = id;
            state.form.fuid = store.state.fuid;
            let { code, msg, data } = await monthPayment(state.form);
            if (code === 4001) {
              loading.close();
              _notify(msg);
            } else {
              loading.close();
              let win = window.open("", "_self");
              win.document.write(data);
              console.log("核算成功：", data);
            }
          } else {
            state.tipShow = true;
            await saveBehavior("调起'我已阅读'弹窗", 1);
          }
        } else {
          _notify("提交失败，请检查信息是否正确！");
        }
      });
    };
    const handleForceSubmit = async () => {
      await saveBehavior("点击弹窗的立即投保按钮", 1);
      userForm.value.validate(async (valid) => {
        if (valid) {
          await saveBehavior("填写完整信息", 1);
          let loading = $loading.service({
            lock: true,
            text: "正在出单...",
            spinner: "el-icon-loading",
            background: "rgba(#fff, 0.7)",
          });
          state.form.channelId = id;
          state.form.fuid = store.state.fuid;
          let { code, data, msg } = await monthPayment(state.form);
          loading.close();
          if (code == 4001) {
            state.tipShow = !state.tipShow;
            _notify(msg);
          } else {
            let win = window.open("", "_self");
            win.document.write(data);
            console.log("核算成功：", data);
          }
        } else {
          _notify("提交失败，请检查信息是否正确！");
        }
      });
    };
    const _notify = (notice) => {
      state.msg = notice;
      state.msgShow = true;
      _jump();
      switch (notice) {
        case "请输入投保人姓名":
          name.value.focus();
          break;
        case "请输入投保人身份证":
          idCard.value.focus();
          break;
        case "投保人身份证有误":
          idCard.value.focus();
          break;
        case "请输入手机号":
          phone.value.focus();
          break;
        case "手机号有误":
          phone.value.focus();
          break;
        case "请输入被保人姓名":
          insuredName.value.focus();
          break;
        case "请输入被保人身份证":
          insuredIdCard.value.focus();
          break;
        case "被保人身份证有误":
          insuredIdCard.value.focus();
          break;
        default:
          break;
      }
      setTimeout(() => {
        state.msgShow = false;
      }, 2500);
    };

    const _jump = () => {
      document.getElementById("form").scrollIntoView(true);
    };
    const tryTogetPrice = async () => {
      let option = {
        name: state.form.name,
        idCard: state.form.idCard,
        relationShip: state.form.relationShip,
        insuredName: state.form.insuredName,
        insuredIdCard: state.form.insuredIdCard,
        hasSocialInsurance: state.form.hasSocialInsurance,
        phone: state.form.phone,
      };
      if (option.name) {
        localStorage.setItem("name", option.name);
      }
      if (option.idCard) {
        localStorage.setItem("idCard", option.idCard);
      }
      if (option.phone) {
        localStorage.setItem("phone", option.phone);
      }
      if (option.insuredName) {
        localStorage.setItem("insuredName", option.insuredName);
      }
      if (option.insuredIdCard) {
        localStorage.setItem("insuredIdCard", option.insuredIdCard);
      }
      if (option.relationShip) {
        localStorage.setItem("relationShip", option.relationShip);
      }
      if (option.hasSocialInsurance) {
        localStorage.setItem("hasSocialInsurance", option.hasSocialInsurance);
      }
      let { code, data } = await simpleQuotePrice(option);
      if (code == 2001) {
        state.premium = data.premium;
      }
    };
    const handleFormChecked = () => {
      state.checkedForm = !state.checkedForm;
      if (state.checkedForm) {
        saveBehavior("勾选我已阅读并同意", 1);
      } else {
        saveBehavior("取消勾选我已阅读并同意", 1);
      }
    };
    watch(
      () => state.form.hasSocialInsurance,
      () => {
        tryTogetPrice();
      }
    );

    onMounted(() => {
      tryTogetPrice();
      window.addEventListener("scroll", _handleScroll);
    });
    return {
      ...toRefs(state),
      clickTips,
      tryTogetPrice,
      handleFormChecked,
      handleClose,
      handleSubmit,
      handleForceSubmit,

      familyName,
      userForm,
      iScrollTop,
      rules,

      name,
      idCard,
      phone,
      insuredName,
      insuredIdCard,
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep(.el-divider__text) {
  font-size: 16px;
}

.part-1 {
  box-sizing: border-box;
  padding: 0 18px;

  .part-title {
    font-size: 20px;
    color: #333333;
    font-weight: 550;
    font-family: Helvetica Neue;
    margin-top: 20px;
    margin-bottom: 6px;

    span {
      color: #666;
      font-size: 14px;
      font-weight: 400;
    }
  }

  .user-form {
    ::v-deep(.el-input__inner) {
      border: none;
    }

    .form-item {
      margin-bottom: 0;
      border-bottom: 1px solid #f2f2f2;
    }
  }

  .relation {
    display: flex;
    flex-direction: column;
    width: 100%;

    .title {
      display: inline-block;
      width: 100%;
      font-size: 20px;
      color: #333333;
      font-weight: 550;
      font-family: Helvetica Neue;

      margin-top: 14px;
      margin-bottom: 0;

      span {
        font-size: 14px;
        font-weight: 300;
      }
    }

    .tips {
      font-size: 12px;
      color: #ec7d38;
      line-height: 16px;
    }
  }

  .insurance-title {
    font-weight: 550;
    font-size: 20px;
    color: #444444;
    margin-bottom: 4px;

    span {
      font-size: 14px;
      font-weight: 200;
      color: #666666;
    }
  }

  .social-insurance {
    padding-top: 20px;

    .title {
      display: flex;
      align-items: center;
      height: 16px;
      //padding-bottom: 8px;
      margin-bottom: 28px;
      font-size: 20px !important;
      font-size: 20px;
      color: #444444;
      font-weight: 550;
      font-family: Helvetica Neue;

      .dot {
        display: inline-block;
        width: 3px;
        height: 100%;
        border-radius: 3px;
        background-color: #ff8d17;
        margin-right: 5px;
      }
    }

    .btns {
      .btn {
        position: relative;
        .tip-img {
          height: 20px;
          padding: 0 5px;
          position: absolute;
          font-size: 10px;
          right: 0;
          top: -20px;
          color: white;
          background-color: #ff8d17;
          line-height: 20px;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }

  .payment {
    .title {
      display: flex;
      align-items: center;
      height: 16px;
      margin-bottom: 0;
      font-size: 16px !important;

      .dot {
        display: inline-block;
        width: 3px;
        height: 100%;
        border-radius: 3px;
        background-color: #ff8d17;
        margin-right: 5px;
      }
    }

    .btns {
      .btn {
        position: relative;

        img {
          position: absolute;
          width: 14px;
          left: 0px;
        }
      }
    }
  }

  .cost-place {
    margin-top: 12px;
    width: 100%;

    .cost-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      margin-bottom: 10px;
      color: #333;

      .title {
        font-weight: 300;
      }

      .strong {
        font-size: 15px;
        font-weight: 600;
        color: #ff8d17;
      }
    }
  }

  .btns {
    display: flex;
    width: 100%;
    .btn {
      flex: 1;
      box-sizing: border-box;
      margin: 5px;
      height: 40px;
      border-radius: 8px;
      border: 1px solid #f5f5f5;
      background-color: #f5f5f5;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.56);
      text-align: center;
      line-height: 40px;
    }

    .active-bt {
      border-radius: 8px;
      border: 1px solid #ff972b;
      background-color: #fff5eb;
      color: #ff972b;
    }
  }

  .check-place {
    display: flex;
    font-size: 14px;
    color: #666;
    margin-top: 4px;
    background-color: #f8f8f8;
    border-radius: 2px;
    padding: 10px 4px;
    line-height: 18px;
    word-wrap: break-word;
    table-layout: fixed;
    .check-icon {
      float: left;
      width: 16px;
      height: 16px;
      margin-right: 6px;

      div {
        border-radius: 18px;
        border: 1px solid #ff8d17;
        width: 100%;
        height: 100%;
        background-color: #fff;
      }

      .checked {
        background-color: #ff8d17;

        i {
          color: white;
          font-size: 16px;
        }
      }
    }

    input {
      margin-right: 8px;
    }

    p {
      width: calc(100% - 25px);
      margin: 0;

      span {
        color: #ff8d17;
      }
    }
  }
}


.submit-box {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px -2px 2px #f8f8f8;
  font-size: 18px;
  height: 58px;
  padding-top: 10px;

  dl {
    height: 100%;
    margin: 0;
    text-align: center;

    dd {
      margin: 0;
      color: #ff8d17;
      font-weight: bold;
      margin-top: 3px;
    }

    dt {
      color: #333;
      transform: scale(0.7);
      font-weight: 300;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .submit-btn {
    width: 150px;
    height: 46px;
    line-height: 46px;
    background: linear-gradient(360deg, #ff8200 0%, #ffb400 100%);
    font-size: 18px;
    font-weight: bold;
    color: white;
    font-family: PingFangSC;
    border-radius: 24px;
    text-align: center;
  }
}

.notify-tip {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;

  .content {
    display: flex;
    flex-direction: column;

    width: 70%;
    margin: 0 auto;
    position: relative;
    top: 30%;
  }

  .close-btn {
    position: absolute;
    top: 85%;
    left: 40%;
    z-index: 999;
    width: 20%;
    height: 40px;
  }

  .force-submit {
    position: absolute;
    z-index: 999;
    top: 65%;
    left: 10%;
    width: 80%;
    height: 50px;
  }

  p {
    margin: 0;
  }

  .tips-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px;
    background-color: #fff;
    font-size: 14px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;

    span {
      color: #ff8d17;
    }

    .submit-btn {
      font-size: 24px;
      font-family: "PingFang SC";
      font-weight: bold;
      width: 80%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: linear-gradient(180deg, #ffd562 0%, #ff8200 100%);
      margin-top: 24px;
      border-radius: 30px;

      span {
        background-image: -webkit-linear-gradient(
          bottom,
          #fffb8e,
          #fffabb,
          #fffde0
        );
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
    }
  }

  .close-btn {
    color: rgba(#fff, 0.6);
    font-weight: 300;
    position: relative;
    top: 12px;
    width: 36px;
    height: 36px;
    border-radius: 36px;
    border: 1px solid rgba(#fff, 0.6);
    font-size: 32px;
    line-height: 36px;
    text-align: center;
  }

  img {
    display: block;
    width: 100%;
  }
}

.msg {
  box-sizing: border-box;
  width: 100%;

  min-height: 30px;
  text-align: center;
  font-size: 18px;
  position: fixed;
  bottom: 40%;
  z-index: 999;
  padding: 5px;
  color: #fff;

  .msg-content {
    padding: 5px 0;
    width: 80%;
    margin: 0 auto;
    border-radius: 8px;
    background-color: rgba(#000, 0.6);
  }
}

.black-mask {
  background-color: rgba(#000, 0.6);
}
</style>
