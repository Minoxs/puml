class BitStream {
    buffer;

    acc;
    acc_size;

    constructor(bytes) {
        this.buffer = bytes;
        this.acc = 0;
        this.acc_size = 0;
    }

    accumulate() {
        if (this.acc_size > 0) return;

        if (this.buffer.length > 0) {
            this.acc = this.buffer[0];
            this.acc_size = 8;
            this.buffer = this.buffer.slice(1);
        } else {
            this.acc = 0;
            this.acc_size = 0;
        }
    }

    read_bit() {
        this.accumulate();
        const bit = 0x80 & this.acc;
        this.acc = this.acc << 1;
        this.acc_size--;
        return (bit > 0) ? 1 : 0;
    }

    read_byte(size) {
        let ret = 0;

        while (size > 0) {
            ret = (ret << 1) | this.read_bit();
            size--;
        }

        return ret;
    }

    size() {
        return this.buffer.length + this.acc_size;
    }
}

async function Deflate(Text) {
    const text_stream = new Blob([Text]).stream();
    const bytes = text_stream.pipeThrough(new CompressionStream("deflate"));
    const chunks = [];

    for await (const chunk of bytes) {
        chunks.push(...chunk);
    }

    return chunks.slice(2, chunks.length - 4);
}

async function EncodePUML(bytes) {
    const bit_stream = new BitStream(bytes);
    const mapping = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_\n";

    let result = "";
    while (bit_stream.size() > 0) {
        result += mapping[bit_stream.read_byte(6)];
    }

    return result;
}
