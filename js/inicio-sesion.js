
// constantes ....

const list__inputs = document.querySelectorAll('input');

const form = document.getElementById("form");

const fields = {
    user: false,
    pass: false
}

const expresions = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
    password: /^.{4,12}$/
    
}


// metodos ...

const form_validate = (e) => {

    switch (e.target.name)
    {
        case "user":
            validate (expresions.usuario, e.target, 'user');
        break;

        case "pass":
            validate (expresions.password, e.target, 'pass');
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
        input.classList.remove('txt--error');
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

const show_msg_error = () => {

    document.querySelector('#field__error__msg--pass .error__msg').innerHTML = 'Nombre de usario y contraseña incorrectos.';
    document.querySelector('#field__error__msg--pass .error__msg').classList.add('error__msg--center');
    document.getElementById('field__error__msg--pass').classList.remove('field__error__msg--hidden');
    document.getElementById('pass').value = '';
    document.getElementById('pass').classList.remove('txt--success');
    fields.pass = false;


    setTimeout(() => {
        
        document.querySelector('#field__error__msg--pass .error__msg').innerHTML = 'Solo se admiten de 4 a 12 caracteres.';
        document.querySelector('#field__error__msg--pass .error__msg').classList.remove('error__msg--center');
        document.getElementById('field__error__msg--pass').classList.add('field__error__msg--hidden');
        

    }, 3000);
}

// eventos o disparadores ...

list__inputs.forEach((input) => {
    input.addEventListener('keyup', form_validate);
    input.addEventListener('blur', form_validate);
});

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    if (fields.user && fields.pass)
    {
        if (document.getElementById('user').value === 'alexpm' && document.getElementById('pass').value === 'usuario')
        {
            window.location.href = 'user-ver-registrosMTP.html';
        }
        else if (document.getElementById('user').value === 'carlosoj' && document.getElementById('pass').value === 'supervisor')
        {
            window.location.href = 'admin-ver-registrosMTP.html';
        }
        else if (document.getElementById('user').value === 'oscarppt' && document.getElementById('pass').value === 'directorsi')
        {
            window.location.href = 'admin-ver-registrosMTP.html?user=oscarppt&rol=3';
        }
        else if (document.getElementById('user').value === 'rodrigopm' && document.getElementById('pass').value === 'directorsp')
        {
            window.location.href = 'admin-ver-registrosMTP.html?user=rodrigopm&rol=4';
        }
        else if (document.getElementById('user').value === 'davidss' && document.getElementById('pass').value === 'custodio')
        {
            window.location.href = 'admin-ver-registrosMTP.html?user=davidss&rol=5';
        }
        else
        {
            show_msg_error();
        }
    }
    else
    {
        if (document.getElementById('user').value.length == 0 || document.getElementById('pass').value.length == 0)
        {
            show_msg_error();
        }
        
    }
});