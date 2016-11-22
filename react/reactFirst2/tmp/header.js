var Header = React.createClass({
	render:function(){
		return (
			<header>
				<h3>头部</h3>
			</header>
		)
		
	}
})
ReactDOM.render(
	<Header />,
	document.getElementById('header')
)