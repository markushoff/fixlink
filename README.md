# fixlink README

There are a lot of coding rules out there that describe what shall not be done and automatic checking tools that check for conformance to these rules. Unfortunately, not all developers have the experience to fix findings in a way that leads to a higher code quality. This extension offers the possibility to attach fix-links to certain problems that when followed can lead to information how to solve a specific problem.

## Features

Links to descriptions how to fix a problem can be added to the menu of the light bulb (as code action).

\!\[feature X\]\(images/feature-x.png\)

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of FixLink
