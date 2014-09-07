
const fs = require("fs");
const cp = require("child_process");
const path = require("path");
const check = require("./check");
const CreateModule = require("./module");
const builder = require("../bin/cocosbuilder");

exports.grunt = function(){
    //输出几个参数到文件
    fs.writeFileSync(path.join(builder.TMPDIR, "./info.js"),
        "module.exports=" + JSON.stringify({
            basedir: builder.DIR,
            version: builder.VERSION,
            name: builder.NAME
        }) +
        ";"
    );
    cp.exec('node ' + path.join('node_modules/grunt-cli/bin/grunt') + ' js', {
        cwd: path.join(__dirname, '../')
    }, function(error, stdout, stderr){
        if(builder.DEBUG){
            stdout && console.log('stdout: ' + stdout);
            stderr && console.log('stderr: ' + stderr);
        }

        //过滤src下的注释
        var srcList = fs.readdirSync(path.join(builder.DIR, builder.NAME || 'Builder', 'src'));
        srcList.forEach(function(item){
            var tmpString;
            var tmpdir = path.join(builder.DIR, builder.NAME || 'Builder', 'src', item);
            if(item == "socketio.js"){
                //尾部增加一个换行
                tmpString = fs.readFileSync(tmpdir) + '';
                tmpString = tmpString.replace(/[^\n]$/, function(end){
                    return end + '\n';
                });
                fs.writeFileSync(tmpdir, tmpString);
                return;
            }

            tmpString = fs.readFileSync(tmpdir) + '';
            //过滤 //注释
            tmpString = tmpString.replace(/(\s)+\/\/[^\r\n]*/g, '');
            //过滤/* xxx */注释
            tmpString = tmpString.replace(/\/\*(.|\r\n|\r|\n)*?\*\//g, '');
            //过滤开头处的换行
            tmpString = tmpString.replace(/^(\r\n|\r|\n)*/, '');
            //过滤多个换行
            tmpString = tmpString.replace(/((\s)*(\r\n|\r|\n)){2}/g, '\n');
            //尾部增加一个换行
            tmpString = tmpString.replace(/[^\n]$/, function(end){
                return end + '\n';
            });
            fs.writeFileSync(tmpdir, tmpString);
        });

        //检查生成文件
        check.generate();

        //生成module.js
        CreateModule.create();

        //删除info.js
        fs.unlink(path.join(builder.TMPDIR, "./info.js"), function(err){
            console.log("delete %s %s", path.join(builder.TMPDIR, "./info.js"), err ? "- Success" : "- Failure");
        });
    });
};