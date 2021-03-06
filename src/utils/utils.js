export const once = (fn) => {
    let result;
    return function () {
        if (fn) {
            result = fn.apply(this, arguments);
            fn = null;
        }
        return result;
    };

}