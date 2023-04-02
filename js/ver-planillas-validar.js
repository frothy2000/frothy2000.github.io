// constantes ....

const list_panel = document.getElementsByClassName('section__panel');

const pn_user = document.getElementById('hero__user__container');

const link_inicio = document.getElementById('link_inicio');

const link_crearRegistro = document.getElementById('link_crearRegistro');

const link_verRegistros = document.getElementById('link_verRegistros');

const link_verIncidencias = document.getElementById('link_verIncidencias');

const link_asignarPrivilegio = document.getElementById('asignarPrivilegio');

const link_quitarPrivilegio = document.getElementById('quitarPrivilegio');

const link_validarPlanillas = document.getElementById('link_validarPlanillas');



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




// metodos ...

const click_panel = () => {
    window.location.href = 'admin-validar-planilla.html' + url_path_params.toString();
}



// eventos o disparadores ...

for(let i=0;i<list_panel.length;i++)
{
    list_panel[i].addEventListener('click', click_panel);
}

pn_user.addEventListener('click', ()=> {
    
    let opt = confirm('Seguro que desea cerrar sesión:')
        if (opt)
        {
            window.location.href = 'inicio-sesion.html';
        }
})


link_inicio.addEventListener('click', () => {

    window.location.href = 'admin-ver-registrosMTP.html' + url_path_params.toString();

})

link_crearRegistro.addEventListener('click', ()=> {
    
    window.location.href = 'admin-crear-registroMTP.html' + url_path_params.toString();
})

link_verRegistros.addEventListener('click', ()=> {
    
    window.location.href = 'admin-ver-registrosMT.html' + url_path_params.toString();
})

link_verIncidencias.addEventListener('click', ()=> {
    
    window.location.href = 'admin-ver-incidencias.html'  + url_path_params.toString();
})

link_asignarPrivilegio.addEventListener('click', () => {
    
    window.location.href = 'admin-asignar-privilegio.html' + url_path_params.toString();
})

link_quitarPrivilegio.addEventListener('click', () => {
    
    window.location.href = 'admin-quitar-privilegio.html'  + url_path_params.toString();
})
