<template>
  <Receive></Receive>
  <BzDetail></BzDetail>
  <InsuranceForm></InsuranceForm>
  <TipsContent></TipsContent>
</template>
<script>
import {onMounted, ref, watch} from 'vue'
import Receive from "@/components/za-insurance/receive"
import BzDetail from "@/components/za-insurance/bzDetail"
import InsuranceForm from "@/components/za-insurance/insuranceForm"

import TipsContent from "@/components/za-insurance/content"

import {checkUrl, saveBehavior} from "@/api/insurance"
import {useRoute, useRouter} from "vue-router"

import {useStore} from "vuex"

export default {
  components: {
    Receive,
    BzDetail,
    InsuranceForm,
    TipsContent
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const scroll = ref(0);
    const hidden = ref(false);

    let {id, channel} = route.params;
    const store = useStore();

    store.commit("setChannelName", channel);
    store.commit("setChannelId", id);
    store.commit("setFuid", route.query.fuid);

    watch(
        [() => scroll.value, () => hidden.value],
        ([newScrollY, newHidden]) => {
          if (newScrollY > 0) {
            document.removeEventListener("scroll", _Scroller);
          }
          if (newHidden) {
            document.removeEventListener("visibilitychange", _getOverTime);
          }
        }
    );
    const _Scroller = () => {
      if (window.scrollY > 1) {
        scroll.value = window.scrollY;
        saveBehavior('触发滚动条滚动', 1);
        document.removeEventListener("scroll", _Scroller);
      }
    };

    const _getOverTime = () => {
      if (document.visibilityState == "hidden") {
        hidden.value = true;
        let startTime = performance.timing.navigationStart
            ? performance.timing.navigationStart
            : window.pageStartTime;
        let endTime = new Date().valueOf();
        console.log("停留时间：", endTime - startTime, "ms");
        saveBehavior('停留时间', endTime - startTime);
        document.removeEventListener("visibilitychange", _getOverTime);
      }
    };
    const check = async () => {
      let {code} = await checkUrl({
        id: id,
        channel: channel
      });
      if (code !== 2001) {
        await router.push('/insurance/404')
      }
    }
    check()
    onMounted(() => {
      document.addEventListener("scroll", _Scroller);
      document.addEventListener("visibilitychange", _getOverTime);
      let startTime = performance.timing.navigationStart
          ? performance.timing.navigationStart
          : window.pageStartTime;
      // 首屏时间
      console.log("加载时间：", window.firstPaint - startTime, "ms");
      saveBehavior('加载时间', window.firstPaint - startTime);
    })
    return {}
  }
};
</script>
<style lang="scss" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>
