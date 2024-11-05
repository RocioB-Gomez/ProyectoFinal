window.addEventListener('scroll', function() {
    const imagen = document.querySelector('.imagen');
    const seccion = document.getElementById('seccion-imagen');
    const rect = seccion.getBoundingClientRect();
    
    // Verifica si la sección está visible en la ventana
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        imagen.classList.add('visible'); // Agrega la clase visible si está en vista
    } else {
        imagen.classList.remove('visible'); // Elimina la clase si sale de vista
    }
});

function previewImage(event, querySelector){

	//Recuperamos el input que desencadeno la acción
	const input = event.target;
	
	//Recuperamos la etiqueta img donde cargaremos la imagen
	$imgPreview = document.querySelector(querySelector);

	// Verificamos si existe una imagen seleccionada
	if(!input.files.length) return
	
	//Recuperamos el archivo subido
	file = input.files[0];

	//Creamos la url
	objectURL = URL.createObjectURL(file);
	
	//Modificamos el atributo src de la etiqueta img
	$imgPreview.src = objectURL;
                
}
