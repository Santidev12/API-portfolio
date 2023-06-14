const express = require('express');
const app = express();

let projects = [
        { id: 1, name: "Mi proyecto 1", img: "/assets/images/shop.svg" },
        { id: 2 ,name: "Mi proyecto 2", img: "/assets/images/shop.svg" },
        { id: 3 ,name: "Mi proyecto 3", img: "/assets/images/shop.svg" },
        { id: 4 ,name: "Mi proyecto 4", img: "/assets/images/shop.svg" },

];


// app.use((req, res, next) => {
//     console.log("Mi middleware!")
//     const can = true;

//     if (!can){
//         res.send("error");
//     }else{
//         next();
//     }
// });


app.use(express.json());

app.get('/projects', (req, res) => {
    console.log("Mi endpoint de projects")
    res.send(projects);
});



app.post('/projects', (req, res) => {
    const project = req.body;
    projects.push(project) ;
    res.send("okk!");
});

app.get('/projects/:id', (req, res) => {
    // console.log("Params:" , req.params);
    // console.log("Query:", req.query);

    const id = req.params.id;
    const project = projects.find((p) => p.id == id);

    if(!project){
        res.status(404)
        res.send("Error")
    }

    res.send(project);
});


app.delete('/projects/:id', (req, res) => {
    //obtener parametro id
    const id = req.params.id;
    const project = projects.findIndex((p) => p.id == id);


    //obtener indice de proyecto
    const index = projects.findIndex((p) => p.id == id);

    if(index == -1){
        res.status(404);
        res.send("Not Found")
    }
    //eliminar con splice[]
    projects.splice(index, 1);

    res.send("Ok!");
})


app.put("/projects/:id", (req, res) => {

        const id = req.params.id; 

        const project = projects.find((p) => p.id == id);

        if(!project){
            res.status(404)
            res.send("Not Found")
        }

        const body = req.body;
        project.name =  body.name

    res.send("Ok!")
})

app.listen(3000, () => {
    console.log("Servidor listo en puerto http://localhost:3000" );
});