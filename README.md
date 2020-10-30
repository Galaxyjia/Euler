# Euler
是一个通用的拖拽编辑器，旨在快速生成通用UI界面

## 左侧为控件面板

## 编辑器

## 属性面板

## 数据结构

```
[
    {
        name:"Button",
        type:"Button",
        attr:{
            color:"blue",
            content:"按钮"
        },
        config:[
            {
                text:"主题",
                children:[
                    {
                        type:'array',
                        text:'主题',
                        field:'type',
                        data:[
                            {
                                text:"普通primary",
                                value:"primary",
                            },
                            {
                                text:"普通secondary",
                                value:"secondary",
                            },
                        ]
                    }
                ]
            },
            {
                text:"文字内容",
                children:[
                    {
                        text:"内容",
                        type:"string",
                        field:"content"
                    }
                ]
            }
        ]
    }
]
```