import React, { useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Grid,Button,Icon,Container, Header, Label,Input,Divider,Form} from 'semantic-ui-react'
import MenuExampleProps from './MenuExampleProps'
import CardExampleImageCard from './CardExampleImageCard'
import MessageExampleMessage from './MessageExampleMessage'
import { useForm,Controller } from 'react-hook-form';
import Select from "react-select";
import ReactDatGui from './ReactDatGui'
import ComponentList from './ComponentList'
import Config from './ComponentConfig'

import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css';
// 主题风格
import 'codemirror/theme/solarized.css';
// 代码模式，clike是包含java,c++等模式的
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
import 'codemirror/mode/django/django';
//ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint.js';
//代码高亮
import 'codemirror/addon/selection/active-line';
//折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/edit/closebrackets';


const GlobalComponent = {
    Button,
    Label,
    Header,
    Input,
    Divider,
    Container,
    MenuExampleProps,
    CardExampleImageCard,
    MessageExampleMessage,
    DIV:"div"
}
const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const soundData = [
    {
      name:'DIV',
      type:"DIV",
      attr:{
        style:{
          border:'1px dashed blue',
          minHeight:100,
          minWidth:300,
          // flexDirection:"row"
        },
        className:'column'
      }
    },
    {
        name: 'Button',
        type: 'Button',
        attr: {
            content:'按钮',
            color:'blue',
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
            className:'column'
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
            className:'row'
        },
        className:'grid',
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
          head:'haa',
          content:'wuwu'
        }
    }
]

function codeView(list){
  const Handlebars = require("handlebars");
  let source =
  `
  import React, \{ Component \} from 'react';
  import \{ {{# each componentlists}}{{this}},{{/each}} Grid\}

  function App()=>{

    return(
      <>
        {{# each list}}
          <{{type}} {{{flatattr attr}}}>
            {{# each list}}
               <{{this.type}} {{{flatattr this.attr}}}>
                 
               </{{this.type}}>
            {{/each}}
          </{{type}}>
        {{/each}}
      </>
    )
  }

  export default App;
  `
  Handlebars.registerHelper("flatattr",function(obj){
    let res = ''
    let res_style = ''
    Object.getOwnPropertyNames(obj).forEach(function(key){
      console.log(key+ '---'+obj[key])
      if(key=="style"){
        Object.getOwnPropertyNames(obj[key]).forEach(function(item){
          res_style += item+":'"+obj[key][item]+"',"
        })
        res+="style={{"+res_style+"}} "
      }else{
        res += key+'='+'"'+obj[key]+'" '
      }
    })
    return res
  })

  Handlebars.registerHelper("addOne",function(index,option){
    return parseInt(index)+1;
  })

  Handlebars.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
  })

  Handlebars.registerHelper('set',function(list){
    let res = []
    list.forEach(function(item){
      res.push(item.type)
    })
    console.log(list)

    return new Set(res)
  })

  let result = [];
  list.forEach(function(item){
    result.push(item.type)
  })
  let componentlists = [...new Set(result)]

  const template = Handlebars.compile(source);
  console.log(template({list,componentlists}));
  return template({list,componentlists})
}

function NewDrag() {
  const [value,setValue]=useState('sm')
  const [code,setCode] = useState('<h1>I ♥ react-codemirror2sss</h1>')
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
    },
  ]);

  const { control, handleSubmit} = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Grid >
        <Grid.Column width={2}>
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
          <ComponentList />
        </Grid.Column>

        <Grid.Column width={7}>
          <h2>容器</h2>
          <ReactSortable
            list={list}
            setList={setList}
            group="groupName"
            style={{  background: "#73a74c" }}
          >
            {list.map((item, index) => {
              console.log(list)
              if (item.type === "Container"||item.type ==="Row"||item.type ==="Column"||item.type ==="Grid") {
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
              // console.log(ComponentInfo)
              return <div key={item.id} className={item.className} ><ComponentInfo {...item.attr} /></div>
            })}
          </ReactSortable>
        </Grid.Column>

        <Grid.Column width={7}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Header as="h2">first name</Header>
          <Controller
            as={Input}
            name="firstName"
            control={control}
            defaultValue=""
          />
          <Header as="h2">last name</Header>
          <Controller
            as={Input}
            name="lastName"
            control={control}
            defaultValue=""
          />
          <Controller
            name="iceCreamType"
            as={Select}
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" }
            ]}
            control={control}
            rules={{ required: true }}
          />
            <input type="submit" />
          </form>
        </Grid.Column>
      </Grid>
      <div>
          <button
            onClick={() => {
              console.log(list);
              console.log(GlobalComponent)
              setCode(()=>codeView(list))
            }}
          >
            print
          </button>
          <CodeMirror
            value= {code}
            options={{
              mode: {name:'django'},
              theme: 'solarized dark',
              autofocus:true,//自动获取焦点
              styleActiveLine:true,//光标代码高亮
              lineNumbers: true, //显示行号
              smartIndent:true,  //自动缩进
              //start-设置支持代码折叠
              lineWrapping:true,
              foldGutter:true,
              gutters:['CodeMirror-linenumbers','CodeMirror-foldgutter'],//end
            }}
            onChange={(editor, data, value) => {
              // console.log(value)
              setCode(value)
              console.log(editor.getValue())
              // console.log(value)
            }}
          />
      </div>
    </div>
  );
}

function NewDrag2(props) {
  console.log(props)
  const { id, indexs,style,className,list, setList } = props;
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
            console.log(lastArr)
            return tempList;
          });
        }}
        style={{  background: ref.current,...style}}
        className={className}
      >
        {list.map((m, index) => {
          // console.log(m)
          console.log(list)
          if (m.type === "Container"||m.type ==="Row"||m.type ==="Column"||m.type ==="Grid") {
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
          return <div key={m.id} className={m.className} ><ComponentInfo {...m.attr} /></div>
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
