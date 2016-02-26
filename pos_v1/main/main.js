//TODO: Please write code in this file.
//###################start of parseInput#################################
function parseBarcode(barcodes){
    var goods = new Array() ;
    
    for ( i = 0 ; i < barcodes.length ; i++){
	//判断是否是长的barcode
	include = barcodes[i].indexOf("-");
	if ( include > 0 ){
	    //是长的barcode
//	    document.write(barcodes[i] + "*************" + "<br/>");
	    longBarcode(barcodes[i] , goods);
	}
	else{
	    //是短的barcode
//	    document.write(barcodes[i] + "*************" + "<br/>");
	    shortBarcode(barcodes[i] , goods);
	}	
    }
    return goods;
}

function longBarcode( bc , goods ){
    barcodeAndCount = bc.split("-");
    var GOlong = {
	barcode : barcodeAndCount[0],
	count : barcodeAndCount[1]
    }
    goods.push(GOlong)
}

function shortBarcode( bc , goods ){
    var good = new Object();
    
    var checkin = 0;
//    document.write("goods.length" + goods.length);
    for (var i = 0 ; i < goods.length ; i++){
	checkin = 0;
//	document.write("bc=" + bc + "<br />");
//	document.write("good.barcode=" + goods[i].barcode + "<br/>");
//	document.write("bc == good.barcode" + (bc == goods[i].barcode) + "<br/>");
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
//	document.write(GOshort);
	goods.push(GOshort);
    }
}

//###################################end of parseInput#########################

//#########################start of GetDetail########################
function getDetail( goods , allItems){
    var Details = new Array();
//    document.write(goods.length + " " + allItems.length + "<br/>");
    for( var i = 0 ; i < goods.length ; i++){
	for (var j = 0 ; j < allItems.length ; j++){
//	    document.write(goods[i].barcode + "<br/>" + allItems[j].barcode + "<br/>");
	    if( goods[i].barcode == allItems[j].barcode){
		var detail = {
		    iterm : allItems[j],
		    count : goods[i].count
		}
		Details.push(detail);
	    }
	}
    }
  //  document.write(Details);
    return Details;
}


//##############################end of getDetail #####################

//########################start of parsePromotion############

function parsePromotion( cart , promotions){
    var discounttedCart = new Array();
    var disconteed = new Object();
    var savedMoney;
    
    attachFlag(cart,promotions);

  //  for (var i = 0 ; i < cart.length ; i++){
//	document.write(cart[i].count + " " + cart[i].promotion + "<br/>");
  //  }
    
    for(var i = 0 ; i < cart.length ; i++) {
	if(cart[i].promotion == "BUY_TWO_GET_ONE_FREE"){
	    var savedCount =parseInt( cart[i].count / 3);
	 //   document.write(savedCount + "<br/>");
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
    //document.write(discounttedCart[0].saving);
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

//###################end of parsePromotion #############################

//#################start of formatReceipt ##########################
function formatReceipt(billing){
    var Receipt =  '***<没钱赚商店>收据***\n';
    var total = 0;
    var totalSaved = 0;
    var subTotal = 0 ;

  //  for( var i = 0 ; i < billing.length ; i++){
//	document.write(billing[i].goods.count + " " +billing[i].goods.item.price + " "+ billing[i].saving + "<br/>");
//    }
    
    for ( var i = 0 ; i < billing.length ; i++){
	subTotal = billing[i].goods.count * billing[i].goods.item.price - billing[i].saving ;

//	document.write(subTotal + "<br/>");
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
