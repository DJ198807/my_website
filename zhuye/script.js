// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动到指定区域
    initSmoothScrolling();
    
    // 导航栏滚动效果
    initNavbarScrollEffect();
    
    // 技能条动画
    initSkillBarsAnimation();
    
    // 响应式导航菜单
    initResponsiveNav();
    
    // 添加滚动显示动画
    initScrollReveal();
});

// 平滑滚动功能
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 减去导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏滚动效果
function initNavbarScrollEffect() {
    const navbar = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加/移除背景透明度效果
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(26, 54, 93, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #1a365d 0%, #2d5a87 100%)';
            navbar.style.backdropFilter = 'none';
        }
        
        // 隐藏/显示导航栏（可选功能）
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 技能条动画
function initSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    
    // 创建观察者来触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.style.width;
                        bar.style.animation = 'skillFill 1s ease-out forwards';
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// 响应式导航菜单
function initResponsiveNav() {
    const navbar = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // 创建移动端菜单按钮
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    navbar.appendChild(menuButton);
    
    // 切换移动端菜单
    menuButton.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
        this.innerHTML = navLinks.classList.contains('mobile-active') ? '✕' : '☰';
    });
    
    // 响应式显示/隐藏菜单按钮
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
            navLinks.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #1a365d;
                flex-direction: column;
                padding: 1rem 0;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            `;
        } else {
            menuButton.style.display = 'none';
            navLinks.style.cssText = `
                position: static;
                background: transparent;
                flex-direction: row;
                padding: 0;
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            `;
        }
    }
    
    // 添加移动端菜单激活样式
    const style = document.createElement('style');
    style.textContent = `
        .nav-links.mobile-active {
            transform: translateY(0) !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
    `;
    document.head.appendChild(style);
    
    // 初始检查和窗口大小改变时检查
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// 滚动显示动画
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.section:not(#hero)');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 添加技能条填充动画的CSS
const skillFillStyle = document.createElement('style');
skillFillStyle.textContent = `
    @keyframes skillFill {
        0% {
            width: 0%;
        }
        100% {
            width: var(--target-width);
        }
    }
    
    .skill-progress {
        --target-width: attr(data-width);
    }
`;
document.head.appendChild(skillFillStyle);

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加打字机效果到标题（可选功能）
function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// 为联系表单添加功能（如果需要的话）
function initContactForm() {
    // 这里可以添加联系表单的功能
    console.log('联系功能已准备就绪');
}

// 添加一些交互式提示
function addInteractiveTooltips() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 初始化交互式提示
document.addEventListener('DOMContentLoaded', function() {
    addInteractiveTooltips();
    initContactForm();
});