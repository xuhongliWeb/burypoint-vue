'use strict';

var index = {
    install(Vue, configs) {
        console.log('configs: ', configs);
        console.log('Vue: ', Vue);
        alert('install');
    }
};

module.exports = index;
