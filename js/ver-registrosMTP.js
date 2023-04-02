

// constantes ....

const list_panel = document.getElementsByClassName('section__panel');

const pn_user = document.getElementById('hero__user__container');


// metodos ...

click_panel = () => {
    window.location.href = 'user-modificar-registroMTP.html';
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

