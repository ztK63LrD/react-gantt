import { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './index.less'

const data = {
    // 任务数据
    data: [
        //第一组 整条数据需要带上render属性  里面多段的数据parent执行整条的id
        { id: 1, name: '张三', render: 'split',  text: '' },
        { id: 100, parent: 1, text: '派工', color: '#008c8c', start_date: '15-06-2024 08:30', end_date: '15-06-2024: 10:30' },
        { id: 101, parent: 1, text: '休息', color: 'blue', start_date: '16-06-2024: 13:00', end_date: '16-06-2024:23:00' },
        
        // 第二组
        { id: 2, name: '李四', render: 'split', text: '' },
        { id: 102, parent: 2, text: '派工', color: '#008c8c', start_date: '15-06-2024 18:30', end_date: '15-06-2024: 22:30' },
        { id: 103, parent: 2, text: '休息', color: 'blue', start_date: '16-06-2024: 13:00', end_date: '16-06-2024:23:00' },

        // 第三组
        { id: 3, name: '王五', render: 'split', text: '' },
        { id: 104, parent: 3, text: '派工', color: '#008c8c', start_date: '15-06-2024 8:30', end_date: '15-06-2024: 22:30' },
        { id: 105, parent: 3, text: '休息', color: 'blue', start_date: '15-06-2024: 13:00', end_date: '16-06-2024:23:00' },
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
            return `<div style="color: #fff; font-size: 14px;">${task?.text}</div>`;
        };

    }

    useEffect(() => {
        initGantt();
    }, []);

    return (
        <div className="ganttView"  style={{ width: '100%', overflow: 'hidden' }}>
            <div className='ganttContainer' ref={ganttRef} style={{ width: '100%' }}></div>
        </div>
    )
};
export default GanttView;

