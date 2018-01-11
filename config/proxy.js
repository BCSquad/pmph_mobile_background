

let proxyTable =  {
  '/pmpheep': {
    target: 'http://120.76.221.250',//设置你调用的接口域名和端口号 别忘了加http
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,
  },
};
module.exports = proxyTable;
