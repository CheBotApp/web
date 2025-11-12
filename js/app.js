document.addEventListener('DOMContentLoaded', function(){
	// Carousel simple: rota entre .chat-card
	(function(){
		const carousel = document.getElementById('chat-carousel');
		if (!carousel) return;

		const slides = Array.from(carousel.querySelectorAll('.chat-card'));
		if (slides.length <= 1) return;

		// empezar en la que ya tenga .active si existe
		let idx = slides.findIndex(s => s.classList.contains('active'));
		if (idx === -1) idx = 0;

		const intervalMs = 6000; // tiempo entre cambios
		let timer = null;

		function showSlide(nextIdx) {
			slides.forEach((s, i) => {
				s.classList.toggle('active', i === nextIdx);
			});
		}

		function start() {
			stop();
			timer = setInterval(() => {
				idx = (idx + 1) % slides.length;
				showSlide(idx);
			}, intervalMs);
		}

		function stop() {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		}

		// iniciar
		showSlide(idx);
		start();

		// pausar mientras el usuario lee (hover o focus)
		carousel.addEventListener('mouseenter', stop);
		carousel.addEventListener('mouseleave', start);
		carousel.addEventListener('focusin', stop);
		carousel.addEventListener('focusout', start);
	})();

	// Scroll reveal: añade clase cuando entra en viewport
	(function(){
		const reveals = document.querySelectorAll('.feature, .example, .chat-card, .hero-text');
		const io = new IntersectionObserver((entries) => {
			entries.forEach(e => {
				if(e.isIntersecting) e.target.classList.add('reveal');
			});
		},{threshold:0.12});
		reveals.forEach(r => io.observe(r));
	})();
});
