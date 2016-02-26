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
