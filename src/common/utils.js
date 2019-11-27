export function debounce(func,delay){
					let timer = null
					return function(...args){
						if(timer) clearTimeout(timer)
						timer = setTimeout(()=>{
							func.apply(this,args)
						},delay)
					}
				}
				
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


export function formatDate1(datetime) {
                var date = new Date(datetime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var year = date.getFullYear(),
                    month = ("0" + (date.getMonth() + 1)).slice(-2),
                    sdate = ("0" + date.getDate()).slice(-2),
                    hour = ("0" + date.getHours()).slice(-2),
                    minute = ("0" + date.getMinutes()).slice(-2),
                    second = ("0" + date.getSeconds()).slice(-2);
                // 拼接
                var result = year + "-"+ month +"-"+ sdate +" "+ hour +":"+ minute +":" + second;
                // 返回
                return result;
            }