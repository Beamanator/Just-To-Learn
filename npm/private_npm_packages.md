## Github packages:

-   getting started / intro: https://help.github.com/en/packages/publishing-and-managing-packages/about-github-packages
-   configuring npm: https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages

## GitLab packages:

-   npm registry:
    -   getting started docs: https://docs.gitlab.com/ee/user/packages/npm_registry/index.html
    -   YouTube demo: https://www.youtube.com/watch?v=yvLxtkvsFDA

## Example: React Native Library

Attempt #1:

1. Use [`create-react-library`](https://github.com/transitive-bullshit/create-react-library)
    - Name: `just-a-lib`
1. Add `react-native` to the base directory, just to have a component available there
1. Delete standard `example` folder (this is just a React folder)
1. Run `npx react-native init example`
    - This will create a react-native basic example inside the library folder you created in step 1

Kept running into errors where the example project couldn't find my source component :/
