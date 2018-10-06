## Basic info
Look at `animations-sample` project for examples :)

## Multiple ways for animations:
- Using css transitions and animations (nothing to do with React)
    - definitely performant and are often great options for animations.
    - Limitations:
        - elements are *always* in the DOM, even if they're not visible.
            - If you want to add / remove an element from the DOM (on button click, for example) you can animate the intro, but not the exit since React's render doesn't take those timings (transitions / animations) into consideration
        - May not be good for accessibility
        - Not the React way

## Some useful external libraries for React animations:
- [React Transition Group](https://reactcommunity.org/react-transition-group/)
    - `npm install react-transition-group --save`