var response = require('./response'),
    _ = require('lodash');

var defaults = {},
    methods = ['get', 'post', 'put', 'delete'];

defaults.get = {
    cache: true,
    size: function() {
        return _.random(2, 10);
    },
    collection: false,
    callback: response.generate,
    render: response.render
};

defaults.post = defaults.put = defaults.delete = {
    cache: false,
    collection: false,
    callback: response.generate,
    render: response.render
};

var assignToAll = function(rawConfigs) {

    var configs = {};

    methods.forEach(function(method) {

        configs[method] = assign(rawConfigs[method], method);

    });

    return configs;

};

var assign = function(configs, method) {

    configs = _.isArray(configs) ? configs : [configs];

    return _.compact(configs.map(function(config) {

        if(!config || !config.path) {
            return;
        }

        // Assign method specific defaults
        return _.defaults(config, defaults[method]);

    }));

};

module.exports = {
    assignToAll: assignToAll,
    assign: assign
};
