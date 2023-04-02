// constantes ...

const pn_user = document.getElementById('hero__user__container');

const input = document.querySelector('input');

const btn_success = document.getElementById('btn_success');


const link_crearRegistro = document.getElementById('link_crearRegistro');

const link_inicio = document.querySelector('#link_inicio');

const link_verRegistros = document.getElementById('link_verRegistros');

const link_verIncidencias = document.getElementById('link_verIncidencias');

const link_asignarPrivilegio = document.getElementById('asignarPrivilegio');

const link_quitarPrivilegio = document.getElementById('quitarPrivilegio');

const link_validarPlanillas = document.getElementById('link_validarPlanillas');


const user = document.querySelector('#hero__user__container .user__name');

const rol = document.querySelector('#hero__user__container .user__rol');

var url_path_params = '';


const fields = {

    usuario: false
}

const expresions = {

    usuario: /^[a-zA-Z0-9]{4,20}$/
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

            if (param.includes('user='))
            {
                let user_name = param.split('=')[1];
                
                user.textContent = user_name;
            }
        }
    }   

    
    

})();




// metodos ...

const form_validate = (e) => {

    switch (e.target.name)
    {
        case "usuario":
            validate (expresions.usuario, e.target, 'usuario');
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

input.addEventListener('keyup', form_validate);
input.addEventListener('blur', form_validate);


pn_user.addEventListener('click', ()=> {
    
    let opt = confirm('Seguro que desea cerrar sesión:')
        if (opt)
        {
            window.location.href = 'inicio-sesion.html';
        }
})

btn_success.addEventListener('click', () => {
    
    if (fields.usuario)
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
})


link_crearRegistro.addEventListener('click', ()=> {
    
    window.location.href = 'admin-crear-registroMTP.html' + url_path_params.toString();
})

link_inicio.addEventListener('click', () => {

    window.location.href = 'admin-ver-registrosMTP.html' + url_path_params.toString();
})

link_verRegistros.addEventListener('click', ()=> {
    
    window.location.href = 'admin-ver-registrosMT.html' + url_path_params.toString();
})

link_verIncidencias.addEventListener('click', ()=> {
    
    window.location.href = 'admin-ver-incidencias.html' + url_path_params.toString();
})

link_asignarPrivilegio.addEventListener('click', () => {
    
    window.location.href = 'admin-asignar-privilegio.html' + url_path_params.toString();
})

link_quitarPrivilegio.addEventListener('click', () => {
    
    window.location.href = 'admin-quitar-privilegio.html' + url_path_params.toString();
})

link_validarPlanillas.addEventListener('click', () => {
    
    window.location.href = 'admin-ver-planillas-validar.html' + url_path_params.toString();
    
})