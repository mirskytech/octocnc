// @flow

import React from 'react';
import { Link } from 'react-router';
import {Segment, Menu, Grid} from 'semantic-ui-react';

type Props = {
    children: Element<any>
};

const logoStyle = {
    'width': '175px',
    'marginBottom': '-11px',
    'marginTop':'-8px'
};

export default class App extends React.Component {

    handleItemClick() {
        console.log('has been clicked');
    }


    render() {

        let activeItem = "dash";

        return (
                <div className="ui twelve column centered grid">
                    <div className="twelve wide column">
                    <Menu inverted>
                        <Menu.Item>
                            <img src={'/plugin/octocnc/static/' + 'imgs/octocnc-logo.svg'} style={logoStyle}/>
                        </Menu.Item>
                        <Menu.Item name='Dash' active={activeItem === 'dash'}>
                            <Link to="dash">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item name='B' active={activeItem === 'b'} onClick={this.handleItemClick} />
                        <Menu.Item name='C' active={activeItem === 'c'} onClick={this.handleItemClick} />
                    </Menu>

                    <Segment>
                        {this.props.children}
                    </Segment>
                    </div>
                </div>
        );
    }
}

