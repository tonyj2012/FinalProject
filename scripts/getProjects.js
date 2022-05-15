const {MongoClient} = require("mongodb");

async function main(){
    let project=[];
    const uri = "mongodb+srv://user:finalproject123@cluster0.hpkea.mongodb.net/FinalProject?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    record={"name":"testname","email":"test@email.com"};
    try{
        await client.connect();
        client.db("FinalProject").collection("Users").findOne({"name":"Teepot"}, function(err,result){
            if(err) throw err;
            project=result.projects;
        });
        await listDatabases(client);
    }    
    catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }
    return project;
}

async function listDatabases(client){
    databasesList=await client.db().admin().listDatabases();
    //console.log("Databases:");
    //databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

module.exports.main=main;
