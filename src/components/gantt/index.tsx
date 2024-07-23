import { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './index.less'

const data = {
    data: [
        {
            id: 1,
            text: 'projectName',
            start_date: '01-04-2023',
            end_date: '05-12-2023',
            duration: 248,
            progress: 0.3,
            open: true,
            color: '#b38989'
        },
        {
            id: 2,
            text: '任务1',
            start_date: '02-04-2023',
            end_date: '11-07-2023',
            duration: 100,
            progress: 0.6,
            parent: 1
        },
        {
            id: 3,
            text: '任务2',
            start_date: '12-07-2023',
            end_date: '09-09-2023',
            duration: 59,
            progress: 0,
            parent: 1
        }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '1' },
        { id: 2, source: 2, target: 3, type: '0' }
    ]
};
const columns = [
    { name: 'text', label: '项目名称', tree: true, min_width: 140 },
    { name: 'start_date', label: '开始时间', min_width: 100 },
    { name: 'end_date', label: '结束时间', min_width: 100 },
    { name: 'duration', label: '计划工期' },
    { name: 'add', label: '' }
];

const GanttView = () => {
    // 获取gantrt容器实例
    const ganttRef = useRef<any>();
    // 初始化gantt
    const initGantt = () => {
        gantt.clearAll() // 清空之前的配置
        gantt.i18n.setLocale('cn'); // 设置中文
        gantt.config.readonly = true; // 设置为只读
        gantt.plugins({
            tooltip: true,
            quick_info: true // 快速信息框
            // multiselect: true,// 激活多任务选择
        });
        gantt.config.show_quick_info = true; 
        gantt.config.tooltip_offset_x = 10; 
        gantt.config.tooltip_offset_y = 30;
        // gantt.config.open_split_tasks = false;
        gantt.config.details_on_create = true; // 创建新事件通过点击“+”按钮打开灯箱
        gantt.config.autofit = true; // 甘特图图表宽度自适应
        // gantt.config.resize_rows = true; // 用户可以通过拖拽调整行高
        // 图表项目栏可以任意拖拽（任意节点下)
        gantt.config.order_branch = false;
        gantt.config.order_branch_free = false;
        gantt.config.placeholder_task = false; // 新增空白列后新增项目
        gantt.config.scale_height = 50;
        gantt.config.show_links = true; //是否显示依赖连线
        gantt.config.sort = false; // 点击表头可排序
        gantt.config.row_height = 40; //设置行高
        gantt.config.drag_project = true;
        gantt.config.scales = [
            // 设置时间刻度相关属性
            // 显示月日用这个
            // { unit: 'month', step: 1, format: '%Y-%m' },
            // { unit: 'day', step: 1, format: '%Y-%m-%d' }
            // 显示年月用这个
            { unit: 'year', step: 1, format: '%Y' },
            { unit: 'month', step: 1, format: '%M' }
        ];
        // gantt.config.start_date = new Date(
        //     `${new Date().getFullYear() - 1},${new Date().getMonth()},${new Date().getDay()}`
        // );
        // gantt.config.end_date = new Date(`${new Date().getFullYear() + 1},${new Date().getMonth()},${new Date().getDay()}`);
        // gantt.config.show_tasks_outside_timescale = true;
        gantt.config.auto_scheduling = true;
        // 配置Gantt内置弹出框内容
        gantt.templates.lightbox_header = function (start_date, end_date, task) {
            return `<b>${task.text}</b>`;
        };
        gantt.config.lightbox.sections = [
            {
                name: 'description',
                height: 36,
                map_to: 'text',
                type: 'textarea',
                focus: true
            },
            { name: 'time', type: 'duration', map_to: 'auto' },
            {
                name: 'Participants',
                height: 36,
                map_to: 'Participants',
                type: 'ParticipantsPlan',
                focus: true
            },
            {
                name: 'BgColor',
                height: 36,
                map_to: 'color',
                type: 'ParticipantsPlanColor',
                focus: true
            }
        ];
        gantt.templates.tooltip_text = function (start, end, task) {
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
        gantt.config.bar_height = 30;
        // 自定义信息弹窗class
        gantt.templates.quick_info_class = function () {
            return 'default-quick-info';
        };
        // 自定义信息弹窗头部class
        gantt.templates.grid_header_class = function () {
            return 'progress-header';
        };
        gantt.templates.quick_info_content = function (start, end, task) {
            return `
                        <div>
                            ${task.text}<br/>
                            计划开始 : ${gantt.templates.tooltip_date_format(start)}<br/>
                            计划结束:${gantt.templates.tooltip_date_format(end)}<br/>
                            进度 : ${Math.round(task.progress * 100) + '%'}<br/>
                            状态 :
                        </div>
                    `;
        };
        // 设置树形列的父项图标
        gantt.templates.grid_folder = function () {
            return '';
        };
        // 设置树形列的子项图标
        gantt.templates.grid_file = function () {
            return '';
        };
        // 自定义进度条上的文本
        gantt.templates.task_text = function (start, end, task) {
            return `
                <span style="margin-left:10px;color:white;">${task.progress * 100}%</span>
              `;
        };
        // 自定义progress_text内容
        gantt.templates.progress_text = function () {
            // return "<span style='text-align:left;'>" + Math.round(task.progress * 100) + '% </span>';
            return '';
        };
        gantt.config.columns = columns;
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

