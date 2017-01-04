## editable-dataTable
#### Author: Chandrakant Thakkar
##### Created on: 21st Nov 2016

---
###### This is a jQuery dataTable provides functionality of editing column's value at runtime.You can add/remove rows as per requirement.when you click on "Get All Data" button will give you all records of table in JSON format.The main advantage of using this editable-dataTable is easily to create bulk data entry form or get multiple records input from client.

---

#### How to Use ? Let's start

* _import required css and js files for jQuery DataTable :_
```javascript
<link href="css/select.dataTables.min.css" rel="stylesheet">
<link href="css/jquery.dataTables.min.css" rel="stylesheet">
<link href="css/editor.dataTables.min.css" rel="stylesheet">
<link href="css/buttons.dataTables.min.css" rel="stylesheet">
<link href="css/dataTables.bootstrap.min.css" rel="stylesheet">
<link href="css/ddata-table.css" rel="stylesheet">

<script src="js/jquery-1.7.2.min.js " type="text/javascript "></script>
<script src="js/jquery.dataTables.min.js " type="text/javascript "></script>
<script src="js/dataTables.buttons.min.js " type="text/javascript "></script>
<script src="js/custom-select.js " type="text/javascript "></script>
```
---
* _create HTML table and convert it into jQuery DataTable:_

```javascript
// CBT:HTML table
<table id="allocationTable" class="display fixed_headers" cellspacing="0" width="100%">
 <thead id="header-fixed">
  <tr>
   <th style="width:20%;">Employee Id</th>
   <th style="width:60%;">Name</th>
   <th style="width:10%;">City</th>
   <th style="width:10%;">Add</th>
  </tr>
 </thead>
</table>

// CBT: Convert HTML table into JQuery DataTable
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

//CBT:create JQuery DataTable
var allocationTable = $('#allocationTable').DataTable({
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

```
---
* _On draw event of DataTable bind "Add row" and "Remove row" button's "click" event:_

```javascript
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
```
---
* _Code of adding row:_

```javascript
//CBT:javascript fuction to add row
function callAddRow(allocationTable, requireRemoveBtn) {
    var btnsString = "";
    callAddRowCount = callAddRowCount + 1;
    if (requireRemoveBtn == true) {
        btnsString =
            '<a title="Add" href="javascript:void(0);" class="addNewRow"><svg ...></svg></a>';
    } else {
        btnsString =
            '<a title="Add" href="javascript:void(0);" class="addNewRow"><svg ...></svg></a>';
    }
    allocationTable.row.add([
        // '',
        '<input type="text" name="empId" value="' + callAddRowCount + '" id="empId_' + callAddRowCount + '" class="empId"/>',
        '<input type="text" size="60" name="empName" id="empName_' + callAddRowCount + '" class="empName"/>',
        '<input type="text" name="city" id="city_' + callAddRowCount + '" class="empCity quickAllocation onlyDigit"/>',
        btnsString
    ]).draw(true);

}

// CBT:call add row function without requirement of remove button
callAddRow(allocationTable, false);
or
// CBT:call add row function with requirement of remove button
callAddRow(allocationTable, true);

```
---
* _Code of removing row:_
```javascript
//CBT:this code will be executed when you click on remove button from specific row
$(".removeRow").bind("click", function(e) {
    $(this.parentElement.parentElement).addClass("remove");
    $(this.parentElement.parentElement).remove();
    allocationTable.row(".remove").remove();
});
```
---
* _Get data of DataTable in JSON format:_
```javascript
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
//CBT: Here, employeeData contains DataTable data in JSON fromat
```

### <a href='https://rawgit.com/ChandrakantThakkarDigiCorp/editable-dataTable/master/index.html' target='_blank'>Click Here To See Output</a>
