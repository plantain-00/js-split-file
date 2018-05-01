import { StringDecoder } from 'string_decoder'
import { BinaryDecoder, BinaryEncoder } from 'fluent-binary-converter/nodejs'

/**
 * @public
 */
export default class SplitFile {
  private stringDecoder = new StringDecoder()
  public decodeBlock(block: Uint8Array) {
    const binaryDecoder = new BinaryDecoder(block.buffer as ArrayBuffer, block.byteOffset)
    const totalBytesCount = binaryDecoder.getUint32()
    const fileNameBinaryLength = binaryDecoder.getUint32()
    const fileName = this.decode(binaryDecoder.getBinary(fileNameBinaryLength))
    const totalBlockCount = binaryDecoder.getUint32()
    const currentBlockIndex = binaryDecoder.getUint32()
    const binary = binaryDecoder.getBinary()
    return {
      totalBytesCount,
      fileName,
      totalBlockCount,
      currentBlockIndex,
      binary
    }
  }
  public split(uint8Array: Uint8Array, fileName: string, size = 10000) {
    const blocks: Uint8Array[] = []
    if (uint8Array.length === 0) {
      return blocks
    }
    const totalBlockCount = Math.floor((uint8Array.length - 1) / size) + 1
    const totalBlockCountBinary = BinaryEncoder.fromUint32(true, totalBlockCount)

    const totalBytesCountBinary = BinaryEncoder.fromUint32(true, uint8Array.length)

    const fileNameBinary = this.encode(fileName)
    const fileNameBinaryLengthBinary = BinaryEncoder.fromUint32(true, fileNameBinary.length)

    for (let i = 0; i < totalBlockCount; i++) {
      const binary = uint8Array.subarray(i * size, i * size + size)
      const currentBlockIndexBinary = BinaryEncoder.fromUint32(true, i)
      const block = BinaryEncoder.concat(totalBytesCountBinary,
        fileNameBinaryLengthBinary,
        fileNameBinary,
        totalBlockCountBinary,
        currentBlockIndexBinary,
        binary)
      blocks.push(block)
    }
    return blocks
  }
  protected encode(text: string) {
    return new Uint8Array(new Buffer(text))
  }
  protected decode(uint8Array: Uint8Array) {
    return this.stringDecoder.write(new Buffer(uint8Array))
  }
}
