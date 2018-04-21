import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';

import Logo from '../../../components/Logo/Logo';
import classes from './Toolbar.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;