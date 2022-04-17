let listaPlatillos = [
    {
        id: 1,
        nombre: "Arroz chaufa con pollo",
        descripcion: "El arroz chaufa, o arroz de chaufa, es un plato a base de arroz frito consumido en Perú. Forma parte del estilo gastronómico sino-peruano, denominado como cocina chifa.",
        precio: 11.0,
        stock: 20,
        imagen: "https://elcomercio.pe/resizer/fJ0_-_EZ130jOxfnSdi-lixHl7A=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/IURQSHV7LFH6ZCTS2KH7JZ2ZEE.jpg",
    },
    {
        id: 2,
        nombre: "Tallarin saltado",
        descripcion:
            "El tallarín saltado es un plato típico de la gastronomía peruana, propio de la carta de un restaurante chifa así como el arroz chaufa y el wantán frito. El nombre del plato proviene de la técnica conocida como «saltear», en la cual se fríe la comida a fuego fuerte y en pequeños trozos.",
        precio: 14.0,
        stock: 8,
        imagen: "https://brasasysabor.top/wp-content/uploads/2020/04/receta-tallarin-saltado.jpg",
    },
    {
        id: 3,
        nombre: "Aeropuerto de pollo",
        descripcion: "Plato inventado aquí en Lima - Perú, su nombre AEROPUERTO viene desde hace varios años, porque había un pequeño chifa, cercano al aeropuerto Jorge Chávez, llego un grupo de comensales hambrientos con muchas ganas de comer arroz chaufa. Como era ya muy tarde y el cocinero se encontraba desabastecido de ingredientes.",
        precio: 13.0,
        stock: 14,
        imagen: "https://cdn-e360.s3-sa-east-1.amazonaws.com/chifa-aeropuerto-large-kez7223WvR.jpg",
    },
    {
        id: 4,
        nombre: "Aeropuerto de chancho",
        descripcion: "La chifa aeropuerto es un platillo que nace de la fusión entre la comida china y la comida peruana. Se puede decir que es uno de los platos más consumidos en Perú. Es muy similar arroz chaufa, pero adicionalmente tiene tallarines chinos y frijol chino. Se acostumbra a consumir como plato principal.",
        precio: 14.0,
        stock: 7,
        imagen: "https://chifaperuanomadrid.com/wp-content/uploads/2020/03/aeropuerto-de-cerdo-jama-fusion.jpg",
    },
    {
        id: 5,
        nombre: "Lomo saltado",
        descripcion: "El lomo saltado es un plato típico de la gastronomía del Perú consistente en carne de res, arroz cocido y papas fritas.",
        precio: 12.0,
        stock: 10,
        imagen: "https://jameaperu.com/wp-content/uploads/2020/03/lomo-saltado-de-pollo_700x465.jpg",
    },
    {
        id: 6,
        nombre: "Porción de papas fritas nativas",
        descripcion: "Las papas fritas o patatas fritas, también conocidas como papas a la francesa o patatas a la francesa, son las papas que se preparan cortándose en rodajas o en forma de bastones y friéndolas en aceite caliente hasta que queden doradas, retirándolas del aceite y luego sazonándolas con sal.",
        precio: 8.0,
        stock: 6,
        imagen: "https://lh3.googleusercontent.com/p/AF1QipOszSR53h7MYqpYNPQ7zMh0Dx3yKVparyG87Xj3=s1600-w400",
    },
];

/**
 * 1. vamos a mostrar a partir de esta data (listaPlatillos) los platillos en el DOM
 * 2. vamos a implementar que se puedan agregar platillos a un carrito, indicando la cantidad de c/producto
 * 3. vamos a mostrar el resumen del carrito
 * 4. vamos a mostrar el total del carrito a pagar
 */

let mainContenido = document.getElementById("contenido");

console.log("MAIN", mainContenido);

listaPlatillos.forEach((plato) => {
    let platilloDom = document.createElement("div");

    platilloDom.classList.add("tarjeta");
    platilloDom.innerHTML = `<div class="imagen">
		<img src="${plato.imagen}" alt="${plato.nombre}">
	</div>
	<div class="texto">
		<h4>${plato.nombre}</h4>
		<p>${plato.descripcion}</p>
		<div class="precio">
			<span>S/ ${plato.precio}</span>
			<button 
				class="btn-agregar" 
				data-id="${plato.id}"
			>
				Agregar
		  	</button>
		</div>
	</div>
	`;

    mainContenido.appendChild(platilloDom);
});

// getElementsByClassName me permite obtener una lista de elementos a partir de una clase de CSS
let btnsAgregar = document.getElementsByClassName("btn-agregar");

let arrBtnsAgregar = Array.from(btnsAgregar); //forEach, map, find

let carrito = []; //los platillos agregados con su respectiva cantidad

arrBtnsAgregar.forEach((botonAgregar) => {
    botonAgregar.addEventListener("click", (evento) => {
        //getAttribute(atributo) , permite obtener el valor de un atributo
        let btnId = botonAgregar.getAttribute("data-id");
        // console.log(typeof btnId);
        // alert(`Has dado click al botón!!!! con id: ${btnId}`);
        // console.log(evento.target.getAttribute("data-id")); //hace referencia al propio objeto desde donde recibimos el click
        let platoIdentificado = buscarPlatillo(btnId);
        anadirACarrito(platoIdentificado); //Agregue un plato y actualice el carrito
        dibujarCarrito(carrito); //ya esta actualizado
    });
});

// HOISTING, las referencias de variables y funciones son ELEVADAS al inicio del script
const buscarPlatillo = (id) => {
    let idNumber = parseInt(id);
    // console.log(typeof idNumber, idNumber);
    let platilloEncontrado = listaPlatillos.find((plato) => {
        return plato.id === idNumber;
    });

    return platilloEncontrado;
};

const anadirACarrito = (nuevoPlatillo) => {
    if (nuevoPlatillo.stock === 0) {
        alert("Ya no hay stock!");
        return; //corta la ejecución del código
    }

    let existe = carrito.findIndex((plato) => {
        return plato.id === nuevoPlatillo.id;
    });
    console.log(existe);
    if (existe === -1) {
        //no existe en el carrito aún
        nuevoPlatillo.cantidad = 1;
        carrito.push(nuevoPlatillo);
    } else {
        //en caso ya exista el plato dentro del carrito, incremento su propiedad cantidad en 1
        // carrito[existe].cantidad = carrito[existe].cantidad + 1
        carrito[existe].cantidad++;
    }

    let indiceLista = listaPlatillos.findIndex((items) => items.id === nuevoPlatillo.id);
    listaPlatillos[indiceLista].stock--;
};

let tbodyCarrito = document.getElementById("tbody-carrito");
let tbodyResumen = document.getElementById("tbody-resumen");

const dibujarCarrito = (carritoActualizado) => {
    let trCarrito = "";

    carritoActualizado.forEach((item) => {
        trCarrito =
            trCarrito +
            `<tr>
			<td>${item.nombre}</td>
			<td>${item.cantidad}</td>
			<td>${item.precio}</td>
			<td>${item.precio * item.cantidad}</td>
		</tr>`;
    });

    tbodyCarrito.innerHTML = trCarrito;

    let total = 0;

    total = carritoActualizado.reduce((acumulador, plato) => {
        return acumulador + plato.precio * plato.cantidad;
    }, 0);

    tbodyResumen.innerHTML = `<tr>
								<td>TOTAL</td>
								<td>${total}</td>
							</tr>`;
};
