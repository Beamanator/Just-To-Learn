### Planning a React App (as mentioned in `README.md`)
1) Component Tree / Component Structure
1) Application State (Data)
    - Ex: ingredients of a burger app (what needs to render & what user needs to pay in the end)
1) Components vs Containers
    - Stateless (functional / dumb) vs Stateful (`class` - manage state)

### Planning phase steps
1) What's the name / goal?
    - Burger Builder
    - Goal = users can add ingredients to build a burger
1) Think about basic design
    - Navigation bar at the top
        - Builder, Orders, Logo
    - Burger Page
        - Picture of Burger (with ingredients) - dynamic!
        - Price (text)
        - Control to add ingredients
            - Meat
            - Salad
            - Cheese
        - Plus / Minus to edit ingredients
        - Checkout button (to buy Burger)
    - Component Tree
        - App (could be implemented as the Layout Component, but we'll make a new Layout component just to have a component solely focusing on the layout - maybe in the future we want to add some state to App, or conditionally change the layout - as examples)
        - Layout Component
            - Toolbar (dynamic - mobile friendly)
                - Think about DrawerToggle
                - Logo
                - NavigationItems
            - SideDrawer
                - Logo
                - NavigationItems
            - Backdrop
                - mostly just holds JSX code
            - {props.children} (dynamic - page routing)
                - BurgerBuilder
                    - BuildControls (ingredient buttons)
                        - list of BuildControl components
                        - OrderButton
                    - Burger (preview of burger)
                        - list of Ingredient components
                        - BurgerPrice
                    - Modal (checkout preview)
                        - {props.children} (dynamic - reusable elsewhere in app)
                - (other, later)
    - State! (important for stateless vs stateful components)
        - ingredients `{meat: 1, cheese: 2, ...}`
        - purchased (`true` or `false`)
        - totalPrice (`10.43`)
        - Where to manage state? `App`? No, probably in `BurgerBuilder` app because these states only affect `BurgerBuilder` page, not the entire `App`. Therefore, `BurgerBuilder` should be Stateful.
    - PureComponent & thinking about `shouldComponentUpdate` methods, we'll think about this later, as we go. Our state is pretty simple, so we probably don't need to worry about these :)

### High-level project steps
1) Create app (`create-react-app <project name>`)
1) Enable css modules (`npm run eject` -> after committing everything in github)
1) Add some folders to project structure under `src` folder
    - `components` will hold stateless / functional components
    - `containers` directory will hold statefull components
    - `hoc` will hold Higher Order Components
    - `assets` will be used later
1) Create shells for `App` & `Layout` components (and `Auxiliary`)
1) Begin `BurgerBuilder` and minimal styes for `Layout`
1) Create BurgerIngredient component w/ styling, then create Burger & hook everything up
1) Make `BurgerIngredient`s dynamic
1) Calculate ingredient sum dynamically, show warning when there are no ingredients!
1) Add in burger builder controls (don't let count go < 0, disable 'less' when 0)
1) Add price, then "order now" button & connect modal / backdrop
1) work on Toolbar / side drawer / navigation