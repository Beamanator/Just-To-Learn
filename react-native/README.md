# React Native

## Notes from Udemy Course (The Complete React Native and Redux Course)
Github repo: https://github.com/StephenGrider/ReactNativeReduxCasts
### Getting Started
1. Install dependencies per operating system (lots of setup here)
    - Different on each operating system
    - Windows (Android)
        - Java jdk (sdk) - prerequisite for running android apps of any type
            - In lectures, use version 8
        - Node.js (latest version)
        - Python v2 (not v3)
        - Android studio download & sdk tools
            - install studio, sdk, and emulator
            - critical: write down link to SDK during setup
        - react native command line tools
            - for: generating new project + test projects inside android simulator
            - `npm install -g react-native-cli`
                - for use with android studio emulator, different than use with `expo`.
            - create new project with `react-native init <project-name>`
            - Note: react-native > v0.55.4 is buggy, and having lots of problems when running `react-native init`. To fix, run with old version - `react-native init <project-name> --version react-native@0.55.4`
1. Install ESLint depending on code editor (optional, but recommended)
1. Generate a React Native project
1. Get coding

## Notes from Youtube Video:
Animation systems (modules) inside React Native (ep 5)
- LayoutAnimation
    - Easy to setup (very simple)
    - Not much control
    - Some things might get animated that we don't want to be
- Animated
    - More complicated to setup, but much more control
    - Probably needed to handle gesture animations

Questions to ask while doing animations: (ep 6)
1. Where is the item on the screen right now? (exact x,y position)
1. Where is the element moving to?
1. Which element are we moving?

Useful React Native Links:
1. Expo - https://expo.io/
1. Nice pre-built react native elements (cards, buttons, etc.): https://github.com/react-native-training/react-native-elements
