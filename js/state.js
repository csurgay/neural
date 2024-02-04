class State {
    constructor() {
        this.state="IDLE";
    }
    newState(state) {
        if (state!=this.state) {
            if (DEBUG) console.log(this.state+" -> "+state);
        }
        this.state=state;
    }
}
