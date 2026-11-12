// script.js

// 等待 DOM 載入完成
document.addEventListener('DOMContentLoaded', function() {
    // ========== 輪播功能 ==========
    const carousel = document.querySelector('.carousel-slide');
    // 只有在首頁有輪播元素時才執行
    if (carousel) {
        const images = carousel.querySelectorAll('img');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('dotsContainer');
        const totalImages = images.length;
        let currentIndex = 0;
        let autoSlideInterval;

        // 建立圓點
        function createDots() {
            for (let i = 0; i < totalImages; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.dataset.index = i;
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }

        // 更新圓點狀態
        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // 切換到指定索引的圖片
        function goToSlide(index) {
            if (index < 0) index = totalImages - 1;
            if (index >= totalImages) index = 0;
            currentIndex = index;
            carousel.style.transform = `translateX(-${currentIndex * (100 / totalImages)}%)`;
            updateDots();
        }

        // 下一張
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        // 上一張
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        // 自動輪播
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }

        // 重置自動輪播 (使用者互動後)
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // 初始化
        createDots();
        // 設定初始位置 (第一個)
        carousel.style.transform = 'translateX(0%)';
        startAutoSlide();

        // 按鈕事件
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        // 滑鼠移入暫停自動輪播
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });

        // 觸控裝置支援 (簡易)
        let touchStartX = 0;
        let touchEndX = 0;
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                nextSlide();
                resetAutoSlide();
            } else if (touchEndX - touchStartX > 50) {
                prevSlide();
                resetAutoSlide();
            }
        }, { passive: true });
    }

    // ========== 聯絡表單 (簡易回饋) ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 簡單的提示，實際可改為 AJAX 或後端處理
            alert('感謝你的訊息！我們會盡快與你聯絡 🌟');
            contactForm.reset();
        });
    }

    // ========== 產品頁面「加入購物車」按鈕 (趣味互動) ==========
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 按鈕回饋動畫
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            // 可以替換為更精緻的提示
            alert('已加入購物車！青春果漾陪你每一天 💖');
        });
    });
});
