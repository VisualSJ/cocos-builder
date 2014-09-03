const path = require("path");
const fs = require("fs");

//引擎位置
const rootDir = "../../cocos2d-js/frameworks/cocos2d-html5";

//说明文字
const infoText = {
    "core-extensions": "Cocos2d Core extensions",
    "core-webgl": "Cocos2d WebGL support",
    "webgl": "Cocos2d WebGL renderer",
    "core": 'Engine core modules, includes Director, Node, Scene, Layer, Sprite, LabelTTF, EventManger, Scheduler and Texture2D. The default render is canvas.',
    "debugger": 'Log system and debug informations',
    "kazmath": 'Math lib for webgl',
    "shaders": 'Shaders',
    "render-texture": 'RenderTexture node for custom rendering',
    "labels": 'Label nodes including LabelBMFont, LabelAtlas',
    "motion-streak": 'MotionStreak which can manage a ribbon based on its motion',
    "node-grid": 'Base node of effects',
    "shape-nodes": 'DrawNode can be used to render lines, polygons, curves, etc',
    "clipping-nodes": 'ClippingNode can clip hosted nodes with shape or texture as stencil',
    "effects": 'Some effects',
    "actions": 'Configurable actions for animating nodes with position, scale, etc',
    "actions3d": 'Effects that can be applied to nodes, like page turn, shake, wave, etc',
    "progress-timer": 'ProgressTimer node which can transform a node into a progression bar',
    "transitions": 'Scene transition effects',
    "compression": 'Compression of tilemap and particle',
    "particle": 'ParticleSystem node and built in particle effects',
    "text-input": 'Nodes for simple text inputing',
    "menus": 'Menu and MenuItem nodes for creating game menu',
    "tilemap": 'TMX file parser for creating tile map layers',
    "parallax": 'Parallax effect which can be applied to layers',
    "audio": 'Audio system',
    "gui": 'Another GUI extension with a set of useful widgets',
    "ccbreader": 'CocosBuilder editor support',
    "editbox": 'Edit Box for more complex text inputing',
    "ccui": 'Cocos UI widgets with layout support',
    "cocostudio": 'CocoStudio editor support',
    "pluginx": 'Social network API plugins',
    "physics": 'Physics node for Box2d and Chipmunk',
    "socketio": 'ScoketIO library support',
    "box2d": 'Built in box2d physics engine support',
    "chipmunk": 'Built in Chipmunk physics engine support',
    "spine": "The spine support library"
};

//输出后的排序列表
const sortList = [
    "core-webgl",
    "core",
    "core-extensions",
    "webgl",
    "debugger",
    "actions",
    "audio",
    "menus",
    "kazmath",
    "shaders",
    "render-texture",
    "labels",
    "motion-streak",
    "node-grid",
    "shape-nodes",
    "clipping-nodes",
    "effects",
    "actions3d",
    "progress-timer",
    "transitions",
    "compression",
    "particle",
    "text-input",
    "tilemap",
    "parallax",
    "gui",
    "ccbreader",
    "editbox",
    "ccui",
    "cocostudio",
    "pluginx",
    "physics",
    "socketio",
    "box2d",
    "chipmunk",
    "spine"
];

//获取module列表（一个对象列表）
const moduleData = JSON.parse(fs.readFileSync('./moduleConfig.json', 'utf-8'));

console.log("Scanning engine...");
//获取引擎文件夹内的文件列表
var engineList = [];
(function(dir){
    /**
     * @param {string} dirName
     * @return {array}
     */
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

    dirList.push(path.join(dir, "Base64Images.js"));
    dirList.push(path.join(dir, "CCBoot.js"));
    dirList.push(path.join(dir, "CCDebugger.js"));

    engineList = dirList.map(function(item){
        return item.replace(dir+'/', '');
    });

})(rootDir);

//检查模块数量
var tmp = 0;
for(var p in infoText){
    tmp++;
}
console.log("Info text num: " + tmp);
console.log("sort list num: " + sortList.length);

//检查文件是否全部被引用（是否遗漏文件）
engineList.forEach(function(item){
    for(var p in moduleData['module']){
        var ml = moduleData['module'][p];
        for(var i=0; i<ml.length; i++){
            if(ml[i] == item){
                return;
            }
        }
    }
    console.log("Please check file: " + item);
});

//生成build.xml
