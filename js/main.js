/**
 * 临床营养管理系统官网
 * 主JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const mobileToggle = document.querySelector('.mobile-toggle');
    const header = document.querySelector('.header');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            header.classList.toggle('mobile-menu-active');
            
            // 切换汉堡菜单动画
            const spans = this.querySelectorAll('span');
            spans.forEach(function(span) {
                span.classList.toggle('active');
            });
        });
    }
    
    // 点击页面其他区域关闭移动端菜单
    document.addEventListener('click', function(event) {
        if (header.classList.contains('mobile-menu-active') && 
            !event.target.closest('.mobile-toggle') && 
            !event.target.closest('.nav-menu') &&
            !event.target.closest('.nav-buttons')) {
            header.classList.remove('mobile-menu-active');
            
            // 重置汉堡菜单
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(function(span) {
                span.classList.remove('active');
            });
        }
    });
    
    // 返回顶部按钮
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        // 监听滚动事件，显示/隐藏返回顶部按钮
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // 点击返回顶部按钮
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 滚动时添加导航栏阴影
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 数字计数动画
    const counters = document.querySelectorAll('.counter');
    
    function startCounting() {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            
            let current = 0;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // 当元素进入视口时开始计数
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // 表单提交处理
    const demoForm = document.getElementById('demo-form');
    
    if (demoForm) {
        demoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(demoForm);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // 模拟表单提交
            console.log('表单数据：', data);
            
            // 表单提交成功提示
            alert('感谢您的预约！我们的客服会尽快与您联系。');
            
            // 清空表单
            demoForm.reset();
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // 如果是移动端菜单点击，则关闭菜单
                if (header.classList.contains('mobile-menu-active')) {
                    header.classList.remove('mobile-menu-active');
                    
                    // 重置汉堡菜单
                    const spans = mobileToggle.querySelectorAll('span');
                    spans.forEach(function(span) {
                        span.classList.remove('active');
                    });
                }
            }
        });
    });
    
    // 添加动画效果
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .solution-item, .case-item');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // 如果元素进入视口
            if (position.top < window.innerHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);
    
    // 页面加载时初始检查
    animateOnScroll();
}); 