# Thoughts / Issues / Tips on building react-native android apps

## Building app for android

Before building, make sure your `icons` and `launchscreen` is / are setup. Here's a nice [article](https://medium.com/better-programming/react-native-add-app-icons-and-launch-screens-onto-ios-and-android-apps-3bfbc20b7d4c) that explains setup (iOS and android)

-   icons: basically, just make sure you have the `mipmap-*` folders in `android/app/src/main/res`.
-   launch screen: First, look more [here](https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae) (linked in the previous article I mentioned)
    -   Note: I haven't looked at these long, they just seem useful

Duplicate resources ( mentioning `/android/app/src/main/res/...` ):

> [drawable-mdpi-v4/src_assets_icons_mapicons_stores] D:\Github\my-proj\android\app\src\main\res\drawable-mdpi\src_assets_icons_mapicons_stores.png [drawable-mdpi-v4/src_assets_icons_mapicons_stores] D:\Github\my-proj\android\app\build\generated\res\react\release\drawable-mdpi\src_assets_icons_mapicons_stores.png: Error: Duplicate resources
> [drawable-mdpi-v4/src_assets_icons_mapicons_swimming] D:\Github\my-proj\android\app\src\main\res\drawable-mdpi\src_assets_icons_mapicons_swimming.png [drawable-mdpi-v4/src_assets_icons_mapicons_swimming] D:\Github\my-proj\android\app\build\generated\res\react\release\drawable-mdpi\src_assets_icons_mapicons_swimming.png: Error: Duplicate resources
> [drawable-mdpi-v4/src_assets_icons_mapicons_tours] D:\Github\my-proj\android\app\src\main\res\drawable-mdpi\src_assets_icons_mapicons_tours.png [drawable-mdpi-v4/src_assets_icons_mapicons_tours] D:\Github\my-proj\android\app\build\generated\res\react\release\drawable-mdpi\src_assets_icons_mapicons_tours.png: Error: Duplicate resources

-   Solution was to delete those files from `android/app/src/main/res/...` (not deleting the whole file!)
    -   Note: SO far the duplicates have only come from `.../res/drawable-*` and `.../res/raw`
-   https://stackoverflow.com/a/57975287/2430414
    ```
    rm -rf ./android/app/src/main/res/drawable-*
    rm -rf ./android/app/src/main/res/raw
    ```

Make sure you update the version number in `android/app/build.gradle`

Make sure you have the correct keystore file (place it in `android/app/my-release-key.keystore`) - check gmail and / or slack for the latest keystore file

-   In `android/gradle.properties` add settings pointing to release store settings:
    ```
    MYAPP_RELEASE_STORE_FILE=my-release-key.keystore # <- here, make sure the name matches your keystore filename!
    MYAPP_RELEASE_KEY_ALIAS=my-key-alias
    MYAPP_RELEASE_STORE_PASSWORD=<your-password>
    MYAPP_RELEASE_KEY_PASSWORD=<your-password>
    ```
-   In `android/app/build.gradle` do the following:
    1. Add this in the `signingConfigs` section:
        ```
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
        ```
    2. In `buildTypes` - `release` make sure your `signingConfig` points to the `release` config you added above.
        - Like this: `signingConfig signingConfigs.release`

Generating release apk: https://reactnative.dev/docs/signed-apk-android#generating-the-release-apk

```
$ cd android
$ ./gradlew bundleRelease
```

-> shorthand:

`$ cd android && ./gradlew bundleRelease && cd ..`

Successful build should be output in `android/app/build/outputs/bundle/release/app.aab` (mentioned in [react native docs](https://facebook.github.io/react-native/docs/signed-apk-android))

Log in to google play for publishing: https://play.google.com/apps/publish/

When you're creating a Beta release for the first time, you will probably have to generate a private, encrypted signing key and upload to Google Play Store

-   https://developer.android.com/studio/publish/app-signing

Create a Beta test build if you want users to test and give feedback before publishing to store

-   You can send users the beta url so they can sign up without you sending to direct email addresses
-   Note: Once you upload the `.aab`, you might hit an error which should be able to be solved here: [How To Enable Google Play App Signing](https://stackoverflow.com/questions/44103024/how-to-enable-google-play-app-signing)
-   Note: When attempting you very initial test (on the very first builds, after finishing all "Store presence" / "Store listing" items), it still may take a few days before users can test the app with an opt-in url [mentioned here](https://support.google.com/googleplay/thread/12354058?hl=en)
    -   To get the opt-in url, `The opt-in link only shows when an app is "Published." Apps in "Draft" or "Pending publication" won't show the opt-in link.` [link](https://support.google.com/googleplay/android-developer/answer/3131213)
-   Note: Users must have a Google / G-suite account to join any tests: https://support.google.com/googleplay/android-developer/answer/3131213?hl=en

## Errors when building android on old(er) device

Error: ` Failed to install the app. Please accept all necessary Android SDK licenses using Android SDK Manager: "$ANDROID_HOME/tools/bin/sdkmanager --licenses".`

-   Solved by following some steps here, updating and accepting licenses: https://developer.android.com/studio/intro/update.html#sdk-manager

## Important commands to remember

-   Bundling the app before running on device (not exactly sure why, but have to do this ANY TIME a change is made)
    -   `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`

## Rename android react-native proj

Sometimes you may do `npx creact-react-native-app my-app` and later you'll want to rename your app from `my-app` to something like `Pizza Party`! How do we do this? I mainly followed [this SO](https://stackoverflow.com/a/37390022/2430414) question, plus I had a few more changes I made:

Files in `android` directory

-   In: `android/app/src/main/java/MY/APP/NEW_ID/MainActivity.java`:
    -   `package MY.APP.NEW_ID;`
-   In `android/app/src/main/java/MY/APP/NEW_ID/MainApplication.java`:
    -   `package MY.APP.NEW_ID;`
-   In `android/app/src/main/AndroidManifest.xml`:
    -   `package="MY.APP.NEW_ID"`
-   And in `android/app/build.gradle`:
    -   `applicationId "MY.APP.NEW_ID"`
-   (Optional) In `android/app/BUCK`:
    ```
    android_build_config(
      package="MY.APP.NEW_ID"
    )
    android_resource(
      package="MY.APP.NEW_ID"
    )
    ```

Two more comments:

-   **Make sure** your `"name"` property in your main `app.json` file has the same value as the string returned in `android/app/src/main/java/.../MainActivity.java` -> the `getMainComponentName` function.
    -   Otherwise you'll get an error when testing on your device: `"Invariant Violation: "string-you-returned-from-MainActivity.java" has not been registered..."
-   Your app's display name can be changed in `android/app/src/main/res/values/strings.xml`
    -   Here: `<string name="app_name">YOUR-APP-DISPLAY-NAME-ON-DEVICE</string>`

At the end, make sure you re-build everything (see command above), or at least do `cd android && ./gradlew clean && cd ..`

## Android Studio on macos Machine

When first installing Android Studio, it's possible the machine won't connect to your device, and Android Studio doesn't even recognize your device. Here are some steps I had to take to resolve:

1. Download adb (even after moving to `~/Library/Android/sdk` in my terminal, `adb` didn't work, so I had to install it with Homebrew
    - Make sure the device is connected with `adb devices`
1. `File` -> `Sync with file system` to sync with gradle again
    - At this point, I saw an error stating `no value has been specified for this provider`, for one of my libraries `react-native-reanimated`. I searched that error text in the library and found no related issues, so I figured this error was more related to android studio / gradle than to that exact package
    - [This issue](https://github.com/luggit/react-native-config/issues/345) recommended unchecking `Only sync the active variant` in `File` -> `Preferences` -> `Experimental`.
1. Next, Click `"Sync gradle"`...
1. Next error was `You have not accepted the license agreements for the following SDK components...`
    - There were 2 at the time - both relating to Android SDK tools
    - Resolution found [here](https://stackoverflow.com/questions/39760172/you-have-not-accepted-the-license-agreements-of-the-following-sdk-components):
        - `cd ~/Library/Android/sdk/tools/bin/`
        - `./sdkmanager --licenses`
        - Accept all that have not been accepted yet.
1. Sync gradle again, and **boom** everything worked! I could automatically see my device shown in Configurations, and the app built successfully.

## Fonts (adding & removing custom fonts)

There are only a small number of fonts available by default for Android

-   https://www.skcript.com/svr/react-native-fonts/

To add custom fonts, follow this very useful guide: https://medium.com/@mehran.khan/ultimate-guide-to-use-custom-fonts-in-react-native-77fcdf859cf4

**Note**: `npx react-native link` didn't do anything for me, so I had to manually add the font files to `android/app/src/main/assets/fonts` folder (see [this comment](https://github.com/facebook/react-native/issues/25852#issuecomment-612031511))

## After fresh RN 0.61.4 install:

`ActivityCompat` error (cannot resolve symbol) -> in Android Studio

-   Seems error sometimes comes from `react-native-geolocation-service`
-   Solved with `npx jetify`: https://github.com/Agontuk/react-native-geolocation-service/issues/101#issuecomment-532332052
    -   Note: Error mentioning `uses or overrides a deprecated API. Recompile with -Xlint:deprecation for details.` was also solved with `npx jetify`, because this error accompanied a secondary, hidden `ActivityCompat` error. I'm not 100% sure if they're related or not.

> Invariant Violation: "app-name" has not been registered. This can happen if:

    - * Metro (the local dev server) is run from the wrong folder. Check if Metro is running, stop it and restart it in the current project.
    - * A module failed to load due to an error and `AppRegistry.registerComponent` wasn't called.

-   I had tried to rename some instances of `"app-name"` to `"App Name"`, but this is what caused everything to fail. It seems you have to change literally every instance of the lower-case word, but I didn't have the patience - so I reverted and the issue was solved.

When copying project from one folder to another, I ran into error [`Unable to find module with Gradle path`](https://stackoverflow.com/questions/29566006/unable-to-find-module-with-gradle-path-linking-to-library-unspecified-instead#41520567)

-   Followed steps in [this answer](https://stackoverflow.com/a/41520567/2430414) and it was quickly resolved.
    -   Delete `*.iml` files, re-sync gradle (File -> Sync project with Gradle files, Clean, Rebuild)

## Before fresh RN 0.61.4 install:

View details of React-native lots of most recent crash:
adb logcat \*:E

Attempt #1: Not upgrading gradle to 3.4.2

-   can't use "implementation"
-   added multidex in app gradle
-   trying to use no androidx modules
    errors:
-   Process 'command 'D:\Android\Sdk2\build-tools\23.0.1\aapt.exe'' finished with non-zero exit value 1
-   file path too long

Attempt #2: upgrade gradle to 3.4.2

-   duplicate resources in built, merged values.xml file (dunno where to resolve this)

Doing the automatic "Migrate AndroidX" helped, getting me to the multidex

-   cannot find ActivityCompat (also solved by migrating to AndroidX)

final steps to get the app installing (and failing) again:

-   deleted C:/Users/IT/.gradle & ran react-native run-android to re-install
-   Then had to clean & build & npm install
    added android/sdk/tools to PATH

Error library "libjsc.so" not found resolved with this answer:
https://stackoverflow.com/questions/56734877/getting-library-libjsc-so-not-found-after-upgrading-react-native-to-0-60-rc2

Some packages stopped loading, in android studio had to close project, then IMPORT new project, not open existing (something about re-writing some files automatically)

unable to instantiate MainApplication, class not found on path dexpathlist

-   Try [`cd android && ./gradlew clean && cd ..`](https://stackoverflow.com/questions/22399572/java-lang-classnotfoundexception-didnt-find-class-on-path-dexpathlist)

y.proptypes.string caused by old prop-types imported inside "react" pkg, now have to use 'prop-types'

(0,o.StackNavigator) is not a function. solved here: https://stackoverflow.com/questions/53388478/getting-undefined-is-not-a-function-evaluating-0-reactnavigation-stacknaviga

-   a decent amount of refactoring came out of this one

issue with react-native-gesture-handler package (fbjs lib) -> had to npm install fbjs

(0,h.autoRehydrate)

-   had to fix redux-persist

org.gradle.api.GradleException: Could not read path 'D:\Github\my-app\

-   have to disconnect & re-connect cable from phone

linking updated asyncstorage package: https://github.com/react-native-community/async-storage/blob/104bfef9fb50c68ad5ec617b6fec93a6e88fcbe3/docs/Linking.md

Unable to resolve module `react-native-screens`... Module `react-native-screens` does not exist in the Haste module map

-   From `index.android.bundle`, saw a warning recommending checking react-native-screens readme, which mentioned react-native-screens is from react navigation. on the website, said have to `npm install react-native-screens` which worked.

Errors involving `android.support.annotation`, something about `NonNull`

-   Try `npx jetify` - or just `npm install` if you have a script `"postinstall": "jetify"`

Keystore file not found -> add something like `my-release-key.keystore` to `/android/app/` (right in the `app` folder)
