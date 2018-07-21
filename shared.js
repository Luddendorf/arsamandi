var backdrop = document.querySelector('.backdrop');

var modal = document.querySelector('.modal');

var selectPlanButtons = document.querySelectorAll('.plan button');

var toggleButton = document.querySelector('.toggle-button');

var mobileNav = document.querySelector('.mobile-nav');


//backdrop.style.display = 'block';
for (var i = 0; i < selectPlanButtons.length; i++) {
  selectPlanButtons[i].addEventListener('click', function() {
    modal.classList.add('open');
    backdrop.classList.add('open');
  });
}

backdrop.addEventListener('click', function() {
	mobileNav.style.display = 'none';
	closeModal();
});

// modalNoButton.addEventListener('click', closeModal);

function closeModal() {
  modal.classList.remove('open');
  backdrop.classList.remove('open');
}

toggleButton.addEventListener('click', function() {
   mobileNav.style.display = 'block';
   backdrop.style.display = 'block';
});
