const path = require('path');
const fs = require('fs');

// Input

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
    .split('\n')

// Utils

let directories = []

class File {
    constructor(name,size,parent) {
        this.name = name;
        this.size = size;
        this.parent = parent;
    }
    toString(){
        return '- '+ this.name + ' (file, size=' + this.size + ') - parent: '+ (this.parent ? this.parent.name :'?')
    }
    getSize(){
        return parseInt(this.size)
    }
}

class Directory {
    constructor(name,parent) {
        this.name = name;
        this.parent = parent;
        this.children = [];
    }
    getSize(){
        return this.children.map(children => children.getSize()).reduce((a,b) => a+b,0)
    }
    toString(){
        return '- '+ this.name + ' (dir) - parent: '+ (this.parent ? this.parent.name :'?')
            +this.children.map(child => '\n  '+child.toString()).join('')
    }
    cd(directory){
        if(directory == '/'){
            workingDirectory = root
        } else if(directory=='..'){
            workingDirectory=this.parent
        } else {
            workingDirectory = this.getChildDirectory(directory)
            directories.push(workingDirectory)
        }
    }
    getChildDirectory(name){
        return this.children.filter(child => child.name == name)[0]
    }
    addChildFile(name,size){
        const file = new File(name,size,this)
        return this.children.push(file)
    }
    addChildDirectory(name){
        const directory = new Directory(name,this)
        return this.children.push(directory)
    }
}

// Part1

let instructions = []
let lastInstructionId = -1

input.forEach((line,index) => {
    if(line.startsWith('$')){
        instructions.push({
            command: line,
            output:[]
        })
        lastInstructionId++
    } else {
        instructions[lastInstructionId].output.push(line)
    }
})



let root = new Directory('/',{name:'none'});
let workingDirectory = root


instructions.forEach(instruction => {
    if(instruction.command.startsWith('$ cd')){
        const directory = instruction.command.split(' ').slice(-1)
        workingDirectory.cd(directory)
    } else if (instruction.command.startsWith('$ ls')){
        instruction.output.forEach(output => {
            if(output.startsWith('dir')){
                const name = output.split(' ').slice(-1)[0]
                workingDirectory.addChildDirectory(name)
            } else {
                const name = output.split(' ').slice(-1)[0]
                const size = output.split(' ')[0]
                workingDirectory.addChildFile(name,size)
            }
        })
        
    }
})

const directories100000 = directories
    .filter(dir => dir.getSize() <= 100000)

const result = directories100000
    .map(dir => dir.getSize())
    .reduce((a,b) => a+b,0)

console.log(result)