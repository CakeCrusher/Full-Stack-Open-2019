const mongoose = require('mongoose')

const password = process.argv[2]

const url = 'mongodb+srv://Fullstack:' + password + '@cluster0-nsejx.mongodb.net/note-app?retryWrites=true&w=majority'

mongoose.connect(url, {usenewUrlParser: true})

const personSchema = {
    name: String,
    number: String
}

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person
        .find({})
        .then(response => {
            response.forEach(p => console.log(p))
            mongoose.connection.close()
        })
} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person
        .save()
        .then(response =>{
            console.log('Added ' + name + ' number ' + number + ' to phonebook')
            mongoose.connection.close()
        })
}