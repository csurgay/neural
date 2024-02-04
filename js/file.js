class File {
    constructor() {
    }
    save(filename,content) {
        var raw = new FormData();
        raw.append("data", content);
        var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
        xhr.open( 'POST', 'php/savefile.php?filename='+filename, true );
        xhr.send(raw);
    }

    load(filename, callback) {
        var request = new XMLHttpRequest();
        request.onload = function() { 
            callback(request.responseText); 
        }
        request.open("GET", filename);
        request.overrideMimeType("application/text");
        request.send();
    }
    saveInputClassified(c) {
        var str=""+c+" ";
        b.inputs.forEach(v=>{
            str+=v+" ";
        })
        this.save("sample/"+c+"_"+Date.now()+".smp",str);
    }
    loadInputClassified(filename) {
        this.load(filename,this.loadInput);
    }
    loadInput(str) {
        str=str.split(" ");
        var c=+str.shift();
        if (DEBUG) console.log(c);
        var bptr=0;
        str.forEach(v=>{
            if (bptr<b.inputs.length) b.inputs[bptr++]=+v;
        })
        animate();
    }
    getFileNames(dir) {
        var request=new XMLHttpRequest();
        request.open('POST','php/scandir.php',true);
        request.onreadystatechange=function() {
            if (request.readyState==4 && request.status==200) {
                if (DEBUG) console.log(request.responseText);
                files.length=0;
                files.push(...request.responseText.split('\n'));
                files.pop();
            }
        }
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.send("dir="+dir);
    }
}
fptr=0;
var files=[];
