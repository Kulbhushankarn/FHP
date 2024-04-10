//-------------------------------------------------CHECKBOXES-------------------------------------------------------------------------------------\\



/**
 * Node List of all checkboxes other than master checkbox
 */
let checkboxes = document.querySelectorAll('.selectedRows');
AddClickEventOnCheckBoxes();

/**
 * Master checkbox element which selects/deselects all the other checkboxes
 */
const masterCheckbox = document.getElementById('master-CheckBox');

/**
 * An array which holds the serial No of rows selected By user
 */
let idSelectedByUser = [];


/**
 *  Represents Update Button element at Home Page
 */
let updateButton = document.getElementById('update-btn');



/**
 *  Adds an Event Listener to checkboxes which Add/remove Id in {idselectedByUser} array 
 */
function AddClickEventOnCheckBoxes() {

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {

            if (checkbox.checked) {
                idSelectedByUser.push((checkbox.getAttribute('id')));
                checkbox.parentElement.parentElement.classList.add('colorRow');
                console.log('id added', idSelectedByUser);
            }
            else {
                let idToPop = checkbox.getAttribute('id');
                idSelectedByUser = idSelectedByUser.filter(item => item !== idToPop);
                checkbox.parentElement.parentElement.classList.remove('colorRow');
                console.log('id removed', idSelectedByUser);
            }

            //------------Handling the update Button part
            if (idSelectedByUser.length > 1) {
                //disbaling the update button
                // give a pop up which shows cannot delete more than one records
                console.log("cannot delete mroe than 1 records");
            }

            else {
                /*  let url = updateButton.getAttribute('date-url');
  
                  url = url + '&id=' + idSelectedByUser[0];
                  updateButton.setAttribute('href', url);*/

            }
        })
    });
}


/**
 * Selects/Deselects All checkboxes
 */
function SelectAllCheckbox() {

    if (masterCheckbox.checked) {
        checkboxes.forEach(checkBox => {
            checkBox.checked = true;
            idSelectedByUser.push((checkBox.getAttribute('id')));
            checkBox.parentElement.parentElement.classList.add('colorRow');
            console.log("cannot delete mroe than 1 records");
        });
    }
    else {
        checkboxes.forEach(checkBox => {
            checkBox.checked = false;
            checkBox.parentElement.parentElement.classList.remove('colorRow');
        });
        idSelectedByUser = [];
    }

}





//---------------------------------------------------------DELETE ENTERIES---------------------------------------------------------------------------------\\
//---------- Handling delete event

/**
 * Delete button element which deletes the user Data
 */
const deleteButton = document.getElementById('delete-btn');

/**
 * Event Listener which contains ajax call which Deletes the data present inside {idSelectedByUser} array
 */
/*deleteButton.addEventListener('click', () => {
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    const idsJSON = JSON.stringify(idSelectedByUser);

    xhr.open('POST', '/Home/Delete', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
        console.log(xhr.responseText);
        let response = JSON.parse(xhr.responseText);
        if (xhr.status == 200 && response.success) {

            idSelectedByUser.forEach(serialNo => {
                DeleteData(serialNo);
            });

        } // handling when data is successfully deleted

        else {
            console.error('Error deleting item:', xhr.statusText);
        }
    }

    xhr.send(idsJSON);
});*/

/**
 * Deletes data from {idSelectedByUser} array which gets deleted successfully
 *  * @param {} id
 */
function DeleteData(id) {
    idSelectedByUser = idSelectedByUser.filter(item => item !== id);
    console.log(idSelectedByUser);
    const checkBox = document.getElementById(id);
    const parent = checkBox.parentElement;
    const rowToDelete = parent.parentElement;

    console.log(parent);
    console.log(rowToDelete);
    rowToDelete.remove();
    rowToDelete.textContent = "";
    console.log(checkBox);
}

//-----------------------------------------------SORTING---------------------\\

//----------Getting the employees Data


/*let employeesData = [];*/

/**
 * Array which contains all the table Headers Name (same as model property name)
 */
let tableHeaders = ['SerialNo', 'Prefix', 'FirstName', 'MiddleName', 'LastName', 'CurrentAddress', 'DOB', 'Education', 'CurrentCompany', 'JoiningDate'];

let arrowUpIcons = document.querySelectorAll('.sort-icon.arrow-up');
let arrowDownIcons = document.querySelectorAll('.sort-icon.arrow-down');
console.log(arrowUpIcons);

arrowUpIcons.forEach((arrowUpIcon, index) => {
    arrowUpIcon.addEventListener('click', () => SortAscending(tableHeaders[index]));

});


arrowDownIcons.forEach((arrowDownIcon, index) => {
    arrowDownIcon.addEventListener('click', () => SortDescending(tableHeaders[index]));
});

function SortAscending(ColumnName) {
    console.log("Sorting in ascending" + ColumnName);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/Home/SortAsc?columnName=` + ColumnName, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Sorting completed successfully');
                const sortedData = JSON.parse(xhr.responseText);
                console.log(sortedData);
                RenderSortedData(sortedData);
            } else {
                console.error('Error:', xhr.statusText);
            }
        }
    };

    xhr.send();
}

function SortDescending(ColumnName) {
    console.log("Sorting in descending" + ColumnName);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/Home/SortDesc?columnName=` + ColumnName, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Sorting completed successfully');
                const sortedData = JSON.parse(xhr.responseText);
                console.log(sortedData);
                RenderSortedData(sortedData);
            } else {
                console.error('Error:', xhr.statusText);
            }
        }
    };

    xhr.send();
}

function RenderSortedData(sortedData) {
    let tableData = document.getElementById('tableData');
    let str = "";
    tableData.innerHTML = "";

    sortedData.forEach(function (item) {

        str += '<tr>' +
            `<td><input type="checkbox" class="selectedRows" id=\"${item.SerialNo}\"` + '/></td>' +
            '<td>' + item.SerialNo + '</td>' +
            '<td>' + item.Prefix + '</td>' +
            '<td>' + item.FirstName + '</td>' +
            '<td>' + item.MiddleName + '</td>' +
            '<td>' + item.LastName + '</td>' +
            '<td>' + item.CurrentAddress + '</td>' +
            '<td>' + formatDate(item.DOB) + '</td>' + // Format DOB here
            '<td>' + item.Education + '</td>' +
            '<td>' + item.CurrentCompany + '</td>' +
            '<td>' + formatDate(item.JoiningDate) + '</td>' + // Format JoiningDate here
            '</tr>';
    });

    tableData.innerHTML = str;
    checkboxes = document.querySelectorAll('.selectedRows');
    AddClickEventOnCheckBoxes();
}
function formatDate(dateString) {
    const timestamp = parseInt(dateString.match(/\d+/)[0]);
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formattedDate.replace(/\//g, '-'); // Replace forward slashes with dashes
}
//-------------------------------------------------------------------FILTERING-----------------------------------------------------------------------\\

const filterRow = document.getElementById('filterRow');


let searchBoxes = filterRow.querySelectorAll('input');



searchBoxes.forEach((searchBox, index) => {
    searchBox.addEventListener('input', () => ApplyFilter());
});

function ApplyFilter() {
    const searchBoxesValues = [];
    searchBoxes.forEach((searchBox, index) => {
        searchBoxesValues[index] = searchBox.value;
    });

    console.log(searchBoxesValues);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/Home/ApplyFilter', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Searching completed successfully');
                const filteredData = JSON.parse(xhr.responseText);
                console.log(filteredData);
                RenderSortedData(filteredData);
            } else {
                console.error('Error:', xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify(searchBoxesValues));
}


function ClearSearchAndFilter() {
    searchBoxes.forEach((searchBox) => {
        searchBox.value = "";
    });

    ApplyFilter();
}


//-------------------Update-----------------------------\\

document.getElementById('update-btn').onclick = () => {
    event.preventDefault();
    var url = "/Home/Update?buttonClicked=Update&id=" + idSelectedByUser[0]
    console.log('url' + url);
    window.location.href = url;
};

document.getElementById('View-Data').onclick = () => {
    event.preventDefault();
    var url = "/Home/Pagination?buttonClicked=View&id=" + idSelectedByUser[0];
    window.location.href = url;
}
