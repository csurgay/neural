class Layer {
    constructor(no,x,y,ins,outs,dy) {
        this.no=no;
        this.x=x;
        this.y=y;
        this.ins=ins;
        this.outs=outs;
        this.weight=[];
        this.bias=[];
        this.id=undefined;
        this.od=undefined;
        this.dy=dy;
        this.sx=0;
        this.init();
        this.randomWeight();
        this.randomBias();
        this.ii=[];
        this.oo=[];
        this.randomOrder();
    }

    init() {
        if (this.no==1) this.id=Math.min(20,(window.innerWidth-20)/this.ins.length);
        else this.id=20;
        this.od=20;
        this.dix=(window.innerWidth-this.x)/this.ins.length;
        this.dox=(window.innerWidth-this.x)/this.outs.length;
    }
    randomOrder() {
        this.ii=shuffle(Array.from({length:this.ins.length},(e,i)=>i));
        this.oo=shuffle(Array.from({length:this.outs.length},(e,i)=>i));
    }
    clearBias() {
        for (let i=0; i<this.outs.length; i++) {
            this.bias[i]=0;
        }
    }
    randomBias() {
        this.bias=[];
        for (let i=0; i<this.outs.length; i++) {
            this.bias.push(getRandom(-5,5));
        }
    }
    clearWeight() {
        for (let i=0; i<this.outs.length; i++) {
            for (let j=0; j<this.ins.length; j++) {
                this.weight[i][j]=0;
            }
        }
    }
    randomWeight() {
        this.weight=[];
        for (let i=0; i<this.outs.length; i++) {
            this.weight.push(new Array(this.ins.length));
        }
        for (let i=0; i<this.outs.length; i++) {
            for (let j=0; j<this.ins.length; j++) {
                this.weight[i][j]=getRandom(-1,1);
            }
        }
    }
    setWeights(v) {
        for (let i=0;i<this.ins.length;i++) {
            for (let j=0;j<this.outs.length;j++) {
                if (this.ins[i]>0.5&&j==v) this.weight[j][i]=.9999;
                else if (this.weight[j][i]==0) this.weight[j][i]=-.9999;
            }
        }
    }
    feedForward() {
        for (let i=0; i<this.outs.length; i++) {
            var sum=0;
            for (let j=0; j<this.ins.length; j++) {
                sum += this.weight[i][j] * this.ins[j];
            }
            this.outs[i]=fourDigits(this.sigmoid(sum+this.bias[i]));
        }
    }
    draw() {
        // Weights
        for (let i=0; i<this.ins.length; i++) {
            for (let j=0; j<this.outs.length; j++) {
                ctx.beginPath();
                ctx.moveTo(this.x+this.ii[i]*this.dix,this.y+this.id/2);
                var r=127*(this.weight[this.oo[j]][this.ii[i]]+1);
                ctx.strokeStyle="rgb("+r+","+r+","+r+")";
                ctx.lineTo(this.x+this.oo[j]*this.dox,this.y-this.od/2+this.dy);
                ctx.stroke();
                ctx.strokeStyle="black";
            }
        }
        // Inputs
        if (this.no==1||false) {
            for (let i=0;i<this.ins.length;i++) {
                ctx.beginPath();
                ctx.rect(this.x+i*this.dix-this.id/2,this.y-this.id/2,this.id,this.id);
                var r=255*this.ins[i];
                ctx.fillStyle="rgb("+r+","+r+","+r+")";
                ctx.fill();
                ctx.stroke();
            }
        }
        // Biases and Outputs
        if (this.no==3||true) {
            for (let i=0;i<this.outs.length;i++) {
                ctx.beginPath();
                ctx.rect(this.x+i*this.dox-this.od/2,this.y-this.od/2+this.dy,this.od,this.od);
                var r=25*(this.bias[i]+5);
                ctx.fillStyle="rgb("+r+","+r+","+r+")";
                ctx.fill();
                ctx.beginPath();
                ctx.rect(this.x+i*this.dox-this.od/2,this.y-this.od/2+this.dy,this.od-5,this.od-5);
                var r=255*this.outs[i]+1;
                ctx.fillStyle="rgb("+r+","+r+","+r+")";
                ctx.fill();
            }
        }
    }
    sigmoid(x) {
        return 1-1/(1+Math.pow(Math.E,x));
    }
    mouseOver(evt) {
        for (let i=0;i<this.outs.length;i++) {
            if (inside(evt.clientX,evt.clientY,this.x+i*this.dox-this.od/2,this.y-this.od/2+this.dy,this.od,this.od)) {
                return {"layer":this.no,"output":i};
            }
        }
        return null;
    }
}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
