var app={
    inicio: function(){
        this.iniciaFastClick();
        this.iniciaBoton();
    },

    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },
    
    iniciaBoton: function(){        
        var buttonAction = document.querySelector('#button-action');
        buttonAction.addEventListener('click', function(){
            app.cargarFoto(Camera.PictureSourceType.CAMERA);
        });
        
        var filterButtons = document.querySelectorAll('.button-filter');
        filterButtons[0].addEventListener('click', function() {
          app.aplicaFiltro('gray');
        });
        filterButtons[1].addEventListener('click', function() {
          app.aplicaFiltro('negative');
        });
        filterButtons[2].addEventListener('click', function() {
          app.aplicaFiltro('sepia');
        });  
        
        var buttonGallery = document.querySelector('#button-gallery');
        buttonGallery.addEventListener('click', function(){
            app.cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
        });
    },
    
    cargarFoto: function(pictureSourceType){
        var calidad = document.querySelector('#input-quality');
        var selfie = document.querySelector('#input-selfie');
        var enGaleria = document.querySelector('#input-save-gallery');
        var camaraDireccion;
        
        if (selfie.checked) {
            camaraDireccion = Camera.Direction.FRONT;
        }
        else {
            camaraDireccion = Camera.Direction.BACK;
        };
        
        var opciones = {
          quality: calidad.value,
          sourceType: pictureSourceType,
          destinationType: Camera.DestinationType.FILE_URI,
          targetWidth: 300,
          targetHeight: 300,
          correctOrientation: true,
          cameraDirection: camaraDireccion,
          saveToPhotoAlbum: enGaleria.checked
        };
        navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
    },

    fotoTomada: function(imageURI){
        var img = document.createElement('img');
        img.onload = function(){
            app.pintarFoto(img);
        }
        img.src = imageURI;
    },
    
    pintarFoto: function(img){
        var canvas = document.querySelector('#foto');
        var context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
    },
    
    errorAlTomarFoto: function(message){
        console.log('Fallo al tomar foto o toma cancelada: ' + message);
    },
    
    aplicaFiltro: function(filterName){
        var canvas = document.querySelector('#foto');
        var context = canvas.getContext('2d');
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        effects[filterName](imageData.data);

        context.putImageData(imageData, 0, 0);
    }
};

if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded',function() {
        app.inicio();
    },false);
}
