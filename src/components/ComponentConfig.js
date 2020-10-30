import React, { useState } from 'react';
import _ from 'lodash';
import { Input,Select,Button } from 'semantic-ui-react'
import { itemUpdateInfo, itemRemove, itemCopy } from '../utils/utils';

const Config = props => {

  const {
    componentConfig
  } = props;

  const config = componentConfig;

  /**
   * @description 配置项的渲染组件
   * @param {*} data 该配置项的数据结构
   */
  const renderConfig = (data, type) => {
    if (JSON.stringify(data) !== '[]' && data) {
      return data.map((item, index) => {
        return (
          <div header={item.text} key={item.text}>
            <div key={index}>
              {/* <div>
              <h3>{item.text}</h3>
            </div> */}
              <div>
                {item.children.map((item, index) => {
                  return <div key={index}>{renderValue(item, type)}</div>;
                })}
              </div>
            </div>
          </div>
        );
      });
    }
  };

  /**
   * @description render函数，渲染配置项
   */
  const renderValue = (
    { text: title, field: value, type, data },
    propsType,
  ) => {
    let valueInfo =
      propsType === 'props' ? config.propsInfo : config.nodePropsInfo;
    if (propsType === 'props') {
      if (value.indexOf('.') != -1) {
        const valuearr = value.split('.');
        valuearr.map((item, index) => {
          if (index == valuearr.length - 1) {
            valueInfo = valueInfo[item];
          } else {
            valueInfo = valueInfo[item];
          }
        });
      } else {
        valueInfo = valueInfo[value];
      }
    } else {
      // reactnodeinofo;
      // 特殊处理,key,只有.的参数
      const valuearr = value.split('.');
      const key = valuearr[0];
      const params = valuearr[1];
      valueInfo = valueInfo[key].params[params];
    }
    if (type === 'string') {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{title}</span>
          <Input
            placeholder={valueInfo}
            style={{ width: '50%' }}
            onChange={e => console.log(e)}
          />
        </div>
      );
    }
    if (type === 'array') {
      // if(typeof valueInfo !== 'string') {
      //   valueInfo = '' + valueInfo;
      // }
      // console.log('v', valueInfo);
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{title}</span>
          <Select placeholder='Select your country' options={valueInfo} />
        </div>
      );
    }
  };


  return (
    <div>
      <Button  icon="copy" size="small">
        复制组件
      </Button>
      <Button icon="delete" size="small">
        删除组件
      </Button>
        <Button  icon="edit" size="small">
          生成模版
      </Button>
        {renderConfig(config.propsConfig, 'props')}
    </div>
  );
};

export default Config;

