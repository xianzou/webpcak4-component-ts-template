import * as React from 'react';
import * as Style from './style/Button.scss';

type TypeContext =
    | 'black'
    | 'gray'
    | 'white'
    | 'orange'
    | 'red'
    | 'blue'
    | 'rosy'
    | 'green'
    | 'pink';

interface TButtonProps {
    Type: TypeContext;
    Text: string;
}

class Button extends React.Component<TButtonProps> {
    public static defaultProps: TButtonProps = {
        Type: 'black',
        Text: '按钮'
    };
    constructor(props: TButtonProps) {
        super(props);
    }
    public render() {
        return (
            <div className={Style.homeComponentRoot}>
                <button className={Style[this.props.Type]}>
                    {this.props.Text}
                </button>
            </div>
        );
    }
}
export default Button;
