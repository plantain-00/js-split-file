import { SplitFile } from "../nodejs";

describe("SplitFile", () => {
    it("should work", () => {
        const splitFile = new SplitFile();
        const uint8Array = new Uint8Array([1, 2, 3, 4]);
        const blocks = splitFile.split(uint8Array, "a.txt");
        console.log(blocks);
        const piece = splitFile.decodeBlock(blocks[0]);
        console.log(piece);
        expect(piece.totalBytesCount).toEqual(4);
        expect(piece.fileName).toEqual("a.txt");
        expect(piece.totalBlockCount).toEqual(1);
        expect(piece.currentBlockIndex).toEqual(0);
        expect(piece.binary).toEqual(new Uint8Array([1, 2, 3, 4]));
    });
});
