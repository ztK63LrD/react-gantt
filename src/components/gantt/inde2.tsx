import { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './index.less'

const data = {
    data: [ // 任务数据
        { id: 1, text: '任务1', start_date: '01-04-2023', end_date: '05-12-2023', progress: 0.3 },
        { id: 2, text: '任务1', start_date: '02-04-2023', end_date: '11-07-2023', progress: 0.6 },
        { id: 3, text: '任务3', start_date: '12-07-2023', end_date: '09-09-2023', progress: 0 }
    ],
    links: [ // 任务连线数据
        { id: 1, source: 1, target: 2, type: '1' },
        { id: 2, source: 2, target: 3, type: '0' }
    ]
};

const columns = [ // 左侧标题数据
    { name: 'text', label: '项目名称',  width: 100, align: "center" },
    { name: 'start_date', label: '开始时间', width: 100, align: "center" },
    { name: 'end_date', label: '结束时间', width: 100, align: "center" },
];

const GanttView = () => {
    // 获取gantrt容器实例
    const ganttRef = useRef<any>();
    // 初始化gantt
    const initGantt = () => {
        // 基础配置
        gantt.clearAll() // 清空之前的配置
        gantt.i18n.setLocale('cn'); // 设置中文
        gantt.config.readonly = false; // 设置为只读，否则是可以移动甘特图和连线的
        gantt.init(ganttRef.current); // 初始化甘特图
        gantt.parse(data); // 渲染数据

        // 甘特图样式设置
        gantt.config.scale_height = 60; // 设置表头高度
        // 设置头部左侧表头标题背景颜色
        gantt.templates.grid_header_class = function (date, scale) {
            return "gantt_grid_head111";
        };
        // 设置左侧标题表内容背景颜色
        gantt.templates.grid_row_class = function (date, scale) {
            return "gantt_scale_cell111";
        };
        // 设置头部右侧上标题内容背景颜色
        gantt.templates.scale_cell_class = function (scale) {
            return "gantt_grid_head111";
        };
        // 设置头部右侧下标题内容背景颜色
        gantt.templates.scale_row_class = function (scale) {
            return "gantt_grid_head111";
        };
        // 设置表主内容背景颜色
        gantt.templates.task_row_class = function (start, end, task) {
            return "gantt_task111";
        };
        gantt.config.sort = true; // 设置点击左侧表头可排序
        gantt.config.columns = columns; // 设置左侧表头数据
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
        gantt.plugins({ tooltip: true });
        gantt.config.tooltip_offset_x = 10; // 设置tooltips水平偏移量
        gantt.config.tooltip_offset_y = 30; // 设置tooltips垂直偏移量
        gantt.templates.tooltip_text = function (start, end, task: any) {
            return (
                task.text +
                '<br/><span>开始:</span> ' +
                gantt.templates.tooltip_date_format(start) +
                '<br/><span>结束:</span> ' +
                gantt.templates.tooltip_date_format(end) +
                '<br/><span>进度:</span> ' +
                Math.round(task.progress * 100) +
                '%'
            );
        };

        // 设置连线事件
        gantt.config.show_links = true;
        gantt.config.drag_project = true;
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

