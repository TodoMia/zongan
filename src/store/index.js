import {createStore} from "vuex";

// 创建 store 容器实例.
export const store = createStore({
    state() {
        return {
            fuid: sessionStorage.getItem('fuid') || 0,
            channelName: sessionStorage.getItem('channelName') || 0,
            channelId: sessionStorage.getItem('channelId') || 0,
            startTime: sessionStorage.getItem('startTime') || 0,
        };
    },
    mutations: {
        setFuid(state, fuid) {
            state.fuid = fuid;
            sessionStorage.setItem('fuid', fuid)
        },
        setChannelName(state, channelName) {
            state.channelName = channelName;
            sessionStorage.setItem('channelName', channelName)
        },
        setChannelId(state, channelId) {
            state.channelId = channelId;
            sessionStorage.setItem('channelId', channelId)
        },
        setStartTime(state, time) {
            state.startTime = time;
            sessionStorage.setItem('startTime', time)
        },
    },
});
