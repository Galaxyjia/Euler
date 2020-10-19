import React, { Component,forwardRef } from 'react';
import { Button,Icon,Container, Header, Label,Input,Divider } from 'semantic-ui-react'
import {Sortable,ReactSortable} from 'react-sortablejs';
import uniqueId from 'lodash/uniqueId';
import { indexToArray, getItem, setInfo, isPath, getCloneItem, itemRemove, itemAdd } from './utils';
import find from 'find-process';
import _ from 'lodash';
import update from 'immutability-helper'
import MenuExampleProps from './MenuExampleProps'
import CardExampleImageCard from './CardExampleImageCard'
import MessageExampleMessage from './MessageExampleMessage'

const GlobalComponent = {
   Button,
   Icon,
   Label,
   Header,
   Input,
   Divider,
   Container,
   MenuExampleProps,
   CardExampleImageCard,
   MessageExampleMessage
}

const soundData = [
    {
        name: 'Button',
        attr: {
            content:'按钮',
            color:'blue'
        }
    },
    {
        name: 'Header',
        attr: {
            as:'h1',
            content:'h1标题',
            color:'yellow'
        }
    },
    {
        name: 'Label',
        attr: {
            as:'a',
            content:'标签',
            size:'large'
            // color:'red'
        }
    },
    {
        name: 'Input',
        attr: {
            placeholder:'show me',
            size:'large'
            // icon:'search',
            // iconPosition:'left'
        }
    },
    // {
    //     name: 'Container',
    //     attr: {
    //         style:{
    //             display:"flex",
    //             flexDirection: "column"
    //         },
    //     },
    // },
    {
        name: 'Container',
        attr: {
            style:{
                border:'1px dashed red',
                // display:"flex",
                // flexDirection:"row"
            },
        },
    },
    {
        name:'Divider',
        attr: {}
    },
    {
        name:'MenuExampleProps',
        attr: {
            items : [
                { key: 'editorials', active: true, name: '首页' },
                { key: 'review', name: '推荐' },
                { key: 'events', name: '专栏' },
                { key: 'dongtai', name: '问答' },
                { key: 'awsome', name: '提问' },
                { key: 'hawsome', name: '登录' },
                { key: 'wwawsome', name: '注册' },
              ]
        }
    },
    {
        name:'CardExampleImageCard',
        attr: {}
    },
    {
        name:'MessageExampleMessage',
        attr: {

        }
    }
]

// 自定义 可拖拽组件顶层的标签
// 从上层的Reactsorable组件中，props默认传递,style,id,className,ref 
const CustomComponent = forwardRef((props, ref) => {
    // console.log(props)
    return <div ref={ref} style={props.style}>{props.children}</div>;
  });


class EditPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Data:[],
        };
    }

    // 拖拽的添加方法
    sortableAdd = evt => {
        console.log(evt)
        // 组件名或路径
        const nameOrIndex = evt.clone.getAttribute('data-id'); //Button
        // console.log(nameOrIndex)
        // 父节点路径
        const parentPath = evt.path[1].getAttribute('data-id'); //null
        // console.log(parentPath)
        // 拖拽元素的目标路径
        const { newIndex } = evt; //0
        // 新路径 为根节点时直接使用index
        const newPath = parentPath ? `${parentPath}-${newIndex}` : newIndex;//0
        // 判断是否为路径 路径执行移动，非路径为新增
        // console.log(isPath(nameOrIndex))
        if (isPath(nameOrIndex)) { //0
            // 旧的路径index
            const oldIndex = nameOrIndex;//0
            // 克隆要移动的元素
            const dragItem = getCloneItem(oldIndex, this.state.Data)//
            // 比较路径的上下位置 先执行靠下的数据 再执行考上数据
            // console.log(indexToArray(oldIndex))
            // console.log(indexToArray(newIndex))
            if (indexToArray(oldIndex) > indexToArray(newPath)) {
                // 删除元素 获得新数据
                let newTreeData = itemRemove(oldIndex, this.state.Data);
                // 添加拖拽元素
                newTreeData = itemAdd(newPath, newTreeData, dragItem)
                // 更新视图
                this.setState({Data:newTreeData})
                return
            }
            // 添加拖拽元素
            let newData = itemAdd(newPath, this.state.Data, dragItem)
            // 删除元素 获得新数据
            newData = itemRemove(oldIndex, newData);

            this.setState({Data:newData})
            return
        }

        // 新增流程 创建元素 => 插入元素 => 更新视图
        const id = nameOrIndex //0
        
        const newItem = _.cloneDeep(soundData.find(item => (item.name === id)))
        // console.log(newItem)
        
        // 为容器或者弹框时增加子元素
        if ( newItem.name === 'Container') {
            const ComponentInfo = _.cloneDeep(GlobalComponent[newItem.name])
            // console.log(ComponentInfo)
            // 判断是否包含默认数据
            newItem.children = []
            // console.log(newItem)
        }
        // console.log(newPath)
        
        let Data = itemAdd(newPath, this.state.Data, newItem)
        console.log(Data)
        
        this.setState({Data})
    }

     // 拖拽的排序方法
     sortableUpdate = evt => {
        // 交换数组
        const { newIndex, oldIndex } = evt;

        // 父节点路径
        const parentPath = evt.path[1].getAttribute('data-id');
        console.log(parentPath)

        // 父元素 根节点时直接调用data
        let parent = parentPath ? getItem(parentPath, this.state.Data) : this.state.Data;
        // 当前拖拽元素
        const dragItem = parent[oldIndex];
        // 更新后的父节点
        parent = update(parent, {
            $splice: [[oldIndex, 1], [newIndex, 0, dragItem]],
        });

        // 最新的数据 根节点时直接调用data
        const Data = parentPath ? setInfo(parentPath, this.state.Data, parent) : parent
        // 调用父组件更新方法
        this.setState({Data})
        
    }

    render() {
        // 递归函数,JS中文网 - 前端进阶资源教程 www.javascriptc.com
        // const loop = (arr) => (
        //     arr.map(item => {
        //         if(item.children){
        //             return <div {...item.attr} >{loop(item.children)}</div>
        //         }
        //         const ComponentInfo = GlobalComponent[item.name]
        //         return <ComponentInfo {...item.attr}/>
        //     })
        // );

        const sortableOption = {
            animation: 150,
            fallbackOnBody: true,
            swapThreshold: 0.65,
            group: {
                name: 'groupName',
                pull: true,
                put: true,
            },
        }

        // 递归函数
        const loop = (arr,index) => (
            arr.map((item,i) => {
                const indexs = index === '' ? String(i) : `${index}-${i}`;
                // console.log(indexs)
                if(item.children){
                    return <div {...item.attr} 
                        key={indexs}
                    >
                        <ReactSortable
                            tag={CustomComponent}
                            id={indexs}
                            style={{
                                margin:10,
                                minHeight:100,
                                // ...item.attr.style
                            }}
                            ref={c => c && (this.sortable = c.sortable)}
                            group={{ name: "groupName", pull: true,put:true}}
                            animation={150}
                            fallbackOnBody={true}
                            delayOnTouchStart={true}
                            delay={2}
                            swapThreshold={0.65}
                            list={item.children}
                            setList={()=>console.log('hi')}
                            onUpdate={evt => (this.sortableUpdate(evt))}
                            onAdd={evt => (this.sortableAdd(evt))}
                        >
                            {loop(item.children,indexs)}
                        </ReactSortable>
                    </div>
                }
                const ComponentInfo = GlobalComponent[item.name]
                return <div key={indexs} ><ComponentInfo {...item.attr} /></div>
        })
        )

        return (
            <Container>
                <h2>组件列表</h2>
                <ReactSortable 
                    group={{ name: "groupName", pull: "clone",put:false}}
                    sort={false}
                    animation={200}
                    delayOnTouchStart={true}
                    delay={2}
                    list={soundData} 
                    setList={()=>console.log('组件')}
                >
                {
                    soundData.map(item => {
                        return <div key={item.name}><span>{item.name}</span></div>
                    })
                }
                </ReactSortable>
                <Divider />

                <Container>
                <h2>容器</h2>
                <ReactSortable
                    ref={c => c && (this.sortable = c.sortable)}
                    group={{ name: "groupName", pull: true,put:true}}
                    animation={150}
                    fallbackOnBody={true}
		            swapThreshold={0.65}
                    delayOnTouchStart={true}
                    delay={2} 
                    list={this.state.Data} 
                    // setList={(newState) =>this.setState({Data: newState})}
                    setList={()=>console.log('hi')}
                    onUpdate={evt => (this.sortableUpdate(evt))}
                    onAdd={evt => (this.sortableAdd(evt))}
                 >
                {loop(this.state.Data,'')}
                </ReactSortable>
                </Container>
            </Container>
        );
    }
}

export default EditPage;

