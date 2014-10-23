const fs = require("fs");
const path = require("path");

var module = JSON.parse(fs.readFileSync(path.join(__dirname, "module.json"), "utf-8"));

exports.module = module["module"];
exports.bootFile = module["bootFile"];

exports.infoText = {
    "core-extensions": "Cocos2d Core extensions",
    "core-webgl": "Cocos2d WebGL support",
    "core": 'Engine core modules, includes Director, Node, Scene, Layer, Sprite, LabelTTF, EventManger, Scheduler and Texture2D. The default render is canvas',
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
    "spine": "The spine support library",
    "ccpool": "Sprite recycling pool",
    "sprite-batch-node": "A type of sprite that can host sprites using the same texture and enable texture batching to improve performance"
};

//排序列表
exports.sortList = [
    "core-webgl",
    "core",
    "core-extensions",
    "debugger",
    "actions",
    "audio",
    "menus",
    "kazmath",
    "shaders",
    "render-texture",
    "sprite-batch-node",
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
    "ccpool",
    "pluginx",
    "physics",
    "socketio",
    "box2d",
    "chipmunk",
    "spine"
];

//页面上默认隐藏的列表1为隐藏，0或者不存在为不隐藏
exports.hiddenList = {
    'core-webgl': 0,
    'core-extensions': 1,
    'kazmath': 1,
    'shaders': 1,
    'node-grid': 1,
    'compression': 1,
    'effects': 1,
    'physics': 1
};

//express版本默认选中的包
exports.express = {
    "core": 1,
    "debugger": 1,
    "actions": 1,
    "audio": 1,
    "menus": 1
};