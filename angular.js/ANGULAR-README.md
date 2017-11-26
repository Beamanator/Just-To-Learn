# ANGULAR Tips & Tricks

1) $scope.digest() / $scope.apply()
2) When using ng-repeat in html, if you're looping through an array with potentially duplicate entries (like this: [1,1,2,2,2]), you must make sure angular uses some property other than each value as a unique element.
    - See this SO Answer: https://stackoverflow.com/questions/16296670/angular-ng-repeat-error-duplicates-in-a-repeater-are-not-allowed#answer-17246507
    - One way to fix: add "track by $index" to html ng-repeat statement