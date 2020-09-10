import React from 'react';
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl }) => (
	<a className={`${size} menu-item`} href={`/${linkUrl}`}>
		<div className="background-image" style={{
			backgroundImage: `url(${imageUrl})`
		}}/>
		<div className='content'>
			<h1 className='title'>{title.toUpperCase()}</h1>
			<span className='subtitle'>SHOP NOW</span>
		</div>
	</a>
);

export default MenuItem;
