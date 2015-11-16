Cocos2d-html5 download builder tools
==================

cocos2d-js引擎按模块打包工具。

将引擎内部部分文件合并，按各个功能模块输出打包后的文件。方便大家选择所需的模块。

[cocos2d-js download builder](http://cocos2d-x.org/filecenter/jsbuilder/)

###1. 安装

使用npm全局安装，如果需要更新，为保险起见，请先删除原来的版本（install改成uninstall就行了）.**必须全局安装**

```
npm install -g cocos-builder
```

###2. 使用方法

在命令行进入cocos2d-html5引擎文件夹内。运行cocosbuilder命令。

```
cocosbuilder
```

将会在当前目录下生成一个Builder文件夹。里面则是download builder所有需要的包文件。

###3. 参数

- *-h --help**

    说明 & 帮助，一些命令的简单说明

- **-m --mode [value]**

    以什么模式运行：
    
        1. pack， 默认以pack方法打开，执行打包命令，该命令不会检查文件正确性等。
        
        2. check，检查模式，以该命令打开的话，不会打包文件，仅仅正向反向检查module定义和目录内的文件情况。

- **-d --debug [false | true]**

    输出打包过程中所有的log信息。方便调试。默认关闭。
    
- **-n --name [value]**

    更改输出文件夹的名字
    
    ```
    cocosbuilder -n v3.9
    ```
    
- **-v --version [value]**

    指定使用哪个版本的module定义来打包
    
    ```
    cocosbuilder -v v3.9
    ```
    
    - 支持的version列表（默认打包最新版本）

        v3.9
        v3.8
        v3.7
        v3.6
        v3.5
        v3.3
        v3.2
        v3.1
        v3.1beta
        v3.0
        v3.0RC3
