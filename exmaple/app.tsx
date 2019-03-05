import 'core-js/es6/map';
import 'core-js/es6/set';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Button from '../src';
// import Button from '../bin/index'; // 编译之后的组件
// import '../bin/index.css'; // 编译之后的组件样式
/* tslint:disable */
// const Button = require('../lib/').default; 
// require('../lib/index.css');
/* tslint:disable */
interface HelloProps {
    compiler: string;
    framework: string;
}

const App = (props: HelloProps) => (
    <div className="con">
        <Button Type="black" Text="按钮" />
        <Button Type="gray" Text="按钮" />
        <Button Type="white" Text="按钮" />
        <Button Type="orange" Text="按钮" />
        <Button Type="red" Text="按钮" />
        <Button Type="blue" Text="按钮" />
        <Button Type="rosy" Text="按钮" />
        <Button Type="green" Text="按钮" />
        <Button Type="pink" Text="按钮" />
    </div>
);

ReactDOM.render(
    <App compiler="TypeScript" framework="React" />,
    document.getElementById('root')
);
