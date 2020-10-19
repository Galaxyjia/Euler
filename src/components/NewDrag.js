import React, { useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Button,Icon,Container, Header, Label,Input,Divider } from 'semantic-ui-react'
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
        type: 'Button',
        attr: {
            content:'按钮',
            color:'blue'
        }
    },
    {
        name: 'Header',
        type:'Header',
        attr: {
            as:'h1',
            content:'h1标题',
            color:'yellow'
        }
    },
    {
        name: 'Label',
        type:'Label',
        attr: {
            as:'a',
            content:'标签',
            size:'large'
            // color:'red'
        }
    },
    {
        name: 'Input',
        type:'Input',
        attr: {
            placeholder:'show me',
            size:'large'
            // icon:'search',
            // iconPosition:'left'
        },
    },
    {
        name: 'ColumnContainer',
        type:'Container',
        attr: {
            style:{
                border:'1px dashed blue',
                minHeight:100,
                minWidth:300,
                display:"flex",
                // flexDirection:"row"
            },
        },
        list: []
    },
    {
        name: 'RowContainer',
        type:'Container',
        attr: {
            style:{
                border:'1px dashed red',
                minWidth:300,
                minHeight:100,
                // display:"flex",
                // flexDirection:"row"
            },
        },
        list: []
    },
    {
        name: 'Layout',
        type:'Container',
        attr: {
            style:{
                border:'1px dashed green',
                // flexDirection:"row"
            },
        },
        list: [
            {
                name: 'Head',
                type:'Container',
                attr: {
                    style:{
                        border:'1px dashed red',
                        minWidth:300,
                        minHeight:100,
                        // display:"flex",
                        // flexDirection:"row"
                    },
                },
                list: [] 
            },
            {
                name: 'Content',
                type:'Container',
                attr: {
                    style:{
                        border:'1px dashed blue',
                        minWidth:300,
                        minHeight:100,
                        display:"flex",
                        // flexDirection:"row"
                    },
                },
                list: [
                    {
                        name: 'LeftContent',
                        type:'Container',
                        attr: {
                            style:{
                                border:'1px dashed yellow',
                                minWidth:300,
                                minHeight:100,
                                display:"flex",
                                // flexDirection:"row"
                            },
                        },
                        list: [
                            
        
                        ] 
                    },
                    {
                        name: 'RightContent',
                        type:'Container',
                        attr: {
                            style:{
                                border:'1px dashed yellow',
                                minWidth:300,
                                minHeight:100,
                                display:"flex",
                                // flexDirection:"row"
                            },
                        },
                        list: [
                            
        
                        ] 
                    },

                ] 
            },

        ]
    },
    {
        name:'Divider',
        type:'Divider',
        attr: {}
    },
    {
        name:'MenuExampleProps',
        type:'MenuExampleProps',
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
        type:'CardExampleImageCard',
        attr: {}
    },
    {
        name:'MessageExampleMessage',
        type:'MessageExampleMessage',
        attr: {

        }
    }
]

function NewDrag() {
  const [list, setList] = useState([
    {
      id: 1,
      name: "shrek",
      type:"Header",
      attr:{as:'h2',content:'h2'},
    },
    {
        id: 2,
        name: "fiona",
        type:"Header",
        attr:{as:'h3',content:'h3'},
    },
    {
        id:3,
        name:'hello',
        type:"Container",
        attr: {},
        list: [
            {
                id: 31,
                name: "shrek",
                type:"Header",
                attr:{as:'h2',content:'h2'},
              },
              {
                  id: 32,
                  name: "fiona",
                  type:"Header",
                  attr:{as:'h3',content:'h3'},
              }, 
        ]
    } 

  ]);
  return (
    <div>
      <h2>组件</h2>
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

      <h2>容器</h2>
      <ReactSortable
        list={list}
        setList={setList}
        group="groupName"
        style={{  background: "#73a74c" }}
      >
        {list.map((item, index) => {
          if (item.type === "Container") {
            return (
              <NewDrag2
                key={item.id}
                {...item}
                indexs={[index]}
                setList={setList}
                style={item.attr.style}
              />
            );
          }
          const ComponentInfo = GlobalComponent[item.type]
          console.log(ComponentInfo)
          return <div key={item.id}><ComponentInfo {...item.attr} /></div>
        })}
      </ReactSortable>
      <button
        onClick={() => {
          console.log(list);
          console.log(GlobalComponent)
        }}
      >
        print
      </button>
    </div>
  );
}

function NewDrag2(props) {
  const { id, indexs,style,list, setList } = props;
  const ref = useRef(Color());
  return (
    <div key={id} >
      <ReactSortable
        key={id}
        group="groupName"
        list={list}
        setList={currentList => {
          setList(sourceList => {
            const tempList = [...sourceList];
            const _indexs = [...indexs];
            const lastIndex = _indexs.pop();
            const lastArr = _indexs.reduce(
              (arr, i) => arr[i]["list"],
              tempList
            );
            lastArr[lastIndex]["list"] = currentList;
            return tempList;
          });
        }}
        style={{  background: ref.current,...style}}
      >
        {list.map((m, index) => {
          if (m.type === "Container") {
            return (
              <NewDrag2
                key={m.id}
                {...m}
                indexs={[...indexs, index]}
                setList={setList}
                style={m.attr.style}
              />
            );
          }
          const ComponentInfo = GlobalComponent[m.type]
          return <div key={m.id}><ComponentInfo {...m.attr} /></div>
        })}
      </ReactSortable>
    </div>
  );
}

function Color() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ",0.8)";
}

export default NewDrag;
