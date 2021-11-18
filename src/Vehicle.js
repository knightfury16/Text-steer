class Vehicle{
    constructor(target)
    {
        this.pos = createVector(random(width),random(height));
        // this.pos = createVector(x,y);
        this.target = target.pos;
        // this.vel = createVector(0,0);
        this.vel = p5.Vector.random2D().mult(5) ;
        this.acc = createVector(0,0);
       
        //Both these variables control the speed by which the particle reach their desired target/destination.
        this.maxSpeed = 6; //How big the steps will be
        this.maxForce = 2; //How fast the steps will be 

    }

    flee()
    {
        let mouse = createVector(mouseX,mouseY);

        // fleeVel vector from mouse towards position, that is a vector opposite the mouse pointer
        let fleeVel = p5.Vector.sub(this.pos,mouse);
        let dis = fleeVel.mag();
        // Setting the fleeVel vector magnitude
        fleeVel.setMag(this.maxSpeed);

        // vector from particle vector towards fleeVel vector
        let fleeSteer = p5.Vector.sub(fleeVel,this.vel);
       
        // if distance from mouse pointer to particle is less than 100(arbitary),apply the fleeSteer force
        if(dis < 100){
            fleeSteer.limit(15);
            this.applyForce(fleeSteer);
        }

    }

    arrive()
    {
        //DesireVel is vector from particle position towards targets position.
        let desiredVel = p5.Vector.sub(this.target,this.pos);

        let dis = desiredVel.mag();
        let speed = this.maxSpeed;

        //Mapping the speed of desireVel based on the distance of particle from the target.
        //Chossing arbitary distance of 100
        if(dis < 100){
            speed = map(dis,0,100,0,this.maxSpeed);
        }

        //Setting the desiredVel speed
        desiredVel.setMag(speed);

        //steer is vector from particle velocity vector towards desired velocity vector.
        //Can't just go directly towards the desired velocity, otherwise particle end up revolving around the target.Centrigual force.
        let steer = p5.Vector.sub(desiredVel,this.vel);
        steer.limit(this.maxForce);

        this.applyForce(steer);
    }



    applyForce(force)
    {
        this.acc.add(force);
    }


    update()
    {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0,0);
    }

    show()
    {
        strokeWeight(7);
        if(dist(this.target.x,this.target.y,this.pos.x,this.pos.y) < 0.1){
            stroke(random(0,255),random(0,255),random(0,255));
         }
         else stroke(255);
        fill(255);
        point(this.pos.x,this.pos.y);
    }

}