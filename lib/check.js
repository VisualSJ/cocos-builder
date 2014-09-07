const fs = require('fs');
const path = require('path');
const builder = require('../bin/cocosbuilder');

/**
 * 检查输入版本是否支持
 * @returns {boolean}
 */
exports.version = function(){
    if(!fs.existsSync(path.join(__dirname, "version", builder.VERSION))){
        console.log("Version is not exists.");
        return false;
    }
    return true;
};

/**
 * 检查module.json里面的文件是否都存在
 * @returns {boolean}
 */
exports.module2engine = function(){
    var info = require("./version/" + builder.VERSION + "/info");
    var module = info.module;
    var result = true;

    for(var p in module){
        module[p].forEach(function(item){
            //过滤非js文件
            if(!/\.js/.test(item)){
                return;
            }
            var dir = path.join(builder.DIR, item);
            if(!fs.existsSync(dir)){
                console.log(item + " is not exists.");
                result = false;
            }
        });
    }

    return result;
};

/**
 * 反向检查引擎文件夹内的文件是否都存在于module.json
 * @returns {boolean}
 */
exports.engine2module = function(){
    var info = require("./version/" + builder.VERSION + "/info");
    var module = info.module;
    var dir = builder.DIR;

    //递归搜索js文件
    function findList(dirName){
        var file = [];
        var dir = fs.readdirSync(dirName);
        //过滤.开头的文件以及文件夹
        dir = dir.filter(function(item){
            return !/^\./.test(item);
        });

        dir.forEach(function(item){
            var p = path.join(dirName, item);
            var s = fs.statSync(p);
            if(s.isDirectory()){
                file = file.concat(findList(p));
            }else{
                file.push(p);
            }
        });

        return file;
    }
    var dirList = findList(path.join(dir, "cocos2d"));
    dirList = dirList.concat(findList(path.join(dir, "extensions")));
    dirList = dirList.concat(findList(path.join(dir, "external")));

    //添加几个例外文件进入列表
    dirList.push(path.join(dir, "Base64Images.js"));
    dirList.push(path.join(dir, "CCBoot.js"));
    dirList.push(path.join(dir, "CCDebugger.js"));

    //补全文件路径
    var engineList = dirList.map(function(item){
        return item.replace(dir+path.sep, '').replace(/\\/g, '/');
    });

    //检查文件是否全部被引用（是否遗漏文件）
    engineList.forEach(function(item){
        for(var p in module){
            var ml = module[p];
            for(var i=0; i<ml.length; i++){
                if(ml[i] == item){
                    return;
                }
            }
        }
        console.log("module.json missing files: " + item);
    });

    return true;
};

/**
 * 生成文件后，反向检查文件是否完整
 */
exports.generate = function(){
    console.log("Path generation: " + path.join(builder.DIR, builder.NAME));
    var dist = fs.readdirSync(path.join(builder.DIR, builder.NAME, "dist"));
    var src = fs.readdirSync(path.join(builder.DIR, builder.NAME, "src"));
    console.log("The number of dist file: " + dist.length);
    console.log("The number of src file: " + src.length);
};

//todo: 文件语法检查