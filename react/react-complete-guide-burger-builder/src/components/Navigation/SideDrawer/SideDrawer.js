import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    let attachedClasses = [ classes.SideDrawer ];
    attachedClasses.push(
        props.open ? classes.Open : classes.Close
    );

    return (
        <Auxiliary>
            <Backdrop
                show={props.open}
                clicked={props.closed}
            />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;