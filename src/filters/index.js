import Vue from 'vue'
import moment from 'moment'
// import format from 'date-fns/format';

Vue.filter('date-format', (value, formateStr = 'yyyy-MM-dd hh:mm:ss') => {
    return moment(value).format(formateStr);
    // return format(value, formateStr)
})