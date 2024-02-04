class Button {
    constructor(x,y,w,h,title) {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.title=title;
        this.on=false;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.fillStyle=this.on?"black":"darkgray";
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle=this.on?"white":"black";
        ctx.font="14px arial";
        ctx.fillText(this.title,this.x+this.w/2,this.y+this.h/2);
    }
    mouseOver(x,y) {
        if (inside(x,y,this.x,this.y,this.w,this.h)) {
            return true;
        }
    }
    action(x,y) {
        if (this.title=="debug") {
            this.on=!this.on;
            DEBUG=this.on;
        }
        if (this.title=="run") {
            this.on=!this.on;
            s.newState(this.on?"RUN":"IDLE");
        }
        if (this.title=="clr input") {
            b.clear();
        }
        if (this.title=="rnd input") {
            b.randomInput();
        }
        if (this.title=="clr weight") {
            n.clearWeight();
        }
        if (this.title=="rnd weight") {
            n.randomWeight();
        }
        if (this.title=="clr bias") {
            n.clearBias();
        }
        if (this.title=="rnd bias") {
            n.randomBias();
        }
        if (this.title=="rnd order") {
            n.randomOrder();
        }
        if (this.title=="classif") {
            if (s.state=="IDLE") s.newState("CLASSIF");
        }
        if (this.title=="loadInput") {
            fptr=(fptr+1)%files.length;
            f.loadInputClassified("sample/"+files[fptr]);
        }
        if (this.title=="loadRun") {
            this.on=!this.on;
            s.newState(this.on?"LOADRUN":"IDLE");
        }
        if (this.title=="set1") {
        }
        animate();
    }
}

class Bar {
    constructor(x,y,w,dy) {
        this.x=x;
        this.y=y;
        this.w=w;
        this.dy=dy;
        this.n=0;
        this.b=[];
        this.init();
    }
    init() {
        this.addButton("debug");
        this.addButton("run");
        this.addButton("clr input");
        this.addButton("rnd input");
        this.addButton("clr weight");
        this.addButton("rnd weight");
        this.addButton("clr bias");
        this.addButton("rnd bias");
        this.addButton("rnd order");
        this.addButton("classif");
        this.addButton("loadInput");
        this.addButton("loadRun");
        this.addButton("saveNet");
        this.addButton("loadNet");
        this.addButton("set1");
    }
    addButton(title) {
        this.b.push(new Button(this.x,this.y+this.dy*this.n++,this.w,this.dy,title));
    }
    draw() {
        this.b.forEach(b=>b.draw());
    }
    mouseOver(x,y) {
        if (inside(x,y,this.x,this.y,this.w,this.n*this.dy)) {
            return true;
        }
    }
    action(x,y) {
        this.b.forEach(b=>{
            if (b.mouseOver(x,y)) b.action(x,y);
        })
    }
}

function inside(x,y,ox,oy,ow,oh) {
    return x>=ox&&x<=ox+ow&&y>=oy&&y<=oy+oh;
}