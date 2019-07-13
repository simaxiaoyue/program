$(() => {
  let jsonStr = localStorage.getItem('shopCartData');
  let arr;
  if (jsonStr !== null) {
    arr = JSON.parse(jsonStr);
    let html = '';
    arr.forEach(e => {
      html += `<div class="item" data-id="${e.pID}">
      <div class="row">
        <div class="cell col-1 row">
          <div class="cell col-1">
            <input type="checkbox" class="item-ck" checked="">
          </div>
          <div class="cell col-4">
            <img src="${e.imgSrc}" alt="">
          </div>
        </div>
        <div class="cell col-4 row">
          <div class="item-name">${e.name}</div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="price">${e.price}</em>
        </div>
        <div class="cell col-1 tc lh70">
          <div class="item-count">
            <a href="javascript:void(0);" class="reduce fl">-</a>
            <input autocomplete="off" type="text" class="number fl" value="${e.number}">
            <a href="javascript:void(0);" class="add fl">+</a>
          </div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="computed">${e.price * e.number}</em>
        </div>
        <div class="cell col-1">
          <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
        </div>
      </div>
    </div>`
    })
    $('.item-list').html(html);
    $('.empty-tip').hide();
    $('.cart-header').removeClass('hidden');
    $('.total-of').removeClass('hidden');
  }
  //计算总数和总价
  function computedCountAndMoney() {
    let totalCount = 0;
    let totalMoney = 0;
    $('.item input[type=checkbox]:checked').each((i, e) => {
      //把该id存储到两个元素共有的前代元素  div.item 上
      let id = parseInt($(e).parents('.item').attr('data-id'));
      //判断这些id在本地存储里面是否有，如果有，就需要参与总数和总价的计算
      arr.forEach(e => {
        if (id === e.pID) {
          totalCount += e.number;
          totalMoney += e.number * e.price;
        }
      });
    });
    $('.selected').text(totalCount);
    $('.total-money').text(totalMoney);
  }
  computedCountAndMoney();
  //全选和全不选
  $('.pick-all').on('click', function () {
    $('.item-ck').prop('checked', $(this).prop('checked'));
    $('.pick-all').prop('checked', $(this).prop('checked'));
    computedCountAndMoney();
  });
  $('.item-ck').on('click', function () {
    let isAll = $('.item-ck').length === $('.item-ck:checked').length;
    $('.pick-all').prop('checked', isAll);
    computedCountAndMoney();
  });

  //加减功能
  $('.item-list').on('click', '.add', function () {
    let old = parseInt($(this).siblings('input').val());
    old++;
    if (old > 1) {
      $(this).siblings('.reduce').removeClass('disabled');
    }
    $(this).siblings('input').val(old);
    // 判断依据是 点击的按钮对应的商品的id
    let id = parseInt($(this).parents('.item').attr('data-id'));
    let obj = arr.find(e => {
      return e.pID === id;
    });
    obj.number = old;
    // 覆盖回本地数据
    let jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    computedCountAndMoney();
    $(this).parents('.item').find('.computed').text(obj.price * obj.number);
  });
  $('.item-list').on('click', '.reduce', function () {
    let old = parseInt($(this).siblings('input').val());
    if (old === 1) {
      return;
    }
    old--;
    if (old === 1) {
      $(this).addClass('disabled');
    }
    $(this).siblings('input').val(old);
    let id = parseInt($(this).parents('.item').attr('data-id'));
    let obj = arr.find(e => {
      return e.pID === id;
    });
    obj.number = old;
    // 覆盖回本地数据
    let jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    computedCountAndMoney();
    $(this).parents('.item').find('.computed').text(obj.price * obj.number);
  });
  //删除功能
  $('.item-list').on('click', '.item-del', function () {
    let _this=this;
  // 弹出一个jqueryUI的确认框
  $( "#dialog-confirm" ).dialog({
    resizable: false,
    height:140,
    modal: true,
    buttons: {
      "确认": function() {
        $( this ).dialog( "close" );
        // 把对应的商品删除
        $(_this).parents('.item').remove();
        let id = parseInt($(_this).parents('.item').attr('data-id'));
        let index = arr.findIndex((e)=>{
          return e.pID === id
        });
        arr.splice(index, 1);
        // 把数据覆盖回本地
        let jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData', jsonStr);
      },
      "取消": function() {
        $( this ).dialog( "close" );
      }
    }
  });
});
})
