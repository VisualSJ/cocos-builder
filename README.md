Cocos2d-html5 download builder tools
==================

cocos2d-js引擎按模块打包工具。

将引擎内部部分文件合并，按各个功能模块输出打包后的文件。方便大家选择所需的模块。

[cocos2d-js download builder](http://cocos2d-x.org/filecenter/jsbuilder/)

兼容性：

|平台|平台版本|测试版本|node版本|结果|
|:----:|:--------:|:--------:|:----------:|:---:|
|windows|8.1|0.0.9|0.10.30|√|
|mac|10.8.5|0.0.12|0.10.30|√|

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

- **--debug**

    输出打包过程中所有的log信息。方便调试。默认关闭。
    
- **--name**

    更改输出文件夹的名字
    
    ```
    cocosbuilder --name v3.0-RC3
    ```
    
- **--version**

    指定使用哪个版本的module定义来打包
    
    ```
    cocosbuilder --version v3.0RC3
    ```
    
    - 支持的version列表（默认打包最新版本）
    
        1. v3.1
        2. v3.1beta
        3. v3.0final
        4. v3.0RC3
