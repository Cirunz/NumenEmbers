# NumenEmbers
Little web application for Numenera Character sheet stats.

This is just a little web application made in html and javascript + jquery. 
It's usable from any device, but I designed it mostly with mobile browsers in mind, without specifica framework though:
my primary goal was to keep it simple and lightweight.

It help keep track of changes in character stats for pen & paper role play game Numenera, from Monte Cook Games.
Because of the Numenera inner mechanism, there is a lot of erase and rewrite on the character sheet during a play session: 
character's main three stats (Might, Speed and Intellect) keep goind up and down, 
as the player consume them to make possible to do over the top actions, and than recover them with special "recovery rolls".
After two sessions, my paper character sheet was already worn out, with an hole on the might value 
(the most fluctuant, because it serves as life points too).

So I decided to do this tracker.
It really is very simple: you can set total amount per stat, current value and edge
(a sort of discount on actions made with that stat), reset any or a single value to total, ad or subtract by 1 or 5,
and calculate how to spend to use Effort.
As of today, it save in localStorage your current situation, so there is not a way to keep track of more than one character,
at any given moment.
This is probably the next thing I'm going to add: capability to save more characters.

There are some other things I can add, but really the main focus is to keep it simple and effective. Something I would to add:

- Save more then one character
- Daily recovery roll tracker
- Effort, recovery value and other values from character sheet, just to have all of it in one point.
- Import/Export

A word about licensing: NumenEmbers code, html, js, css and all of it are free for you to use,
at your own discretion AND responsibility. It's a really simple work I've done out of need,
and I have no intention to profit for it.
Feel free to use any part of my code as you want, or to ask me for new features (but I can't garantee on delivery or timing of it..).

Otherwise, Numenera, Numenera logos, Numenera rules and other related material belong to Monte Cook Games LLC, 
and undergo Monte Cook Games LLC licensing policy. More on this on this page:
http://www.numenera.com/fan-use-policy/
