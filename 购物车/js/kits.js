$(() => { // 封装一个根据键和值更新本地存储的方法
  function saveData(key, arr) {
    let jsonStr = JSON.stringify(arr);
    localStorage.setItem(key, jsonStr);
  }


  // 封装一个根据键获取本地存储里数组的方法
  function loadData(key) {
    let jsonStr = localStorage.getItem(key);
    let arr;
    if (str === null) {
      arr = [];
    } else {
      // 最中要的是一个数组
      arr = JSON.parse(jsonStr);
    }
    return arr;
  }

  // 封装计算购物车里面的商品总量的代码
  function total() {
    //计算购物车里面的商品总数就属于在多个页面都用的代码 - 提取到一个新的js里面
    // 读取本地数据里面的商品信息，计算出一个总数，修改购物车总的商品数量
    // 根据键从本地数据中读取出字符串
    let arr = loadData('shopCartData');
    // 直接计算出总的数量，设置给红色的泡泡
    let total = 0;
    arr.forEach(e => {
      total += e.number
    });
    // 修改到头部的购物车里面
    $('.count').text(total);
  }
});