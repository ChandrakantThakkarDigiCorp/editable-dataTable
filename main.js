$(document).ready(function(data) {
    var callAddRowCount = 0;

    function callAddRow(allocationTable, requireRemoveBtn) {
        var btnsString = "";
        callAddRowCount = callAddRowCount + 1;
        if (requireRemoveBtn == true) {
            btnsString =
                '<a title="Add" href="javascript:void(0);" class="addNewRow"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 232.531 232.531" enable-background="new 0 0 232.531 232.531"xml:space="preserve"><path fill="#676767" stroke="#010202" d="M0,93.012h93.013V0h46.506v93.012h93.013v46.506h-93.013v93.013H93.013v-93.013H0V93.012z"/></svg></a> <a title="Remove" href="javascript:void(0);" class="removeRow"><svg version="1.1" id="Layer_1" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="16px" viewBox="43.783 59.332 503.531 585.394" enable-background="new 43.783 59.332 503.531 585.394" xml:space="preserve"><path d="M43.783,105.233h176.412V59.332h150.708v45.901c61.034,0,115.378,0,176.412,0v69.461H43.783V105.233z"/><path d="M89.842,204.141h419.935v440.584H89.842 M444.428,252.536h-41.79v348.239h41.79V252.536z M318.519,252.839h-41.79v348.239h41.79V252.839z M192.611,255.638H150.82v348.239h41.791V255.638z"/></svg></a>';
        } else {
            btnsString =
                '<a title="Add" href="javascript:void(0);" class="addNewRow"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 232.531 232.531" enable-background="new 0 0 232.531 232.531"xml:space="preserve"><path fill="#676767" stroke="#010202" d="M0,93.012h93.013V0h46.506v93.012h93.013v46.506h-93.013v93.013H93.013v-93.013H0V93.012z"/></svg></a>';
        }
        allocationTable.row.add([
            // '',
            '<input type="text" name="empId" value="' + callAddRowCount + '" id="empId_' + callAddRowCount + '" class="empId"/>',
            '<input type="text" size="60" name="empName" id="empName_' + callAddRowCount + '" class="empName"/>',
            '<input type="text" name="city" id="city_' + callAddRowCount + '" class="empCity quickAllocation onlyDigit"/>',
            btnsString
        ]).draw(true);

    }


    //CBT:if data table is already availbale then delete it and recreate it
    if ($.fn.dataTable.isDataTable('#allocationTable') == true) {
        $('#allocationTable').DataTable().destroy();
        $("#tableData").empty();
        $("#tableData").html(
            '<table id="allocationTable" class="display fixed_headers" cellspacing="0" width="100%">\
         <thead id="header-fixed">\
         <tr>\
           <th  style="width:20%;">Employee Id</th><th  style="width:60%;">Name</th><th  style="width:10%;">City</th><th  style="width:10%;">Add</th>\
         </tr>\
         </thead>\
       </table>'
        );
    }

    //CBT:create Data table
    allocationTable = $('#allocationTable').DataTable({
        order: [
            [1, 'asc']
        ],
        "paging": false,
        "ordering": false,
        "info": false,
        "bFilter": false,
        "bInfo": false,
        "scrollCollapse": true,
        "scrollY": "230px",
    });

    //CBT:bind data table draw event
    allocationTable.on('draw', function() {
        $(".addNewRow").unbind();
        $(".addNewRow").bind("click", function() {
            callAddRow(allocationTable, true);
        });
        $(".removeRow").unbind();
        $(".removeRow").bind("click", function(e) {
            $(this.parentElement.parentElement).addClass("remove");
            $(this.parentElement.parentElement).remove();
            allocationTable.row(".remove").remove();
        });

    });

    // CBT:by default show three rows should display
    callAddRow(allocationTable, false);
    callAddRow(allocationTable, true);
    callAddRow(allocationTable, true);

    $("#getAllData").on("click", function() {

        var allRows = $('#allocationTable tr:not(:first)');
        var tempRow = {};
        var employeeData = [];
        allRows.each(function(i, d) {
            tempRow = {};
            tempRow["id"] = $(d).find('input.empId').val();
            tempRow["name"] = $(d).find('input.empName').val();
            tempRow["city"] = $(d).find('input.empCity').val();
            employeeData.push(tempRow);
        });

        //CBT:created Columns of dataTable
        var tblColumns = [];
        tblColumns.push({
            "data": "id",
            "title": "Employee ID",
        });
        tblColumns.push({
            "data": "name",
            "title": "Employee Name",
        });
        tblColumns.push({
            "data": "city",
            "title": "City",
        });

        var table = "";
        //CBT:if data table is not available create data table
        $("#employeeTableData").empty();
        $("#employeeTableData").html('<table id="employeetbl" class="table table-hover table-striped display responsive nowrap " width="100%"></table>');
        if ($.fn.dataTable.isDataTable('#employeetbl') == false) {
            table = $('#employeetbl').DataTable({
                "data": employeeData,
                "columns": tblColumns,
                "info": false,
                responsive: {
                    details: {
                        type: 'column',
                        target: 'tr'
                    }
                },
                columnDefs: [{
                    className: 'control',
                    orderable: true,
                    targets: 1
                }],
                order: [0, 'asc'],
                "bFilter": false,
                bLengthChange: false,
                // pagingType: "simple",
                "scrollY": "500",
                // "scrollCollapse": true,
                "scrollX": true,
                "paging": false,
                "searching": true,
                "drawCallback": function(table) {},
                dom: 'Bfrtip',
                buttons: [{
                    extend: 'csv',
                    title: "Detail List",
                    text: 'Export CSV',
                    exportOptions: {
                        columns: ':visible'
                    }
                }, {
                    extend: 'pdf',
                    title: "Detail List",
                    text: 'Export PDF',
                    exportOptions: {
                        columns: ':visible'
                    }
                }],
            });
        }
    });



});
