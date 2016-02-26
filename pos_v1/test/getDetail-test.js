describe('getDetail', function(){
    var goods;
    var Detail;
    var allItems;
    beforeEach(function(){
	goods = [
	   {barcode:'ITEM000001', count:5},
	   {barcode:'ITEM000003', count:2},
	   {barcode:'ITEM000005', count:3}
	];

	allItems = loadAllItems();
    });

    it('must be output an GoodsWithDetail' , function(){
	spyOn(console , "log");

	Detail = getDetail(goods, allItems);

	var expectDetail = [
	    {
		item: {
		    barcode:'ITEM000001',
		    name:'雪碧',
		    unit:'瓶',
		    price: 3.00
		},
		count : 5.00
	    },
	    {
		item: {
		    barcode:'ITEM000003',
		    name:'荔枝',
		    unit:'斤',
		    price:15.00
		},
		count : 2
	    },
	    {
		item:{
		    barcode:'ITEM000005',
		    name:'方便面',
		    unit:'袋',
		    price:4.50
		},
		count : 3
	    }
	];

	expect(expectDetail+"").toEqual(Detail+"");
    });

});
