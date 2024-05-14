import { Socket } from 'socket.io-client';

class Global {
    private socket?: Socket;
    constructor() {}

    public get getSocket() {
        return this.socket;
    }

    public setSocket(socket: Socket) {
        this.socket = socket;
    }
}

export default new Global();
