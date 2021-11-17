class Bubble{
    constructor(target)
    {
        this.pos = createVector(random(width),random(height));
        // this.pos = createVector(x,y);
        this.target = target.pos;
        // this.vel = createVector(0,0);
        this.vel = p5.Vector.random2D().mult(5) ;
        this.acc = createVector(0,0);
        this.maxSpeed = 6;
        this.maxForce = 2;

    }

    flee()
    {
        let mouse = createVector(mouseX,mouseY);

        let fleeVel = p5.Vector.sub(this.pos,mouse);
        let dis = fleeVel.mag();
        fleeVel.setMag(this.maxSpeed);


        let fleeSteer = p5.Vector.sub(fleeVel,this.vel);
       
        if(dis < 100){
            fleeSteer.limit(15);
            this.applyForce(fleeSteer);
        }

    }

    // seek()
    // {
    //     let desiredVel = p5.Vector.sub(this.target,this.pos);
    //     let dis = desiredVel.mag();
    //     let speed = this.maxSpeed;

    //     if(dis < 100)
    //     {
    //         // speed *= (dis/100);
    //         speed = map(dis,0,100,0,this.maxSpeed);
    //     }

    //     desiredVel.setMag(speed); 

    //     this.applyForce(desiredVel);

    //     // desiredVel.setMag(this.maxSpeed);

    //     // let steer = p5.Vector.sub(desiredVel,this.vel);
    //     // steer.limit(this.maxForce);

            
    //     // console.log(magnitude);
    //     // console.log(seekForce.mag());
        
    // }


    arrive()
    {
        let desiredVel = p5.Vector.sub(this.target,this.pos);
        // console.log(other.pos);
        let dis = desiredVel.mag();
        let speed = this.maxSpeed;

        if(dis < 100){
            speed = map(dis,0,100,0,this.maxSpeed);
        }

        desiredVel.setMag(speed);

        let steer = p5.Vector.sub(desiredVel,this.vel);
        steer.limit(this.maxForce);

            
        // console.log(magnitude);
        // console.log(seekForce.mag());
        
        this.applyForce(steer);
    }



    applyForce(force)
    {
        this.acc.add(force);
    }


    transitioning()
    {
        this.vel = p5.Vector.random2D().mult(5);
        this.pos.add(this.vel);
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