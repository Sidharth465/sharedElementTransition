# My Android App

## Overview

This is an Android application with multiple build flavors to support different environments: development (`dev`), staging (`sid`), and production (`prod`). Each flavor has a unique `applicationId`, version name suffix, and app name.

## Build Flavors

The app uses Gradle product flavors to generate different versions of the app. The configuration is defined in `app/build.gradle`.

### Flavor Configuration

````gradle
namespace "com.sharedelementtransition"

flavorDimensions "default"

productFlavors {
     dev {
            dimension "default"
            applicationIdSuffix ".dev"
            versionNameSuffix '-dev'
            resValue "string", "build_config_package", "@string/app_name"
        }
        mistral {
            dimension "default"
            applicationIdSuffix ".mistral"
            versionNameSuffix '-mistral'
            resValue "string", "build_config_package", "@string/app_name"
        }


        prod {
            dimension "default"
            resValue "string", "build_config_package", "@string/app_name"
        }
}# My Android App



### Tips for Your `README.md`

- **Customize the App Name**: Replace `MyApp`, `MyApp Dev`, etc., with your actual app name.
- **Add Context**: If `sid` stands for something specific (e.g., “Staging ID”), clarify it in the description.
- **Link to Documentation**: If your project has additional setup steps (e.g., API keys for different flavors), link to relevant docs or sections.
- **Use Tables for Clarity**: If you have many flavors or complex configurations, consider a table:
  ```markdown
  | Flavor | Application ID                     | Version Name Suffix | App Name  |
  | ------ | ---------------------------------- | ------------------- | --------- |
  | dev    | com.sharedelementtransition.dev    | -dev                | MyApp Dev |
  | sid    | com.sharedelementtransition.mistal | -mistal             | MyApp SID |
  | prod   | com.sharedelementtransition        |                     | MyApp     |
  ```
````
