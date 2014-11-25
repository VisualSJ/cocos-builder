
const fs = require("fs");
const cp = require("child_process");
const path = require("path");
const check = require("./check");
const CreateModule = require("./module");
const cmd = require("commander");

exports.grunt = function(){
    console.log("");
    console.log("  Start packing...");
    //输出几个参数到文件
    fs.writeFileSync(path.join(cmd.temp, "./info.js"),
        "module.exports=" + JSON.stringify({
            basedir: cmd.dir,
            version: cmd.version,
            name: cmd.name
        }) +
        ";"
    );
    cp.exec('node ' + path.join('node_modules/grunt-cli/bin/grunt') + ' js', {
        cwd: path.join(__dirname, '../')
    }, function(error, stdout, stderr){
        if(cmd.debug){
            stdout && console.log('    stdout: ' + stdout);
            stderr && console.log('    stderr: ' + stderr);
        }

        //过滤src下的注释
        var srcList = fs.readdirSync(path.join(cmd.dir, cmd.name || 'Builder', 'src'));
        srcList.forEach(function(item){
            var tmpString;
            var tmpdir = path.join(cmd.dir, cmd.name || 'Builder', 'src', item);

            //特殊处理socketio库，因为他不适合通用规则
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

        console.log("");
        console.log("  checking file...");
        //检查生成文件
        check.generate();
        console.log("");

        console.log("  create module.js...");
        //生成module.js
        CreateModule.create();
        console.log("");

        console.log("  delete info.js...");
        //删除info.js
        fs.unlink(path.join(cmd.temp, "./info.js"), function(err){
            if(err){
                console.log("    delete %s %s", path.join(cmd.temp, "./info.js"), "- Failure");
                console.log(err);
                console.log("    If necessary, clean manually delete.")
            }else{
                console.log("    delete %s %s", path.join(cmd.temp, "./info.js"), "- Success");
            }
            console.log("");
        });
    });
};