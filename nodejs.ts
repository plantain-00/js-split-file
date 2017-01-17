import { StringDecoder } from "string_decoder";
import {SplitFileBase} from "./common";

export class SplitFile extends SplitFileBase {
    private stringDecoder = new StringDecoder();
    protected encode(text: string) {
        return new Uint8Array(new Buffer(text));
    }
    protected decode(uint8Array: Uint8Array) {
        return this.stringDecoder.write(new Buffer(uint8Array));
    }
}
