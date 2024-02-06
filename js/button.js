const fonts=[
    "Arial Narrow",
    "Arial",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT"];
var ptrFonts=0;

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
        ctx.font="14px "+fonts[ptrFonts];
        ctx.font="13px Arial";
        ptrFonts=(ptrFonts+1)%fonts.length;
        ctx.fillText(this.title,this.x+this.w/2,this.y+this.h/2);
    }
    mouseOver(x,y) {
        if (inside(x,y,this.x,this.y,this.w,this.h)) {
            return true;
        }
    }
    action(x,y) {
        if (this.title=="Debug") {
            this.on=!this.on;
            DEBUG=this.on;
        }
        if (this.title=="Run") {
            this.on=!this.on;
            s.newState(this.on?"RUN":"IDLE");
        }
        if (this.title=="Clr input") {
            b.clear();
        }
        if (this.title=="Rnd input") {
            b.randomInput();
        }
        if (this.title=="Clr weight") {
            n.clearWeight();
        }
        if (this.title=="Rnd weight") {
            n.randomWeight();
        }
        if (this.title=="Clr bias") {
            n.clearBias();
        }
        if (this.title=="Rnd bias") {
            n.randomBias();
        }
        if (this.title=="Rnd order") {
            n.randomOrder();
        }
        if (this.title=="Classif") {
            if (s.state=="IDLE") s.newState("CLASSIF");
        }
        if (this.title=="LoadInput") {
            fptr=(fptr+1)%files.length;
            f.loadInputClassified("sample/"+files[fptr]);
        }
        if (this.title=="LoadRun") {
            this.on=!this.on;
            s.newState(this.on?"LOADRUN":"IDLE");
        }
    }
}

class ButtonBar {
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
        this.addButton("Debug");
        this.addButton("Run");
        this.addButton("Clr input");
        this.addButton("Rnd input");
        this.addButton("Clr weight");
        this.addButton("Rnd weight");
        this.addButton("Clr bias");
        this.addButton("Rnd bias");
        this.addButton("Rnd order");
        this.addButton("Classif");
        this.addButton("LoadInput");
        this.addButton("LoadRun");
        this.addButton("SaveNet");
        this.addButton("LoadNet");
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