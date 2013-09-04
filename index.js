var React = require('react-tools/build/modules/React');
var ReactMount = require('react-tools/build/modules/ReactMount');

ReactMount.allowFullPageRender = true;

var index = {
  serverRender: function(moduleName, props, bundlePath) {
    var module = require(moduleName);
    var component = module(props);
    var markup = null;
    React.renderComponentToString(component, function(m) {
      markup = m;
    });
    markup = markup.replace(
      '</body>',
      '<script src="' + bundlePath + '"></script>' +
        '<script>' +
        'require("reactify-server-rendering").clientRender(' + JSON.stringify(moduleName) +
        ', ' + JSON.stringify(props) + ');' +
        '</script></body>'
    );
    return markup;
  },
  clientRender: function(moduleName, props) {
    var module = require(moduleName);
    var component = module(props);
    React.renderComponent(component, document);
  }
};

module.exports = index;