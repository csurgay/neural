var DEBUG=false;

var canvas, ctx;
const events=new Events();
const f=new File();
const s=new State();
const b=new Board(8,10,8,12);
const c=new Classes(30,250,10);
const n=new Network(150,50,[b.inputs,new Array(32),new Array(16),c.outputs]);
const bbar=new ButtonBar(60,240,66,20);

function init() {
    f.getFileNames("sample");
    canvas=document.getElementById("myCanvas");
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    ctx=canvas.getContext("2d");
/*
    const ratio = window.devicePixelRatio;
    canvas.height=window.innerHeight*ratio;
    canvas.width=window.innerWidth*ratio;
    canvas.style.width=canvas.width+"px";
    canvas.style.height=canvas.height+"px";
    ctx.scale(ratio,ratio);
 */    
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
    bbar.draw();
    check();
    if (s.state=="LOADRUN") {
        if (files[0]===undefined) {}
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
    }
    window.requestAnimationFrame(animate);    
}

function check() {
    var wMin=1000, bMin=1000, oMin=1000;
    var wMax=-1000, bMax=-1000, oMax=-1000;
    var ins=0, outs=0, weights=0, biases=0;
    n.layers.forEach(l=>{
        l.ins.forEach(i=>{
            oMin=Math.min(oMin,i);
            oMax=Math.max(oMax,i);
            ins++;
        })
        l.outs.forEach(o=>{
            oMin=Math.min(oMin,o);
            oMax=Math.max(oMax,o);
            outs++;
        })
        l.weight.forEach(w=>{
            w.forEach(ww=>{
                wMin=Math.min(wMin,ww);
                wMax=Math.max(wMax,ww);
                weights++;
            })
        })
        l.bias.forEach(w=>{
            bMin=Math.min(bMin,w);
            bMax=Math.max(bMax,w);
            biases++;
        })
    });
    if (DEBUG) console.log("ins="+ins+" outs="+outs+" weights="+weights+" biases="+biases);
    if (DEBUG) console.log("Outs min="+oMin+" max="+oMax);
    if (DEBUG) console.log("Weights min="+wMin+" max="+wMax);
    if (DEBUG) console.log("Biases min="+bMin+" max="+bMax);
}

function getRandom(a,b) {
    return fourDigits((b-a)*Math.random()+a);
}

function fourDigits(v) {
    return Math.round(10000*v)/10000;
}