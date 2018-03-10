# Smart_bups
A small project showcasing genetic algorithms.

## How does it work:
There are small creatures called "bups", and their goal is to reach the yellow circle. They can jump a limited amount of times, after which they will be evaluated based on their distance to the goal. They will then create a new generation of bups, using genes randomly (although better performing bups have a higher chance to be chosen). The original population is killed off (except for the best bup) and the process repeats.

The indicators on top show you the statistics. **Fitness** increases the closer a bup gets to the goal. As soon as a bup reaches the goal, its fitness is increased massively. However, the fitness can be increased even more by reaching the goal faster (this is the **time** indicator). 

Note that not every simulation will reach the end. Sometimes the RNG is so bad that the genetic algorithm can't win. If fitness seems to be stuck after a couple hundred generations, refreshing might help.
Don't forget that you can click anywhere to enable **fastmode**, this drastically speeds up the process. Click again to turn it off. 

There are three color modes: 
* random color (easier to distinguish between bups)
* color based on distance 
* color based on amount of jumps left (default)

Feel free to pick the one you like at the bottom of the file bup.js.

## How to run
It is possible to [run this script in your browser](https://winnie334.github.io/smart_bups/). If you want to change the code however,
download or clone the repo, and open **index.html**. Alternatively you can host a local server to run it on. It should work straight away.
If not, please report the bug so I can do absolutely nothing whatsoever to fix it.

## I found a bug / want to add a feature!
Feel free to report any bugs you encounter as an issue, however I can't promise to look at it. If you want to add a feature, go ahead and fork this repo. Most likely I won't accept any pull requests, although I'd be more than glad to link to your repo from this readme.
