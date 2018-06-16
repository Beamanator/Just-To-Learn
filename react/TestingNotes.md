## Introduction to create-react-app React apps
Note: not extensive course, just an intro for our specific setup.

## Tools for testing React apps
- Test Runner
    - Testing Utilities
- responsible for executing tests and provides Validation Library
    - tests don't run in browser, they run in node.js
    - "Simulates" the React App (mounts components, allows you to dig into the DOM)
- [Jest](https://facebook.github.io/jest/docs/en/getting-started.html)
    - React Test Utils (not recommended anymore)
    - [Enzyme](https://www.npmjs.com/package/enzyme) (more useful, and recommended by React)
        - For Enzyme, we also need to install `react-test-renderer` and `enzyme-adapter-react-16`, for our version of React

## What to test vs what NOT to test
- Don't test
    - Libraries
    - React or Redux / redux store
    - These are libraries that were already tested by developers
    - Don't test too complex connections (like passing props on)
- DO test
    - Code that YOU wrote
    - Test data you you received via props, leading to different results being rendered
    - Isolated Units (reducer function, component functions)
        - Remember that functional components only depend on the props they receive :)
    - Conditional outputs, like if props are true / false
- Good things to think about:
    - What are the crucial things that change, depending on external influences
        - Ex: props that influence what gets rendered
    - Overall, best to test 'units' of code, not complex workflows involving button clicks, http requests, multiple component interactions. Read some other articles / take other classes on tests if you want to learn more.

## Writing our first tests
- Functional component
    - Start by creating a file right next to the component you want to test
    - Create a file named `<ComponentName>.test.js`
        - create-react-app will run test files with `.test.js` at the end, when we run a special test command
    - `describe(description, testFunction)` (jest function)
        - Ex: `describe('<NavigationItems />', () => {...})`
    - `it(description, );` (jest function)
        - Allows you to write one individual test
        - Ex: `it('should render 2 navItems if not authenticated')`
    - `import { configure, shallow } from 'enzyme'`
        - `shallow` allows enzyme to render a component in a shallow way - not rendering the content of any sub-component
    - `import Adapter from 'enzyme-adapter-react-16'`
    - `configure({ adapter: new Adapter() })` -> configure enzyme
    - Import the component you want to test, and render it with `shallow(<ComponentName />)`
    - [`expect()`](https://facebook.github.io/jest/docs/en/expect.html) (jest function)
        - tell test what you expect to find
        - example: `expect(wrapper.find(SumComponent)).toHaveLength(2)`, which expects there to be 2 elements SubComponent rendered
- Testing containers
    - If connected to redux, we don't want to test that connection. That's all Redux, which has been tested before, we can just pass our container props.
    - To strip out the `connect` function, just export the class definition as well, and import that into that named export into the test file. (see `BurgerBuilder.test.js`)
    - from here, test the same as components
- Testing Redux
    - Often we only test reducers, which don't have much data manipulation code (if we follow that theory), so the tests should be nice and easy.
- Running the test(s)
        - docs here for [`.toHaveLength()`](https://facebook.github.io/jest/docs/en/expect.html#tohavelengthnumber)
    - run `npm test`
        - **Note**: teacher mentions "in case you get a blocking error at this point, **Delete the App.test.js** file and run it again.
    - remember `Ctrl + J` in visual code opens the integrated terminal