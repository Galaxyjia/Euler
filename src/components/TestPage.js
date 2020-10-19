import React, { Component } from 'react';
import { Button,Icon,Container, Header, Label,Input,Divider } from 'semantic-ui-react'
import {Sortable,ReactSortable} from 'react-sortablejs';

const GlobalComponent = {
    Button,
    Header,
    Input,
    Label,
    Container,
    Divider
}


class TestPage extends Component {

    render() {

        // 测试数据
        const Data = [
            {
                name: 'Button',
                attr: {
                    content:'第一个',
                    color:'green'
                }
            },
            {
                name: 'Header',
                attr: {
                    as:'h1',
                    content:'第二个',
                    color:'yellow'
                }
            },
            {
                name: 'Label',
                attr: {
                    as:'a',
                    content:'第二个',
                    color:'red'
                }
            },
            {
                name: 'Input',
                attr: {
                    placeholder:'show me',
                    // icon:'search',
                    // iconPosition:'left'
                }
            },
            {
                name: 'Container',
                attr: {
                    style:{
                        border:'1px solid red',
                    },
                },
                children: [
                    {
                        name: 'Header',
                        attr: {
                            as:'h1',
                            content:'第二个',
                            color:'yellow'
                        }
                    },
                    {
                        name: 'Header',
                        attr: {
                            as:'h1',
                            content:'第san个',
                            color:'yellow'
                        }
                    }
                ],
            },
            {
                name:'Divider',
                attr: {}
            }
        ]

        // 递归函数,JS中文网 - 前端进阶资源教程 www.javascriptc.com
        const loop = (arr) => (
            arr.map((item,i)=> {
                if(item.children){
                    return <div key={item.name} {...item.attr} >{loop(item.children)}</div>
                }
                const ComponentInfo = GlobalComponent[item.name]
                return <div key={item.name} ><ComponentInfo {...item.attr} /></div>
            })
        );

        return (
            <>
                <ReactSortable 
                    // key={item.id}
                    group={{ name: "groupName", pull: "clone",put:false}}
                    sort={false}
                    // clone={item => ({ ...item, id: uniqueId() })}
                    animation={200}
                    // delayOnTouchStart={true}
                    // delay={2}
                    list={Data} 
                    setList={()=>console.log('')}
                >
                {loop(Data)} 
                </ReactSortable>
            </>
        );
    }
}

export default TestPage;

