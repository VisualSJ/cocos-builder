const fs = require("fs");
const path = require("path");
const cmd = require('commander');

exports.create = function(){
    var info = require("./version/" + cmd.version + "/info");
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
            console.log("    " + p + " is not found (moduleConfig.json)");
            r_tmp = [];
        }

        var distFile = path.join(cmd.dir, cmd.name || 'Builder', 'dist', p+'.js');
        var srcFile = path.join(cmd.dir, cmd.name || 'Builder', 'src', p+'.js');
        if(fs.existsSync(distFile) && fs.existsSync(srcFile)){
            var distStat = fs.statSync(distFile);
            var srcStat = fs.statSync(srcFile);

            INFO.info.push({
                name: p,
                checked: express[p] ? 1 : 0,
                maxSize: (srcStat.size / 1000).toFixed(1).toString() + 'KB',
                minSize: (distStat.size / 1000).toFixed(1).toString() + 'KB',
                rule: r_tmp,
                info: info["infoText"][p] || "Unknown"
            })
        }else{
            console.log("    " + p + " is not exists");
            INFO.info.push({
                name: p,
                checked: express[p] ? 1 : 0,
                maxSize: 0 + 'KB',
                minSize: 0 + 'KB',
                rule: r_tmp,
                info: info["infoText"][p] || "Unknown"
            })
        }
    }

    //开始生成module.js
    fs.writeFileSync(path.join(cmd.dir, cmd.name || 'Builder', 'module.js'),

            "var module=" + JSON.stringify(INFO) + ";\n" +
            "var hiddenList=" + JSON.stringify(info["hiddenList"]) + ";\n" +
            "var _sort=" + JSON.stringify(info["sortList"]) + ";"

    );
};