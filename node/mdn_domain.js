(function () {

    "use strict";

    function shell_exec( cmd, args ) {
        var spawn = require('child_process').spawn,
            child = spawn(cmd, args);
    }

    function open_window( query ) {

        setTimeout(function() {

            shell_exec('open', ['https://developer.mozilla.org/pt-BR/search?q=' + query]);

        }, 250);

    }

    function init(domainManager) {

        if (!domainManager.hasDomain('mdn_domain')) {
            domainManager.registerDomain('mdn_domain', {major: 0, minor: 1});
        }

        domainManager.registerCommand(
            'mdn_domain',
            'open_window',
            open_window,
            false,
            '',
            [{name: 'query', type: 'string'}]
        );
    }

    exports.init = init;

}());
