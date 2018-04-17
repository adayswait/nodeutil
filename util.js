'use strict';

/**
 * 让一个对象变的完全冻结(递归)
 * @param {*} obj 
 */
const deepFreeze = (obj) => {
    Object.freeze(obj);
    for (let propKey in obj) {
        let prop = obj[propKey];
        if (!obj.hasOwnProperty(propKey) ||
            (typeof prop !== "object") ||
            Object.isFrozen(prop)) {
            continue;
        }
        deepFreeze(prop);
    }
}

/**
 * 获取一个完整的对象自身值,包括被设定为不可枚举的属性
 * @param {object} obj 任意对象
 */
const getFullObject = (obj) => {
    const keyNames = Object.getOwnPropertyNames(obj);

    const fullObj = {};
    for (let name of keyNames) {
        fullObj[name] = obj[name];
    }
    return fullObj;
}
/**
 * 简易随机数生成
 * @param {number} seed 随机数种子
 */
const simpleRand = seed =>
    ((seed * 9301 + 49297) % 233280) / 233280.0;

const isuint = str =>
    (/^\+?[1-9][0-9]*$/).test(str.toString());

const isNumber = v =>
    (typeof v === 'number') && (!isNaN(v));
/**
 * 从一个数组中获取最大或最小的n个值
 * @param {Array} arr 目标数组
 * @param {number} n 获取元素个数
 * @param {function} compFunc 比较策略
 */
const topK = (arr, n, compFunc) => {
    const swapArr = (arr, i, j) => {
        let t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    };
    const top = (arr, comp) => {
        if (arr.length === 0) {
            return;
        }
        let i = arr.length / 2 | 0;
        for (; i >= 0; i--) {
            if (comp(arr[i], arr[i * 2])) {
                swapArr(arr, i, i * 2);
            }
            if (comp(arr[i], arr[i * 2 + 1])) {
                swapArr(arr, i, i * 2 + 1);
            }
        }
        return arr[0];
    };
    const _topK = (arr, n, comp) => {
        if (!arr || arr.length === 0 ||
            n <= 0 || n > arr.length) {
            return -1;
        }
        let ret = [];
        for (let i = 0; i < n; i++) {
            let max = top(arr, comp);
            ret.push(max);
            arr.splice(0, 1);
        }
        return ret;
    };
    return _topK(arr, n, compFunc);
};