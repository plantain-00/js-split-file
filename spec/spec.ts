import SplitFile from "../dist/nodejs";

it("", () => {
    const splitFile = new SplitFile();
    const blocks = splitFile.split(new Uint8Array([1, 2, 3, 4]), "a.txt");
    expect(blocks).toEqual([new Uint8Array([4, 0, 0, 0, 5, 0, 0, 0, 97, 46, 116, 120, 116, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4])]);
    const piece = splitFile.decodeBlock(blocks[0]);
    expect(piece).toEqual({
        totalBytesCount: 4,
        fileName: "a.txt",
        totalBlockCount: 1,
        currentBlockIndex: 0,
        binary: new Uint8Array([1, 2, 3, 4]),
    });
});
