import { saveBehavior, saveRetainPage } from "@/api/index.js";
import { store } from "@/store/index.js";
import $ from "jquery"


export const load_time = async (time) => {
    await saveBehavior("T001", time);
};

export const over_time = async (time) => {
    await saveBehavior("T002", time);
};


/**
 * 滑动落地页
 * @return {Promise<void>}
 */
export const behavior_scroll = async () => {
    await saveBehavior("F001");
};
/**
 * 一般下载
 * @return {Promise<void>}
 */
export const behavior_click_primary_download = async () => {
    $.post(
        "https://ltv7.cn/api/v2/model/ad/click/report",
        {
            uid: store.state.fuid,
        },
        function (data) {
            console.log(data);
        }
    );
    await saveBehavior("B002");
};

/**
 * 点击banner下载
 * @return {Promise<void>}
 */
export const behavior_click_banner = async () => {
    $.post(
        "https://ltv7.cn/api/v2/model/ad/click/report",
        {
            uid: store.state.fuid,
        },
        function (data) {
            console.log(data);
        }
    );
    await saveBehavior("A002");
};
/**
 * 点击红包雨红包下载
 * @return {Promise<void>}
 */
export const behavior_click_redPack = async () => {
    $.post(
        "https://ltv7.cn/api/v2/model/ad/click/report",
        {
            uid: store.state.fuid,
        },
        function (data) {
            console.log(data);
        }
    );
    await saveBehavior("C002");
};
/**
 * 点击红包雨红包关闭按钮
 * @return {Promise<void>}
 */
export const behavior_click_redPack_close = async () => {
    await saveBehavior("C003");
};
/**
 * 是否砸蛋
 * @return {Promise<void>}
 */
export const behavior_click_eggs = async () => {
    await saveBehavior("D001");
};
/**
 * 是否点击关闭砸蛋
 * @return {Promise<void>}
 */
export const behavior_click_eggs_close = async () => {
    await saveBehavior("点击关闭砸蛋按钮");
};
/**
 * 点击砸蛋后的红包下载
 * @return {Promise<void>}
 */
export const behavior_click_eggs_redpack = async () => {
    $.post(
        "https://ltv7.cn/api/v2/model/ad/click/report",
        {
            uid: store.state.fuid,
        },
        function (data) {
            console.log(data);
        }
    );
    await saveBehavior("D002");
};
/**
 * 点击砸蛋后的红包的关闭按钮
 * @return {Promise<void>}
 */
export const behavior_click_eggs_redpack_close = async () => {
    await saveBehavior("D003");
};
/**
 * 玩转盘
 * @return {Promise<void>}
 */
export const behavior_click_turn = async () => {
    await saveBehavior("E001");
};
/**
 * 不玩转盘
 * @return {Promise<void>}
 */
export const behavior_click_turn_close = async () => {
    await saveBehavior("关闭转盘");
};
/**
 * 点玩转盘后的礼物下载
 * @return {Promise<void>}
 */
export const behavior_click_turn_gift = async () => {
    $.post(
        "https://ltv7.cn/api/v2/model/ad/click/report",
        {
            uid: store.state.fuid,
        },
        function (data) {
            console.log(data);
        }
    );
    await saveBehavior("E002");
};

/**
 * fuid: xx
 * action :  string
 * value :  string
 */
/**
 * 点击玩转盘后的礼物关闭按钮
 * @return {Promise<void>}
 */
export const behavior_click_turn_gift_close = async () => {
    await saveBehavior("E003");
};


/**
 * 点击挽留页下载
 * @return {Promise<void>}
 */
export const behavior_click_download_apk = async (name, apk) => {
    await saveRetainPage(name, apk);
};

/**
 *
 * @param {*} name
 * @param {*} apk
 *
 */
export const behavior_click_download_app = async () => {
    await saveRetainPage("福利手游", "https://gamecenter.c7wn.com/flsy.apk");
};
