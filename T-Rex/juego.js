document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){
        console.log("Hi");
        if(nivel.muerto == false){
            saltar();
        }else{
            nivel.velocidad = 9;
            nivel.muerto = false;
            cactus.x = ancho+100;
            nivel.marcador = 0;
        }
    }
});


var imgRex, imgSuelo;
function cargarImagenees(){
    imgRex = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();

    imgRex.src= 'imagenes/rex.png';
    imgCactus.src='imagenes/cactus.png';
    imgSuelo.src='imagenes/fondo.png';
}



let ancho = 700;
let alto = 300;
let canvas, ctx;
let suelo = 200; 

let nivel = {
    velocidad: 9, //Velocidad del mapa 
    marcador: 0,
    muerto: false,
}

let sueloGrafico ={ 
    x: 0,
    y: 270,
}

let tRex = {
    y: suelo,
    velocidadVertical: 0,
    gravedad: 2,
    salto: 20,
    velocidadMaxima: 9,
    saltando: false,
};

let cactus ={
    x: ancho,
    y: suelo,
};

function inicializa(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d'); 
    cargarImagenees(); 
}

function borrarCanvas(){
    canvas.width = 700;
    canvas.height = 300;

}



function dibujaRex(){
    ctx.drawImage(imgRex, 0,0, 560, 540, 100, tRex.y, 50, 50);
}

function dibujaCactus(){
    ctx.drawImage(imgCactus, 0, 0, 605, 1025, cactus.x, cactus.y, 50, 50);
}

function dibujaSuelo(){
    ctx.drawImage(imgSuelo, sueloGrafico.x, 0, 1920, 830, 0, sueloGrafico.y, 700, 30);
}

function puntuacion(){
    ctx.fillText(`${nivel.marcador}`, 600, 50);
    if( nivel.muerto == true){
        ctx.fillText(`GAME OVER`, 240, 150);
    }
}

function saltar(){
    tRex.saltando = true;
    tRex.velocidadVertical = tRex.salto;
}

function gravedad(){
    if(tRex.saltando == true){
        if(tRex.y > suelo){
            tRex.saltando = false;
            tRex.velocidadVertical = 0;
            tRex.y = suelo;
        }
        else{
         tRex.velocidadVertical -= tRex.gravedad;
         tRex.y -= tRex.velocidadVertical;
    }
}
}

function logicaCactus(){
    if(cactus.x < -100){
        cactus.x = ancho + 100;
        nivel.marcador ++; 
    }else{
        cactus.x -= nivel.velocidad;
    }
}

function logicaSuelo(){
    if(sueloGrafico.x > 700){
        sueloGrafico.x = 0;
    }else{
        sueloGrafico.x += nivel.velocidad;
    }
}

function colision(){
//    ctx.drawImage(imgRex, 0,0, 560, 540, 100, tRex.y, 50, 50);
if(cactus.x >= 100 && cactus.x <= 150){
    if(tRex.y >= suelo){
        nivel.muerto = true;
        nivel.velocidad = 0;
    }
}    

function revivir(){

}

}

//Bucle principal
let FPS = 60;
setInterval(function(){
    principal();
}, 1000/FPS);

function principal(){
    
    borrarCanvas();
    dibujaSuelo();
    logicaSuelo();
    gravedad();
    colision();
    logicaCactus();

    dibujaCactus();
    dibujaRex();
    puntuacion();    

}





