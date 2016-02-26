function parseBarcode(barcodes){
    var goods = new Array() ;
    
    for ( i = 0 ; i < barcodes.length ; i++){
    	//判断是否是长的barcode
    	include = barcodes[i].indexOf("-");
    	if ( include > 0 ){
    	    //是长的barcode
    	    longBarcode(barcodes[i] , goods);
    	}
    	else{
    	    //是短的barcode
    	    shortBarcode(barcodes[i] , goods);
    	}	
    }
    return goods;
}

function longBarcode( bc , goods ){
    barcodeAndCount = bc.split("-");
    var GOlong = {
	barcode : barcodeAndCount[0],
	count : parseFloat( barcodeAndCount[1])
    }
    goods.push(GOlong)
}

function shortBarcode( bc , goods ){
    var good = new Object();
    
    var checkin = 0;
    for (var i = 0 ; i < goods.length ; i++){
	checkin = 0;
	if ( bc == goods[i].barcode){
	    goods[i].count ++ ;
	    checkin = 1;
	    break;
	}
    }
    if( checkin == 0){
	var GOshort = {
	    barcode : bc,
	    count : 1
	};
	goods.push(GOshort);
    }
}

function getDetail( goods , allItems){
    var Details = new Array();
    for( var i = 0 ; i < goods.length ; i++){
	for (var j = 0 ; j < allItems.length ; j++){
	    if( goods[i].barcode == allItems[j].barcode){
		var detail = {
		    item : allItems[j],
		    count : goods[i].count
		}
		Details.push(detail);
	    }
	}
    }
    return Details;
}


function parsePromotion( cart , promotions){
    var discounttedCart = new Array();
    var disconteed = new Object();
    var savedMoney;
    
    attachFlag(cart,promotions);
    
    for(var i = 0 ; i < cart.length ; i++) {
	if(cart[i].promotion == "BUY_TWO_GET_ONE_FREE"){
	    var savedCount =parseInt( cart[i].count / 3);
	    savedMoney = savedCount * cart[i].item.price;
	}
	else{
	    savedMoney = 0 ;
	}
	discountted ={
	    goods: {
		item : cart[i].item,
		count :cart[i].count,
	    },
	    saving : savedMoney
	};
	discounttedCart.push(discountted);
    }
    return discounttedCart;
}

function attachFlag( cart , promotions){
    for( var i = 0 ; i < promotions.length ; i++){
	for(var j = 0 ; j < cart.length ; j++){
	    for(var x = 0 ; x < promotions[i].barcodes.length; x++){
		if(cart[j].item.barcode == promotions[i].barcodes[x]){
		    cart[j].promotion = promotions[i].type
		}
	    }
	}
    }
}

function formatReceipt(billing){
    var Receipt =  '***<没钱赚商店>收据***\n';
    var total = 0;
    var totalSaved = 0;
    var subTotal = 0 ;

    
    for ( var i = 0 ; i < billing.length ; i++){
	subTotal = billing[i].goods.count * billing[i].goods.item.price - billing[i].saving ;

	Receipt += '名称：' + billing[i].goods.item.name + '，数量：' + billing[i].goods.count + billing[i].goods.item.unit +'，单价：' + billing[i].goods.item.price.toFixed(2) + '(元)，小计：' + subTotal.toFixed(2) +'(元)\n';
	total += subTotal
	totalSaved += billing[i].saving;
    }
    Receipt += '----------------------\n';
    Receipt += '总计：' + total.toFixed(2) + '(元)\n' ;
    Receipt += '节省：' + totalSaved.toFixed(2) +'(元)\n' ;
    Receipt +=  '**********************';
 
    return Receipt;
}

function printReceipt(barcodes){
   // document.write(barcodes + '<br/>');
    var goods = parseBarcode(barcodes);
  //  for ( var i =0 ; i < goods.length ; i++){
 //      document.write(goods[i].barcode + " " + goods[i].count + '<br/>');
//    }

    var allItems = loadAllItems();
//      for ( var i =0 ; i < allItems.length ; i++){
//         document.write(allItems[i].barcode + " " + allItems[i].price + '<br/>');
//      }

    var goodsWithDetails = getDetail(goods , allItems);
  //    for ( var i =0 ; i < goodsWithDetails.length ; i++){
 //        document.write(goodsWithDetails[i].item.name + " " + goodsWithDetails[i].count + '<br/>');
//      }
    var promotions = loadPromotions();
  //    for ( var i =0 ; i < promotions.length ; i++){
 //       document.write(promotions[i].type + '<br/>');
//      }
    
    var billing = parsePromotion(goodsWithDetails , promotions);
//      for ( var i =0 ; i < billing.length ; i++){
//         document.write(billing[i].goods.item.name + " " + billing[i].saving + '<br/>');
//      }

    var Receipt = formatReceipt(billing);
    console.log(Receipt);
}
