const config ={
    app:{
        port: process.env.PORT || 3000
    },
    db:{
        maxItemsToStore: 7,
        connectionString: 'Paste_Your_Connection_String_Here'
    }
}


module.exports = config