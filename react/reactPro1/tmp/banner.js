var Banner = React.createClass({
	
	render:function(){
		return(
			<div className="swiper-container">
				<div className="swiper-wrapper">
					<div class="swiper-slide">1</div>
				</div>
			</div>
		)
	}
})
ReactDOM.render(
	<Banner />,
	document.getElementById('banner')
)
