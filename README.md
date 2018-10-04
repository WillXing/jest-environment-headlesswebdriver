# jest-environment-headlesswebdriver

### Jest environment with extra options available

This package can use to set jest environment easily and able to configure extra options.

### Jest testEnvironmentOptions

*Example: *
```$json
testEnvironmentOptions: {
    browser: 'chrome',
    chromeArgs: [
        'no-sandbox',
        'headless',
        'disable-gpu',
        '--window-size=1920,1080'
    ],
  },
```

### Options  of Browsers

* chrome
* firefox
* ie
* edge


### Args for Browsers Driver

Check on this [page](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver)



