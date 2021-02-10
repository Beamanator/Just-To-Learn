# Thoughts / Issues / Tips on building react-native iOS apps

## sudo issues

I've read in multiple articles you should **NEVER** do `sudo npm ...` anything. Instead, `node` should have been installed in a way to edit the correct paths.

`Homebrew` caused some issues with me - I even tried uninstalling and reinstalling node, but it kept running into weird permission issues. SO i deleted it :D

Latest attept involves using https://github.com/mklement0/n-install

Some packages / readmes / articles i followed:

-   geolocation: https://github.com/Agontuk/react-native-geolocation-service#ios
-   Adding custom fonts (Ubuntu-bold & Ubuntu specifically):
    -   https://codewithchris.com/common-mistakes-with-adding-custom-fonts-to-your-ios-app/
    -   https://stackoverflow.com/questions/42410354/unrecognized-font-family-on-ios-simulator-with-react-native
    -   https://medium.com/@mehran.khan/ultimate-guide-to-use-custom-fonts-in-react-native-77fcdf859cf4
        -   Very simple and easy to follow

## permission issues

Basically, attempted using https://github.com/react-native-community/react-native-permissions

-   Hit error `Invalid RNPermission X` error which has recommended step: `npx react-native-clean-project --remove-iOS-build --remove-iOS-pods`

## Running on a specific simulator / device from cli

https://reactnative.dev/docs/running-on-simulator-ios

ex: `npx react-native run-ios --simulator "iPhone SE"`

https://stackoverflow.com/questions/38495793/run-react-native-application-on-ios-device-directly-from-command-line

ex: `npx react-native run-ios --device "Max's iPhone"`

## mapbox issues

Internet is sometimes super slow, so running `npm install` (which downloads the mapbox library zip file from `https://mapbox.s3.amazonaws.com/mapbox-gl-native/ios/builds/mapbox-ios-sdk-$VERSION-dynamic.zip` takes over 2 hours)

-   This times out in the terminal, so had to manually download mapbox zip file (from url above), unzip it, and place it in `node_modules/@react-native-mapbox-gl/maps/ios/` (as mentioned in the [ios install directions](https://github.com/react-native-mapbox-gl/maps/blob/master/ios/install.md))

## font issues

Was hitting errors like "unrecognized font ubuntu-bold". Solved this by:

1. dragging fonts into main project in xcode (my project name was `testProj`, so I added the files under `testProj/testProj/fonts` -> So not under `/Libraries`, but under the main project
1. Add the fonts in your `Info.plist` file.
    - Add key "Fonts provided by application"
    - Each value should be the path & name of fonts (since I put all fonts in a `fonts` folder, my fonts were under `/fonts/{file-name}{.file-extension}`
    - Note: I did run into an isssue where `/fonts/` in the front of the name caused issues! So try removing it if doesn't work immediately
1. When I was struggling to get this working, I saw you should add some code in `AppDelegate.m` to make sure the fonts are actually getting loaded into the project:

    ```
    for (NSString* family in [UIFont familyNames])
    {
        NSLog(@"%@", family);

        for (NSString* name in [UIFont fontNamesForFamilyName: family])
        {
            NSLog(@"  %@", name);
        }
    }
    ```

**Note**: I put this code under `- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {` so it was inside that function.

That was all I had to do!

## Images / icons / launch screen

_If you want to create your own icons, Here's a useful website: https://makeappicon.com/. Note: They recommend you start with an icon that is `1536 x 1536 px` in size._

Check out [this article](https://medium.com/better-programming/react-native-add-app-icons-and-launch-screens-onto-ios-and-android-apps-3bfbc20b7d4c)

-   Basically, icons should go in `ios/{proj-name}/Images.xcassets/AppIcon.appiconset/` - make sure you have a `Contents.json` file for the mapping
    -   Common errors:
        -   `The app icon set “AppIcon” has an unassigned child`: [solution in stack overflow](https://stackoverflow.com/questions/35320432/the-app-icon-set-appicon-has-an-unassigned-child)
-   For the splash screen / launch screen, I followed the steps in the above medium article, and i kept hitting the xcode error `"Illegal configuration: launch screens may only have one top level object, which must be a UIView or a kind of UIViewController"`.
    -   The issue was - by default, `UIView` and the image view were on the same level, but you can drag and drop the image view to be a "child" of the `UIView` -> somehow no other tutorials showed that (i think)
    -   Next, added `SplashImage` as "Image" for Image View and made sure it would auto-resize with any screen size by clicking on the top-right menu's ruler icon, then in Autoresizing, select all inner arrows and de-select outer arrows.
    -   Note: You also may have to manually re-size the Image View to be the full width & height of the device preview :)
-   Here's another [medium article](https://medium.com/flawless-app-stories/change-splash-screen-in-ios-app-for-dummies-the-better-way-e385327219e) that was very straightforward

The description in this section isn't completely convincing, probably, mostly because the `LaunchImage.launchimage` pictures didn't end up doing anything - I couldn't figure out how to get those to work. And there may be a blank white screen showing between the splash image & the app loading (which is kinda annoying).

Loading `gif` images:

-   xCode 11 doesn't allow you to add gifs in the Images.xcassets folder.
-   Also, loading a `gif` locally seemed to not space out frames of a gif evenly, skewing the displayed gif.
-   `FastImage` from `react-native-fast-image` is pretty good for solving this, but image must be hosted externally at a url, not locally [see this issue](https://github.com/DylanVann/react-native-fast-image/issues/410).

## Rename ios react-native proj

First I tried just this:

<img width="896" alt="Screen Shot 2020-03-09 at 12 10 00 PM" src="https://user-images.githubusercontent.com/3885503/76203427-488d5c80-61ff-11ea-9046-830882a3034d.png">

-   Renaming Display Name from `app-name` to `App Name`, then to `Full App Name`.
    -   I got a build error, possibly since the bundle identifier also automatically changed from `org.reactjs.native.example.app-name` to `org.reactjs.native.example.Full-App-Name`
    -   After getting lots of errors, I reset everything back as it was (Display name and bundle identifier)
-   Note: Any time I changed the bundle identifier or display name, I Cleaned & Rebuilt the project (in case that would help - not sure if it did).

Finally I found this on the right side of the screen:

<img width="896" alt="Screen Shot 2020-03-09 at 12 51 31 PM" src="https://user-images.githubusercontent.com/3885503/76206626-09faa080-6205-11ea-87a3-a994d6a6c2e2.png">

I think you have to edit Display name & bundle identifier (optional) before changing the name in this section, **then press enter** and you'll confirm changes with the following popup:

<img width="485" alt="Screen Shot 2020-03-09 at 12 51 43 PM" src="https://user-images.githubusercontent.com/3885503/76206628-0c5cfa80-6205-11ea-9f79-68ee1842f843.png">

**Extra notes**:

1. If you change the app's `"name"` in `app.json`, you also have to use the exact same name in `ios/App-Name/AppDelegate.m`
    - Edit `moduleName:@"<your-new-app-name>"` in `didFinishLaunchingWithOptions`
1. I ran into Error `Xcode project scheme is not currently configured for the build action` after renaming the project, then running `npx react-native run-ios`.
    - [To solve](https://stackoverflow.com/a/36092189/2430414), I had to click the app name in the toolbar, then Edit Scheme, then make sure there was an existing test for the app (press `+` if it isn't there)

## Deploying...

If this is your first time deploying the app _ever_ you'll have to make sure you configured a "provisioning profile" in your Apple Developer account. There's a very useful gist that explains these steps [here](https://github.com/rohit120582sharma/Documentation/wiki/React-Native-~-creating-iOS-Provisioning-Steps).

-   Otherwise you may see this error:
-   <img width="559" alt="Screen Shot 2020-05-06 at 2 35 46 PM" src="https://user-images.githubusercontent.com/3885503/81181425-bb6f4580-8fac-11ea-9fdf-5e1910cfdf7a.png">

Common errors:

-   "Signing for `<your-app>` requires a development team..."
    -   Go to yor project's `Signing & Capabilities` tab, and select the "Team" which is associated with your bundle identifier
    -   Xcode should show some errors if the Team you select doesn't own the bundle identifier - in this case, you'll have to create a new one, or make sure you're selecting the correct team.
    -   Also, you probably have to select an "organization", not a person with "(Personal Team)" next to the user
        -   I had to go to Xcode -> Preferences -> Apple IDs -> (click on the new Team "Admin") -> Manage Certificates -> New -> "Apple Distribution Certificate" before this team's "Admin" was selectable in "Signing & Capabilities" dropdown
        -   **Note**: After doing this, I had to sign in to my laptop's keychain (yes, with my laptop password) **MANY** times! Just be aware.
-   "App Store Connect Operation Error" -> "No suitable application records were found. Verify your bundle identifier '<...id>' is correct."
    -   This occurred when I set a Team (in "Signing & Capabilities") that wasn't the correct team for the app! I had to make sure the Team was correct and had a Signing Certificate for the laptop which was submitting the app.

https://readybytes.in/blog/how-to-deploy-a-react-native-ios-app-on-the-app-store

-   Some details about xcode signing is out of date (not most recent version of xcode).
-   Currently waiting in a few places for this error to be resolved: "This request is forbidden for security reasons

> You currently don't have access to this membership resource. To resolve this issue, your team's Account Holder, (Name), must agree to the latest Program License Agreement."

-   Uploading an app to app store connect via xcode: https://help.apple.com/xcode/mac/current/#/dev442d7f2ca
-   If having trouble with "Archiving" - make sure the build destination (see top top - left corner device is "Generic iOS Device")

Some react native invalid bundle items-90474

-   https://medium.com/@tomlarge/react-native-invalid-bundle-ipad-multitasking-support-requires-these-orientations-fix-db00984713d5

Finally, sign in to [App Store Connect](https://appstoreconnect.apple.com/) to finish publishing

-   Note: If you need to upload screenshots of your app, you can do this easily in the simulator!
    -   Here are the simulators you should run for each screen size: https://help.apple.com/app-store-connect/#/devd274dd925
    -   And just press Command + S after clicking on your similator to save a screenshot to your desktop :)

## Build Errors (in XCode)

-   Cycle in dependencies between targets '...' and '...'; building could produce unreliable results
    -   Related SO question: https://stackoverflow.com/questions/52389825/cycle-in-dependencies-between-targets-storeapp-and-notificationcontentextensi
    -   Solution: Just Product -> Clean Build Folder
