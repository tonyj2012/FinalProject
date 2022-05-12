const {MongoClient} = require("mongodb");

async function main(){
    const uri = "mongodb+srv://user:finalproject123@cluster0.hpkea.mongodb.net/FinalProject?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    record={"name":"testname","email":"test@email.com"};
    try{
        await client.connect();
        client.db("FinalProject").collection("Users").insertOne(record);
        await listDatabases(client);
    }    
    catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }
}

async function listDatabases(client){
    databasesList=await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

main().catch(console.error);