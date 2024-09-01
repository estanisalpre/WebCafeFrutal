let socket = io();

//Funcion abrir el menu hamburguesa
//Declaramos constantes
const menu = document.getElementById("menu_hamburguesa");
const contWhatsapp = document.getElementById("contenedor_whatsapp");
const iconHamburguesa = document.getElementById('icon_hamburguesa');
const iconCerrarHamburguesa = document.getElementById('cerrar_menu');
iconHamburguesa.addEventListener('click', () => {
    menu.classList.add("visible");
    //Cerramos div whatsapp
    contWhatsapp.classList.add("invisible");
});

//Funcion cerrar el menu hamburguesa
iconCerrarHamburguesa.addEventListener('click', () => {
    menu.classList.remove("visible");
    //Abrimos div whatsapp
    contWhatsapp.classList.remove("invisible");
});

//Botón ingresar al panel admin
const adminButton = document.getElementById('adminButton');
const sectionForm = document.getElementById('sectionForm');
const backButton = document.getElementById('backButton');
const submitLogin = document.getElementById('submitLogin');
const logOutButton = document.getElementById('logOutButton');
const panelContainer = document.getElementById('panelContainer');

//Loguearse
if(submitLogin){
    submitLogin.addEventListener('click', (e) => {
        e.preventDefault();

        //Capturamos texto ingresado al usuario y contraseña
        const inputUserValue = document.getElementById('userName').value;
        const inputPasswordValue = document.getElementById('password').value;
        const userNameCredential = 'Armando2024';
        const passwordCredential = 'armando2024frutal';
        const errorMessage = document.getElementById('errorMessage');
        
        if(inputUserValue == userNameCredential && inputPasswordValue == passwordCredential){
            location.href = '/index.html#panelContainer';
            adminButton.style.display = 'none';
            logOutButton.style.display = 'block';
            panelContainer.style.display = 'block';
            sectionForm.style.display = 'none';
        } else {
            errorMessage.style.display = 'block';
        };
    });
};
//Abrir modal login
if(adminButton){
    adminButton.addEventListener('click', () => {
        location.href = '/index.html#sectionForm'
        sectionForm.style.display = 'flex';
    });
};
if(backButton){
    backButton.addEventListener('click', () => {
        location.href = '/index.html'
    });
};
//Cerrar sesión
if(logOutButton){
    logOutButton.addEventListener('click', () => {
        location.href = '/index.html'
    });
};

//Funciones de botones "quiero esto"
//Botones
const btnQuieroAnayansi = document.getElementById('quieroAnayansi');
const btnQuieroCochadas = document.getElementById('quieroCochadas');
const btnQuieroDeOrigen = document.getElementById('quieroDeOrigen');
const btnQuieroLunaAzul = document.getElementById('quieroLunaAzul');

btnQuieroAnayansi.addEventListener('click', () => {
    location.href = 'https://wa.me/573206214348?text=¡Hola!%20Quiero%20información%20sobre%20el%20Café%20Anayansi'
});
btnQuieroCochadas.addEventListener('click', () => {
    location.href = 'https://wa.me/573206214348?text=¡Hola!%20Quiero%20información%20sobre%20el%20Café%20Cochadas'
});
btnQuieroDeOrigen.addEventListener('click', () => {
    location.href = 'https://wa.me/573206214348?text=¡Hola!%20Quiero%20información%20sobre%20el%20Café%20De%20Origen'
});
btnQuieroLunaAzul.addEventListener('click', () => {
    location.href = 'https://wa.me/573206214348?text=¡Hola!%20Quiero%20información%20sobre%20el%20Café%20Luna%20Azul'
});

//Checkbox agotado o no
//Constantes y elementos del DOM
//Modales de agotado
const deOrigenAgotado = document.getElementById('deOrigenAgotado');
const anayansiAgotado = document.getElementById('anayansiAgotado');
const cochadasAgotado = document.getElementById('cochadasAgotado');
const lunaAzulAgotado = document.getElementById('lunaAzulAgotado');

//Checkboxs
const deOrigenCheckbox = document.getElementById('deOrigenCheckbox');
const anayansiCheckbox = document.getElementById('anayansiCheckbox')
const cochadasCheckbox = document.getElementById('cochadasCheckbox')
const lunaAzulCheckbox = document.getElementById('lunaAzulCheckbox')

//Segun el estado, emite el socket.emit para que se actualice en todas las sesiones
deOrigenCheckbox.addEventListener('change', function() {
    const estado = this.checked;
    socket.emit('productUpdated', {id: 'deOrigenCheckbox', estado: estado});
});
anayansiCheckbox.addEventListener('change', function() {
    const estado = this.checked;
    socket.emit('productUpdated', {id: 'anayansiCheckbox', estado: estado});
});
cochadasCheckbox.addEventListener('change', function() {
    const estado = this.checked;
    socket.emit('productUpdated', {id: 'cochadasCheckbox', estado: estado});
});
lunaAzulCheckbox.addEventListener('change', function() {
    const estado = this.checked;
    socket.emit('productUpdated', {id: 'lunaAzulCheckbox', estado: estado});
});

//Actualiza el estado de los productos
socket.on('updateProduct', (data) => {
    if (data.id === 'deOrigenCheckbox') {
        deOrigenCheckbox.checked = data.estado;
        deOrigenAgotado.style.display = data.estado ? 'flex' : 'none';
        btnQuieroDeOrigen.style.display = data.estado ? 'none' : 'block';
    } else if (data.id === 'anayansiCheckbox'){
        anayansiCheckbox.checked = data.estado;
        anayansiAgotado.style.display = data.estado ? 'flex' : 'none';
        btnQuieroAnayansi.style.display = data.estado ? 'none' : 'block';
    } else if (data.id === 'cochadasCheckbox'){
        cochadasCheckbox.checked = data.estado;
        cochadasAgotado.style.display = data.estado ? 'flex' : 'none';
        btnQuieroCochadas.style.display = data.estado ? 'none' : 'block';
    } else if (data.id === 'lunaAzulCheckbox'){
        lunaAzulCheckbox.checked = data.estado;
        lunaAzulAgotado.style.display = data.estado ? 'flex' : 'none';
        btnQuieroLunaAzul.style.display = data.estado ? 'none' : 'block';
    } 
});

/* function checkboxStatus(idcheckbox){
    
} */