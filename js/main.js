var DEBUG=false;

var canvas, ctx;
const events=new Events();
const f=new File();
const s=new State();
const b=new Board(8,10,8,12);
const c=new Classes(30,250,10);
const n=new Network(150,10,[b.inputs,new Array(32),new Array(16),c.outputs]);
const bar=new Bar(60,240,66,20);

function init() {
    f.getFileNames("sample");
    canvas=document.getElementById("myCanvas");
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    ctx=canvas.getContext("2d");
    ctx.translate(0.5,0.5);
    events.init();
    animate();
}

function animate() {
    ctx.beginPath();
    ctx.fillStyle="rgb(170,170,170)";
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();
    b.draw();
    n.draw();
    c.draw();
    bar.draw();
    check();
    if (s.state=="LOADRUN") {
        if (files[0]===undefined) requestAnimationFrame(animate);
        else {
            fptr=Math.floor(files.length*Math.random());
            f.loadInputClassified("sample/"+files[fptr]);
        }
    }
    if (s.state=="RUN") {
        b.randomInput();
        n.randomWeight();
        n.randomBias();
        n.randomOrder();
        window.requestAnimationFrame(animate);    
    }
}

function check() {
    var min=1000;
    var max=-1000;
    var ins=0, outs=0, weights=0;
    n.layers.forEach(l=>{
        l.ins.forEach(i=>{
            min=Math.min(min,i);
            max=Math.max(max,i);
            ins++;
        })
        l.outs.forEach(o=>{
            min=Math.min(min,o);
            max=Math.max(max,o);
            outs++;
        })
        l.weight.forEach(w=>{
            w.forEach(ww=>{
                min=Math.min(min,ww);
                max=Math.max(max,ww);
                weights++;
            })
        })
    });
    if (DEBUG) console.log("ins="+ins+" outs="+outs+" weights="+weights);
    if (DEBUG) console.log("min="+min+" max="+max);
}

function getRandom(a,b) {
    return fourDigits((b-a)*Math.random()+a);
}

function fourDigits(v) {
    return Math.round(10000*v)/10000;
}