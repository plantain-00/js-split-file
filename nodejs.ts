import { StringDecoder } from "string_decoder";
import {SplitFileBase} from "./common";

export class SplitFile extends SplitFileBase {
    private stringDecoder = new StringDecoder();
    encode(text: string) {
        return new Uint8Array(new Buffer(text));
    }
    decode(uint8Array: Uint8Array) {
        return this.stringDecoder.write(new Buffer(uint8Array));
    }
}
