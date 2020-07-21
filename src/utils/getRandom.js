/**
 * 获取随机数
 */

export default {
  /**
   * 获取随机数，包含小数，可以等于最小，但不可能等于最大
   * @param min
   * @param max
   * @returns {*}
   */
  getSjs: function (min, max) {
    return Math.random() * (max - min) + min
  },
  /**
   * 获取随机整数，可以等于最小，但不可能等于最大
   * @param min
   * @param max
   * @returns {*}
   */
  getSjzs: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
}
