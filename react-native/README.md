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
