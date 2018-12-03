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
