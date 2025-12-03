// Простой слайдер с правильными направлениями
document.addEventListener('DOMContentLoaded', function() {
    const galleryTrack = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('prevBtn'); // теперь это стрелка вправо →
    const nextBtn = document.getElementById('nextBtn'); // теперь это стрелка влево ←
    const slides = document.querySelectorAll('.gallery-item');
    
    if (!galleryTrack || !prevBtn || !nextBtn) return;
    
    let position = 0;
    
    function updateSlider() {
        const slideWidth = slides[0] ? slides[0].offsetWidth + 25 : 300;
        
        // Определяем максимальную позицию
        const containerWidth = galleryTrack.parentElement.offsetWidth;
        const visibleSlides = Math.floor(containerWidth / slideWidth);
        const maxPosition = Math.max(0, slides.length - visibleSlides);
        
        // Ограничиваем позицию
        if (position > maxPosition) position = maxPosition;
        if (position < 0) position = 0;
        
        // Применяем трансформацию
        galleryTrack.style.transform = `translateX(${position * slideWidth}px)`;
        
        // Обновляем кнопки
        prevBtn.disabled = position >= maxPosition;
        nextBtn.disabled = position === 0;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
    
    // prevBtn (→) двигает ВПРАВО (увеличивает position)
    prevBtn.addEventListener('click', function() {
        position++;
        updateSlider();
    });
    
    // nextBtn (←) двигает ВЛЕВО (уменьшает position)
    nextBtn.addEventListener('click', function() {
        position--;
        updateSlider();
    });
    
    window.addEventListener('resize', updateSlider);
    updateSlider();
});
