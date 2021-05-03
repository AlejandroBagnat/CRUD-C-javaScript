"strict mode"

var url="https://localhost:44338/Api/Persona";

//Mostrar datos por Get



        fetch(url)
        .then(response => response.json())
        .then(Data => agregarElementos(Data))

        
 function agregarElementos(Data) {
    var container = document.querySelector(".grid-container");
    var titulo1 = document.createElement("div");
    titulo1.innerHTML = "<b>Id</b>";
    container.appendChild(titulo1);
    var titulo2 = document.createElement("div");
    titulo2.innerHTML = "<b>Nombre</b>";
    container.appendChild(titulo2);
    var titulo3 = document.createElement("div");
    titulo3.innerHTML = "<b>Edad</b>";
    container.appendChild(titulo3);

    for (let i = 0; i < Data.length; i++) {
            const element = Data[i];

            var data1 = element.id;
            var data2 = element.nombre;
            var data3 = element.edad;

                console.log(data1);
                console.log(data2);
                console.log(data3);
            crearDivs(data1,data2, data3);
            
            function crearDivs(data1,data2, data3) {
              
                var datos1 = document.createElement("div");
                container.appendChild(datos1);
                datos1.innerHTML = data1 + '<br />';
                document.body.appendChild(container);
                
                var datos2 = document.createElement("div");
                datos2.innerHTML = data2 + '<br />';
                container.appendChild(datos2);
                document.body.appendChild(container);

                var datos3 = document.createElement("div");
                datos3.innerHTML = data3 + '<br />';
                container.appendChild(datos3);
                document.body.appendChild(container);
            }
    }
}

   

//Ingresar datos por POST

var form = document.getElementById('myForm');
var agregar = document.getElementById("buttonIngresar");

agregar.addEventListener('click',e =>{
    e.preventDefault();
        // let peticion;
        // if (window.XMLHttpRequest) peticion = new XMLHttpRequest();
        // else peticion = new ActiveXObject("Microsoft.XMLHTTP");

        // let respuesta;
        // if (peticion.status == 200 || peticion.status == 201) respuesta = peticion.response;
        // else respuesta = "Lo siento, no se ha encontrado el producto";


        // peticion.open("POST",url);
        
        // peticion.setRequestHeader("Content-type","application/json;charset=UTF8");

        // peticion.send(JSON.stringify(
        //     {
        //         "nombre":  document.getElementById("textNombre").value,
        //         "edad": parseInt(document.getElementById("textEdad").value)
        //     }
        // ))

        fetch(url,
            {
                headers: {
                    "Content-type":"application/json;charset=UTF8"
                },
                method: "POST",
                body: JSON.stringify({
                            "nombre":  document.getElementById("textNombre").value,
                            "edad": parseInt(document.getElementById("textEdad").value)
                        })
            })
            .then((res)=> res.json())
            .then(data =>console.log(data))
})



let actualizar = document.getElementById("buttonActualizar");
// generamos el metodo put para actualizar
actualizar.addEventListener('click',e => {
e.preventDefault();

let data = {
        Id:parseInt(document.getElementById("textId").value),
        Nombre:document.getElementById("textNombre").value,
        Edad:parseInt(document.getElementById("textEdad").value)
};
console.log(data.Id);
console.log(data.Nombre);
console.log(data.Edad);

fetch(url)
                .then(response => response.json())
                .then(e => { console.log(e);
                    for (const value of e) {
                        console.log(value.id);
                        if (value.id===data.Id) {
                            var Nombre = data.Nombre;
                            var Edad = data.Edad;
                                console.log(data.Nombre);console.log(data.Edad);
                            fetch(url,{
                                method:'PUT',
                                headers: {'Content-Type': 'application/json'},
                                body:JSON.stringify({
                                    "Id": data.Id,
                                    "Nombre": Nombre,
                                    "Edad": Edad
                                })
                            }).then((response) => response.json())
                            .then((json) => console.log(json))
                        
                           
                            
                        }
                    }
                
                })  
})


let eliminar = document.getElementById("buttonEliminar");

eliminar.addEventListener('click',e => {
 e.preventDefault();

                
        let data = {
                Id:parseInt(document.getElementById("textId").value),
                Nombre:document.getElementById("textNombre").value,
                Edad:parseInt(document.getElementById("textEdad").value)
        };
                        

        fetch(url)
                .then(response => response.json())
                .then(e => {
                    for (const value of e) {
                        console.log(value.id);
                        if (value.id===data.Id) {
                            var Nombre = value.nombre;
                            var Edad = value.edad;

                            fetch(url,{
                                method:'DELETE',
                                headers: {'Content-Type': 'application/json',
                                            'Accept': 'application/json'},
                                body:JSON.stringify({
                                    "Id": data.Id,
                                    "Nombre": Nombre,
                                    "Edad": Edad
                                })
                            }).then((response) => response.json())
                            .then((json) => {agregarElementos(json)
                                console.log(json)})
                        
                           
                        }
                    }
                })  
               
})