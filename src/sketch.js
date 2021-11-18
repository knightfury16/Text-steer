//Text steering with two Scene

let stop = false;

//For scene 1
let target1 = [];
let _text1 = "Hi!There!";
let fontSize1 = 200;
let sw1 = 7;

//For scene 2
let target2 = [];
let _text2 = "Welcome";
let fontSize2 = 200;
let sw2 = 7;

let b = [];
let pt;
let play = true;
let transition = false;
let count = 1;

let temp1;
let temp2;


//Loading font
function preload() {
    font = loadFont('Roboto-Regular.ttf');
}


function setup() {

    let cnv = createCanvas(700, 400);
    utility.clickStop(cnv);
    colorMode(HSB);

    changeInput1();
    changeInput2();
    let p = createP("Press space for transition.");
    let p2 = createP("Hover over the text.");

    // if (fontSize1 < 100) {
    //     console.log("Reduce the text length");
    //     halt();
    // }

    temp1 = getFontSize(_text1);
    temp2 = getFontSize(_text2);

    //Text of the scenes, needed some work to do here.
    // textToPoints(), p5 method returns array of points outlining the text.
    points1 = font.textToPoints(_text1, 10, 250, temp1.fontSize);
    points2 = font.textToPoints(_text2, 10, 250, temp2.fontSize);



    //Making the targent objects for scene 1
    for (let i = 0; i < points1.length; i++) {
        target1[i] = new Target(points1[i].x, points1[i].y);
        b[i] = new Vehicle(target1[i], temp1.strokeWgt);

    }

    //Making the target objects for scene 2
    for (let i = 0; i < points2.length; i++) {
        target2[i] = new Target(points2[i].x, points2[i].y);
    }

}

function halt() {
    noLoop();
}


// keycode 32 is 'space'
function keyTyped() {
    if (keyCode === 32) transition = true;
}

function draw() {
    if (stop) { halt(); }
    background(0);



    //If space is pressed transition is true, target for the appropiate scene is pushed into the b array.
    // TODO: Try to do it with async 
    if (transition) {

        if (count % 2) {
            for (let i = 0; i < target2.length; i++) {
                b[i] = new Vehicle(target2[i], temp2.strokeWgt);
            }
            //Removing the leftover from the previous scene
            b.splice(points2.length, b.length - points2.length);

        } else {
            for (let i = 0; i < target1.length; i++) {
                b[i] = new Vehicle(target1[i], temp1.strokeWgt);
            }
            // Removing the leftover from the previous scene
            b.splice(points1.length, b.length - points1.length);
        }

        transition = false;

        count++;

        // console.log(count);

    }


    for (let i = 0; i < b.length; i++) {
        b[i].update();
        b[i].arrive();
        b[i].flee();
        b[i].show();
    }
}



function changeInput1() {
    let inp = createInput(_text1);
    inp.parent(select("#inp1"));
    inp.size = 200;

    let button1 = createButton("Change");
    button1.parent(select("#inp1"));


    button1.mouseClicked(() => {
        _text1 = inp.value();
        temp1 = getFontSize(_text1)
        points1 = font.textToPoints(_text1, 10, 250, temp1.fontSize);

        for (let i = 0; i < points1.length; i++) {
            target1[i] = new Target(points1[i].x, points1[i].y);
            b[i] = new Vehicle(target1[i], temp1.strokeWgt);

        }

        b.splice(points1.length, b.length - points1.length);

        count++;

        transition = false;


    });

}

function changeInput2() {
    let inp2 = createInput(_text2);
    inp2.parent(select("#inp2"));
    inp2.size = 200;

    let button2 = createButton("Change 2");
    button2.parent(select("#inp2"));

    button2.mouseClicked(() => {
        _text2 = inp2.value();
        temp2 = getFontSize(_text2);
        points2 = font.textToPoints(_text2, 10, 250, temp2.fontSize);
        for (let i = 0; i < points2.length; i++) {
            target2[i] = new Target(points2[i].x, points2[i].y);
            b[i] = new Vehicle(target2[i], temp2.strokeWgt);

        }

        b.splice(points2.length, b.length - points2.length);

        count++;

        transition = false;

    });

}


function getFontSize(_text, sw = 10) {
    let fs = 300;
    while (1) {
        let temp = font.textBounds(_text, 10, 250, fs);

        if (temp.x + temp.w > 675) {
            fs--;
            if (fs % 30 == 0) sw--;
        } else {
            break;
        }
    }

    let obj = {
        fontSize: fs,
        strokeWgt: sw
    }

    return obj;
}