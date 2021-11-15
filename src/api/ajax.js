/*
封装请求
ajax请求函数模块
返回值：promise对象(异步返回的数据是：response.data)
*/

export default function ajax(url, data = {}, type = "GET") {
    return new Promise(function (resolve, reject) {
        let promise;
        if (type === 'GET') {
            // 准备url query参数
            let dataStr = '';
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr != '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr;
            }
            // 发送get请求
            promise = axios.get(url);
        } else {
            // 发送post请求
            promise = axios.post(url, data)
        }
        promise.then((response) => {
            // 成功了调用resolve()
            resolve(response.data)
        }).catch(error => {
            // 成功了调用reject()
            reject(error)
        })

    })
}

// const response = await ajax();
// const result = response.data();

// const result = await ajax();