class Board {
    constructor(x,y,w,h) {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.d=16;
        this.inputs=[];
        this.randomInput();
    }
    randomInput() {
        this.inputs.length=0;
        for (let i=0; i<this.h*this.w; i++) {
            this.inputs.push(getRandom(0,1));
        }
    }
    clear() {
        for (let i=0; i<this.h*this.w; i++) {
            this.inputs[i]=-1;
        }
    }
    draw() {
        for (let i=0; i<this.h; i++) {
            for (let j=0; j<this.w; j++) {
                ctx.beginPath();
                ctx.rect(this.x+j*this.d,this.y+i*this.d,this.d,this.d);
                ctx.stroke();
                var r=255*this.inputs[i*this.w+j];
                ctx.fillStyle="rgb("+r+","+r+","+r+")";
                ctx.fill();
            }
        }
    }
    mouseOver(evt) {
        if (inside(evt.clientX,evt.clientY,this.x,this.y,this.w*this.d,this.h*this.d))
        return true;
    }
    action(evt) {
        for (let i=0; i<this.h; i++) {
            for (let j=0; j<this.w; j++) {
                if (inside(evt.clientX,evt.clientY,this.x+j*this.d,this.y+i*this.d,this.d,this.d)) {
                    for (let k=-1;k<=1;k++) {
                        for (let l=-1;l<=1;l++) {
                            if (inside(j+l,i+k,0,0,this.w-1,this.h-1)) {
                                var v=fourDigits(1-Math.hypot(k,l)/2);
                                if (v>this.inputs[(i+k)*this.w+(j+l)]) {
                                    this.inputs[(i+k)*this.w+(j+l)]=v;
                                }
                            }
                        }
                    }
                    this.inputs[i*this.w+j]=.9999;
                }
            }
        }
    }
}