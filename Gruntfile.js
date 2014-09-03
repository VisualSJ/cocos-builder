const fs = require("fs");
const path = require("path");

var p;

var filedir = fs.readFileSync('basedir.txt', 'utf-8') || '';

//读取moduleConfig.json
var moduleList = JSON.parse(fs.readFileSync('moduleConfig.json', 'utf-8'))['module'];
//移出依赖关系
for(p in moduleList){
    moduleList[p] = moduleList[p].filter(function(item){
        return /\.js$/.test(item);
    });

    moduleList[p] = moduleList[p].map(function(item){
        return path.join(filedir, item);
    });

    if(moduleList[p].length === 0){
        delete moduleList[p];
    }
}

//动态生成concat任务
var concat = {};
for(p in moduleList){
    concat[p] = {
        src: moduleList[p],
        dest: path.join(filedir, 'Builder', 'src/' + p + '.js')
    }
}
concat['options'] = {
    stripBanners: {
        block: false,
        link: false
    }
};

//动态生成uglify任务
var uglify = {};
for(p in moduleList){
    uglify[path.join(filedir, 'Builder', './dist', p+'.js')] = moduleList[p];
}

module.exports = function(grunt) {
    grunt.initConfig({
        concat: concat,
        uglify: {
            options: {
                compress: {
                    global_defs: {
                        "DEBUG": true
                    },
                    dead_code: true
                }
            },
            my_target: {
                files: uglify
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('js', function(){
        grunt.task.run('concat');
        grunt.task.run('uglify');
    });
};