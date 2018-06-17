import React from 'react';

import classes from './PizzaImage.css';
import PizzaImage from '../../assets/pizza.jpg';

const pizzaImage = (props) => {
    return (
        <div className={classes.PizzaImageDiv}>
            <img className={classes.PizzaImg} src={PizzaImage} />
        </div>
    );
}

export default pizzaImage;