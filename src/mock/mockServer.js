// 使用mockjs提供mock数据接口
import Mock from 'mockjs'
import data from './data.json'
// 返回goods的接口
Mock.mock('/goods', { code: 0, data: data.goods });
// 返回rating的接口
Mock.mock('/ratings', { code: 0, data: data.ratings });
// 返回info的接口
Mock.mock('/info', { code: 0, data: data.info });


// 一般向外导出
// export default XXXX 不需要向外暴露任何数据，只需保存能执行即可