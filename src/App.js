import React, { Component } from 'react';
import { List, Icon, Spin } from 'antd';
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
		return (
			<div className="App">
				{this.state.isLoading && <Spin />}
				{!this.state.isLoading && (
					<List
						header={<div>Posts</div>}
						itemLayout="vertical"
						size="large"
						bordered
						dataSource={this.state.posts}
						renderItem={this.renderItem}
					/>
				)}
			</div>
		);
	}
}

export default App;
