let proxyTable = {
    '/pmpheep': {
        target: 'http://localhost:8088', //设置你调用的接口域名和端口号 别忘了加http
        //target: 'http://192.168.100.135', //设置你调用的接口域名和端口号 别忘了加http
        //target: 'http://192.168.0.221:11000', //设置你调用的接口域名和端口号 别忘了加http
        //target: 'http://192.168.0.19:8088', //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, // needed for virtual hosted sites
        ws: true,
    },
};
module.exports = proxyTable;
