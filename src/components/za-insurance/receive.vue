<template>
  <div class="lingqubox">
    <img src="@static/baoxian/banner3.png" border="0" style="width: 100%">
    <!-- card -->
    <div class="lingqu-detail">
      <div class="lingqu-btn" @click="jump">
<!-- <img class="guangimg" src="@static/baoxian/lightMove.png"> -->
        <img class="shouimg" src="@static/baoxian/finger.png">
        <!-- <span>立即投保</span> -->
      </div>
      <div class="list">
        <el-carousel class="swipper" height="40px" direction="vertical" :autoplay="true">
          <el-carousel-item v-for="(item,index) in users" :key="item.id" class="swipper-item">
            <div>
              <img v-if="index%2==0" src="@static/baoxian/iconMan.png">
              <img v-else src="@static/baoxian/iconWoman.png">
              {{ item.city }}<span>{{ item.content }}</span>投保成功
            </div>
            <div>1分钟前</div>
          </el-carousel-item>
        </el-carousel>
      </div>
      
    </div>
    <ul class="tips">
      <li><img src="../../../static/baoxian/icon-mark.png">社保补充</li>
      <li><img src="../../../static/baoxian/icon-mark.png">医疗费用垫付</li>
      <li><img src="../../../static/baoxian/icon-mark.png">重疾绿色通道</li>
    </ul>

  </div>
</template>

<script>
import {saveBehavior} from "@/api/insurance"
import {reactive, toRefs} from "vue";

export default {
  setup() {
    const state = reactive({
      users: [
        {
          id: 1,
          city: "北京",
          content: "张*（*7348）"
        }, {
          id: 2,
          city: "江苏",
          content: "陆*（*4322）"
        }, {
          id: 3,
          city: "四川",
          content: "李*（*5432）"
        }, {
          id: 4,
          city: "湖南",
          content: "刘*（*6452）"
        }, {
          id: 5,
          city: "安徽",
          content: "刘*（*4702）"
        }, {
          id: 6,
          city: "广东",
          content: "宋*（*4543）"
        }, {
          id: 7,
          city: "上海",
          content: "郭*（*8463）"
        }, {
          id: 8,
          city: "新疆",
          content: "张*（*7456）"
        }
      ]
    })

    const jump = () => {
      saveBehavior("点击'立即投保'按钮", 1)
      document.getElementById("form").scrollIntoView(true);
    }

    return {
      ...toRefs(state),
      jump
    }
  }
}
</script>

<style lang="scss" scoped>
.lingqubox {
  box-sizing: border-box;
  position: relative;
  margin-bottom: 8px;
  /* background-color: cornflowerblue; */

  p {
    margin: 0;
  }

  .lingqu-detail {
    width: 90%;
    height: 64%;
    border-radius: 8px;
    box-shadow: 0 0 2px #00000010;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 8%;
    margin: auto;
    /* background-color: crimson; */
    background-image: url(../../../static/baoxian/card.png);
    background-size: 100%;
    z-index: 98;

      .list{
        box-sizing: border-box;
        width: 90%;
        position: absolute;
        bottom: 4%;
        left: 0;
        right: 0;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 98;
      }

      .lingqu-btn {
        width: 84%;
        height: 20%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 22%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        /* margin-top: 25px; */
        border-radius: 60px;
        background: linear-gradient(180deg, #FFD562 0%, #FF8200 100%);
        background-image: url(../../../static/baoxian/lq.png);
        background-size: 100% 100%;
        box-shadow: 0px 8px 16px 0px rgba(255, 130, 0, 0.24);
        text-align: center;
        animation: big1 2s ease infinite;
        /* overflow: hidden; */

        .guangimg {
          position: absolute;
          top: 0;
          width: 82px;
          height: 56px;
          animation: moveLight 2s cubic-bezier(0, 0, 0.3, 1.06) infinite;
        }
        .shouimg{
          position: absolute;
          bottom: -30px;
          right: -6px;
          width: 64px;
          height: 72px;
          animation: moveshou 2s infinite;
        }
        span{
          display: inline-block;
          padding: 0;
          width: 60%;
          height: 100%;
          line-height: 200%;
          /* vertical-align: middle; */
          margin: auto;
          /* background-color: teal; */
          font-size: 46%;
          font-weight: 700;
          color: white;

        }

      }

      .swipper {
        width: 100%;
        margin-top: 30px;
        border-radius: 6px;
        color: #b6b2af;

        .swipper-item {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          background-color: #fffaf5;
          box-sizing: border-box;
          padding: 6px;

          div {
            display: inline-flex;
            height: 100%;
            align-items: center;
            line-height: 30px;
            font-weight: 400;

            span {
              margin-left: 5px;
              color: #ff8d17;
            }

          }
        }

        img {
          margin-right: 8px;
          width: 24px;
          height: 24px;
        }

      }

    
  }

  ul {
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tips {
    width: 90%;
    height: 10%;
    box-sizing: border-box;
    padding: 12px 8px 4px;
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: space-between;
    background: #fff0d5;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0%;
    margin: auto;
    border-radius: 0 0 8px 8px;
    li {
      height: 36px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 20px;
      color: #ff8d17;
      font-size: 14px;
    }
    img {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
}

}

/* @keyframes moveLight {
  0% {
    left: -82px;
  }
  75% {
    left: 100%;
  }
  100% {
    left: 100%;
  }

} */

@keyframes moveshou {
  0% {
    transform: translateZ(0);
  }
  50% {
    transform: translate3d(-.6rem,-.2rem,0) rotate(-10deg);
  }
  60% {
    transform: translate3d(-.6rem,-.2rem,0) rotate(-10deg);
  }
  100% {
    transform: translateZ(0) rotate(0deg);
  }
}
@keyframes big1 {
  0% {
    transform: translateZ(0);
  }
  60% {
    transform: translateZ(0);
  }
  70% {
    transform: scale3d(.88,.88,1);
  }
  100% {
    transform: translateZ(0) rotate(0deg);
  }
}
</style>