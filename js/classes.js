class Classes {
    constructor(x,y,n) {
        this.x=x;
        this.y=y;
        this.n=n;
        this.r=20;
        this.outputs=new Array(n);
    }
    getX(i) {
        return this.x;
        return this.x+i*(2*this.r+5);
    }
    getY(i) {
        return this.y+i*(2*this.r+5);
    }
    clear() {
        this.outputs.forEach(o=>{
            o=1;
        });
    }
    draw() {
        for (let i=0; i<this.n; i++) {
            ctx.beginPath();
            ctx.moveTo(this.getX(i)+this.r,this.getY(i));
            ctx.arc(this.getX(i),this.getY(i),this.r,0,2*Math.PI);
            var r=s.state=="CLASSIF"?255:Math.floor(255*this.outputs[i]);
            ctx.fillStyle="rgb("+r+","+r+","+r+")";
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.font="32px arial";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.fillStyle=r>128?"black":"white";
            ctx.fillText(""+i,this.getX(i),this.getY(i)+2);
        }
    }
    mouseOver(x,y) {
        for (let i=0; i<this.n; i++) {
            if (Math.hypot(this.getX(i)-x,this.getY(i)-y)<=this.r) {
                return i;
            }
        }
        return -1;
    }
}
