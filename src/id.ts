import { Command, InvalidArgumentError } from "commander";

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function (length: number, prefix?: number[], checksum = false, count = 1) {
    let sequenceLength = length

    // if (options.checksum) {
    //     sequenceLength--
    //     while (sequenceLength + toBaseAlphabet((alphabet.length - 1) * sequenceLength).length != length)
    //         sequenceLength--
    // }
    // const maxChecksumLength = length - sequenceLength
    const maxChecksumLength = 
        toBaseAlphabet((alphabet.length - 1) * sequenceLength + 
        (prefix ? (alphabet.length - 1) * prefix.length : 0)
    ).length 
    
    for (let i = 0; i < count; i++) {

        const sequence = randomIndexSequence(sequenceLength)
        let paddedChecksum: number[] = []

        if (checksum) {
            
            const checksum = toBaseAlphabet(addArray(sequence) + (prefix ? addArray(prefix) : 0))
            paddedChecksum = [...[... new Array(maxChecksumLength - checksum.length)].map(() => 0), ...checksum]

            if (i == 0) console.log(`ID + checksum length: ${sequence.length + paddedChecksum.length}`)
        }
        return (prefix ? `${toAlphabet(prefix)}-` : '') + toAlphabet([...sequence, ...paddedChecksum])
    }
}

export function cmdParsePrefix(value: string, dummyPrevious: any) {
    const chars = value.toUpperCase().split('')
    if(!chars.every(v => alphabet.includes(v)))
        throw new InvalidArgumentError('Not in alphabet')         

    return chars.map((v, i) => alphabet.findIndex(s => s == v))
}

function randomIndex() { return Math.floor(Math.random() * alphabet.length) }
function randomIndexSequence(length: number) { return [...new Array(length)].map(randomIndex) }

function addArray(arr: number[]) { return arr.reduce((partialSum, a) => partialSum + a, 0) }

function toBaseAlphabet(base10: number) {
    let currentNum = base10
    let baseAlphabet: number[] = []
    while (currentNum > 0) {
        baseAlphabet = [currentNum % alphabet.length, ...baseAlphabet]
        currentNum = Math.trunc(currentNum / alphabet.length)
    }
    return baseAlphabet
}
function toAlphabet(indexes: number[]) { return indexes.map(v => alphabet[v]).join('') }