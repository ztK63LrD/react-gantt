import { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './index.less'

const data = {
    // 任务数据
    data: [
        //第一组 整条数据需要带上render属性  里面多段的数据parent执行整条的id
        { id: '1', name: '张三', render: 'split',  text: '' },
        { id: '1-1', parent: 1, text: '派工', color: '#008c8c', start_date: '15-06-2024 08:30', end_date: '15-06-2024: 10:30' },
        { id: '1-2', parent: 1, text: '休息', color: 'blue', start_date: '16-06-2024: 13:00', end_date: '16-06-2024:23:00' },
        
        // 第二组
        { id: '2', name: '李四', render: 'split', text: '' },
        { id: '2-1', parent: 2, text: '派工', color: '#008c8c', start_date: '15-06-2024 18:30', end_date: '15-06-2024: 22:30' },
        { id: '2-2', parent: 2, text: '休息', color: 'blue', start_date: '15-06-2024: 13:00', end_date: '16-06-2024:23:00' },

        // 第三组
        { id: '3', name: '王五', render: 'split', text: '' },
        { id: '3-1', parent: 3, text: '派工', color: '#008c8c', start_date: '15-06-2024 8:30', end_date: '15-06-2024: 22:30' },
        { id: '3-2', parent: 3, text: '休息', color: 'blue', start_date: '16-06-2024: 6:00', end_date: '16-06-2024:23:00' },
        { id: '3-3', parent: 3, text: '休息', color: 'blue', start_date: '16-06-2024: 13:00', end_date: '17-06-2024:3:00' },
        // { id: '3-4', parent: 3, text: '派工', color: '#008c8c', start_date: '17-06-2024:2:00', end_date: '17-06-2024: 8:00' },
        { id: '3-4', parent: 3, text: '派工', color: '#008c8c', start_date: '16-06-2024:12:00', end_date: '17-06-2024: 8:00' },
    ],
};

// 左侧标题数据
const columns = [
    { name: 'id', label: '序号', resize: true,  max_width: 60, align: "center" },
    { name: 'name', label: '姓名', resize: true, max_width: 60, align: "center" },
];

const GanttView = () => {
    // 获取gantrt容器实例
    const ganttRef = useRef<any>();
    // 初始化gantt
    const initGantt = () => {
        gantt.clearAll() // 清空之前的配置
        gantt.i18n.setLocale('cn'); // 设置中文
        gantt.config.readonly = true; // 设置为只读，否则是可以移动甘特图和连线的
        gantt.config.start_date = new Date(2024, 5, 15); // 设置甘特图开始日期  
        gantt.config.end_date = new Date(2024, 5, 18); // 设置甘特图结束日期  
        gantt.init(ganttRef.current); // 初始化甘特图
        gantt.parse(data); // 渲染数据

        gantt.config.columns = columns; // 设置左侧表头数据
        gantt.config.scale_height = 60; // 设置表头高度
        gantt.config.min_column_width = 10; // 设置列最小宽度
        // 设置头部右侧上标题内容背景颜色
        gantt.templates.scale_cell_class = function (scale) {
            return "gantt_grid_head_top";
        };

        gantt.config.scales = [ // 设置甘特图时间轴
            { unit: 'day', step: 1, format: '%Y/%m/%d' },
            { unit: 'hour', step: 1, format: function(date) {  
                return date.getHours(); // 显示从0到23的小时范围  
            }}  
        ];
        
        // 表内容样式设置
        gantt.templates.task_row_class = function (start, end, task) { // 设置表主内容背景颜色
            return "gantt_task_main_content";
        };
        gantt.config.row_height = 40; // 设置内容行高
        gantt.config.bar_height = 40; // 设置进度条高度
        gantt.templates.task_text = function (start, end, task) {
            return `<div style="color: #fff; font-size: 12px;">${task?.text}</div>`;
        };
        let count = 0
        gantt.templates.task_class = function(start, end, task) {  
            if (count < 1) {
                // 创建一个空对象来存储结果
                let tasksByParent: { [key: string]: any[] } = {}; // 创建空对象来存储任务按父任务分组的结果
                // 遍历任务数组
                data.data.forEach((task) => {
                    if (task.parent) {
                        // 检查是否已经存在该parent对应的数组，如果不存在则创建一个空数组
                        if (!tasksByParent[task.parent]) {
                            tasksByParent[task.parent] = [];
                        }
                        // 将当前任务对象添加到对应parent值的数组中
                        tasksByParent[task.parent].push(task);
                    }
            
                });

                // 检查时间重叠并添加类名
                Object.keys(tasksByParent).forEach(parentId => {
                    let tasks = tasksByParent[parentId];
                    for (let i = 0; i < tasks.length; i++) {
                        for (let j = i + 1; j < tasks.length; j++) {
                            if (tasksOverlap(tasks[i], tasks[j])) {
                                tasks[i].className = (i % 2 === 0) ? 'custom-height-top2' : 'custom-height-bottom2';
                                tasks[j].className = (j % 2 === 0) ? 'custom-height-top2' : 'custom-height-bottom2';
                            }
                        }
                    }

                    for (let i = 0; i < tasks.length; i++) {
                        for (let j = i + 1; j < tasks.length; j++) {
                            for (let k = j + 1; k < tasks.length; k++) {
                                if (tasksOverlap(tasks[i], tasks[j]) && tasksOverlap(tasks[i], tasks[k]) && tasksOverlap(tasks[j], tasks[k])) {
                                    // 为每个重叠任务分配不同的类名
                                    tasks[i].className = 'custom-height-top3';
                                    tasks[j].className = 'custom-height-bottom3';
                                    tasks[k].className = 'custom-height-center3';
                                }
                            }
                        }
                    }
                    
                });
                console.log(tasksByParent);
                count++;
            }
            return task.className || ""; // 返回任务的类名，如果没有类名则返回空字符串
        };  

        // 检查两个任务时间段是否有重叠
        function tasksOverlap(task1: any, task2: any) {
            return (task1.start_date < task2.end_date && task2.start_date < task1.end_date);
        }
        // tooltips样式设置
        gantt.plugins({ tooltip: true });
        gantt.config.tooltip_offset_x = 10; // 设置tooltips水平偏移量
        gantt.config.tooltip_offset_y = 30; // 设置tooltips垂直偏移量
        gantt.templates.tooltip_text = function (start: Date, end: Date, task: any): string {
            if (task.text) {
                return (
                    `<div class="gantt-tooltip">
                        <div class="gantt-tooltip-time">
                            <div class="time-word">当前时间：</div>
                            <div class="time-value">
                                <div class="time-value-content"><span>开始时间：</span>${start.toLocaleString()}</div>
                                <div class="time-value-content"><span>结束时间：</span>${end.toLocaleString()}</div>
                            </div>
                        </div>
                        <div class="gantt-tooltip-task">
                            <div class="task-word">当前任务：</div>
                            <div class="task-value">${task.text}</div>
                        </div>
                    </div>`
                );
            }
            return "";
        };
    }

    useEffect(() => {
        initGantt();
    }, []);

    return (
        <div className="ganttView">
            <div className='ganttContainer' ref={ganttRef} style={{ width: '100%' }}></div>
        </div>
    )
};
export default GanttView;