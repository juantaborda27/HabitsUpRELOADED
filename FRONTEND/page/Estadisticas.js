document.addEventListener('DOMContentLoaded', function() {
    // Inicializar iconos de Lucide
    lucide.createIcons();

    // Función para obtener datos reales de localStorage
    function getHabitsData() {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        const today = new Date().toDateString();

        const totalHabits = habits.length;
        const completedToday = habits.filter(h => h.lastCompletedDate === today).length;
        const currentStreak = calculateStreak(habits);
        const focusTime = calculateFocusTime(habits);
        const weeklyProgress = calculateWeeklyProgress(habits);
        const habitsDistribution = calculateHabitsDistribution(habits);

        return {
            totalHabits,
            completedToday,
            currentStreak,
            focusTime,
            weeklyProgress,
            habitsDistribution
        };
    }

    // Función para calcular la racha actual
    function calculateStreak(habits) {
        let streak = 0;
        const today = new Date().setHours(0, 0, 0, 0);
        
        for (let i = 0; i < habits.length; i++) {
            const habitDate = new Date(habits[i].lastCompletedDate).setHours(0, 0, 0, 0);
            if (today - habitDate === streak * 86400000) { // 86400000 ms en un día
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    // Función para calcular el tiempo total en modo focus
    function calculateFocusTime(habits) {
        // Aquí deberías implementar la lógica real para calcular el tiempo en focus
        // Por ahora, retornamos un valor de ejemplo
        return 3.5;
    }

    // Función para calcular el progreso semanal
    function calculateWeeklyProgress(habits) {
        const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const progress = new Array(7).fill(0);
        const today = new Date();
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        habits.forEach(habit => {
            const habitDate = new Date(habit.lastCompletedDate);
            if (habitDate >= oneWeekAgo && habitDate <= today) {
                const dayIndex = habitDate.getDay();
                progress[dayIndex]++;
            }
        });

        return weekDays.map((day, index) => ({
            x: day,
            y: progress[index]
        }));
    }

    // Función para calcular la distribución de hábitos basada en días consecutivos
    function calculateHabitsDistribution(habits) {
        // Ordenar hábitos por días consecutivos (streak) de mayor a menor
        const sortedHabits = habits.sort((a, b) => b.streak - a.streak);
        
        // Tomar los top 5 hábitos o menos si hay menos de 5
        const topHabits = sortedHabits.slice(0, 5);
        
        return topHabits.map(habit => ({
            x: habit.name,
            y: habit.streak
        }));
    }

    // Obtener datos reales
    const habitsData = getHabitsData();

    // Actualizar estadísticas de resumen
    document.getElementById('total-habits').textContent = habitsData.totalHabits;
    document.getElementById('completed-habits').textContent = habitsData.completedToday;
    document.getElementById('current-streak').textContent = habitsData.currentStreak;
    document.getElementById('focus-time').textContent = habitsData.focusTime + 'h';

    // Gráfico de Progreso Semanal
    const weeklyProgressOptions = {
        series: [{
            name: 'Hábitos Completados',
            data: habitsData.weeklyProgress.map(item => item.y)
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
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#3A1078',
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: '#4E31AA',
                        opacity: 1
                    },
                ]
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
            categories: habitsData.weeklyProgress.map(item => item.x),
            labels: {
                style: {
                    colors: '#333',
                    fontSize: '14px',
                    fontWeight: 600
                }
            }
        },
        yaxis: {
            title: {
                text: 'Hábitos Completados',
                style: {
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: 600
                }
            },
            labels: {
                style: {
                    colors: '#333',
                    fontSize: '12px'
                }
            }
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        markers: {
            size: 6,
            colors: ['#4E31AA'],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: {
                size: 8,
            }
        },
        theme: {
            mode: 'light', 
            palette: 'palette1', 
            monochrome: {
                enabled: false,
                color: '#3A1078',
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        },
        title: {
            text: 'Progreso Semanal de Hábitos',
            align: 'center',
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#333'
            }
        }
    };

    const weeklyProgressChart = new ApexCharts(document.querySelector("#weekly-progress-chart"), weeklyProgressOptions);
    weeklyProgressChart.render();

    // Gráfico de Distribución de Hábitos (sin cambios)
    const habitsDistributionOptions = {
        series: habitsData.habitsDistribution.map(item => item.y),
        chart: {
            width: '100%',
            height: 500,
            type: 'pie',
        },
        labels: habitsData.habitsDistribution.map(item => item.x),
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300,
                    height: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        colors: ['#3A1078', '#4E31AA', '#2F58CD', '#3795BD', '#4FBDBA'],
        tooltip: {
            y: {
                formatter: function(value) {
                    return value + " días consecutivos";
                }
            }
        },
        legend: {
            position: 'right',
            offsetY: 50,
            height: 230,
            formatter: function(seriesName, opts) {
                return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex], " días"];
            }
        },
        title: {
            text: 'Top Hábitos por Días Consecutivos',
            align: 'center',
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex] + ' días';
            },
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                colors: ['#fff']
            },
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 1,
                left: 1,
                blur: 1,
                opacity: 0.45
            }
        }
    };

    const habitsDistributionChart = new ApexCharts(document.querySelector("#habits-distribution-chart"), habitsDistributionOptions);
    habitsDistributionChart.render();

    // Toggle sidebar en móviles
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });
});