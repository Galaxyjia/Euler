import React from 'react';
import { ReactSortable } from "react-sortablejs";
import _ from 'lodash';
import componentList from '../pages/config';

const renderComponent = data => {
  return data.map(item => {
    return (
      <React.Fragment >
        <div key={item.name}><span>{item.name}</span></div>
      </React.Fragment>
    );
  });
};

// 遍历属性配置
export default function ComponentList() {
  return (
    <ReactSortable
        group={{ name: "groupName", pull: "clone",put:false}}
        sort={false}
        animation={200}
        delayOnTouchStart={true}
        delay={2}
        list={componentList}
        setList={()=>console.log('组件')}
    >
    {
      renderComponent(componentList)
    }
    </ReactSortable>
  );
}
