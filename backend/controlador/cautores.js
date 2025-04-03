/*exports.getAutores = (req,res) => {
    const cursor = db.collection('libros').find({});
    res.send(cursor)
};*/
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

exports.getAutores = async (req, res) => {
    try {
        await client.connect();
        const collection = client.db('libros').collection('biblioteca');
        const autores = await collection.find({}).toArray();
        res.send(autores);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los autores', error });
    } finally {
        await client.close();
    }
};