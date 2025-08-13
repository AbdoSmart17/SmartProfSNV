document.addEventListener('DOMContentLoaded', () => {
    // --- عناصر DOM ---
    const scheduleForm = document.getElementById('schedule-form');
    const scheduleDaySelect = document.getElementById('schedule-day');
    const scheduleStartTimeInput = document.getElementById('schedule-start-time');
    const scheduleEndTimeInput = document.getElementById('schedule-end-time');
    const scheduleLevelSelect = document.getElementById('schedule-level-select');
    const scheduleClassNumberInput = document.getElementById('schedule-class-number');
    const scheduleTableBody = document.querySelector('#schedule-table tbody');
    
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
    
    // أزرار تصفية المهام
    const showAllTasksBtn = document.getElementById('show-all-tasks');
    const showPendingTasksBtn = document.getElementById('show-pending-tasks');
    const showCompletedTasksBtn = document.getElementById('show-completed-tasks');
    
    // عنصر الصوت للتنبيهات
    const notificationSound = document.getElementById('notification-sound');

    // --- بيانات التطبيق ---
    let schedule = JSON.parse(localStorage.getItem('schedule')) || [];
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentTaskFilter = 'all';
    
    // بيانات المناهج الدراسية
    const curriculumData = {
        'الأولى': {
            'الإنسان والصحة': {
                "التغذية عند الانسان": ["مصدر الأغذية", "تركيب الأغذية (تحليل تركيب الحليب)", "تركيب الأغذية (تحليل تركيب أغذية أخرى)", "دور الأغذية في الجسم", "الحاجيات الغذائية للعضوية", "الراتب الغذائي", "التوازن الغذائي (عواقب سوء التغذية)", "وضعية تعلم ادماج الموارد"],
                "التحصل على الطاقة عند الانسان": ["المبادلات الغازية التنفسية عند الانسان", "المعنى البيولوجي للتنفس", "القواعد الصحية للتنفس", "وضعية تعلم ادماج الموارد"],
                "الاطراح وثبات توازن الوسط الداخلي": ["تعريف الاطراح عند الانسان", "دور أعضاء الاطراح", "القواعد الصحية للاطراح", "وضعية تعلم ادماج الموارد"],
                "التكاثر الجنسي عند الانسان": ["الأجهزة التكاثرية عند الانسان", "الالقاح وشروطه", "القواعد الصحية للتكاثر", "وضعية تعلم ادماج الموارد"],
                "الخلية": ["مفهوم الخلية", "المجهر الضوئي", "الخلية الحيوانية"]
            },
            'الإنسان والمحيط': {
                "التغذية عند النبات الأخضر": ["الحاجيات الغذائية للنبات الأخضر", "تأثير تركيز المحلول المعدني على نمو النبات", "مقر امتصاص المحلول المعدني", "المبادلات الغازية اليخضورية ومقرها", "التركيب الضوئي وشروطه", "أهمية التحكم في شروط التركيب الضوئي", "مسار النسغ الخام في النبات الأخضر", "دور النتح في انتقال النسغ /مصير النسغ", "وضعية تعلم ادماج الموارد"],
                "التحصل على الطاقة عند النبات الأخضر": ["المبادلات الغازية التنفسية عند النبات الأخضر", "مقر المبادلات الغازية التنفسية عند النبات الأخضر", "المعنى البيولوجي للتنفس عند النبات", "اشكال أخرى للتحصل على الطاقة (التخمر)", "وضعية تعلم ادماج الموارد"],
                "التكاثر الجنسي عند النباتات الزهرية": ["الأجهزة التكاثرية عند النبات الزهري", "الالقاح وشروطه", "وضعية تعلم ادماج الموارد"],
                "الخلية النباتية": ["مفهوم الخلية", "المجهر الضوئي", "الخلية النباتية"]
            }
        },
        'الثانية': {
            'الإنسان والمحيط': {
                "الوسط الحي": ["خصائص الوسط الحي", "العلاقات القائمة بين العناصر الحية في الوسط الحي", "تأثير العوامل الفيزيوكيميائية على توزع الكائنات الحية ونشاطها", "النظام البيئي وشروط توازنه", "دور الانسان في استقرار النظام البيئي", "وضعية تعلم ادماج الموارد"],
                "توزّع الكائنات الحية في أوساطها": ["مظاهر تكيف النباتات مع اوساطها", "تنفس الحيوانات واحتلال الأوساط", "تأثير الانسان على التوزع الطبيعي للحيوانات", "العلاقة بين وسط حياة حيوان ونمط تنقله", "وضعية تعلم ادماج الموارد"],
                "التكاثر وإعمار الأوساط": ["أنماط التكاثر عند الحيوان", "أنماط التكاثر عند النباتات", "تأثير الإنسان على إعمار الأوساط", "وضعية تعلم ادماج الموارد"],
                "تصنيف الكائنـــات الحيــــة": ["مفهوم النوع عند الكائنات الحية", "استخدام معايير التصنيف", "وضعية تعلم ادماج الموارد"],
                "المستحاثات": ["المستحاثات وشروط الاستحاثة", "مكانة المستحاثات في تصور الأوساط القديمة", "وضعية تعلم ادماج الموارد"]
            }
        },
        'الثالثة': {
            "الإنسان والمحيط (الديناميكية الداخلية للكرة الارضية)": {
                "الزلازل": ["مظاهر وعواقب زلزال", "خصائص الزلزال", "النشاط الزلزالي لشمال افريقيا"],
                "أسباب الزلازل": ["الربط بين حدوث الزلزال وتشكل الجبال (الطيات والفوالق)", "اختبار فرضية مصدر الزلزال"],
                "نشاط الظهرات": ["الشواهد الدالة على زحزحة القارات", "ابراز العلاقة بين زحزحة القارات والظهرات", "تفسير زحزحة القارات بنشاط الظهرات (أنماط ص تكتونية/ تيارات الحمل)"],
                "الغوص والظواهر الجيولوجية المرتبطة به": ["بناء مفهوم الغوص (الية حركة تقارب الصفائح التكتونية)", "الظواهر الجيولوجية المرتبطة بالغوص (البركنة المرتبطة بالغوص /جبال الهيمالايا)"],
                "التكتونية العامة و البنية الداخلية للكرة الأرضية": ["الاليات التفسيرية لاهم الظواهر الجيولوجية (تغير سرعة انتشار الأمواج الزلزالية)", "وصف البنية الداخلية للكرة الأرضية"],
                "التكتونية في حوض البحر المتوسط": ["تفسير الظواهر الجيولوجية في حوض البحر المتوسط (سلسلة جبال الاطلس)", "النشاط الزلزالي والبركاني في إيطاليا"],
                "الإجراءات الوقائية والتنبئية المتعلقة بالظواهر الجيولوجية": ["التقيد بالإجراءات الوقائية (انجاز بحث حول الاحتياطات الواجب اتخاذها)", "وضعية تعلم ادماج الموارد"]
            },
            "الانسان والمحيط (الديناميكية الخارجية للكرة الأرضية)": {
                "البنيات الجيولوجية الكبرى وخصائصها": ["تمييز المركبات الكبرى للمناظر الطبيعية", "تفسير اصل الاختلافات الملاحظة بين المناظر الطبيعية (مكاشف الصخور)"],
                "تشكل المنظر الطبيعي وطبيعة الصخور": ["إحصاء أنواع الصخور المشكلة للمناظر الطبيعية في الجزائر", "الخواص الفيزيوكيميائية للصخور (تحديد خاصيتين فيزيوكيميائيتين)", "الربط بين خواص الصخور وتشكل المنظر الطبيعي"],
                "أثر العوامل المناخية في تغير المنظر الطبيعي": ["آليات التأثير الفيزيوكيميائي للعوامل المناخية على الصخور (الماء / الرياح / الحرارة)", "التعرف على ملامح تغير تضاريس المنظر الطبيعي"],
                "تطور شكل المنظر الطبيعي": ["التدخلات السلبية والايجابية للإنسان على تطور منظر طبيعي", "تطور منظر طبيعي عبر الزمن الجيولوجي (الى الشكل الحالي)", "وضعية تعلم ادماج الموارد"]
            },
            "الانسان والمحيط (استغلال الموارد الطبيعية الباطنية)": {
                "الثروات الطبيعية الباطنية في الجزائر": ["التعرف على اهم الموارد الطبيعية الباطنية في الجزائر"],
                "مميزات الموارد الطبيعية في الجزائر": ["خواص البترول ومراحل تشكله / تحديد مواضع تواجد الماء"],
                "استغلال الموارد الطبيعية": ["كيفية استغلال الموارد الباطنية (البترول والماء)", "ابراز ضرورة الاستغلال العقلاني للموارد الباطنية", "وضعية تعلم ادماج الموارد"]
            },
            "الانسان والمحيط (التربة ثروة طبيعية هشة)": {
                "التربة وسط حي": ["التعرف على التربة", "العلاقة بين بنية التربة ومكوناتها الحية", "الطابع الهش للتربة"],
                "تشكل التربة": ["منشأ التربة", "مراحل تشكل التربة"],
                "حماية التربة": ["التدخل السلبي والايجابي للإنسان على التربة الزراعية", "وضعية تعلم ادماج الموارد", "وقفة تقييمية (الفرض)"]
            }
        },
        'الرابعة': {
            "الانسان والصحة (التغذية عند الانسان)": {
                "تحويل الأغذية خلال الهضم": ["تشخيص المكتسبات (الوضعية الانطلاقية الشاملة)", "ابراز التحولات التي تطرا على مكونات غذاء (الخبز) في مختلف مستويات الانبوب الهضمي", "بناء مفهوم الهضم (التأثير النوعي للإنزيم)", "المعنى البيولوجي للهضم"],
                "امتصاص المغذيات": ["مصير الأغذية المهضومة", "مميزات مقر امتصاص المغذيات"],
                "نقل المغذيات": ["ابين دور الدم", "الفرض 1", "مسار نقل المغذيات والغازات"],
                "استعمال المغذيات": ["استعمال غاز الاكسجين والمغذيات في نسيج حي", "تصحيح الفرض", "التنفس الخلوي عند خميرة الخبز", "دور المغذيات في الجسم"],
                "التوازن الغذائي": ["عواقب التغذية الغير صحية (حل وضعيات ادماج لمختلف الاختلالات المتعلقة بالتغذية)", "حصة ادماج كلي للمقطع 01"]
            },
            "الانسان والصحة (التنسيق الوظيفي في العضوية)": {
                "الارتباط التشريحي للاتصال العصبي": ["اتعرف على البنيات المتخصصة في استقبال التنبيهات", "اظهر الدعامة البنيوية للاتصال العصبي", "احدد مظهر الرسائل وطرائق انتقالها"],
                "الحركة الارادية والفعل الحركي اللاإرادي": ["احلل حركة ارادية", "اميز خصوصيات الحركة اللاإرادية"],
                "اختلال الاتصال العصبي": ["ابين تأثير مختلف المواد المخدرة وعواقبها", "حل الوضعية الانطلاقية (معالجة بيداغوجية)"],
                "الحواجز الطبيعية والاجسام الغريبة": ["الحواجز الطبيعية التي تستعملها العضوية من اجل الحماية"],
                "الاستجابة المناعية اللانوعية": ["اظهر مميزات الخط الدفاعي الثاني للعضوية"],
                "الاستجابة المناعية النوعية": ["اشرح الية الخط الدفاعي الثالث للعضوية"],
                "الذات و اللاذات": ["ابين قدرة العضوية على تمييز الذات عن اللاذات", "وقفة تقييمية"],
                "الاعتلالات المناعية": ["اتعرف على حالة اعتلال مناعي (الحساسية)", "اشرح مبدا العون المناعي", "حصة ادماج كلي للمقطع 02"]
            },
            "الانسان والصحة (انتقال الصفات الوراثية)": {
                "تشكل الامشاج والالقاح": ["طرح الوضعية الانطلاقية", "اصف مراحل تشكل الامشاج الذكريه والانثوية", "احلل سلوك الصبغيات اثناء تشكل الامشاج لتعريف النمط النووي", "ابين دور الالقاح في ضمان استمرارية النوع"],
                "دعامة انتقال الصفات الوراثية": ["اقارن بين صفات مجموعة من الافراد", "ابين مقر المعلومة الوراثية"],
                "الاختلالات الوراثية": ["أتعرف على بعض الاختلالات الكروموزومية", "احدد اسباب بعض الامراض الوراثية", "أحدد معنى الطفرة الوراثية", "أبين خطورة الزواج بين ذوي الأقارب", "حل الوضعية الانطلاقية - معالجة بيداغوجية محتملة", "الفرض الاخير - تصحيح الفرض", "حل الوضعية الشاملة"]
            }
        }
    };

    // --- وظائف الجدول الزمني ---
    const getDayFromDate = (dateString) => {
        const date = new Date(dateString.replace(/-/g, '/'));
        const daysOfWeekArabic = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return daysOfWeekArabic[date.getDay()];
    };

    const saveSchedule = () => {
        localStorage.setItem('schedule', JSON.stringify(schedule));
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'UPDATE_SCHEDULE',
                schedule: schedule
            });
        }
    };

    const renderScheduleTable = () => {
        scheduleTableBody.innerHTML = '';
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
        
        const allStartTimes = [...new Set(schedule.map(item => item.startTime))].sort();
        
        if (allStartTimes.length === 0) {
            scheduleTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-4">
                        <div class="alert alert-info m-0">
                            <i class="fas fa-calendar-plus fa-2x mb-3"></i>
                            <h5 class="mb-2">لا توجد حصص مسجلة</h5>
                            <p class="mb-0">قم بإضافة حصصك الأسبوعية لبدء الاستخدام</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        allStartTimes.forEach(time => {
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
                        itemDiv.className = 'schedule-item-cell position-relative';
                        itemDiv.innerHTML = `
                            <p class="mb-1 fw-bold">${item.level} ${item.classNumber}</p>
                            <p class="mb-1 text-muted small">${item.startTime} - ${item.endTime}</p>
                            <button class="btn-delete-schedule" data-id="${item.day}-${item.startTime}-${item.level}-${item.classNumber}">
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

        // إضافة أحداث الحذف
        scheduleTableBody.querySelectorAll('.btn-delete-schedule').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idParts = e.currentTarget.dataset.id.split('-');
                const [day, startTime, level, classNumber] = idParts;
                
                if (confirm(`هل أنت متأكد من حذف حصة ${level} ${classNumber} يوم ${day} الساعة ${startTime}؟`)) {
                    schedule = schedule.filter(item => 
                        !(item.day === day && 
                          item.startTime === startTime && 
                          item.level === level && 
                          item.classNumber === classNumber)
                    );
                    
                    saveSchedule();
                    renderScheduleTable();
                    showAlert('تم حذف الحصة بنجاح', 'success');
                }
            });
        });
    };

    // --- وظائف المهام ---
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        scheduleNotifications();
        
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'UPDATE_TASKS',
                tasks: tasks
            });
        }
    };

    const renderTasksList = () => {
        tasksListDiv.innerHTML = '';
        
        const filteredTasks = tasks.filter(task => {
            if (currentTaskFilter === 'pending') return !task.completed;
            if (currentTaskFilter === 'completed') return task.completed;
            return true;
        });
        
        if (filteredTasks.length === 0) {
            tasksListDiv.innerHTML = `
                <div class="alert alert-info text-center py-4">
                    <i class="fas fa-tasks fa-2x mb-3"></i>
                    <h5 class="mb-2">لا توجد مهام ${getFilterText(currentTaskFilter)}</h5>
                    <p class="mb-0">${currentTaskFilter === 'all' ? 'قم بإضافة مهمة جديدة لبدء الاستخدام' : 'لا توجد مهام في هذه الفئة حالياً'}</p>
                </div>
            `;
            return;
        }
        
        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = `alert ${getTaskAlertClass(task)} d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3`;
            taskItem.innerHTML = `
                <div class="task-content flex-grow-1 w-100">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="mb-0">
                            <i class="fa-solid ${task.completed ? 'fa-check-circle text-success' : 'fa-bell'} me-2"></i>
                            ${task.alertType}
                        </h5>
                        <small class="text-muted">${formatDate(task.date)}</small>
                    </div>
                    
                    <div class="task-details bg-white p-3 rounded">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="mb-2">
                                    <span class="badge ${task.completed ? 'bg-success' : 'bg-primary'} me-2">
                                        <i class="fa-solid fa-clock me-1"></i>
                                        قبل ${task.notificationDuration} دقيقة
                                    </span>
                                    <span class="badge bg-secondary">
                                        <i class="fa-solid fa-graduation-cap me-1"></i>
                                        ${task.level} ${task.classNumber}
                                    </span>
                                </p>
                                
                                <p class="mb-1"><strong><i class="fa-solid fa-book-open me-2"></i>الميدان:</strong> ${task.field}</p>
                                <p class="mb-1"><strong><i class="fa-solid fa-layer-group me-2"></i>المقطع:</strong> ${task.module}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-1"><strong><i class="fa-solid fa-clipboard-list me-2"></i>النشاط:</strong> ${task.activity}</p>
                                ${task.text ? `<p class="mb-1"><strong><i class="fa-solid fa-note-sticky me-2"></i>ملاحظات:</strong> ${task.text}</p>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="task-actions mt-3 mt-md-0 ms-md-3 d-flex flex-row flex-md-column">
                    <button class="btn btn-sm ${task.completed ? 'btn-outline-success' : 'btn-success'} me-2 me-md-0 mb-md-2" 
                            data-action="toggle" 
                            data-index="${index}"
                            title="${task.completed ? 'إعادة فتح المهمة' : 'تم الإنجاز'}">
                        <i class="fa-solid ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" 
                            data-action="delete" 
                            data-index="${index}"
                            title="حذف المهمة">
                        <i class="fa-solid fa-trash-alt"></i>
                    </button>
                </div>
            `;
            tasksListDiv.appendChild(taskItem);
        });

        // إضافة أحداث النقر للأزرار
        tasksListDiv.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', handleTaskAction);
        });
    };

    const handleTaskAction = (e) => {
        const btn = e.currentTarget;
        const action = btn.dataset.action;
        const index = parseInt(btn.dataset.index);
        
        if (action === 'delete') {
            if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
                const deletedTask = tasks.splice(index, 1)[0];
                saveTasks();
                renderTasksList();
                showAlert(`تم حذف المهمة "${deletedTask.alertType}"`, 'success');
            }
        } else if (action === 'toggle') {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasksList();
            showAlert(
                `تم ${tasks[index].completed ? 'إكمال' : 'إعادة فتح'} المهمة "${tasks[index].alertType}"`,
                tasks[index].completed ? 'success' : 'info'
            );
        }
    };

    const getTaskAlertClass = (task) => {
        if (task.completed) return 'alert-success';
        
        const now = new Date();
        const taskDate = new Date(task.date);
        const [hours, minutes] = task.startTime.split(':');
        taskDate.setHours(hours, minutes);
        
        if (taskDate < now) return 'alert-danger';
        if ((taskDate - now) < 86400000) return 'alert-warning'; // أقل من 24 ساعة
        return 'alert-primary';
    };

    const getFilterText = (filter) => {
        return filter === 'pending' ? 'معلقة' : filter === 'completed' ? 'مكتملة' : '';
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ar-EG', options);
    };

    // --- وظائف التنبيهات ---
    const showNotification = (title, options) => {
        if (!('Notification' in window)) {
            console.error('الإشعارات غير مدعومة في هذا المتصفح');
            return null;
        }

        if (Notification.permission === 'granted') {
            const notification = new Notification(title, {
                ...options,
                dir: 'rtl',
                lang: 'ar'
            });

            if (notificationSound) {
                notificationSound.currentTime = 0;
                notificationSound.play().catch(e => console.error('تعذر تشغيل صوت التنبيه:', e));
            }

            setTimeout(() => notification.close(), 12000);
            
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
            
            return notification;
        }
        
        return null;
    };

    const scheduleNotifications = () => {
        tasks.forEach(task => {
            if (task.notificationTimeout) {
                clearTimeout(task.notificationTimeout);
                 delete task.notificationTimeout;
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
                    const [year, month, day] = task.date.split('-');
                    const [hours, minutes] = classSchedule.startTime.split(':');
                    
                    const classTime = new Date(year, month - 1, day, hours, minutes);
                    const notificationTime = new Date(classTime.getTime() - (task.notificationDuration * 60000));
                    const now = new Date();
                    const timeDiff = notificationTime.getTime() - now.getTime();
                    
                    if (timeDiff > 0) {
                        task.notificationTimeout = setTimeout(() => {
                            const notification = showNotification(
                                `تنبيه: ${task.alertType}`,
                                {
                                    body: `لديك مهمة: ${task.text}\nمع قسم ${task.level} ${task.classNumber}\nموعد الحصة: ${classSchedule.startTime}`,
                                    icon: '/icon-192.png',
                                    badge: '/icon-192.png'
                                }
                            );
                            
                            if (!notification) {
                                console.error('فشل في عرض الإشعار');
                            }
                        }, timeDiff);
                    }
                }
            }
        });
    };

    const enableNotifications = async () => {
        if (!('Notification' in window)) {
            showAlert('متصفحك لا يدعم إشعارات سطح المكتب', 'danger');
            return false;
        }
        
        try {
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                updateNotificationButton(true);
                showAlert('تم تفعيل التنبيهات بنجاح! سيتم إعلامك بالمهام في المواعيد المحددة.', 'success');
                scheduleNotifications();
                return true;
            } else {
                updateNotificationButton(false);
                showAlert('تم رفض إذن الإشعارات. لن تتمكن من تلقي التنبيهات.', 'warning');
                return false;
            }
        } catch (error) {
            console.error('خطأ في تفعيل التنبيهات:', error);
            showAlert('حدث خطأ أثناء محاولة تفعيل التنبيهات.', 'danger');
            return false;
        }
    };

    const updateNotificationButton = (enabled) => {
        const btn = document.getElementById('enable-notifications-btn');
        if (enabled) {
            btn.classList.remove('btn-outline-secondary');
            btn.classList.add('btn-success');
            btn.innerHTML = '<i class="fa-solid fa-bell me-1"></i> التنبيهات مفعلة';
        } else {
            btn.classList.remove('btn-success');
            btn.classList.add('btn-outline-secondary');
            btn.innerHTML = '<i class="fa-solid fa-bell me-1"></i> تفعيل التنبيهات';
        }
    };

    // --- وظائف تعبئة القوائم المنسدلة ---
    const populateClassSelect = (selectedDate) => {
        taskClassSelect.innerHTML = '<option value="">اختر قسم</option>';
        
        if (!selectedDate) return;
        
        const day = getDayFromDate(selectedDate);
        const classes = schedule.filter(item => item.day === day);
        
        if (classes.length === 0) {
            taskClassSelect.innerHTML = '<option value="">لا توجد حصص في هذا اليوم</option>';
            return;
        }
        
        const uniqueClasses = [...new Set(classes.map(item => `${item.level} ${item.classNumber}`))];
        
        uniqueClasses.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls;
            option.textContent = cls;
            taskClassSelect.appendChild(option);
        });
    };

    const populateFieldSelect = (level) => {
        taskFieldSelect.innerHTML = '<option value="">اختر ميدان</option>';
        
        if (!level || !curriculumData[level]) return;
        
        Object.keys(curriculumData[level]).forEach(field => {
            const option = document.createElement('option');
            option.value = field;
            option.textContent = field;
            taskFieldSelect.appendChild(option);
        });
    };

    const populateModuleSelect = (level, field) => {
        taskModuleSelect.innerHTML = '<option value="">اختر مقطع</option>';
        
        if (!level || !field || !curriculumData[level]?.[field]) return;
        
        Object.keys(curriculumData[level][field]).forEach(module => {
            const option = document.createElement('option');
            option.value = module;
            option.textContent = module;
            taskModuleSelect.appendChild(option);
        });
    };

    const populateActivitySelect = (level, field, module) => {
        taskActivitySelect.innerHTML = '<option value="">اختر نشاط</option>';
        
        if (!level || !field || !module || !curriculumData[level]?.[field]?.[module]) return;
        
        curriculumData[level][field][module].forEach(activity => {
            const option = document.createElement('option');
            option.value = activity;
            option.textContent = activity;
            taskActivitySelect.appendChild(option);
        });
    };

    // --- وظائف التحقق من التاريخ والوقت ---
    const isPastDateTime = (selectedDate, selectedTime) => {
        const now = new Date();
        const [year, month, day] = selectedDate.split('-');
        const [hours, minutes] = selectedTime.split(':');
        
        const taskDateTime = new Date(year, month - 1, day, hours, minutes);
        return taskDateTime < now;
    };

    // --- وظائف عرض التنبيهات والرسائل ---
    const showAlert = (message, type = 'info') => {
        const alertContainer = document.getElementById('alert-container');
        const alertId = `alert-${Date.now()}`;
        
        const icons = {
            'success': 'fa-check-circle',
            'danger': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };
        
        const alertHTML = `
            <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
                <i class="fas ${icons[type] || 'fa-info-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        alertContainer.insertAdjacentHTML('beforeend', alertHTML);
        
        setTimeout(() => {
            const alertElement = document.getElementById(alertId);
            if (alertElement) {
                alertElement.classList.add('fade');
                setTimeout(() => alertElement.remove(), 150);
            }
        }, 5000);
    };

    // --- أحداث DOM ---
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
        showAlert('تم إضافة الحصة بنجاح إلى الجدول الأسبوعي', 'success');
    });

    taskDateInput.addEventListener('change', function() {
        const selectedDate = this.value;
        const today = new Date().toISOString().split('T')[0];
        
        if (selectedDate < today) {
            showAlert("لقد حددت تاريخاً قديماً! يرجى اختيار تاريخ اليوم أو تاريخ مستقبلي.", "warning");
        }
        
        populateClassSelect(selectedDate);
        taskFieldSelect.innerHTML = '<option value="">اختر ميدان</option>';
        taskModuleSelect.innerHTML = '<option value="">اختر مقطع</option>';
        taskActivitySelect.innerHTML = '<option value="">اختر نشاط</option>';
    });

    taskClassSelect.addEventListener('change', () => {
        const level = taskClassSelect.value.split(' ')[0];
        populateFieldSelect(level);
        taskModuleSelect.innerHTML = '<option value="">اختر مقطع</option>';
        taskActivitySelect.innerHTML = '<option value="">اختر نشاط</option>';
    });

    taskFieldSelect.addEventListener('change', () => {
        const level = taskClassSelect.value.split(' ')[0];
        const field = taskFieldSelect.value;
        populateModuleSelect(level, field);
        taskActivitySelect.innerHTML = '<option value="">اختر نشاط</option>';
    });

    taskModuleSelect.addEventListener('change', () => {
        const level = taskClassSelect.value.split(' ')[0];
        const field = taskFieldSelect.value;
        const module = taskModuleSelect.value;
        populateActivitySelect(level, field, module);
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const selectedClass = taskClassSelect.value;
        if (!selectedClass || selectedClass === 'لا توجد حصص في هذا اليوم') {
            showAlert("يرجى اختيار قسم صحيح من الجدول الأسبوعي", "danger");
            return;
        }
        
        const [level, classNumber] = selectedClass.split(' ');
        const notificationDuration = parseInt(taskNotificationDurationInput.value) || 0;
        const selectedDayArabic = getDayFromDate(taskDateInput.value);
        
        const classSchedule = schedule.find(item => 
            item.day === selectedDayArabic && 
            item.level === level && 
            item.classNumber === classNumber
        );
        
        if (!classSchedule) {
            showAlert("لا توجد حصة مطابقة للقسم والتاريخ المختارين في الجدول الأسبوعي", "danger");
            return;
        }
        
        if (isPastDateTime(taskDateInput.value, classSchedule.startTime)) {
            showAlert("لا يمكن إضافة مهمة لحصة قديمة! يرجى اختيار تاريخ ووقت مستقبلي.", "danger");
            return;
        }
        
        const newTask = {
            id: Date.now(),
            text: taskText.value,
            date: taskDateInput.value,
            startTime: classSchedule.startTime,
            notificationDuration: notificationDuration,
            alertType: taskAlertTypeSelect.value,
            level: level,
            classNumber: classNumber,
            field: taskFieldSelect.value,
            module: taskModuleSelect.value,
            activity: taskActivitySelect.value,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasksList();
        taskForm.reset();
        populateClassSelect(taskDateInput.value);
        showAlert('تم إضافة المهمة بنجاح وسيتم تنبيهك قبل الموعد المحدد', 'success');
    });
     enableNotificationsBtn.addEventListener('click', enableNotifications);
    // --- أحداث أزرار تصفية المهام (الكود الذي تم إضافته) ---
    const updateFilterButtons = (filter) => {
        showAllTasksBtn.classList.remove('active', 'btn-info');
        showAllTasksBtn.classList.add('btn-outline-info');
        showPendingTasksBtn.classList.remove('active', 'btn-info');
        showPendingTasksBtn.classList.add('btn-outline-info');
        showCompletedTasksBtn.classList.remove('active', 'btn-info');
        showCompletedTasksBtn.classList.add('btn-outline-info');

        if (filter === 'all') {
            showAllTasksBtn.classList.add('active', 'btn-info');
            showAllTasksBtn.classList.remove('btn-outline-info');
        } else if (filter === 'pending') {
            showPendingTasksBtn.classList.add('active', 'btn-info');
            showPendingTasksBtn.classList.remove('btn-outline-info');
        } else if (filter === 'completed') {
            showCompletedTasksBtn.classList.add('active', 'btn-info');
            showCompletedTasksBtn.classList.remove('btn-outline-info');
        }
    };

    showAllTasksBtn.addEventListener('click', () => {
        currentTaskFilter = 'all';
        renderTasksList();
        updateFilterButtons('all');
    });

    showPendingTasksBtn.addEventListener('click', () => {
        currentTaskFilter = 'pending';
        renderTasksList();
        updateFilterButtons('pending');
    });

    showCompletedTasksBtn.addEventListener('click', () => {
        currentTaskFilter = 'completed';
        renderTasksList();
        updateFilterButtons('completed');
    });
    
    // --- الاستدعاءات الأولية عند تحميل الصفحة (الجزء الأهم) ---
    renderScheduleTable();
    renderTasksList();
    updateFilterButtons(currentTaskFilter);
    scheduleNotifications();
});