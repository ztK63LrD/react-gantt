import { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './index.less'

const data = {
    // 任务数据
    data: [
        {
            id: 1,
            text: 'projectName',
            start_date: '01-04-2023',
            end_date: '05-12-2023',
            duration: 148, 
            progress: 0.3,
            color: '#b38989'
        },
        {
            id: 2,
            text: '任务1',
            start_date: '02-04-2023',
            end_date: '11-07-2023',
            duration: 1020,
            progress: 0.6,
            // parent: 1
        },
        {
            id: 3,
            text: '任务2',
            start_date: '12-07-2023',
            end_date: '09-09-2023',
            duration: 519,
            progress: 0,
            // parent: 1
        }
    ],
    // 任务连线数据
    links: [
        { id: 1, source: 1, target: 2, type: '1' },
        { id: 2, source: 2, target: 3, type: '0' }
    ]
};

// 左侧标题数据
const columns = [
    { name: 'text', label: '项目名称',  width: 100, align: "center" },
    { name: 'start_date', label: '开始时间', width: 100, align: "center" },
    { name: 'start_date', label: '开始时间', width: 100, align: "center" },
    { name: 'duration', label: '计划工期', width: 100, align: "center" },
];

const GanttView = () => {
    // 获取gantrt容器实例
    const ganttRef = useRef<any>();
    // 初始化gantt
    const initGantt = () => {
        // 基础配置
        gantt.clearAll() // 清空之前的配置
        gantt.i18n.setLocale('cn'); // 设置中文
        gantt.config.readonly = true; // 设置为只读

        // 表头样式设置
        gantt.config.scale_height = 60; // 设置表头高度
        gantt.config.sort = true; // 点击表头可排序
        gantt.config.columns = columns; // 设置表头
        gantt.config.scales = [ // 设置表头右侧刻度
            // 设置时间刻度相关属性
            // 显示月日用这个
            // { unit: 'month', step: 1, format: '%Y-%m' },
            // { unit: 'day', step: 1, format: '%Y-%m-%d' }
            // 显示年月用这个
            { unit: 'year', step: 1, format: '%Y' },
            { unit: 'month', step: 1, format: '%M' }
        ];

        // 表内容样式设置
        gantt.config.row_height = 40; // 设置内容行高
        gantt.config.bar_height = 40; // 设置进度条高度
        gantt.templates.task_text = function (start, end, task) { // 自定义内容进度上的文本
            return '内容'
        };

        // tooltips样式设置
        gantt.plugins({
            tooltip: true,
            // quick_info: true, // 快速信息框
            // multiselect: true,// 激活多任务选择
        });
        gantt.config.tooltip_offset_x = 10; 
        gantt.config.tooltip_offset_y = 30;
        gantt.templates.tooltip_text = function (start, end, task) {
            return (
                task.text +
                '<br/><span>开始:</span> ' +
                gantt.templates.tooltip_date_format(start) +
                '<br/><span>结束:</span> ' +
                gantt.templates.tooltip_date_format(end) +
                '<br/><span>进度:</span> ' +
                // Math.round(task.progress * 100) +
                '%'
            );
        };

        // 设置连线事件
        gantt.config.show_links = true;

        // 初始化甘特图
        gantt.init(ganttRef.current);
        // 渲染数据
        gantt.parse(data);
    }

    useEffect(() => {
        initGantt();
    }, []);

    return (
        <div className="ganttView">
            <div className='ganttContainer' ref={ganttRef}></div>
        </div>
    )
};
export default GanttView;

