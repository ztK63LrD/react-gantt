import { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './index.less'

const data = {
    // 任务数据
    data: [
        //第一组 整条数据需要带上render属性  里面多段的数据parent执行整条的id
        { id: 1, name: '张三', render: 'split',  text: '' },
        { id: 99, parent: 1, text: '工', color: 'blue', start_date: '14-06-2024', duration: 1 },
        { id: 100, parent: 1, text: '工', color: 'blue', start_date: '15-06-2024', duration: 1 },
        { id: 101, parent: 1, text: '工', color: 'blue', start_date: '16-06-2024', duration: 1 },
        { id: 102, parent: 1, text: '工', color: 'blue', start_date: '17-06-2024', duration: 1 },
        { id: 103, parent: 1, text: '工', color: 'blue', start_date: '18-06-2024', duration: 1 },
        { id: 104, parent: 1, text: '工', color: 'blue', start_date: '19-06-2024', duration: 1 },
        { id: 105, parent: 1, text: '年', color: 'red', start_date: '20-06-2024', duration: 1 },
        { id: 106, parent: 1, text: '闲', color: 'green', start_date: '21-06-2024', duration: 1 },
        { id: 107, parent: 1, text: '工', color: 'blue', start_date: '22-06-2024', duration: 1 },
        { id: 108, parent: 1, text: '工', color: 'blue', start_date: '23-06-2024', duration: 1 },
        { id: 109, parent: 1, text: '工', color: 'blue', start_date: '24-06-2024', duration: 1 },
        { id: 110, parent: 1, text: '工', color: 'blue', start_date: '25-06-2024', duration: 1 },
        { id: 111, parent: 1, text: '工', color: 'blue', start_date: '26-06-2024', duration: 1 },
        { id: 112, parent: 1, text: '工', color: 'blue', start_date: '27-06-2024', duration: 1 },
        { id: 113, parent: 1, text: '工', color: 'blue', start_date: '28-06-2024', duration: 1 },
        { id: 114, parent: 1, text: '工', color: 'blue', start_date: '29-06-2024', duration: 1 },
        { id: 115, parent: 1, text: '闲', color: 'green', start_date: '30-06-2024', duration: 1 },
        { id: 116, parent: 1, text: '闲', color: 'green', start_date: '1-07-2024', duration: 1 },
        { id: 117, parent: 1, text: '工', color: 'blue', start_date: '2-07-2024', duration: 1 },
        { id: 118, parent: 1, text: '工', color: 'blue', start_date: '3-07-2024', duration: 1 },
        { id: 119, parent: 1, text: '工', color: 'blue', start_date: '4-07-2024', duration: 1 },
        { id: 120, parent: 1, text: '工', color: 'blue', start_date: '5-07-2024', duration: 1 },
        { id: 121, parent: 1, text: '工', color: 'blue', start_date: '6-07-2024', duration: 1 },
        { id: 122, parent: 1, text: '工', color: 'blue', start_date: '7-07-2024', duration: 1 },
        { id: 123, parent: 1, text: '工', color: 'blue', start_date: '8-07-2024', duration: 1 },
        { id: 124, parent: 1, text: '工', color: 'blue', start_date: '9-07-2024', duration: 1 },
        { id: 125, parent: 1, text: '工', color: 'blue', start_date: '10-07-2024', duration: 1 },
        { id: 126, parent: 1, text: '工', color: 'blue', start_date: '11-07-2024', duration: 1 },
        { id: 127, parent: 1, text: '工', color: 'blue', start_date: '12-07-2024', duration: 1 },
        { id: 128, parent: 1, text: '工', color: 'red', start_date: '13-07-2024', duration: 1 },
        // { id: 129, parent: 1, text: '工', color: 'yellow', start_date: '14-07-2024', duration: 1 },
        
        // // 第二组
        { id: 2, name: '李四', render: 'split', text: '' },
        { id: 129, parent: 1, text: '工', color: 'red', start_date: '14-07-2024', duration: 1 },

        // // 第三组
        // { id: 3, name: '王五1', render: 'split', text: '' },
        // { id: 104, parent: 3, text: '派工', color: '#008c8c', start_date: '15-06-2024', end_date: '15-06-2024' },
        // { id: 105, parent: 3, text: '休息', color: 'blue', start_date: '15-06-2024', end_date: '16-06-2024' },
    ],
};

// 左侧标题数据
const columns = [
    { name: 'id', label: '序号', resize: true,  max_width: 60, align: "center" },
    { name: 'name', label: '姓名', resize: true, max_width: 60, align: "center" },
];

const GanttView1 = () => {
    // 获取gantrt容器实例
    const ganttRef = useRef<any>();
    // 初始化gantt
    const initGantt = () => {
        gantt.clearAll() // 清空之前的配置
        gantt.i18n.setLocale('cn'); // 设置中文
        gantt.config.readonly = true; // 设置为只读，否则是可以移动甘特图和连线的
        gantt.config.start_date = new Date(2024, 5, 14); // 设置甘特图开始日期  
        gantt.config.end_date = new Date(2024, 6, 14); // 设置甘特图结束日期  
        gantt.init(ganttRef.current); // 初始化甘特图
        gantt.parse(data); // 渲染数据

        gantt.config.columns = columns; // 设置左侧表头数据
        gantt.config.scale_height = 60; // 设置表头高度
        gantt.config.min_column_width = 10; // 设置列最小宽度
        // 设置头部右侧上标题内容背景颜色
        gantt.templates.scale_cell_class = function (scale) {
            return "gantt_grid_head_top";
        };

        gantt.config.scales = [
            { unit: 'month', step: 1, format: function(date) {
                var formattedMonth = gantt.date.date_to_str('%m')(date); // 获取月份的两位数字表示
                formattedMonth = formattedMonth.replace(/^0+/, ''); // 去除月份前面的零
                return formattedMonth + '月'; // 返回格式化后的月份字符串
            }},
            
            { unit: 'day', step: 1, format: function(date) {
                var formattedDay = gantt.date.date_to_str('%d')(date); // 获取天的两位数字表示  
                formattedDay = formattedDay.replace(/^0+/, ''); // 去除天数前面的零  
                return formattedDay; // 返回格式化后的天数字符串  
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

        // tooltips样式设置
        gantt.plugins({ tooltip: true });
        gantt.config.tooltip_offset_x = 10; // 设置tooltips水平偏移量
        gantt.config.tooltip_offset_y = 30; // 设置tooltips垂直偏移量
        gantt.templates.tooltip_text = function (start: Date, end: Date, task: any): string {
            if (task.text) {
                return (
                    `<div class="gantt-tooltip">
                        <div class="gantt-tooltip-time-space">
                            <div class="time-word">当前时间：</div>
                            <div class="time-value">${start.getMonth() + 1}月${start.getDate()}日</div>
                        </div>
                        <div class="gantt-tooltip-task">
                            <div class="task-word">当前状态：</div>
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
        <div className="ganttView2">
            <div className='ganttContainer' ref={ganttRef} style={{ width: '100%' }}></div>
        </div>
    )
};
export default GanttView1;

