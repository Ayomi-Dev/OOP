const bars = document.querySelector('.fa-bars'), 
container = document.querySelector('.container'),
menuItems = document.querySelectorAll('.menu-items')

bars.addEventListener('click', () =>{ //event function to toggle sidebar menu
    container.classList.toggle('active')
});

//function to toggle submenus

