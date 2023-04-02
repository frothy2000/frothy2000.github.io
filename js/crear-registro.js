
// constantes ...
const list_inpunts = document.querySelectorAll('input');

const btn_sucess = document.querySelector('#success');

const btn_cancel = document.querySelector('#cancel');

const externo_rb = document.getElementById('externo_rb');

const interno_rb = document.getElementById('interno_rb');

const link_inicio = document.getElementById('link_inicio');

const pn_user = document.getElementById('hero__user__container');

const fields = {
    
    nombre: false,
    apellidos: false,
    ci: false,
    solapin: false,
    area: false,

    direccion: false,
    apartamento: false,
    telefono: false,

    no_serie: false
}

const expresions = {
    
    nombre: /^(([A-Z]{1})+([a-zA-ZÀ-ÿ]{1,20})+ +([A-Z]{1})+([a-z]{1,20}))|(([A-Z]{1})+([a-zA-ZÀ-ÿ]{1,20}))$/,
    apellidos: /^([A-Z]{1})+([a-zA-ZÀ-ÿ\s]{1,29})+ +([A-Z]{1})+([a-z]{1,28})$/,
    ci: /^[0-9]{11}$/,
    solapin:/^E-+\d{6}$/,
    area: /^[a-zA-ZÀ-ÿ0-9\s]{4,100}$/,
    direccion: /^[a-zA-ZÀ-ÿ0-9%&.,-_#\s][^@!$^*+=]{4,100}$/,
    apartamento: /^\d{5,6}$/,
    telefono: /^(\+537+\d{7})|(\+535+\d{7})$/,
    no_serie: /^[0-9]{4,20}$/
}



// metodos ...

const form_validate = (e) => {

    switch (e.target.name)
    {
        case "nombre":
            validate (expresions.nombre, e.target, 'nombre');
        break;

        case "apellidos":
            validate (expresions.apellidos, e.target, 'apellidos');
        break;

        case "ci":
            validate (expresions.ci, e.target, 'ci');
        break;

        case "solapin":
            validate (expresions.solapin, e.target, 'solapin');
        break;

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

        case "no_serie":
            validate (expresions.no_serie, e.target, 'no_serie');
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

const update_date = () => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();

    let aux = ''
    switch (month) 
    {
        case 1:
            aux = 'Enero';            
        break;

        case 2:
            aux = 'Febrero';            
        break;

        case 3:
            aux = 'Marzo';            
        break;

        case 4:
            aux = 'Abril';            
        break;

        case 5:
            aux = 'Mayo';            
        break;

        case 6:
            aux = 'Junio';            
        break;

        case 7:
            aux = 'Julio';            
        break;

        case 8:
            aux = 'Agosto';            
        break;

        case 9:
            aux = 'Septiembre';            
        break;

        case 10:
            aux = 'Octubre';            
        break;

        case 11:
            aux = 'Noviembre';            
        break;

        case 12:
            aux = 'Diciembre';            
        break;
    }

    document.getElementById('date').innerHTML = `${day} de ${aux} de ${year}`;
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

update_date();

switch_radioButton();






// eventos o disparadores ...

list_inpunts.forEach((input) => {
    input.addEventListener('keyup', form_validate);
    input.addEventListener('blur', form_validate);
})

btn_sucess.addEventListener('click', () => {
    
    if (fields.nombre && fields.apellidos && fields.ci && fields.solapin && fields.area && fields.direccion && fields.telefono && fields.no_serie)
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

externo_rb.addEventListener('click', () => {

    switch_radioButton();
})

interno_rb.addEventListener('click', () => {

    switch_radioButton();
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

