describe('parseBarcode', function(){
    var barcodes;
    var goods;
    beforeEach(function() {
	barCodes =  [
	'ITEM000001',
	'ITEM000001',
	'ITEM000001',
	'ITEM000001',
	'ITEM000001',
	'ITEM000003-2',
	'ITEM000005',
	'ITEM000005',
	'ITEM000005'
	];
    });

    it('must output correct [{barcode ,count},...]', function(){
	spyOn(console,'log');

	goods = parseBarcode(barCodes);

	var expectGoods = [
	    {barcode:'ITEM000001', count:5},
	    {barcode:'ITEM000003', count:2},
	    {barcode:'ITEM000005', count:3}
	];
	expect(goods + "" ).toEqual(expectGoods + "");
    });

});
