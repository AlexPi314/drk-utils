#!/usr/bin/env node

import { InvalidArgumentError, Command } from "commander"
import id, { cmdParsePrefix } from "./id.js"

function cmdParseInt(value: string, dummyPrevious: any) {
    const parsedValue = parseInt(value, 10)
    if (isNaN(parsedValue)) 
        throw new InvalidArgumentError('Not a number')
    return parsedValue
}

function cmdParseIntMin(minLength: number) { return (value: string, dummyPrevious: any) => {
    const length = cmdParseInt(value, dummyPrevious)
    if (length < minLength)
        throw new InvalidArgumentError(`Less than ${minLength}`)
    return length
} }

const program = new Command()

program
    .name('drk')
    .description('Utilities of the Democratic Republic of Kinda\'s Government')
    .version('1.0.0')

program
    .command('id')
    .version('2.0.0')
    .description('generate random IDs')
    .argument('<length>', 'ID length', cmdParseInt)
    .option('-s, --checksum', 'include checksum')
    .option('-p, --prefix <value>', '<prefix>-<id>, supports checksum', cmdParsePrefix)
    .option('-c, --count <value>', 'amount of IDs', cmdParseIntMin(1), 1)
    .action((length: number, options) => console.log(id(length, options.prefix, options.checksum, options.count)))

program
    .command('kmin')
    .description('Kinda and Malta Intranet CLI')
    .version('0.0.1')
    .command('link')
    .description('print a link to Kinda and Malta Intranet')
    .version('1.0.0')
    .action(() => { console.log('https://vk.cc/cvZTFB') })

program.parse()