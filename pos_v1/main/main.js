//TODO: Please write code in this file.
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
