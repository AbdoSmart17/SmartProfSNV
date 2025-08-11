document.addEventListener('DOMContentLoaded', () => {
    // عناصر إضافة الجدول
    const scheduleForm = document.getElementById('schedule-form');
    const scheduleDaySelect = document.getElementById('schedule-day');
    const scheduleStartTimeInput = document.getElementById('schedule-start-time');
    const scheduleEndTimeInput = document.getElementById('schedule-end-time');
    const scheduleLevelSelect = document.getElementById('schedule-level-select');
    const scheduleClassNumberInput = document.getElementById('schedule-class-number');
    const scheduleTableBody = document.querySelector('#schedule-table tbody');

    // عناصر إضافة المهام
    const taskForm = document.getElementById('task-form');
    const taskDateInput = document.getElementById('task-date');
    const taskNotificationDurationInput = document.getElementById('task-notification-duration');
    const taskAlertTypeSelect = document.getElementById('task-alert-type');
    const taskClassSelect = document.getElementById('task-class-select');
    const taskFieldSelect = document.getElementById('task-field-select');
    const taskModuleSelect = document.getElementById('task-module-select');
    const taskActivitySelect = document.getElementById('task-activity-select');
    const taskText = document.getElementById('task-text');
    const tasksListDiv = document.getElementById('tasks-list');
    const enableNotificationsBtn = document.getElementById('enable-notifications-btn');

    // بيانات المناهج (نفس البيانات السابقة)
    const data = {
        'الأولى': {
            'الإنسان والصحة': {
                "التغذية عند الانسان ": ["مصدر الأغذية", "تركيب الأغذية (تحليل تركيب الحليب )", "تركيب الأغذية (تحليل تركيب أغذية اخرى )", "دور الأغذية في الجسم ", "الحاجيات الغذائية للعضوية ", "الراتب الغذائي ", "التوازن الغذائي (عواقب سوء التغذية )", "وضعية تعلم ادماج الموارد"],
                "التحصل على الطاقة عند الانسان": [" المبادلات الغازية التنفسية عند الانسان ", " المعنى البيولوجي للتنفس", " القواعد الصحية للتنفس ", " وضعية تعلم ادماج الموارد"],
                "الاطراح وثبات توازن الوسط الداخلي": [" تعريف الاطراح عند الانسان ", " دور أعضاء الاطراح ", " القواعد الصحية للاطراح ", " وضعية تعلم ادماج الموارد"],
                "التكاثر الجنسي عند الانسان": [" الأجهزة التكاثرية عند الانسان ", " الالقاح وشروطه", " القواعد الصحية للتكاثر ", " وضعية تعلم ادماج الموارد"],
                "الخلية": [" مفهوم الخلية ", " المجهر الضوئي ", "الخلية الحيوانية "],
            },
            'الإنسان والمحيط': {
                "التغذية عند النبات الأخضر": [" الحاجيات الغذائية للنبات الأخضر ", " تأثير تركيز المحلول المعدني على نمو النبات ", " مقر امتصاص المحلول المعدني", " المبادلات الغازية اليخضورية ومقرها ", " التركيب الضوئي وشروطه", " أهمية التحكم في شروط التركيب الضوئي ", " مسار النسغ الخام في النبات الأخضر ", " دور النتح في انتقال النسغ /مصير النسغ", " وضعية تعلم ادماج الموارد"],
                "التحصل على الطاقة عند النبات الأخضر": [" المبادلات الغازية التنفسية عند النبات الأخضر ", " مقر المبادلات الغازية التنفسية عند النبات الأخضر", " المعنى البيولوجي للتنفس عند النبات ", " اشكال أخرى للتحصل على الطاقة (التخمر)", " وضعية تعلم ادماج الموارد"],
                "التكاثر الجنسي عند النباتات الزهرية ": [" الأجهزة التكاثرية عند النبات الزهري", " الالقاح وشروطه", " وضعية تعلم ادماج الموارد"],
                "الخلية النباتية": [" مفهوم الخلية ", " المجهر الضوئي ", " الخلية النباتية "],
            }
        },
        'الثانية': {
            'الإنسان والمحيط': {
                "الوسط الحي": ["خصائص الوسط الحي", "العلاقات القائمة بين العناصر الحية في الوسط الحي", "تأثير العوامل الفيزيوكيميائية على توزع الكائنات الحية ونشاطها", "النظام البيئي وشروط توازنه", "دور الانسان في استقرار النظام البيئي", " وضعية تعلم ادماج الموارد"],
                "توزّع الكائنات الحية في أوساطها": ["مظاهر تكيف النباتات مع اوساطها ", "تنفس الحيوانات واحتلال الأوساط", "تأثير الانسان على التوزع الطبيعي للحيوانات ", "العلاقة بين وسط حياة حيوان ونمط تنقله", " وضعية تعلم ادماج الموارد"],
                "التكاثر وإعمار الأوساط": ["أنماط التكاثر عند الحيوان", "أنماط التكاثر عند النباتات", "تأثير الإنسان على إعمار الأوساط", " وضعية تعلم ادماج الموارد"],
                "تصنيف الكائنـــات الحيــــة": ["مفهوم النوع عند الكائنات الحية ", "استخدام معايير التصنيف ", " وضعية تعلم ادماج الموارد"],
                "المستحاثات": ["المستحاثات وشروط الاستحاثة ", "مكانة المستحاثات في تصور الأوساط القديمة ", " وضعية تعلم ادماج الموارد"],
            }
        },
        'الثالثة': {
            "الإنسان والمحيط (الديناميكية الداخلية للكرة الارضية)": {
                "الزلازل": ["مظاهر وعواقب زلزال", "خصائص الزلزال", "النشاط الزلزالي لشمال افريقيا"],
                "أسباب الزلازل": ["الربط بين حدوث الزلزال وتشكل الجبال (الطيات والفوالق)", "اختبار فرضية مصدر الزلزال"],
                "نشاط الظهرات ": ["الشواهد الدالة على زحزحة القارات ", "ابراز العلاقة بين زحزحة القارات والظهرات", "تفسير زحزحة القارات بنشاط الظهرات (أنماط ص تكتونية/ تيارات الحمل)"],
                "الغوص والظواهر الجيولوجية المرتبطة به ": ["بناء مفهوم الغوص (الية حركة تقارب الصفائح التكتونية)", "الظواهر الجيولوجية المرتبطة بالغوص ( البركنة المرتبطة بالغوص /جبال الهيمالايا ) "],
                "التكتونية العامة و البنية الداخلية للكرة الأرضية": [" الاليات التفسيرية لاهم الظواهر الجيولوجية (تغير سرعة انتشار الأمواج الزلزالية)", "وصف البنية الداخلية للكرة الأرضية"],
                "التكتونية في حوض البحر المتوسط ": ["تفسير الظواهر الجيولوجية في حوض البحر المتوسط (سلسلة جبال الاطلس)", "النشاط الزلزالي والبركاني في إيطاليا"],
                "الإجراءات الوقائية والتنبئية المتعلقة بالظواهر الجيولوجية": ["التقيد بالإجراءات الوقائية (انجاز بحث حول الاحتياطات الواجب اتخاذها)", "وضعية تعلم ادماج الموارد "],
            },
            " الانسان والمحيط (الديناميكية الخارجية للكرة الأرضية) ": {
                " البنيات الجيولوجية الكبرى وخصائصها": ["تمييز المركبات الكبرى للمناظر الطبيعية", " تفسير اصل الاختلافات الملاحظة بين المناظر الطبيعية (مكاشف الصخور)"],
                "تشكل المنظر الطبيعي وطبيعة الصخور ": [" إحصاء أنواع الصخور المشكلة للمناظر الطبيعية في الجزائر", " الخواص الفيزيوكيميائية للصخور (تحديد خاصيتين فيزيوكيميائيتين)", "الربط بين خواص الصخور وتشكل المنظر الطبيعي"],
                " أثر العوامل المناخية في تغير المنظر الطبيعي ": [" آليات التأثير الفيزيوكيميائي للعوامل المناخية على الصخور (الماء / الرياح / الحرارة )", " التعرف على ملامح تغير تضاريس المنظر الطبيعي "],
                " تطور شكل المنظر الطبيعي": [" التدخلات السلبية والايجابية للإنسان على تطور منظر طبيعي", "تطور منظر طبيعي عبر الزمن الجيولوجي (الى الشكل الحالي )", "وضعية تعلم ادماج الموارد "],
            },
            "الانسان والمحيط ( استغلال الموارد الطبيعية الباطنية)": {
                "الثروات الطبيعية الباطنية في الجزائر": [" التعرف على اهم الموارد الطبيعية الباطنية في الجزائر "],
                "مميزات الموارد الطبيعية في الجزائر": ["خواص البترول ومراحل تشكله / تحديد مواضع تواجد الماء"],
                "استغلال الموارد الطبيعية ": ["كيفية استغلال الموارد الباطنية (البترول والماء )", " ابراز ضرورة الاستغلال العقلاني للموارد الباطنية ", "وضعية تعلم ادماج الموارد"],
            },
            "الانسان والمحيط (التربة ثروة طبيعية هشة)": {
                " التربة وسط حي ": [" التعرف على التربة ", " العلاقة بين بنية التربة ومكوناتها الحية", " الطابع الهش للتربة"],
                " تشكل التربة ": [" منشأ التربة ", " مراحل تشكل التربة "],
                " حماية التربة " : [" التدخل السلبي والايجابي للإنسان على التربة الزراعية ", " وضعية تعلم ادماج الموارد", " وقفة تقييمية (الفرض )"],
            }
        }
    };

    // --- إدارة الجدول الزمني ---
    let schedule = JSON.parse(localStorage.getItem('schedule')) || [];

    const getDayFromDate = (dateString) => {
        const date = new Date(dateString.replace(/-/g, '\/'));
        const daysOfWeekArabic = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return daysOfWeekArabic[date.getDay()];
    };

    const saveSchedule = () => {
        localStorage.setItem('schedule', JSON.stringify(schedule));
    };

    // الوظيفة الجديدة لعرض الجدول
    const renderScheduleTable = () => {
        scheduleTableBody.innerHTML = '';
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
        
        // جمع كل أوقات البداية والنهاية لإنشاء رؤوس الصفوف
        const allTimes = new Set();
        schedule.forEach(item => {
            allTimes.add(item.startTime);
        });
        const sortedTimes = Array.from(allTimes).sort();

        if (sortedTimes.length === 0) {
            scheduleTableBody.innerHTML = `<tr><td colspan="6" class="text-muted text-center">لم يتم إضافة حصص بعد.</td></tr>`;
            return;
        }

        sortedTimes.forEach(time => {
            const row = document.createElement('tr');
            const timeCell = document.createElement('td');
            timeCell.textContent = time;
            row.appendChild(timeCell);

            days.forEach(day => {
                const dayCell = document.createElement('td');
                const matchingItems = schedule.filter(item => item.day === day && item.startTime === time);
                
                if (matchingItems.length > 0) {
                    matchingItems.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'schedule-item-cell';
                        itemDiv.innerHTML = `
                            <p class="mb-1">${item.level} ${item.classNumber}</p>
                            <p class="mb-1">${item.startTime} - ${item.endTime}</p>
                            <button class="btn-delete-schedule" data-day="${day}" data-time="${time}" data-level="${item.level}" data-class="${item.classNumber}">
                                <i class="fa-solid fa-trash-alt"></i>
                            </button>
                        `;
                        dayCell.appendChild(itemDiv);
                    });
                }
                row.appendChild(dayCell);
            });
            scheduleTableBody.appendChild(row);
        });
    };

    // إضافة حصة جديدة
    scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newScheduleItem = {
            day: scheduleDaySelect.value,
            startTime: scheduleStartTimeInput.value,
            endTime: scheduleEndTimeInput.value,
            level: scheduleLevelSelect.value,
            classNumber: scheduleClassNumberInput.value
        };
        schedule.push(newScheduleItem);
        saveSchedule();
        scheduleForm.reset();
        renderScheduleTable();
    });

    // حذف حصة من الجدول
    scheduleTableBody.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('.btn-delete-schedule');
        if (!actionBtn) return;

        const day = actionBtn.dataset.day;
        const time = actionBtn.dataset.time;
        const level = actionBtn.dataset.level;
        const classNumber = actionBtn.dataset.class;
        
        const indexToDelete = schedule.findIndex(item => 
            item.day === day && 
            item.startTime === time && 
            item.level === level && 
            item.classNumber === classNumber
        );

        if (indexToDelete !== -1) {
            schedule.splice(indexToDelete, 1);
            saveSchedule();
            renderScheduleTable();
        }
    });


    // --- إدارة المهام ---
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasksList = () => {
        tasksListDiv.innerHTML = '';
        if (tasks.length === 0) {
            tasksListDiv.innerHTML = `<p class="text-muted text-center">لا توجد مهام حالياً. أضف مهمة جديدة.</p>`;
            return;
        }

        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = `alert alert-primary d-flex justify-content-between align-items-center mb-2 ${task.completed ? 'task-completed' : ''}`;
            taskItem.innerHTML = `
                <div class="task-content">
                    <h5><i class="fa-solid fa-bell me-1"></i> ${task.alertType}</h5>
                    <p class="mb-1">
                        <i class="fa-solid fa-calendar-day me-1"></i> تاريخ الحصة: ${task.date}
                        <br>
                        <span class="text-danger fw-bold"><i class="fa-solid fa-clock me-1"></i> التنبيه قبل الموعد بـ: ${task.notificationDuration} دقيقة</span>
                    </p>
                    <p class="mb-1">
                        <i class="fa-solid fa-graduation-cap me-1"></i> ${task.level} ${task.classNumber}
                    </p>
                    <p class="mb-1">
                        <i class="fa-solid fa-book-open me-1"></i> الميدان: ${task.field} <br>
                        <i class="fa-solid fa-layer-group me-1"></i> المقطع: ${task.module} <br>
                        <i class="fa-solid fa-clipboard-list me-1"></i> النشاط: ${task.activity}
                    </p>
                    <p class="mb-0"><strong>ملاحظات:</strong> ${task.text}</p>
                </div>
                <div class="task-actions">
                    <button class="btn btn-sm btn-${task.completed ? 'success' : 'outline-success'}" data-action="toggle" data-index="${index}" title="تم الإنجاز">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" data-action="delete" data-index="${index}" title="حذف المهمة">
                        <i class="fa-solid fa-trash-alt"></i>
                    </button>
                </div>
            `;
            tasksListDiv.appendChild(taskItem);
        });
    };

    // ملء قوائم المهام المنسدلة
    const fillFields = (level) => {
        taskFieldSelect.innerHTML = '<option value="">اختر ميدان</option>';
        if (level && data[level]) {
            Object.keys(data[level]).forEach(field => {
                const option = document.createElement('option');
                option.value = field;
                option.textContent = field;
                taskFieldSelect.appendChild(option);
            });
        }
    };

    const fillModules = (level, field) => {
        taskModuleSelect.innerHTML = '<option value="">اختر مقطع</option>';
        if (level && field && data[level][field]) {
            Object.keys(data[level][field]).forEach(module => {
                const option = document.createElement('option');
                option.value = module;
                option.textContent = module;
                taskModuleSelect.appendChild(option);
            });
        }
    };

    const fillActivities = (level, field, module) => {
        taskActivitySelect.innerHTML = '<option value="">اختر نشاط</option>';
        if (level && field && module && data[level][field][module]) {
            data[level][field][module].forEach(activity => {
                const option = document.createElement('option');
                option.value = activity;
                option.textContent = activity;
                taskActivitySelect.appendChild(option);
            });
        }
    };

    taskDateInput.addEventListener('change', () => {
        const selectedDayArabic = getDayFromDate(taskDateInput.value);

        taskClassSelect.innerHTML = '<option value="">اختر قسم (بعد اختيار التاريخ)</option>';
        
        const classesForDay = new Set(schedule
            .filter(item => item.day === selectedDayArabic)
            .map(item => `${item.level} ${item.classNumber}`)
        );

        if (classesForDay.size > 0) {
            classesForDay.forEach(classItem => {
                const option = document.createElement('option');
                option.value = classItem;
                option.textContent = classItem;
                taskClassSelect.appendChild(option);
            });
        }
    });

    taskClassSelect.addEventListener('change', () => {
        const selectedClass = taskClassSelect.value;
        const selectedLevel = selectedClass.split(' ')[0];

        taskFieldSelect.innerHTML = '<option value="">اختر ميدان</option>';
        taskModuleSelect.innerHTML = '<option value="">اختر مقطع</option>';
        taskActivitySelect.innerHTML = '<option value="">اختر نشاط</option>';
        fillFields(selectedLevel);
    });

    taskFieldSelect.addEventListener('change', () => {
        const selectedClass = taskClassSelect.value;
        const selectedLevel = selectedClass.split(' ')[0];
        const selectedField = taskFieldSelect.value;
        taskModuleSelect.innerHTML = '<option value="">اختر مقطع</option>';
        taskActivitySelect.innerHTML = '<option value="">اختر نشاط</option>';
        fillModules(selectedLevel, selectedField);
    });

    taskModuleSelect.addEventListener('change', () => {
        const selectedClass = taskClassSelect.value;
        const selectedLevel = selectedClass.split(' ')[0];
        const selectedField = taskFieldSelect.value;
        const selectedModule = taskModuleSelect.value;
        taskActivitySelect.innerHTML = '<option value="">اختر نشاط</option>';
        fillActivities(selectedLevel, selectedField, selectedModule);
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedClass = taskClassSelect.value;
        const [level, classNumber] = selectedClass.split(' ');
        
        const notificationDuration = parseInt(taskNotificationDurationInput.value);
        const selectedDayArabic = getDayFromDate(taskDateInput.value);
        const classSchedule = schedule.find(item => 
            item.day === selectedDayArabic && 
            item.level === level && 
            item.classNumber === classNumber
        );

        if (classSchedule) {
            const [taskYear, taskMonth, taskDay] = taskDateInput.value.split('-');
            const [classHour, classMinute] = classSchedule.startTime.split(':');
            const classStartTime = new Date(taskYear, taskMonth - 1, taskDay, classHour, classMinute);
            const notificationTime = new Date(classStartTime.getTime() - (notificationDuration * 60 * 1000));
            const now = new Date();

            if (notificationTime <= now) {
                alert("لا يمكن إضافة هذه المهمة لأن وقت التنبيه المحدد قد مضى. يرجى اختيار تاريخ ووقت مستقبلي.");
                return;
            }
        } else {
            alert("لا يمكن إيجاد حصة مطابقة للقسم والتاريخ المختارين. يرجى مراجعة الجدول الأسبوعي.");
            return;
        }

        const newTask = {
            text: taskText.value,
            date: taskDateInput.value,
            notificationDuration: notificationDuration,
            alertType: taskAlertTypeSelect.value,
            level: level,
            classNumber: classNumber,
            field: taskFieldSelect.value,
            module: taskModuleSelect.value,
            activity: taskActivitySelect.value,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        taskForm.reset();
        taskClassSelect.innerHTML = '<option value="">اختر قسم (بعد اختيار التاريخ)</option>';
        taskFieldSelect.innerHTML = '<option value="">اختر ميدان</option>';
        taskModuleSelect.innerHTML = '<option value="">اختر مقطع</option>';
        taskActivitySelect.innerHTML = '<option value="">اختر نشاط</option>';
        renderTasksList();
        scheduleNotifications();
    });

    tasksListDiv.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('button');
        if (!actionBtn) return;

        const index = actionBtn.dataset.index;
        const action = actionBtn.dataset.action;

        if (action === 'delete') {
            tasks.splice(index, 1);
            scheduleNotifications();
        } else if (action === 'toggle') {
            tasks[index].completed = !tasks[index].completed;
            scheduleNotifications();
        }

        saveTasks();
        renderTasksList();
    });
    
    // --- نظام التنبيهات (تم التعديل لدمج OneSignal) ---
    const showNotification = (title, body) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, { body });
        }
        // استخدام OneSignal لإرسال إشعارات
        if (typeof OneSignal !== 'undefined') {
            OneSignal.push(() => {
                OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {
                    if (isEnabled) {
                        // OneSignal push is enabled
                    } else {
                        // OneSignal push is not enabled
                    }
                });
            });
        }
    };
    
    const scheduleNotifications = () => {
        tasks.forEach(task => {
            if (task.notificationTimeout) {
                clearTimeout(task.notificationTimeout);
            }
        });

        tasks.forEach(task => {
            if (!task.completed) {
                const classSchedule = schedule.find(item => 
                    item.day === getDayFromDate(task.date) && 
                    item.level === task.level && 
                    item.classNumber === task.classNumber
                );
                
                if (classSchedule) {
                    const [taskYear, taskMonth, taskDay] = task.date.split('-');
                    const [classHour, classMinute] = classSchedule.startTime.split(':');
                    
                    const classStartTime = new Date(taskYear, taskMonth - 1, taskDay, classHour, classMinute);
                    const notificationDurationMs = task.notificationDuration * 60 * 1000;
                    
                    const notificationTime = new Date(classStartTime.getTime() - notificationDurationMs);
                    const now = new Date();
                    const timeDiff = notificationTime.getTime() - now.getTime();

                    if (timeDiff > 0) {
                        const notificationTimeout = setTimeout(() => {
                            const title = `تنبيه: ${task.alertType}`;
                            const body = `لديك مهمة: ${task.text} مع قسم ${task.level} ${task.classNumber}. موعد الحصة: ${classSchedule.startTime}.`;
                            
                            // إرسال الإشعار باستخدام OneSignal
                            if (typeof OneSignal !== 'undefined') {
                                OneSignal.push(() => {
                                    OneSignal.showNativePrompt();
                                    OneSignal.sendSelfNotification(
                                        title,
                                        body
                                    );
                                });
                            }
                        }, timeDiff);
                        task.notificationTimeout = notificationTimeout;
                    }
                }
            }
        });
    };
    
    enableNotificationsBtn.addEventListener('click', () => {
        if (typeof OneSignal !== 'undefined') {
            OneSignal.push(() => {
                OneSignal.showNativePrompt();
            });
        } else {
            alert('OneSignal SDK لم يتم تحميله بعد.');
        }
    });

    // تحميل وعرض البيانات عند بداية التشغيل
    renderScheduleTable();
    renderTasksList();
    scheduleNotifications();
});