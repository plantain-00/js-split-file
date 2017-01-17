export abstract class SplitFileBase {
    decodeBlock(block: Uint8Array) {
        const binaryDecoder = new BinaryDecoder(block.buffer, block.byteOffset);
        const totalBytesCount = binaryDecoder.getInt32();
        const fileNameBinaryLength = binaryDecoder.getInt32();
        const fileName = this.decode(binaryDecoder.getBinary(fileNameBinaryLength));
        const totalBlockCount = binaryDecoder.getInt32();
        const currentBlockIndex = binaryDecoder.getInt32();
        const binary = binaryDecoder.getBinary();
        return {
            totalBytesCount,
            fileName,
            totalBlockCount,
            currentBlockIndex,
            binary,
        };
    }
    split(uint8Array: Uint8Array, fileName: string, size: number = 10000) {
        const blocks: Uint8Array[] = [];
        if (uint8Array.length === 0) {
            return blocks;
        }
        const totalBlockCount = Math.floor((uint8Array.length - 1) / size) + 1;
        const totalBlockCountBinary = BinaryEncoder.fromInt32(totalBlockCount);

        const totalBytesCountBinary = BinaryEncoder.fromInt32(uint8Array.length);

        const fileNameBinary = this.encode(fileName);
        const fileNameBinaryLengthBinary = BinaryEncoder.fromInt32(fileNameBinary.length);

        for (let i = 0; i < totalBlockCount; i++) {
            const binary = uint8Array.subarray(i * size, i * size + size);
            const currentBlockIndexBinary = BinaryEncoder.fromInt32(i);
            const block = new Uint8Array(totalBytesCountBinary.length
                + fileNameBinaryLengthBinary.length
                + fileNameBinary.length
                + totalBlockCountBinary.length
                + currentBlockIndexBinary.length
                + binary.length);
            const binaryEncoder = new BinaryEncoder(block);
            binaryEncoder.setBinary(totalBytesCountBinary,
                fileNameBinaryLengthBinary,
                fileNameBinary,
                totalBlockCountBinary,
                currentBlockIndexBinary,
                binary);
            blocks.push(block);
        }
        return blocks;
    }
    protected abstract encode(text: string): Uint8Array;
    protected abstract decode(uint8Array: Uint8Array): string;
}

export class BinaryDecoder {
    constructor(public arrayBuffer: ArrayBuffer, public index = 0) { }

    getInt8() {
        return this.getInt8Array(1)[0];
    }
    getInt8Array(count: number) {
        const array = new Int8Array(this.arrayBuffer, this.index, count);
        this.index += count;
        return array;
    }
    getUint8() {
        return this.getUint8Array(1)[0];
    }
    getUint8Array(count: number) {
        const array = new Uint8Array(this.arrayBuffer, this.index, count);
        this.index += count;
        return array;
    }

    getInt16() {
        return this.getInt16Array(1)[0];
    }
    getInt16Array(count: number) {
        const array = new Int16Array(this.arrayBuffer, this.index, count);
        this.index += 2 * count;
        return array;
    }
    getUint16() {
        return this.getUint16Array(1)[0];
    }
    getUint16Array(count: number) {
        const array = new Uint16Array(this.arrayBuffer, this.index, count);
        this.index += 2 * count;
        return array;
    }

    getInt32() {
        return this.getInt32Array(1)[0];
    }
    getInt32Array(count: number) {
        const array = new Int32Array(this.arrayBuffer, this.index, count);
        this.index += 4 * count;
        return array;
    }
    getUint32() {
        return this.getUint32Array(1)[0];
    }
    getUint32Array(count: number) {
        const array = new Uint32Array(this.arrayBuffer, this.index, count);
        this.index += 4 * count;
        return array;
    }
    getFloat32() {
        return this.getFloat32Array(1)[0];
    }
    getFloat32Array(count: number) {
        const array = new Float32Array(this.arrayBuffer, this.index, count);
        this.index += 4 * count;
        return array;
    }
    getFloat64() {
        return this.getFloat64Array(1)[0];
    }
    getFloat64Array(count: number) {
        const array = new Float64Array(this.arrayBuffer, this.index, count);
        this.index += 8 * count;
        return array;
    }

    getBinary(length?: number) {
        if (length === undefined) {
            const result = new Uint8Array(this.arrayBuffer, this.index);
            this.index = this.arrayBuffer.byteLength;
            return result;
        } else {
            const result = new Uint8Array(this.arrayBuffer, this.index, length);
            this.index += length;
            return result;
        }
    }
}

export class BinaryEncoder {
    static fromInt8(...values: number[]) {
        return new Uint8Array(new Int8Array(values).buffer);
    }

    static fromInt16(...values: number[]) {
        return new Uint8Array(new Int16Array(values).buffer);
    }
    static fromUint16(...values: number[]) {
        return new Uint8Array(new Uint16Array(values).buffer);
    }

    static fromInt32(...values: number[]) {
        return new Uint8Array(new Int32Array(values).buffer);
    }
    static fromUint32(...values: number[]) {
        return new Uint8Array(new Uint32Array(values).buffer);
    }
    static fromFloat32(...values: number[]) {
        return new Uint8Array(new Float32Array(values).buffer);
    }
    static fromFloat64(...values: number[]) {
        return new Uint8Array(new Float64Array(values).buffer);
    }
    public index = 0;
    constructor(public uint8Array: Uint8Array) { }
    setBinary(...uint8Arrays: Uint8Array[]) {
        for (const uint8Array of uint8Arrays) {
            this.uint8Array.set(uint8Array, this.index);
            this.index += uint8Array.length;
        }
    }
}
