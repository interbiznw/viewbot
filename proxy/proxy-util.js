const
logger = require('../logger'),
util = require('../util/util');

let proxies = new Set();
const freeProxyList = require('./source/free-proxy-list');

const ProxyUtil = {
    updateProxiesList: (source) => {
        logger.log("Updating proxies");
        return source.getProxies();
    },
    getRandomProxy: async () => {
        if (proxies.size < 5) {
            await ProxyUtil.updateProxiesList(freeProxyList);
        }

        let proxiesArray = [...proxies];
        return util.getRandomItem(proxiesArray);
    },
    removeProxy: (proxy) => {
        proxies.delete(proxy);
        logger.log('Proxy list length:', proxies.size)
    }
}

module.exports = ProxyUtil;