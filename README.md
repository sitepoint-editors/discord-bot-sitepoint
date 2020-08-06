# Fork of a basic discord bot setup

This is an implementation of a discord server to perform dice rolling actions for Cypher System games

## Commands

* $help - App help
  * show list of commands
* $d - Custom Roll
  * required: provide a 'die size' to roll
  * optional: bonus with `+` or `-` prefix
  * optional: `#`descriptive text for the roll
* $r - Recovery Roll
  * rolls 1d6 with a minimum output of 1
  * optional: bonus number with `+` or `-` prefix, adds to the roll generated
* $t - Task Roll
  * rolls 1d20 and comapres the outcome versus the `Target Number` which is 3 * `Task Level`
  * required: `Task Level` 1-10
  * optional: bonus with `+` or `-` prefix
  * optional: `#` followed by descriptive text

## output

This system uses the embed feature to provide more stylized elements for better legibility.  
Color Coding of the embed based on the roll exists on each output with varying features.

* Tasks rolls will output any special effects based on the roll (natural 1/17-20)
* Each message will display descriptive text if provided
* Each message will show the `nickname` of the user invoking the command to better determine who actually called for each roll.
* If there are critical formatting problems with the message a direct reply will request the expected changes to allow for a working roll.