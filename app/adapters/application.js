import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend({
        host: ENV.APP.apiURL,
        crossDomain: true
        
//    namespace: 'your-api-namespace',
//    headers: {
//        'X-Requested-With': 'XMLHttpRequest'
//    },
//    ajax(url, method, hash) {
//        if (ENV.APP.usingCors) {
//            if (hash === undefined) {
//                hash = {};
//            }
//
//            hash.crossDomain = true;
//
//            if (ENV.APP.corsWithCreds) {
//                hash.xhrFields = {withCredentials: true};
//            }
//        }
//        return this._super(url, method, hash);
//    }

});