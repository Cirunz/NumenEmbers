Release 0.1
- First release, all centered on effort calculation

Release 0.2
- Main buttons replaced with +1, -1, +5 e -5. Effort remain only with the dialog, not as quick button.NumenEmbers
- Effort calculation refined:
    Some doubt remain on the formula: Pierluigi says I have to take even the skill value into account.
    However this page seems to indicate the current formula is the right one:
    http://rpg.stackexchange.com/questions/29090/edge-mechanic-of-numenera
- Various bug fixing.

Release 0.3
- Gone the anchors, replaced with actual html buttons.
- Buttons specialized classes in css: button and button-disabled.
- Added disablebutton and enablebutton to manage button states with ease.
- checkdepleting: added controls to enable/disable button in relation to current stat values.
- Gone the alerts (they where temporary anyway): the buttons enabling/disabling do most of the job,
    if the user still manage to click where is not supposed to, nothing happens.
- -5 buttons: if current value is 4 or less, it goes to 0, as for the total in +5 buttons.
- Added tabindex in all input elements.

Release 0.4
- Gone the effort dialog: replaced by a slide down panel, much better for touch usage.
- Gone the jquery ui too: they where there only for the dialog.
- Added a favicon.
- Added footer with copyright disclaimer, taken right from Monte Cook Games site:
    http://www.montecookgames.com/fan-support/fan-use-policy/

Release 0.5
- checkdepleting: depletion is not related to edge and effort anymore.
    Now a value is always considered almost depleted if is 3 or less.
- Added shins section in index.html, with only the current value and +1/-1, +5/-5 buttons.
- Added shins.png and recovery.png.
- Added code to save and load shins current value.
- Added code to manage shins in checkdepleting and all add functions (lower is 0 for shins too).
- Added recovery rolls section in index.html, with fields for recovery bonus and extra actions, and buttons to make roll or reset.
- Added recoveryRolls objetc, to manage all data associated to daily recover rolls.
    Thi object also take care of the single recovery rolls, generating a random number between 1 and 6, added to bonus value,
    and keeping track of the duration for the next recovery roll.
- Added code to manage save and reload of the recovery values.
- Added events for recovery buttons.
- Added showrecoveryresult and hiderecoveryresult, to show a slide panel with the recovery roll dice result.
- Added css classes for recovery rolls controls.
- Minor adjustment to previous css classes.
- Added info-panel div, with relative classes, to show information and tips on page elements.
- Added help-container, that contains anchor to show/hide all info-panel on the page.
    This work well on desktop environment, and is better than tooltips on touch devices.
    Why one button to show them all? because it will be used most on the first time the page is opened,
    and forgotten after (it's like a quick-start guide), so there is no need to fill the page with lot of info buttons.
- Added showinfopanels and hideinfopanels, to manage the information panels.
- Effort expense calculation moved in the new function calculate_effort.
- showeffortpanel: 
    Added code to show preview for the calculated expense of the effort action.
    Added code to disable the ok button when the expense would take the current value below 0.