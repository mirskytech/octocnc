// @flow

        import React from 'react';
        import { Link } from 'react-router';
        import { Segment, Menu } from 'semantic-ui-react';

        type Props = {
            children: Element<any>
        }

        const logo_style = {
            size: '12px'
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
                                    <h1>OctoCNC</h1>
                                    <h5 className="italic">powered by OctoPrint</h5>
                                </Menu.Item>
                                <Menu.Item name='Dash' active={activeItem === 'dash'}>
                                    <Link to="/">Dashboard</Link>
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

