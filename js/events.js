class Events {
    constructor() {
    }
    init() {
        canvas.addEventListener("mousedown", this.mousedown);
        canvas.addEventListener("mouseup", this.mouseup);
        canvas.addEventListener("mousemove", this.mousemove);
    }
    mousedown(evt) {
        if (s.state=="IDLE") {
            //s.newState("DOWN");
        }
        if (b.mouseOver(evt)) {
            s.newState("DRAW");
            b.action(evt);
        }
    }
    mousemove(evt) {
        if (s.state=="DRAW") {
            b.action(evt);
        }
        else for (let i=0;i<n.layers.length;i++) {
            var ret=n.layers[i].mouseOver(evt);
            if (ret&&(ret["layer"]!=lastLayer||ret["output"]!=lastOutput)) {
                lastLayer=ret["layer"];
                lastOutput=ret["output"];
                if (DEBUG) console.log("Layer:"+lastLayer+" Output:"+lastOutput+" Bias:"+n.layers[lastLayer-1].bias[lastOutput]+" Value:"+n.layers[lastLayer-1].outs[lastOutput]);
            }
        }
    }
    mouseup(evt) {
        var v=c.mouseOver(evt.clientX,evt.clientY);
        if (v!=-1 && s.state=="CLASSIF") {
            if (DEBUG) console.log(v);
            f.saveInputClassified(v);
            s.newState("IDLE");
        }
        else if (bbar.mouseOver(evt.clientX,evt.clientY))
            bbar.action(evt.clientX,evt.clientY);
        else s.newState("IDLE");
    }
}
var lastLayer=-1, lastOutput=-1;