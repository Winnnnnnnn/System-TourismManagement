/**
 * 封装表格处理函数
 * @returns {Object}
 * @constructor
 */
function TableInit() {
    var tableInit = new Object();
    /**
     * 初始化表格
     * @param param
     * @constructor
     */
    tableInit.Init = function (param) {
        //请求数据
        $.ajax({
            type: 'post',
            url: param.url,
            dataType: "json",
            data: param.data,
            success: function (data) {
                $(param.id).bootstrapTable('destroy');
                $(param.id).bootstrapTable({
                    pagination: true,
                    sortable: false,
                    toolbar: param.toolbar,
                    pageNumber: param.pageNumber,
                    striped: true,
                    search: param.search,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100],
                    data: data,
                    columns: param.columns
                });
            },
            error: function () {
                console.log('获取数据失败!');
            }
        });
    };
    return tableInit;
}