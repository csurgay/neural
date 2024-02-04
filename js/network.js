class Network {
    constructor(x,y,arrayLayers) {
        this.x=x;
        this.y=y;
        this.l=arrayLayers;
        this.layers=[];
        this.init();
    }
    init() {
        var dy=Math.floor((window.innerHeight-50)/(this.l.length-1));
        for (let i=0; i<this.l.length-1; i++)
            this.layers.push(new Layer(i+1,this.x,this.y+i*dy+15,this.l[i],this.l[i+1],dy));
    }
    clearWeight() {
        this.layers.forEach(l=>{l.clearWeight();})
    }
    randomWeight() {
        this.layers.forEach(l=>{l.randomWeight();})
    }
    clearBias() {
        this.layers.forEach(l=>{l.clearBias();})
    }
    randomBias() {
        this.layers.forEach(l=>{l.randomBias();})
    }
    randomOrder() {
        this.layers.forEach(l=>{l.randomOrder();})
    }
    draw() {
        for (let i=0; i<this.layers.length; i++) {
            this.layers[i].feedForward();
            this.layers[i].draw();
        }
    }
}