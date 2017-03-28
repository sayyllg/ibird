 /******************************************************************
 *
 * 全局方法集合
 * creator： yjl
 * date: 2016-03-31
 *
 *******************************************************************/

Ibird.module('Funcs', function(Dicts, Funcs, Backbone, Marionette, $, _) {
	/*
     * 四舍五入保留小数不够补全0
     * val： 数值
     * length: 保留小数位数
   	 */
	Funcs.fixedNum = function(val, length){
		if(length < 0) length = 0;
			var fixedNum = Math.round(parseFloat(val) * Math.pow(10,length+1)/10)/Math.pow(10,length);
			var decimalLength = (fixedNum.toString().split(".")[1] ? fixedNum.toString().split(".")[1].length : 0);
		if(isNaN(fixedNum)){
			return '0.00';
		}else{
			if(decimalLength == 0 && length !== 0){
				fixedNum = fixedNum+'.';
			}
			for(var i = decimalLength; i<length; i++){
				fixedNum = fixedNum.toString()+'0';   
			}
			return fixedNum+'';  
		}
	}
});
