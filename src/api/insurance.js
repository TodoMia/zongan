import axios from "@/utils/request.js";
import {store} from "@/store";

export const simpleQuotePrice = async (data) =>
    await axios("/jinguizi/month/simpleQuotePrice", "POST", data);

export const monthPayment = async (data) =>
    await axios("/jinguizi/month/multiApply", "POST", data);


export const checkUrl = async (data) => await axios("/jinguizi/check/checkUrl", "POST", data);

export const saveBehavior = async (action, value) => await axios("/jinguizi/insuranceAction/saveAction", "POST", {
    fuid: store.state.fuid,
    channelId: store.state.channelId,
    channelName: store.state.channelName,
    action: action,
    value: value || 1,
    createTime: new Date().valueOf()
})
;
