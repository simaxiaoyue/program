$(() => {
  // 先获取location.search里面的商品的id
  let id = parseInt(location.search.substring(4));
  //获取符合条件的对象
  let obj = phoneData.find(e => {
    return e.pID === id;
  });
  // 把对应的位置的数据更替
  $('.sku-name').text(obj.name);
  $('.summary-price em').text('¥' + obj.price);
  $('.preview-img img').attr('src', obj.imgSrc);
  //点击加减功能
  let chooseNumber = $('.choose-number');
  let addBtn = $('.add');
  let reduceBtn = $('.reduce');
  addBtn.on('click', function () {
    let old = chooseNumber.val();
    old++;
    if (old > 1) {
      reduceBtn.removeClass('disabled');
    }
    chooseNumber.val(old);
  });
  reduceBtn.on('click', function () {
    let old = parseInt(chooseNumber.val());
    if (old === 1) {
      return;
    }
    old--;
    if (old === 1) {
      reduceBtn.addClass('disabled');
    };
    chooseNumber.val(old);
  });
  //点击加入购物车功能
  $('.addshopcar').on('click', function () {
    // 获取数量
    let number = parseInt(chooseNumber.val());
    //获取旧的数据
    let arr;
    let jsonStr = localStorage.getItem('shopCartData');
    //判断获取的数据是否为空
    if (jsonStr === null) {
      arr = [];
    } else {
      arr = JSON.parse(jsonStr);
    }
    //如果在本地存储中有多个相同的数据，应该是数量叠加
    let isExit = arr.find(e => {
      return e.pID === id;
    });
    if (isExit !== undefined) {
      isExit.number += number;
    } else {
      let good = {
        pID: obj.pID,
        name: obj.name,
        price: obj.price,
        imgSrc: obj.imgSrc,
        number: number
      }
      arr.push(good)
    };
    // 把每个数据存储到localStorage里面
    jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    location.href = 'cart.html';
  });
})