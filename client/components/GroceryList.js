import React from 'react';
import GroceryItem from './GroceryItem';
import { connect } from 'react-redux';
import { toggleGrocery } from '../store';

const GroceryList = (props) => {
	console.log('groceries', props.groceries);
	return (
		<ul>
			{props.groceries.map((grocery) => (
				<GroceryItem
					key={grocery.id}
					id={grocery.id}
					{...grocery}
					onClick={() => props.toggleGrocery(grocery.id)}
				/>
			))}
		</ul>
	);
};

const mapStateToProps = (state) => {
	const showBought = state.groceries.filter((grocery) => grocery.bought);
	const showActive = state.groceries.filter((grocery) => !grocery.bought);

	const filterFunc = function(state, groceries) {
		if (state.visiFilter === 'SHOW_BOUGHT') {
			return showBought;
		} else if (state.visiFilter === 'SHOW_ACTIVE') {
			return showActive;
		} else {
			return state.groceries;
		}
	};

	return {
		groceries: filterFunc(state, state.groceries)
	};
};

const mapDispatchToProps = (dispatch) => ({
	toggleGrocery: (id) => dispatch(toggleGrocery(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroceryList);
