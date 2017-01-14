abstract class SplitFileBase {
    decodeBlock(block: Uint8Array) {
        const totalBytesCountBinary = block.subarray(0, 4);
        const totalBytesCount = this.uint8ArrayToInt32(totalBytesCountBinary);

        const fileNameBinaryLengthBinary = block.subarray(4, 8);
        const fileNameBinaryLength = this.uint8ArrayToInt32(fileNameBinaryLengthBinary);
        const fileNameBinary = block.subarray(8, 8 + fileNameBinaryLength);
        const fileName = this.decode(fileNameBinary);

        const totalBlockCountBinary = block.subarray(8 + fileNameBinaryLength, 12 + fileNameBinaryLength);
        const totalBlockCount = this.uint8ArrayToInt32(totalBlockCountBinary);

        const currentBlockIndexBinary = block.subarray(12 + fileNameBinaryLength, 16 + fileNameBinaryLength);
        const currentBlockIndex = this.uint8ArrayToInt32(currentBlockIndexBinary);

        const binary = block.subarray(16 + fileNameBinaryLength);
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
        const totalBlockCountBinary = this.int32ToUint8Array(totalBlockCount);

        const totalBytesCountBinary = this.int32ToUint8Array(uint8Array.length);

        const fileNameBinary = this.encode(fileName);
        const fileNameBinaryLengthBinary = this.int32ToUint8Array(fileNameBinary.length);

        for (let i = 0; i < totalBlockCount; i++) {
            const binary = uint8Array.subarray(i * size, i * size + size);
            const block = new Uint8Array(16 + fileNameBinary.length + binary.length);
            block.set(totalBytesCountBinary, 0);
            block.set(fileNameBinaryLengthBinary, 4);
            block.set(fileNameBinary, 8);
            block.set(totalBlockCountBinary, 8 + fileNameBinary.length);
            const currentBlockIndexBinary = this.int32ToUint8Array(i);
            block.set(currentBlockIndexBinary, 12 + fileNameBinary.length);
            block.set(binary, 16 + fileNameBinary.length);
            blocks.push(block);
        }
        return blocks;
    }
    protected abstract encode(text: string): Uint8Array;
    protected abstract decode(uint8Array: Uint8Array): string;
    private int32ToUint8Array(num: number) {
        const result = new Uint8Array(4);
        result[3] = num % 256;
        num >>= 8;
        result[2] = num % 256;
        num >>= 8;
        result[1] = num % 256;
        num >>= 8;
        result[0] = num % 256;
        return result;
    }
    private uint8ArrayToInt32(uint8Array: Uint8Array) {
        let result = uint8Array[0];
        result <<= 8;
        result += uint8Array[1];
        result <<= 8;
        result += uint8Array[2];
        result <<= 8;
        return result + uint8Array[3];
    }
}
