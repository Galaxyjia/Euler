import React from 'react'

export default function Inputs() {
    return (
        <div>
            <div className="ui input">
            <input type="text" placeholder="标准输入框"/> 
            </div>
            <div className="ui focus input">
            <input type="text" placeholder="输入..."></input>
            </div>
            <div className="ui disabled input">
            <input type="text" placeholder="输入..."/> 
            </div>
            <div className="ui transparent input">
            <input type="text" placeholder="输入..."/> 
            </div> 
            <div className="ui mini input">
            <input type="text" placeholder="输入..."/> 
            </div>
            <div className="ui small input">
            <input type="text" placeholder="输入..."/> 
            </div>
        </div>
    )
}
