var appSistema = new Vue({
    el:'#appSistema',
    data: {
        forms:{
            'registro':{mostrar:false},
            'matricula':{mostrar:false},
            'materias':{mostrar:false}
        }
    }
});
document.addEventListener('DOMContentLoaded', e=>{
    let formularios = document.querySelectorAll('.mostrar').forEach(formulario=>{
        formulario.addEventListener('click', evento=>{
            let formulario = evento.target.dataset.form;
            appSistema.forms[formulario].mostrar = true;
        });
    });
});