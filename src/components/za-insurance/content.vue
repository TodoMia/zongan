<template>
  <div class="detail-place">
    <img v-lazy="item" v-for="item in contentImages" :key="item" border="0" />
    <div class="flow">
      <div class="title">
        <span>理赔流程</span
        ><span class="detail" @click="handleShow"
          >查看详情<i
            :class="isDropDown ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          ></i
        ></span>
      </div>
      <ul v-if="isDropDown">
        <li>
          <dl>
            <dt>
              <div class="dot"></div>
              第1步：报案
            </dt>
            <dd>在安卓应用市场或APP Store，搜索下载众安保险APP</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <div class="dot"></div>
              第2步：材料提交
            </dt>
            <dd>使用在线理赔申请服务，根据指引提交理赔申请材料</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <div class="dot"></div>
              第3步：审核材料
            </dt>
            <dd>
              保险公司将及时进行审核、调查、反馈结果，并根据情况通知寄送纸质材料
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <div class="dot"></div>
              第4步：获得理赔金
            </dt>
            <dd>
              对属于保险责任的，保险公司会将理赔金直接转账至被保险人/受益人名下的指定账户
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="FAQ">
      <div class="title">常见问题</div>
      <el-collapse>
        <el-collapse-item v-for="item in faqs" :key="item">
          <template #title class="title">
            <img src="@static/baoxian/note_q.png" /><span>{{
              item.question
            }}</span>
          </template>
          <p>
            {{ item.answer }}
          </p>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="douyinBox" v-show="douyinBox">
      <div class="douyinBox-content" @click="closeredbg"> 
        <!-- <img src="../../../static/baoxian/close.png" alt="" width="32" class="closeBack boxclose" > -->
        <img src="../../../static/baoxian/redBg2.png" alt="" class="goAxs boxbg" >
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import images from "./images.js";
import { saveBehavior } from "@/api/insurance";

export default {
  setup() {
    const state = reactive({
      isDropDown: true,
      douyinBox: false,
      scllo:0,
      faqs: [
        {
          id: 1,
          question: "可以赔付那些费用？",
          answer:
            "必选责任中，被保险人因遭受意外伤害事故或在等待期后因患疾病在二级及以上的公立医院普通部接受住院、住院前30天（含住院当日）和出院后30天（含出院当日）门急诊（与该次住院相同原因）、特殊门诊和门诊手术治疗的，对于责任内个人支付超过免赔额的部分，100%赔付，不限医保目录范围，合理且必需的进口药自费药均可赔付。",
        },
        {
          id: 2,
          question: "免赔额是什么意思？",
          answer:
            "免赔额在合同中载明。在合同保险期间内，应由被保险人自行承担，保险公司不予赔付的部分。设置免赔额，保险公司仅承担免赔额以上的赔付责任，可以让消费者获得更高性价比的产品。本产品一般医疗责任与重大疾病医疗责任共用1万元年免赔额。",
        },
        {
          id: 3,
          question: "投保前已经生的病可以赔付么？",
          answer:
            "不可以。既往症指在合同生效前，被保险人已罹患的，且被保险人已知或应当知道的疾病。为了让大家可以用实惠的保费获得充足的保障，在发生疾病时真正获得及时的医疗费用赔付，保险公司对既往症不承担赔付保险金的责任。举例：小安在3月1日为自己投保了一份医疗保险，于6月10日因“脑中风”住院治疗，出院后向保险公司申请理赔。保险公司审核发现，小安在保单生效前1年已被诊断为脑中风，并曾间断服药治疗，故“脑中风”为本合同的既往症，不能获得赔付。",
        },
        {
          id: 4,
          question: "本产品的等待期有多久？",
          answer:
            "1）等待期为自合同生效日起计算的一段时间，具体天数在合同上载明。在等待期内发生保险事故的，保险公司不承担赔付保险金的责任。等待期的设置是健康保险产品的常规做法，可以保证大部分如实告知客户的投保利益，防范少数人未如实告知增加保险公司赔付成本，尽量规避因此导致的保费飙升让全体投保人买单。因意外伤害导致的事故没有等待期。举例：小安为自己投保了一份医疗保险，生效日为1月1日，合同约定的等待期为30天。小安在1月15日因“肺炎”住院治疗，1月25日痊愈出院。因为小安1月15日的住院发生在医疗保险的等待期内，所以保险公司不承担赔付保险金的责任。2）本产品一般医疗责任与重大疾病医疗责任的等待期为30天；航空意外身故、伤残责任、火车及轮船意外身故、伤残责任无等待期；续保、因遭受意外伤害导致的医疗无等待期。3）如承保保单为分期缴付保费，若下一年度保单生效时未缴清上一年度保单的保险费，则下一年度保单的等待期重新计算。",
        },
        {
          id: 5,
          question: "在哪些医院接受治疗可以获得赔付？",
          answer: "限中华人民共和国卫生部审核认定的二级或以的公立医院普通部。",
        },
        {
          id: 6,
          question: "保险期间是多久？理赔或停售后还可以续保吗？",
          answer:
            "本产品保险期间为一年。保险期间届满，投保人需要重新向保险公司申请投保本产品，交纳保险费，并获得新的保险合同。续保不计算等待期并且无需再次进行健康告知。续保时我们有权根据被保险人的年龄、医疗费用水平变化等调整被保险人在续保时的费率。费率调整适用于保险合同的所有被保险人或同一投保年龄段的所有被保险人，我们不会因为某一被保险人的健康状况变化或历史理赔情况而拒绝续保或单独调整该被保险人的续保费率。若营运交通工具乘客意外伤残责任出险，则不可续保营运交通工具乘客意外伤害责任。在投保人接受费率调整的前提下，我们审核通过方可为投保人办理续保手续。若保险期间届满，本保险产品已停止销售，保险公司不再接受投保申请，但会向您提供投保其他保险产品的合理建议。",
        },
        {
          id: 7,
          question: "续保是否需要重新过健康告知？",
          answer: "除另有约定外，续保不计算等待期并且无需再次进行健康告知。",
        },
      ],
      contentImages: images.content,
    });
    const handleShow = () => {
      state.isDropDown = !state.isDropDown;
      saveBehavior("查看理赔流程详情", 1);
    };
    const closeredbg = () => {
      state.douyinBox = !state.douyinBox;
      document.documentElement.scrollTop = state.scllo
      // $('.douyinBox').hide();
      window.history.replaceState({
        target: "Final",
        random: Math.random()
      }, "", '#Final');
    }
    const doIt = () => {
      setTimeout(function () {
        window.addEventListener("popstate", function (e) {
          state.scllo=document.documentElement.scrollTop
          console.log(e.state);
          if (e.state && e.state.target == "MeanSure") {
            state.douyinBox = !state.douyinBox;
            // stopScroll.bind(function () { }, true)
          } else if (!e.state) {
            history.go(-1);
          }
        }, false);
    
        if (window.history.state && window.history.state.target == "Final") {
          return;
        }
        window.history.replaceState({
          target: "MeanSure",
          random: Math.random()
        }, "", '#MeanSure');
        window.history.pushState({
          target: "Final",
          random: Math.random()
        }, "", '#Final');
      }, 500);
    }
    doIt()
    return {
      ...toRefs(state),
      handleShow,
      closeredbg,
    };
  },
};
</script>
<style lang="scss" scoped>
/* @font-face{font-family:"Helvetica Neue";src:url(../../assets/font/Helvetica-Neue-2.ttf)} */
.detail-place {
  padding: 20px 0 66px;

  img {
    display: block;
    width: 100%;
  }

  .flow {
    box-sizing: border-box;
    padding: 0 18px 10px;
    font-size: 24px;
    margin-bottom: 16px;
    margin-top: 10px;
    border-bottom: #f7f8fa solid 10px;

    .title {
      display: inline-flex;
      width: 100%;
      font-size: 20px;
      color: #333333;
      font-weight: 550;
      /* font-family: Helvetica Neue; */
      /* font-family: "DIN-Bold"; */
      /* font-family: "PingFang SC"; */
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;

      .detail {
        font-size: 14px;
        color: #ff901b;

        i {
          margin-left: 6px;
        }
      }
    }

    ul {
      li {
        margin-bottom: 8px;

        dl {
          margin: 0;

          dt {
            display: inline-flex;
            align-items: center;

            .dot {
              width: 8px;
              height: 8px;
              border-radius: 4px;
              /* background-color: #f5cfab; */
              background-color: #ff9b2f;
              margin-right: 16px;
            }

            font-size: 16px;
            font-weight: 600;
            color: #444444;
          }

          dd {
            font-size: 12px;
            color: rgba(#000, 0.6);
            margin: 6px 0 0 24px;
          }
        }
      }
    }
  }

  .FAQ {
    box-sizing: border-box;
    padding: 0 18px;
    font-size: 18px;
    margin-top: 10px;

    .title {
      font-size: 20px;
      color: #333333;
      font-weight: 550;
      /* font-family: Helvetica Neue; */
      margin-bottom: 8px;
    }

    span {
      font-size: 14px;
      font-weight: bold;
      line-height: 14px;
    }

    img {
      display: block;
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      margin: 0 0 0 26px;
      width: calc(100% - 26px);
      word-break: break-word;
    }
  }


  .douyinBox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 900;
    width: 100%;
    /* display: none; */

    .douyinBox-content {
      width: 100%;
      /* margin-top: 25%; */
      text-align: center;
      display: inline-block;
      position: absolute;
      left: 50%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);

      .boxbg {
        max-width: 100%;
      }
      .boxclose {
        width: 26px;
        height: 26px;
        position: absolute;
        top: -35px;
        right: 40px;
      }
    }
   
  }
  
}
</style>
