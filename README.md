# [Shafin Ahmed](https://www.linkedin.com/in/shafinahmed)
## How to run: 
There are several ways to view the demo. This repo is being hosted **[here.](https://shafinmahmed.github.io/vention-test)** Alternatively, you can download the repo and host it locally with [VSCode Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
## Notes:
To run a new test, refresh your window (press F5). 
### Some assumptions:
I was not super sure about a few requirements of the test so I made a few assumptions.  
* Cube B either stays static after the collision or travel with Cube A.

#### Test Scenarios:
From the initial scene, Cube A starts from the left and Cube B starts from the right. Both cube orientations are randomized at the beginning. Based on the colors of the two colliding faces, the following scenarios take place (ordered by priority):
1. If Cube A's colliding face is the same color as Cube B's colliding face, they both disappear.
1. If Cube A collides with Cube B's black face, it disappears.
1. If Cube A collides with Cube B's red face, it stops.
1. If Cube A collides with Cube B's blue face, it reverses direction.
1. If Cube A collides with Cube B's green face, it doubles its speed (same direction)
1. If Cube A collides with Cube B's yellow face, it reverses direction and halves its speed.
1. If Cube A collides with Cube B's purple face, the direction of travel is randomized.

#### Remarks:
Until I received the attachment in my email and opened to read it, I had never heard of three.js. It's been a fun 48 hours trying to figure out how to find my way around to figure out what I wanted to do. If you find my code to be below par, that's okay! I have absolute confidence in my skills and my ability to achieve mastery at anything I want to - so I know I'll get better.
