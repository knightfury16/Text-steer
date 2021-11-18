//Text steering with two Scene

let stop = false;

//For scene 1
let text1 = [];
let target1 = [];
//For scene 2
let text2 = [];
let target2 = [];

let b = [];
let pt;
let play = true;
let transition = false;
let count = 1;


//Loading font
function preload(){
    font = loadFont('Roboto-Regular.ttf');
}


function setup()
{
    createCanvas(700,400);
    colorMode(HSB);

    //Text of the scenes, needed some work to do here.
    //TODO: Make it interective with DOM element
    // textToPoints(), p5 method returns array of points outlining the text.
    points1 = font.textToPoints("Hi,There!",10,250,170);
    points2 = font.textToPoints("Welcome!",20,250,150);


    //Making the targent objects for scene 1
    for(let i = 0; i < points1.length; i++)
    {
        stroke(255);
        strokeWeight(7);
        target1[i] = new Target(points1[i].x,points1[i].y);
    }

    //Making the target objects for scene 2
    for(let i = 0; i < points2.length; i++){
        stroke(255);
        strokeWeight(7);
        target2[i] = new Target(points2[i].x,points2[i].y);
    }

    //For the initial scene
    for(let i = 0; i < target1.length; i++)
    {
        //Do something
        b[i] = new Vehicle(target1[i]);
    }

}

function halt(){
    noLoop();
}


// keycode 32 is 'space'
function keyTyped()
{
    if(keyCode === 32)transition = true;
}

function draw()
{
    if(stop){halt();}
    background(0);

    //If space is pressed transition is true, target for the appropiate scene is pushed into the b array.
    // TODO: Try to do it with async 
    if(transition){   

        if(count%2)
        {
            for(let i = 0; i < target2.length; i++)
            {
                b[i] = new Vehicle(target2[i]);
            }
            //Removing the leftover from the previous scene
            b.splice(target2.length,b.length - target2.length);

        }
        else
        {
            for(let i = 0; i < target1.length; i++)
            {
                b[i] = new Vehicle(target1[i]);
            }
            // Removing the leftover from the previous scene
            b.splice(target1.length,b.length - target1.length);
        }
         
        transition = false;

        count++;

    }


    for(let i = 0; i < b.length; i++)
    {
        b[i].update();
        b[i].arrive();
        b[i].flee();
        b[i].show();
    }


}

