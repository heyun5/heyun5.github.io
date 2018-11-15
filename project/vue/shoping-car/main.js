/**
 * 点击立即购买 添加到购物车
 */

var total = 0;

// 把购物车里面的每个商品都看成一个对象？？？
var Item = function (data) {
    this.title = data.title;
    this.imgUrl = data.imgUrl;
    this.price = data.price;
    this.quantity = data.quantity || 1;
}
Item.prototype.createNode = function () {
    // this.quantity = 1;
    this.checkDom = '<td><input type="checkbox" name="" id=""></td>';
    this.delDom = '<td><button type="button" class="btn btn-info del">删除</button></td>'
    this.imgDom = '<img src="' + this.imgUrl + '" class = "img-responsive"> '
    this.titleDom = '<h5>' + this.title + '</h5>'
    this.priceDom = '<td><span class="price">' + this.price + '</span></td>'
    this.quantityDom = '<span class="quantity">' + this.quantity + '</span>'
    this.subtotalDom = '<td><span class="subtotal">' + this.price * this.quantity + '</span></td>'
    // 拼接HTML
    this.node = $('<tr></tr>')
        .append(this.checkDom)
        .append('<td>' + this.imgDom + this.titleDom + '</td>')
        .append(this.priceDom)
        .append('<td><span class="quantity-minus">-</span>' + this.quantityDom + '<span class="quantity-plus">+</span></td>')
        .append(this.subtotalDom)
        .append(this.delDom);

    // 将新节点插入到 table 里面
    $('#myModal table').append(this.node);

    // 事件里面的this 是window全局对象 先保存一下当前this对象（实例化之后的对象）
    var _this = this;
    // 点击删除
    this.node.find('.del').click(function () {
        _this.del();
    })

    // 点击增加数量
    this.node.find('.quantity-plus').click(function () {
        _this.quantity += 1;
        _this.updataQuantity()
    })

    // 点击减少数量
    this.node.find('.quantity-minus').click(function () {
        _this.quantity -= 1;
        if (_this.quantity <= 1) {
            _this.quantity = 1
        }
        _this.updataQuantity()
    })
}

// 批量删除
$('.btn.del-all').click(function () {
    var checkboxs = $('table tr:gt(0)').find('input');
    $.each(checkboxs, function (index, value) {
        if (value.checked) {
            // console.log(index)
            var tmpData = JSON.parse(localStorage.getItem('cart'));
            tmpData.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(tmpData))

            value.closest('tr').remove();
        }
    });
    updataTotal();
})

// 删除某项数据方法 删除掉本地存储里面对应的数据 更新视图（总价）
Item.prototype.del = function () {
    // 更新本地存储
    var tmpData = JSON.parse(localStorage.getItem('cart'));
    // console.log(this.imgUrl)

    // 遍历对比【当前对象】的图片和本机存储里面的图片路径（这里确切的话应该使用商品ID）
    // 如果相同 就删掉数据库里面的数据
    for (var i = 0; i < tmpData.length; i++) {
        if (tmpData[i].imgUrl === this.imgUrl) {
            this.node.remove()
            tmpData.splice(i, 1);
            localStorage.setItem('cart', JSON.stringify(tmpData))
        }
    }
    updataTotal();
}

Item.prototype.updataQuantity = function () {
    // 更新本地存储
    var tmpData = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < tmpData.length; i++) {
        if (tmpData[i].imgUrl === this.imgUrl) {
            tmpData[i].quantity = this.quantity;
            localStorage.setItem('cart', JSON.stringify(tmpData))
        }
    }

    // 更新视图
    this.node.find('.quantity').text(this.quantity)
    this.node.find('.subtotal').text(this.quantity * this.price)

    updataTotal();
}


// 获取购物车坐标位置
var position = $(".cart-btn").position();

// 点击加入购物车按钮
$(".product-list .row button").click(function (e) {
    e.preventDefault();
    // console.log(this)

    var title = $(this).parent().find("h5");
    var img = $(this).parent().find("img");
    var price = $(this).parent().find(".price");

    // 拿到数据之后添加到localStorage
    var newItem = {
        title: title.text(),
        imgUrl: img.attr('src'),
        price: price.text(),
        quantity: 1,
    }
    // console.log(newItem)

    // 判断本地存储有没数据 如果没有直接插入newItem 如果有需要push进数组
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([newItem]))
    } else {
        var tmpData = JSON.parse(localStorage.getItem('cart'));
        var repeated = false;

        // 判断新的数据 是否 在本地存储里面已经存在
        $.each(tmpData, function (index, value) {
            if (value.imgUrl === newItem.imgUrl) {
                repeated = repeated || true;
            }
        });

        // 如果不存在 添加进本地存储 并实例化一个 Item对象 并插入到购物车里面
        if (!repeated) {
            tmpData.push(newItem) // 返回添加后的数组长度
            localStorage.setItem('cart', JSON.stringify(tmpData))

            // 实例化一个对象 保存新加入购物车的对象
            var x = new Item(newItem);
            x.createNode();
        }
    }

    
    // 克隆一个图片 设置好位置和原来的在同一个位置
    var tmpNode = img.clone();
    $("body").append(tmpNode);
    tmpNode.css({
        position: "fixed",
        top: img.offset().top,
        left: img.offset().left
    });

    // 图片飞入购物车动画
    tmpNode.animate({
            top: position.top,
            left: position.left,
            width: "0px"
        },
        1000,
        function () {
            // 动画完成之后删除掉克隆的图片
            $(this).remove();
        }
    );

    // 更新总价
    updataTotal();
});

var currentItemsArray = []; // 无用

// 页面加载的时候根据 localStronge 存储的数据 更新购物车视图
$(function () {
    // 获取本地数据
    var items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
        // 如果本地数据存在 遍历创建节点
        $.each(items, function (index, value) {
            var x = new Item(value);
            x.createNode();
        });
    }
    updataTotal();
})


// 更新视图 total count
var updataTotal = function () {
    var total = 0;
    var count = 0;
    var items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
        $.each(items, function (index, value) {
            total += value.quantity * value.price;
            //获取购物车里面的商品的数量
            count += value.quantity;
        });
    }
    $('.total').text(total);
    $(".cart-btn .badge").text(count);
}