declare class TextEncoder {
    encode(text: string): Uint8Array;
}

declare class TextDecoder {
    decode(uint8Array: Uint8Array): string;
}

export class SplitFile extends SplitFileBase {
    private textEncoder = new TextEncoder();
    private textDecoder = new TextDecoder();
    protected encode(text: string) {
        return this.textEncoder.encode(text);
    }
    protected decode(uint8Array: Uint8Array) {
        return this.textDecoder.decode(uint8Array);
    }
}
