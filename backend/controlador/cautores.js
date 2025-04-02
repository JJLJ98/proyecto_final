exports.getAutores = (req,res) => {
    const cursor = db.collection('biblioteca').find({});
    res.send(cursor)
};