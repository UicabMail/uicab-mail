import { Component } from "react";
// import {createContext, Component, Context, ReactNode} from 'react';
// import React from 'react';

// interface ContextInfo {
//     context: Context<any>;
//     data: Map<string, any>;
// }

// const contextMap: WeakMap<Component, ContextInfo> = new WeakMap();

export function provider(constructor: any) {
  // let _exist = contextMap.has(target);
  // let contextInfo = _exist? contextMap.get(target)! : {context: createContext({}), data: new Map()};

  // contextInfo.data[name] = target[name];
  // contextMap.set(target, contextInfo);

  // if(!_exist) {
  //     // target.render = ():ReactNode =>
  //     // {
  //     //     let {Provider} = contextInfo.context;
  //     //     return <Provider value={{contextInfo}} >target.render()</Provider>
  //     // }
  // }

  console.log(new constructor());

  let a = class extends Component {}
  a.prototype = constructor.prototype
  return a



  // let c = createContext({});

  // let a =  function ():ReactNode {
  //     return <div>1{target.render()}</div>
  // }

  // a.bind(React);
  // let _render = target.render.bind(target);

  // let b = class extends Component {
  //   render() {
  //     console.log(1);

  //     return <div>1<a></a></div>;
  //   }
  // };

  // a = b

  // console.log(b);
  

}

export function consumer() {}
