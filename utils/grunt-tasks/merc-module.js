module.exports = function(grunt) {
    var fs = require('fs'),
        CLIENT_DIR = 'client';

    grunt.registerTask('merc-module', 'Creates a new client-side module.', function(name, layout, region) {
        if (!name) {
            return showDocumentation();
        }

        // Set default layout and region
        layout = layout || 'publicLayout';
        region = region || 'mainRegion';

        // Create dust template
        var DUST_DIR = CLIENT_DIR + '/dust/' + name;
        fs.mkdirSync(DUST_DIR);
        fs.writeFileSync(DUST_DIR + '/' + name + '.dust', '<h1 class="title">' + name +' template</h1>');

        // Create JavaScript module
        var JS_DIR = CLIENT_DIR + '/js/modules/' + name;
        fs.mkdirSync(JS_DIR);
        fs.mkdirSync(JS_DIR + '/controllers');
        fs.writeFileSync(JS_DIR + '/controllers/' + name + 'Controller.js', controllerTemplate(name, layout, region));
        fs.mkdirSync(JS_DIR + '/views');
        fs.writeFileSync(JS_DIR + '/views/' + name + 'View.js', viewTemplate(name));

        // Create LESS module
        var LESS_DIR = CLIENT_DIR + '/less/modules/' + name;
        fs.mkdirSync(LESS_DIR);
        fs.writeFileSync(LESS_DIR + '/main.less', lessTemplate(name));

        grunt.log.ok(name + ' module created. Renders to ' + region + ' of ' + layout + '.');
    });

    function showDocumentation() {
        grunt.log.write('-----------------');
        grunt.log.subhead('About merc-module');
        grunt.log.writeln('-----------------');
        grunt.log.writeln('merc-module automatically creates a new client-side module and all of its dependencies.');
        grunt.log.writeln('');
        grunt.log.writeln('After running merc-module, the following files will exist:');
        grunt.log.writeln('- client/dust/[myNewModule]/[myNewModule].dust');
        grunt.log.writeln('- client/js/modules/[myNewModule]/controllers/[myNewModule]Controller.js');
        grunt.log.writeln('- client/js/modules/[myNewModule]/views/[myNewModule]View.js');
        grunt.log.writeln('- client/less/modules/[myNewModule]/main.less');
        grunt.log.writeln('');
        grunt.log.writeln('The above files contain all of the basic functionality needed to render a new view.');
        grunt.log.writeln('All you\'ll need to do is call the `show` method on [myNewModule]Controller.');
        grunt.log.writeln('This is typically done from within the base controller, in response to navigation.');
        grunt.log.writeln('');
        grunt.log.writeln('--------------');
        grunt.log.writeln('The Grunt Task');
        grunt.log.writeln('--------------');
        grunt.log.writeln('Syntax: grunt merc-module:[moduleName]:[layoutName]:[regionName]');
        grunt.log.writeln('[moduleName] Required');
        grunt.log.writeln('[layoutName] Optional (defaults to publicLayout)');
        grunt.log.writeln('[regionName] Optional (defaults to mainRegion)');
        grunt.log.writeln('__________________________________________________________________________________________________________');
        grunt.log.writeln('');
        grunt.log.writeln('1) grunt merc-module:myNewModule                          Creates a new module called "myNewModule".');
        grunt.log.writeln('                                                          Will render in "mainRegion" of "publicLayout".');
        grunt.log.writeln('__________________________________________________________________________________________________________');
        grunt.log.writeln('');
        grunt.log.writeln('2) grunt merc-module:myNewModule:myLayout                 Creates a new module called "myNewModule".');
        grunt.log.writeln('                                                          Will render in "mainRegion" of "myLayout".');
        grunt.log.writeln('__________________________________________________________________________________________________________');
        grunt.log.writeln('');
        grunt.log.writeln('3) grunt merc-module:myNewModule:myLayout:myRegion        Creates a new module called "myNewModule".');
        grunt.log.writeln('                                                          Will render in "myRegion" of "myLayout".');
        grunt.log.writeln('__________________________________________________________________________________________________________');
        grunt.log.writeln('');
        grunt.fail.fatal('Please provide a module name.');
    }
};

/*
File templates

These aren't pretty, but they do the job for now
 */
var tab = '    ';

function viewTemplate(name) {
    return "define([\n" + tab + 
                "'marionette',\n\n" + tab + 
                "'modules/" + name + "/templates/" + name + 
            "'\n], function(\n" + tab + 
                "Marionette\n) {\n" + tab + 
                    "return Marionette.ItemView.extend({\n" + tab + tab + 
                        "template: '" + name + "/" + name + "',\n\n" + tab + tab + 
                        "className: '" + name + "'\n" + tab + 
                "});\n});"
}

function controllerTemplate(name, layout, region) {
    var constructorName = name.charAt(0).toUpperCase() + name.slice(1);

    return "define([\n" + tab +
                "'app',\n\n" + tab +
                "'modules/" + name + "/views/" + name + "View'" +
            "\n], function(\n" + tab +
                "App,\n\n" + tab +
                constructorName + "View" +
            "\n) {\n" + tab +
                "return {\n" + tab + tab +
                    "show: function() {\n" + tab + tab + tab +
                        "var " + name + "View = new " + constructorName + "View();\n\n" + tab + tab + tab +
                        "App." + layout + "." + region + ".show(" + name + "View);\n\n" + tab + tab + tab +
                        "App.vent.trigger('" + name + "Controller:show');\n" + tab + tab +
                    "}\n" + tab +
                "};\n" +
            "});";
}

function lessTemplate(name) {
    return "." + name + " {\n" + tab + "\n}";
}