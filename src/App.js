import React, { Component, Fragment } from 'react';
import { List, Icon, Spin, Row } from 'antd';
import './App.css';

const IconText = ({ type, text, onClick }) => (
  <span onClick={onClick}>
    <Icon type={type} style={{ marginRight: 8, fontSize: 24 }} />
    {text}
  </span>
);

class App extends Component {
  state = {
    posts: null,
    isLoading: true
  };

  componentDidMount = () => {
    fetch('https://next.json-generator.com/api/json/get/NkGzLjtWB')
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        this.setState({ posts: data, isLoading: false });
      });
  };

  renderItem = item => {
    return (
      <List.Item
        key={item.title}
        actions={[
          <IconText
            type="like-o"
            text={item.likesCount}
            onClick={() => {
              console.log('onClick');
            }}
          />
        ]}
      >
        <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
        {item.body}
      </List.Item>
    );
  };

  render() {
    if (this.state.isLoading)
      return (
        <Spin
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%'
          }}
        />
      );

    return (
      <Fragment>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{
            width: 500,
            margin: 'auto'
          }}
        >
          <List
            header={<div>Posts</div>}
            itemLayout="vertical"
            size="large"
            bordered
            dataSource={this.state.posts}
            renderItem={this.renderItem}
          />
        </Row>
      </Fragment>
    );
  }
}

export default App;
