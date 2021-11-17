
let stop = false;
let text1 = [];
let text2 = [];
let text3 = [];
let b = [];
let pt;
let play = true;
let target1 = [];
let target2 = [];
let transition = false;
let count = 1;
function preload(){
    font = loadFont('Roboto-Regular.ttf');
}


// function mousePressed(){
//   if(play){noLoop();play = false;}
//   else{
//     loop();
//     play = true;
//   }
// }

function setup()
{
    createCanvas(700,400);
    colorMode(HSB);
    // background(0);

    points1 = font.textToPoints("Hi,There!",10,250,170);
    points2 = font.textToPoints("Welcome!",20,250,150);


    // pt = new Bubble(300,200,5);
    for(let i = 0; i < points1.length; i++)
    {
        stroke(255);
        strokeWeight(7);
        target1[i] = new Target(points1[i].x,points1[i].y);
        // point(points1[i].x,points1[i].y);
    }

    for(let i = 0; i < points2.length; i++){
        stroke(255);
        strokeWeight(7);
        // point(points2[i].x,points2[i].y)
        target2[i] = new Target(points2[i].x,points2[i].y);
    }
    for(let i = 0; i < target1.length; i++)
    {
        //Do something
        b[i] = new Bubble(target1[i]);
    }

}

function halt(){
    noLoop();
}

function keyTyped()
{
    if(keyCode === 32)transition = true;
}

function draw()
{
    if(stop){halt();}
    // stop = true;
    background(0);

    if(transition){   

        if(count%2)
        {
            for(let i = 0; i < target2.length; i++)
            {
                //Do something
                b[i] = new Bubble(target2[i]);
            }
            b.splice(target2.length,b.length - target2.length);

        }
        else
        {
            for(let i = 0; i < target1.length; i++)
            {
                //Do something
                b[i] = new Bubble(target1[i]);
            }
            b.splice(target1.length,b.length - target1.length);


        }
         
        transition = false;

        count++;

    }



    for(let i = 0; i < b.length; i++)
    {
        //Do something
        b[i].update();
        b[i].arrive();
        b[i].flee();
        b[i].show();
    }


    // pt.update();
    // // pt.seek();
    // pt.arrive();
    // pt.show();

    // for(let i = 0; i < b.length; i++){
    //     b[i].update();
    //     // b[i].seek();
    //     b[i].arrive();
    //     b[i].flee();
    //     b[i].show();
    // }


    // stop = true;


}


def find_possible_collisions(particles):
            # implements the sort and sweep algorithm for broad phase
            # helpful reference: https://github.com/mattleibow/jitterphysics/wiki/Sweep-and-Prune
            axis_list = sorted(particles, key=lambda x: x.get_left()[0])
            active_list = []
            possible_collisions = set()
            for particle in axis_list:
                to_remove = [p for p in active_list if particle.get_left()[0] > p.get_right()[0]]
                for r in to_remove:
                    active_list.remove(r)
                for other_particle in active_list:
                    possible_collisions.add((particle, other_particle))

                active_list.append(particle)
            
            return possible_collisions