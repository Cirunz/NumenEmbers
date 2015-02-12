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