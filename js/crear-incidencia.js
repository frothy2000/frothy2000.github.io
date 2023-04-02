// constantes ...

const pn_user = document.getElementById('hero__user__container');

const list_inpunts = document.querySelectorAll('input');

const btn_success = document.querySelector('#btn_success');

const btn_cancel = document.querySelector('#btn_cancel');



const link_crearRegistro = document.getElementById('link_crearRegistro');

const link_inicio = document.querySelector('#link_inicio');

const link_verRegistros = document.getElementById('link_verRegistros');

const link_verIncidencias = document.getElementById('link_verIncidencias');

const link_asignarPrivilegio = document.getElementById('asignarPrivilegio');

const link_quitarPrivilegio = document.getElementById('quitarPrivilegio');

const link_validarPlanillas = document.getElementById('link_validarPlanillas');

const link_crearIncidencia = document.getElementById('link_crearIncidencia');

const link_escanearSolapines = document.getElementById('link_escanearSolapines');



const user = document.querySelector('#hero__user__container .user__name');

const rol = document.querySelector('#hero__user__container .user__rol');

var url_path_params = '';


const fields = {
    
    nombre_usuario: false,
    apellidos_usuario: false,
    solapin_usuario: false
}

const expresions = {
    
    nombre_usuario: /^(([A-Z]{1})+([a-zA-ZÀ-ÿ]{1,20})+ +([A-Z]{1})+([a-z]{1,20}))|(([A-Z]{1})+([a-zA-ZÀ-ÿ]{1,20}))$/,
    apellidos_usuario: /^([A-Z]{1})+([a-zA-ZÀ-ÿ\s]{1,29})+ +([A-Z]{1})+([a-z]{1,28})$/,
    solapin_usuario: /^E-+\d{6}$/
}






// metodos autoejecutables de roles ...

const get_params_url = () => {

    let url = window.location.href;

    if (url.toString().includes('?'))
    {
        if (url.toString().includes('&'))
        {
            let arr_params = url.toString().split('?')[1].split('&');
            return arr_params;
        }

        let arr_params = [url.toString().split('?')[1]];
        return arr_params;
    }

    return null;
}

const change_navbar_links = (rol) => {

    list_links = document.querySelectorAll('.hero__links .link');
    
    if (rol == 'DSI')
    {
        list_links.forEach(link => {
        
            if (link.textContent.toString().toLowerCase().includes('administrar privilegios'))
            {
                link.classList.remove('link--hidden');
            }
    
            if (link.textContent.toString().toLowerCase().includes('validar planillas'))
            {
                link.classList.remove('link--hidden');
            }
            
    
        });
    }

    if (rol == 'DSP')
    {
        list_links.forEach(link => {
    
            if (link.textContent.toString().toLowerCase().includes('validar planillas'))
            {
                link.classList.remove('link--hidden');
            }
    
        });
    }

    if (rol == 'CUS')
    {
        list_links.forEach(link => {
    
            if (link.textContent.toString().toLowerCase().includes('crear incidencia'))
            {
                link.classList.remove('link--hidden');
            }

            if (link.textContent.toString().toLowerCase().includes('ver registros'))
            {
                link.classList.add('link--hidden');
            }
    
            if (link.textContent.toString().toLowerCase().includes('chequear entrada'))
            {
                link.classList.remove('link--hidden');
            }
        });
    }
    
}

const set_url_path_params = () => {

    let aux = window.location.href.toString();

    if (aux.includes('?'))
    {
        url_path_params = '?' + aux.split('?')[1];
    }
}

(() => {
    
    let arr_params = get_params_url();
    
    set_url_path_params();

    if (arr_params != null)
    {   
        for (let param of arr_params)
        {
            if (param === 'rol=3')
            {
                rol.textContent = 'Jefe de Seguridad Informática';
                change_navbar_links('DSI'); 
            }

            if (param === 'rol=4')
            {
                rol.textContent = 'Jefe de Seguridad y Protección';
                change_navbar_links('DSP'); 
            }

            if (param === 'rol=5')
            {
                rol.textContent = 'Custodio';
                change_navbar_links('CUS'); 
            }

            if (param.includes('user='))
            {
                let user_name = param.split('=')[1];
                
                user.textContent = user_name;
            }
        }
    }   

    
    

})();



// metodos ....

const form_validate = (e) => {

    switch (e.target.name)
    {
        case "nombre_usuario":
            validate (expresions.nombre_usuario, e.target, 'nombre_usuario');
        break;

        case "apellidos_usuario":
            validate (expresions.apellidos_usuario, e.target, 'apellidos_usuario');
        break;

        case "solapin_usuario":
            validate (expresions.solapin_usuario, e.target, 'solapin_usuario');
        break;

        case "motivo":
            validate (expresions.motivo, e.target, 'motivo');
        break;

    }

}

const validate = (expresion, input, field) => {

    if (expresion.test(input.value)) 
    {
        document.getElementById(`field__error__msg--${field}`).classList.add('field__error__msg--hidden');
        input.classList.remove('txt--error');
        input.classList.add('txt--success');
        fields[field] = true;
    }
    else if (input.value.length == 0)
    {
        document.getElementById(`field__error__msg--${field}`).classList.add('field__error__msg--hidden');
        input.classList.add('txt--error');
        input.classList.remove('txt--success');
        fields[field] = false;
    }
    else
    {
        document.getElementById(`field__error__msg--${field}`).classList.remove('field__error__msg--hidden');
        input.classList.add('txt--error');
        input.classList.remove('txt--success');
        fields[field] = false;
    }
}





// eventos o disparadores ...

pn_user.addEventListener('click', ()=> {
    
    let opt = confirm('Seguro que desea cerrar sesión:')
        if (opt)
        {
            window.location.href = 'inicio-sesion.html';
        }
})

list_inpunts.forEach((input) => {
    input.addEventListener('keyup', form_validate);
    input.addEventListener('blur', form_validate);
})

btn_success.addEventListener('click', () => {
    
    if (fields.nombre_usuario && fields.apellidos_usuario && fields.solapin_usuario)
    {
        
        let opt = confirm('Seguro que desea aplicar los cambios realizados:')
        if (opt)
        {
            window.location.href = 'admin-ver-registrosMTP.html' + url_path_params.toString();
        }
    }
    else
    {
        document.getElementById('panel__alert').classList.add('panel__alert--show');
        setTimeout(() => {
            document.getElementById('panel__alert').classList.add('panel__alert--hidden');
            setTimeout(() => {
                document.getElementById('panel__alert').classList.remove('panel__alert--show');
                document.getElementById('panel__alert').classList.remove('panel__alert--hidden');
            }, 600);
        }, 5000);

    }
})

btn_cancel.addEventListener('click', () => {

    let opt = confirm('Seguro que desea descartar los cambios realizados:')
    if (opt)
    {
        window.location.href = 'admin-ver-registrosMTP.html' + url_path_params.toString();
    }
})




link_crearRegistro.addEventListener('click', ()=> {
    let opt = confirm('Seguro que desea descartar los cambios realizados:')
    if (opt)
    {
        window.location.href = 'admin-crear-registroMTP.html' + url_path_params.toString();
    }
})

link_inicio.addEventListener('click', () => {

    let opt = confirm('Seguro que desea descartar los cambios realizados:')
    if (opt)
    {
        window.location.href = 'admin-ver-registrosMTP.html' + url_path_params.toString();
    }
        
})

link_verRegistros.addEventListener('click', ()=> {
    let opt = confirm('Seguro que desea descartar los cambios realizados:')
    if (opt)
    {
        window.location.href = 'admin-ver-registrosMT.html' + url_path_params.toString();
    }
})

link_verIncidencias.addEventListener('click', ()=> {
    let opt = confirm('Seguro que desea descartar los cambios realizados:')
    if (opt)
    {
        window.location.href = 'admin-ver-incidencias.html' + url_path_params.toString();
    }
})

link_asignarPrivilegio.addEventListener('click', () => {
    let opt = confirm('Seguro que desea descartar los cambios realizados:')
    if (opt)
    {
        window.location.href = 'admin-asignar-privilegio.html' + url_path_params.toString();
    }
})

link_quitarPrivilegio.addEventListener('click', () => {
    let opt = confirm('Seguro que desea descartar los cambios realizados:')
    if (opt)
    {
        window.location.href = 'admin-quitar-privilegio.html' + url_path_params.toString();
    }
   
})

link_validarPlanillas.addEventListener('click', () => {
    let opt = confirm('Seguro que desea descartar los cambios realizados:')
    if (opt)
    {
        window.location.href = 'admin-ver-planillas-validar.html' + url_path_params.toString();
    }
    
})

link_escanearSolapines.addEventListener('click', () => {
    let opt = confirm('Seguro que desea descartar los cambios realizados:')
    if (opt)
    {
        window.location.href = 'admin-escanear-solapines.html' + url_path_params.toString();
    }

})