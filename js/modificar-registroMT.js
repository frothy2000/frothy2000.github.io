// constantes ....

const pn_user = document.getElementById('hero__user__container');


const list_inpunts = document.querySelectorAll('input');

const btn_sucess = document.querySelector('#success');

const btn_cancel = document.querySelector('#cancel');

const externo_rb = document.getElementById('externo_rb');

const interno_rb = document.getElementById('interno_rb');


const link_crearRegistro = document.getElementById('link_crearRegistro');

const link_inicio = document.querySelector('#link_inicio');

const link_verRegistros = document.getElementById('link_verRegistros');

const link_verIncidencias = document.getElementById('link_verIncidencias');

const link_asignarPrivilegio = document.getElementById('asignarPrivilegio');

const link_quitarPrivilegio = document.getElementById('quitarPrivilegio');

const link_validarPlanillas = document.getElementById('link_validarPlanillas');


const fields = {
    
    area: true,
    direccion: true,
    apartamento: true,
    telefono: true,
    marca: true,
    modelo: true,
    noSerie: true,
    mac: true
}

const expresions = {
    
    area: /^[a-zA-ZÀ-ÿ0-9\s]{4,100}$/,
    direccion: /^[a-zA-ZÀ-ÿ0-9%&.,-_#\s][^@!$^*+=]{4,100}$/,
    apartamento: /^\d{5,6}$/,
    telefono: /^(\+537+\d{7})|(\+535+\d{7})$/,
    marca: /^[A-Z0-9-\s]{2,30}$/,
    modelo: /^[A-Z0-9-_\s]{2,30}$/,
    noSerie: /^[0-9]{3,20}$/,
    mac: /^([A-Z0-9]{2})+(:{1})+([A-Z0-9]{2})+(:{1})+([A-Z0-9]{2})+(:{1})+([A-Z0-9]{2})+(:{1})+([A-Z0-9]{2})+(:{1})+([A-Z0-9]{2})+$/
}


const user = document.querySelector('#hero__user__container .user__name');

const rol = document.querySelector('#hero__user__container .user__rol');

var url_path_params = '';




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
    
            if (link.textContent.toString().toLowerCase().includes('escanear solapines'))
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



// metodoss ...

const form_validate = (e) => {

    switch (e.target.name)
    {
        case "area":
            validate (expresions.area, e.target, 'area');
        break;

        case "direccion":
            validate (expresions.direccion, e.target, 'direccion');
        break;

        case "apartamento":
            validate (expresions.apartamento, e.target, 'apartamento');
        break;

        case "telefono":
            validate (expresions.telefono, e.target, 'telefono');
        break;

        case "marca":
            validate (expresions.marca, e.target, 'marca');
        break;

        case "modelo":
            validate (expresions.modelo, e.target, 'modelo');
        break;

        case "noSerie":
            validate (expresions.noSerie, e.target, 'noSerie');
        break;

        case "mac":
            validate (expresions.mac, e.target, 'mac');
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

const switch_radioButton = () => {

    if (document.getElementById('externo_rb').checked) 
    {
        document.getElementById('apartamento').setAttribute("style", "display: none");
        
    }
    else if (document.getElementById('interno_rb').checked)
    {
        document.getElementById('apartamento').setAttribute("style", "display: block");
        
    }
}

switch_radioButton();




// eventos o disparadores ...

list_inpunts.forEach((input) => {
    input.addEventListener('keyup', form_validate);
    input.addEventListener('blur', form_validate);
})



pn_user.addEventListener('click', ()=> {
    
    let opt = confirm('Seguro que desea cerrar sesión:')
        if (opt)
        {
            window.location.href = 'inicio-sesion.html';
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



btn_sucess.addEventListener('click', () => {
    
    if (fields.direccion && fields.area && fields.telefono && fields.marca && fields.modelo && fields.noSerie && fields.mac)
    {
        if(externo_rb.checked)
        {
            let opt = confirm('Seguro que desea aplicar los cambios realizados:')
            if (opt)
            {
                window.location.href = 'admin-ver-registrosMT.html' + url_path_params.toString();
            }
        }
        else if(interno_rb.checked && fields.apartamento)
        {
            let opt = confirm('Seguro que desea aplicar los cambios realizados:')
            if (opt)
            {
                window.location.href = 'admin-ver-registrosMT.html' + url_path_params.toString();
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
            window.location.href = 'admin-ver-registrosMT.html' + url_path_params.toString();
        }
})

externo_rb.addEventListener('click', () => {
    
    switch_radioButton();
})

interno_rb.addEventListener('click', () => {
    
    switch_radioButton();
})
