const { Transform } = require('stream');

const transformStream = new Transform({
    transform(chunck, encoding, callback){
        this.push(chunck.toString().toUpperCase());
        callback();
    }
});

process.stdin.pipe(transformStream).pipe(process.stdout);