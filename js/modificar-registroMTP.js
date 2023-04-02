
// constantes ...
const list_inpunts = document.querySelectorAll('input');

const btn_sucess = document.querySelector('#success');

const btn_cancel = document.querySelector('#cancel');

const externo_rb = document.getElementById('externo_rb');

const interno_rb = document.getElementById('interno_rb');

const pn_user = document.getElementById('hero__user__container');

const link_inicio = document.querySelector('#link_inicio');

const link_crearRegistro = document.querySelector('#link_crearRegistro');






const fields = {
    
    area: true,
    direccion: true,
    apartamento: true,
    telefono: true
}

const expresions = {
    
    area: /^[a-zA-ZÀ-ÿ0-9\s]{4,100}$/,
    direccion: /^[a-zA-ZÀ-ÿ0-9%&.,-_#\s][^@!$^*+=]{4,100}$/,
    apartamento: /^\d{5,6}$/,
    telefono: /^(\+537+\d{7})|(\+535+\d{7})$/
}





// metodos ...

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

btn_sucess.addEventListener('click', () => {
    
    if (fields.direccion && fields.area && fields.telefono)
    {
        if(externo_rb.checked)
        {
            let opt = confirm('Seguro que desea aplicar los cambios realizados:')
            if (opt)
            {
                window.location.href = 'user-ver-registrosMTP.html';
            }
        }
        else if(interno_rb.checked && fields.apartamento)
        {
            let opt = confirm('Seguro que desea aplicar los cambios realizados:')
            if (opt)
            {
                window.location.href = 'user-ver-registrosMTP.html';
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
            window.location.href = 'user-ver-registrosMTP.html';
        }
})

link_inicio.addEventListener('click', () => {

    let opt = confirm('Seguro que desea descartar los cambios realizados:')
        if (opt)
        {
            window.location.href = 'user-ver-registrosMTP.html';
        }
})

pn_user.addEventListener('click', ()=> {
    
    let opt = confirm('Seguro que desea cerrar sesión:')
        if (opt)
        {
            window.location.href = 'inicio-sesion.html';
        }
})

externo_rb.addEventListener('click', () => {

    switch_radioButton();
})

interno_rb.addEventListener('click', () => {

    switch_radioButton();
})

link_crearRegistro.addEventListener('click', () => {

    let opt = confirm('Seguro que desea descartar los cambios realizados:')
        if (opt)
        {
            window.location.href = 'user-crear-registroMTP.html';
        }
})