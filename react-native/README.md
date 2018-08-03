# React Native

## Notes from Udemy Course (The Complete React Native and Redux Course)
Github repo: https://github.com/StephenGrider/ReactNativeReduxCasts
### Getting Started
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
            - Note: react-native > v0.55.4 is buggy, and having lots of problems when running `react-native init`. To fix, run with old version - `react-native init <project-name> --version react-native@0.55.4`
                - see SO question: https://stackoverflow.com/questions/51178688/error-creating-new-react-native-project
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
1. Get coding
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
