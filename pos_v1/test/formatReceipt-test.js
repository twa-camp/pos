describe('formatReceipt',function(){
    var billing ;
    beforeEach(function(){
        billing = [
        {
            goods:{
                item: {
                    barcode:'ITEM000001',
                    name:'雪碧',
                    unit:'瓶',
                    price: 3.00
                },
                count : 5.00
            },
            saving : 3.00
        },
        {
            goods:{
                item: {
                    barcode:'ITEM000003',
                    name:'荔枝',
                    unit:'斤',
                    price:15.00
                },
                count : 2
            },
            saving : 0.00
        },
        {
            goods:{
                item:{
                    barcode:'ITEM000005',
                    name:'方便面',
                    unit:'袋',
                    price:4.50
                },
                count : 3
            },
            saving : 4.50
        }
        ];
    });

    it('format the Receipt',function(){
        spyOn(console,"log");

        Receipt = formatReceipt(billing);

        var expectReceipt =
            '***<没钱赚商店>收据***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(expectReceipt).toEqual(Receipt);
    });
});
