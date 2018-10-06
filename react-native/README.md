# React Native

## Notes from Udemy Course (The Complete React Native and Redux Course)
Github repo: https://github.com/StephenGrider/ReactNativeReduxCasts

### Getting Started - Section 1 - 9. Setup + Albums App
1. Install dependencies per operating system (lots of setup here)
    - Different on each operating system
    - Windows (Android)
        - [Java jdk (sdk)](http://www.oracle.com/technetwork/java/javase/downloads/index.html) - prerequisite for running android apps of any type
            - In lectures, he used version 8
        - [Node.js](https://nodejs.org/en/) (latest version)
            - Useful for bundling js code & package management (npm)
        - [Python v2](https://www.python.org/getit/) (not v3)
        - [Android studio](https://developer.android.com/studio/) & sdk tools
            - install studio, sdk, and emulator
            - critical: write down link to SDK during setup
        - [react native command line tools](https://www.npmjs.com/package/react-native-cli)
            - for: generating new project + test projects inside android simulator
            - `npm install -g react-native-cli`
                - for use with android studio emulator, different than use with `expo`.
            - create new project with `react-native init <project-name>`
            - **Note**: react-native > v0.55.4 is buggy, and having lots of problems when running `react-native init`. To fix, run with old version - `react-native init <project-name> --version react-native@0.55.4`
                - see SO question: https://stackoverflow.com/questions/51178688/error-creating-new-react-native-project
                - another question: https://stackoverflow.com/questions/48756550/unable-to-resolve-module-accessibilityinfo-when-trying-to-create-release-bund
        - When I installed everything, I hit this error:
            - https://software.intel.com/android/articles/installation-instructions-for-intel-hardware-accelerated-execution-manager-windows
        - To open the project in Android Studio, find where your project was installed, open up the main project folder, then open the `android` directory - in Android Studio
            - May see initial error about Gradle compile, or `Failed to sync Gradle project 'android' - Cause: failed to find target with hash string 'android-23' in C:\...`
                - Make sure you click `Install missing platform(s) and sync project`
                - This will download and install Android SDK Platform 23
            - May still see error `Failed to sync Gradle project 'android' - failed to find Build Tools revision 23.0.1`
                - Make sure you click `Install Build Tools 23.0.1 and sync project`
                - This will download and install Android SDK Build-Tools 23.0.1
            - If you also see a `Android Gradle plugin update recommended` reminder, just click `Don't remind me again for this project`. **NOTE**: I needed to upgrade gradle (see last step), so maybe this step is not recommended.
                - The message also might read `To take advantage of all the latest features (such as Instant Run), improvements and security fixes, we strongly recommend that you update the Android Gradle plugin to version 3.1.3 and Gradle to version 4.4.`
        - Create an Android Emulator
            - First, go to `Tools` -> `AVD Manager` (may be under `Android` menu)
            - Click `Create Virtual Device`
            - Recommended to choose a device with screen size around 5 inches - we're going with `Nexus 5`
            - Select system image
                - As of August 2018, we have to start with API level 26 minimum
                - Class uses API level 23, so hopefully 26 works!
            - Click `Next`, then `finish`
            - Click the play button (`>`) to start up the emulator
                - If you're hitting an error `Emulator: emulator: ERROR: x86 emulation currently requires hardware acceleration!`
                - Check if Intel x86 emulator accelerator (HAXM installer) has been downloaded
                    - `Tools` -> `SDK Manager`. `Appearance & Behavior` -> `System Settings` -> `Android SDK` -> `SDK Tools` -> `Intel x86 Emulator Accelerator (HAXM installer)`
                    - If it is checked and says `Installed` this just means it was at least downloaded, but may not be installed yet.
                    - To install, go to the Android SDK location (probably `C:\Users\<username>\AppData\Local\Android\Sdk\extras\intel\Hardware_Accelerated_Execution_Manager`) and the installer is called `intelhaxm-android.exe`. Install this and try again. 
        - Add environment variables
            - Go to `Start` - type `system` - click `View Advanced System Settings`
            - Go to `Advanced` tab, click `Environment Variables`
            - In `User variables...` add:
                - Variable name: `JAVA_HOME`
                - Variable value: `C:\Program Files\Java\jdk-<version>`
            - In `User Variables...`, edit `Path` and add `platform-tools`:
                - Add directory `C:\Users\<username>\AppData\Local\Android\Sdk\platform-tools`
        - DONE! Now to start your app, cd into your react-native app and type `react-native run-android`
        - **Note**: If you're still running into errors such as `Could not determine java version from '10.0.2'`, try upgrading Gradle when you open your project - when prompted with `Android Gradle plugin update recommended`, click `Update`. I also had to install Build Tools 27.
        - **Note 2**: To get to the development menu in the app, press `Ctrl + M`. Also to refresh the app, double-tap `R`
        - **Note 3**: Potentially useful troubleshooting article: https://rallycoding.com/blog/troubleshooting-react-native-startup/

1. Install ESLint depending on code editor (optional, but recommended)
    - Includes instructions for atom & Sublime, but i'm using vscode
    - VsCode
        - Install eslint package globally - `npm install -g eslint`
        - Install `eslint` extension
        - Install ruleset eslint will actually use
            - `npm install --save-dev eslint-config-rallycoding`
            - Sometimes you may get an error here - try running `npm install` once, then going back to installing this package
        - Make new file in project directory called `.eslintrc`
            - tell `eslint` we want to use the `rallycoding` ruleset with `{"extends": "rallycoding"}`

1. Generate a React Native project
1. Get coding (App - album list)
    - difference between `react` and `react-native` libraries
        - `React`: Knows how a component should behave, knows how to take a bunch of components and make them work together
        - `React Native`: Knows how to take the output from a component and place it on the screen, provides default, primitive core components (image, `<Text>`)
    - before actually 'getting coding', plan out the components you will use, and try to make lots of reusable ones.
    - Primitive components that come directly from `react-native`:
        - `Text` component is used to basic text
            - useful props: `style` for styling (like css styles)
        - `View` component is a component for styling `Text` or other components inside
            - makes positioning easier
            - useful props: `style` for styling
            - also can be used to group sibling components - like Fragment
        - `Image` component is used for images
            - needs `source` prop (like HTML `src`), with object with `uri` property. Example: `{uri: https://i.imgur.com/...}`
            - works similar to HTML tag, but don't forget to tell image tag exactly how big it should be! Doesn't automatically fill available space
            - **Note**: If, for example, you want an Image to span the entire width of its container, use styles `flex: 1, width: null`. Also set a `height` to whatever you want the height to be.
    - `Flex Box` is used for positioning to container elements in react-native!
        - `justifyContent` - aligns content in **vertical direction** (except in 1 case - if you use `flexDirection`)
            - `'flex-end'` - pushes text to bottom, `'center'` - center (vertically), `'flex-start'` - top of the container (basic default behavior), `'space-between'` - maximize space between elements, `'space-around'` - similar to 'space-between' but also adds spacing above first and below last element.
        - `alignItems` - position in **horizontal direction**
            - `'flex-end'` - far right hand side, `'center'` - center, `'flex-start'` - left side of container (default)
        - `flexDirection` - row (horizontal) or column (vertical) (determines where `justifyContent` applies)
    - making http requests
    - Lifecycle methods
        - `componentWIllMount()` - executed as soon as the component gets rendered to the screen. according to this class, this is a great place to run any http requests
    - remote js debugging
        - Get to debug menu (android = Ctrl + 'M')
        - If you see an error on the emulator "Unable to connect with remote debugger" try some solutions from stack overflow: https://stackoverflow.com/questions/40898934/unable-to-connect-with-remote-debugger
        - Open developer tools (chrome?)
    - http requests
        - if having trouble with axios, consult this: https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/questions/1924782
    - Scrolling - straightforward, but different than React (not on by default)
        - First, find the jsx components you expect to be scrollable
        - Second, import component `ScrollView` (from `react-native`), and wrap content with that component.
        - always add this style to your *root* element:
            - `Flex: 1` - says "please expand component to fill entire content area of the device
            - **Note**: may not be necessary in android dev
    - `Buttons` in the [documentation](https://facebook.github.io/react-native/) are under `Touchable<Something...>` like [TouchableOpacity](https://facebook.github.io/react-native/docs/touchableopacity)
        - to handle a user press / click, add prop `onPress: {<function>}`
    - [Linking](https://facebook.github.io/react-native/docs/linking) to other mobile apps
        - `import { Linking } from 'react-native'`
        - `Linking.openURL(<url>)`
        - This can be passed into a `Touchable<something>` like this: `onPress={() => Linking.openURL(<url>)}`
    - App Wrapup
        - This app should work in IOS and Android
        - Components used: View, Text, Image, TouchableOpacity, Linking
        - Learned about flexbox sizing / positioning

### App 2 - Section 10 - Auth app
- As always, begin with `react-native init auth`
- Goal = super simple app, with just 2 pages (sign in, log out). Will use Firebase to handle authentication.
- Before beginning, figure out what kind of components we will need and maybe guess biggest challenges
    - Components
        - Header
        - Card / Card Section
            - LoginForm (new)
            - Button
            - Spinner of some sort
    - Biggest Challenges
        - Using Firebase to authenticate users of the app
        - Integrating Firebase into React
        - Handling user input & validating user input
        - Give users feedback (spinner) when log in is being verified
- Notes about working with android Studio
    - Updated Build SDK to 26, and Gradle to 4.4 once I found the error mentioned above - `Could not determine java version from '10.0.2'.`.
    - Also had to "Upgrade build tools version and sync project", mentioning something like Gradle 3.1.3 only needs v26, but I have v27 installed or something?
    - **Note**: MAYBE it's best to upgrade Gradle first (to v4.4) before downloading anything else
    - Still running into error `Unable to resolve module ... this might be related to 'https://github.com/facebook/react-native/issues/4968'`
        - I went to the issue, and they recommended clearning `node_modules` then running `npm install` again, so I tried that.
    - AGAIN found this issue I mentioned before:
        - **Note**: react-native > v0.55.4 is buggy, and having lots of problems when running `react-native init`. To fix, run with old version - `react-native init <project-name> --version react-native@0.55.4`
            - see SO question: https://stackoverflow.com/questions/51178688/error-creating-new-react-native-project
            - another question: https://stackoverflow.com/questions/48756550/unable-to-resolve-module-accessibilityinfo-when-trying-to-create-release-bund
        - Still had to upgrade Gradle to 4.4
            - Then found `The specified Android SDK Build Tools version (23.0.1) is ignored, as it is below the minimum supported version (27.0.3) for Android Gradle Plugin 3.1.3. Android SDK Build Tools 27.0.3 will be used. To suppress this warning, remove "buildToolsVersion '23.0.1'" from your build.gradle file, as each version of the Android Gradle Plugin now has a default version of the build tools. Update Build Tools version and sync project` - clicked "Update"
            - That solved everything - for now :D
- installed `eslint` following steps from app #1 (it didn't work well this time)
- can `import` a component and `export` it in the same line by doing `export * from './<component dir>` :D
    - **Note**: if you do this, your components cannot be exported with `export default <component name>`
    - instead, you have to export like an object: `export { ComponentName: ComponentName }`, which can be reduced to `export { ComponentName }` in es6
- Firebase auth integration
    - `npm install --save firebase` must be run with administrator mode (I'm using Cmder - just had to do Ctrl + T (new tab), then check "Run as administrator")
    - Setup in react native app (in lecture):
        - `import firebase from 'firebase'` above other imported local components (not sure why)
        - in `componentWillMount() {...}`, copy / paste the Web Setup code from Auth -> Web Setup in firebase console (basically, create `config` obj & call pass to `firebase.initializeApp()`)
        - using `import firebase from 'firebase'` caused a bit error on my emulator: `Objects are not valid as a React child (found: object with keys {$$typeof, type, key, ref, props, _owner, _store}). If you meant to render a collection of children, use an array instead.` (then some weird `ReactNativeRenderer-dev.js` stacks)
        - instead, I followed the answer to this SO question: https://stackoverflow.com/questions/50555275/react-native-objects-are-not-valid-as-a-react-child-found-object-with-keys
            - Multiple solutions worked for me (`require("firebase"`... and `import firebase from '@firebase/app'`...))
- Using basic `react-native` element for text inputs - `TextInput`.
    - By default, they don't have height & width! (note from video - in android, it seems like it does have default width & height)
- Finally, just build out the rest of the app, nothing huge to worry about / learn


### App 3 - Section 11-16 - Tech Stack app (Redux, Animations)
- Goals:
    - How to use Redux with React Native
    - How to render a list of elements in a performant conscious (efficient) manner.
    - Animation API
        - When a user tabs an app label, a nice smooth animation happens, showing up the notes.
- Process
    - Create initial app
        - AGAIN, react-native > v0.55.4 is buggy, and having lots of problems when running `react-native init`. To fix, run with old version - `react-native init <project-name> --version react-native@0.55.4`
    - `npm install --save redux react-redux` to get redux setup to work with React
    - set up redux in App.js (not index? idk why)
    - Now getting error:
        - `FAILURE: Build failed with an exception.`
        - `What went wrong: Could not determine java version from '10.0.2'`
        - NOTE1: I may not have opened the 'tech-stack' project in Android Studio, then completed Gradle updates :\ ALWAYS OPEN YOUR ACTIVE PROJECT FIRST DUH
        - Note2: Before doing Note1, I upgraded Android studio from 3.1 to 3.2 - hopefully this won't break / change anything
        - After the upgrade (Note2), clicked `install build tools 28.0.2 and sync project` directly from status bar at the bottom of Android Studio
        - Saw error "Failed to find build tools revision 28.0.2"
        - Then, followed [This SO question](https://stackoverflow.com/questions/52518826/facing-an-error-when-running-my-android-app-on-an-emulator) and added the line `google()` in the `build.gradle` file (`Module: app`).
        Next, clicked "Update Build Tools version and sync project"
            - Seems this was the error after upgrading to Android Studio 3.2
            - Now it runs fine on the emulator ;)
        - Also tried fixing another "warning" about `complile` not being used in the future, change to `implementation`.
            - in `build.gradle` (`Module: app`), scroll down to the `dependencies` block and change all of the lines with the first word `compile` - change `compile` to `implementation`.
            - Succeeded first try.
- New stuff
    - Rendering lists of data
        - Before, we've usually looked at an array of objects, and just using `.map()` to instantly create components for every object.
        - This is "ok" for website that will display most data at the same time / have lots of power from nice computers.
        - For mobile devices, this is bad because often lots of the components will not be displayed on the screen, therefore wasting memory.
        - `list view`s from `react-native` can help with this. It figures out which items are visible, and only creates components for those items. It only creates components that will fit on the screen, and swaps out data when a component goes off the screen / a new one comes on screen.
            - Component name: `FlatList`
                - Props:
                - `data` - (what array to render)
                - `renderItem` - custom function that will render items
                - `keyExtractor` - custome function that tells `FlatList` how to generate keys on each component


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
