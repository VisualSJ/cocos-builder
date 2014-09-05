const fs = require("fs");
const path = require("path");
const builder = require('../bin/cocosbuilder');

exports.create = function(){
    var info = require("./version/" + builder.VERSION + "/info");
    var module = info["module"];
    var express = info["express"];

    //读取依赖关系等
    var INFO = {info:[]};
    var r_tmp;

    for(var p in info["infoText"]){
        if(module[p]){

            r_tmp = module[p].filter(function(item){
                if(!/\.js/.test(item)){
                    return item;
                }
            });
        }else{
            console.log(p + " is not found (moduleConfig.json)");
            r_tmp = [];
        }

        var file = path.join(builder.DIR, builder.NAME || 'Builder', 'dist', p+'.js');
        if(fs.existsSync(file)){
            var _stat = fs.statSync(file);

            INFO.info.push({
                name: p,
                checked: express[p] ? 1 : 0,
                size: ((_stat.size / 1000) | 0 ).toString() + 'KB',
                rule: r_tmp,
                info: info["infoText"][p] || "Unknown"
            })
        }else{
            console.log(file + " is not exists");
        }
    }

    //开始生成module.js
    fs.writeFileSync(path.join(builder.DIR, builder.NAME || 'Builder', 'module.js'),

            "var module=" + JSON.stringify(INFO) + ";\n" +
            "var hiddenList=" + JSON.stringify(info["hiddenList"]) + ";\n" +
            "var _sort=" + JSON.stringify(info["sortList"]) + ";"

    );
};