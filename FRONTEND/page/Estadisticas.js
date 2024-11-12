document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Simulated data (replace with real data in a production environment)
    const habitsData = {
        totalHabits: 8,
        completedToday: 5,
        currentStreak: 7,
        focusTime: 3.5,
        weeklyProgress: [60, 75, 65, 80, 90, 70, 85],
        habitsDistribution: {
            'Ejercicio': 30,
            'Meditación': 20,
            'Lectura': 25,
            'Dieta': 15,
            'Estudio': 10
        }
    };

    // Update summary statistics
    document.getElementById('total-habits').textContent = habitsData.totalHabits;
    document.getElementById('completed-habits').textContent = habitsData.completedToday;
    document.getElementById('current-streak').textContent = habitsData.currentStreak;
    document.getElementById('focus-time').textContent = habitsData.focusTime + 'h';

    // Weekly Progress Chart
    const weeklyProgressOptions = {
        series: [{
            name: 'Progreso',
            data: habitsData.weeklyProgress
        }],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        xaxis: {
            categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            labels: {
                style: {
                    colors: '#333',
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Progreso (%)',
                style: {
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: 600
                }
            },
            min: 0,
            max: 100,
            labels: {
                style: {
                    colors: '#333',
                    fontSize: '12px'
                }
            }
        },
        colors: ['#3498db'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: function (val) {
                    return val + "%"
                }
            }
        }
    };

    const weeklyProgressChart = new ApexCharts(document.querySelector("#bar-chart"), weeklyProgressOptions);
    weeklyProgressChart.render();

    // Habits Distribution Chart
    const habitsDistributionOptions = {
        series: Object.values(habitsData.habitsDistribution),
        chart: {
            width: '100%',
            type: 'pie',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        labels: Object.keys(habitsData.habitsDistribution),
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        colors: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'],
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex] + '%'
            },
            style: {
                fontSize: '12px',
                colors: ['#fff']
            },
            dropShadow: {
                enabled: true,
                blur: 3,
                opacity: 0.8
            }
        },
        legend: {
            position: 'bottom',
            fontSize: '14px'
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: function (val) {
                    return val + "%"
                }
            }
        }
    };

    const habitsDistributionChart = new ApexCharts(document.querySelector("#area-chart"), habitsDistributionOptions);
    habitsDistributionChart.render();

    // Toggle sidebar on mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });
});