export function unicodeToJson(obj){
    /**
		 * 解决返回的数据是 Unicode 编码的问题
		 */
		var start = obj.indexOf("{");
		var end = obj.lastIndexOf("}") + 1;
		var string = obj.slice(start, end);
		var json = JSON.parse(string);
		return json;
}

export function toggleRate(rankData,isUpRate,rate){
	var arr = rankData;
	var length = rankData.length;
	if(isUpRate==true){
		for(var i =0;i< length;i++){
			for(var j=0;j< length-1-i;j++){
				if(parseFloat(arr[j][rate])<parseFloat(arr[j+1][rate])){
					var temp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = temp;
				}
			}
		}
	}else{
		for(var i =0;i< length;i++){
			for(var j=0;j< length-1-i;j++){
				if(parseFloat(arr[j][rate])>parseFloat(arr[j+1][rate])){
					var temp = arr[j+1];
					arr[j+1] = arr[j];
					arr[j] = temp;
				}
			}
		}
	}
	return arr;
}