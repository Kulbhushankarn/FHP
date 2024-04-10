
let serialNo = document.getElementById('SerialNo');

const addButton = document.getElementById('add');
const editButton = document.getElementById('edit');
const clearButton = document.getElementById('clear');

const first = document.getElementById('first');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const last = document.getElementById('last');

const form = document.getElementById('employee-details-form');

const fieldsInForm = form.elements;
console.log(fieldsInForm);
let employeesData;
let currIndex;
let currentId;
let dataRetrieved = false;


function disableInputFields(fields) {
    //-------------Disabling Fields In case of View
    for (let i = 0; i < fields.length; i++) {
        console.log("in for loop");
        if (fields[i].tagName === 'INPUT' || fields[i].tagName === 'input') {
            fields[i].disabled = true;

            console.log("disabled" + fields[i]);
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const action = urlParams.get('buttonClicked');
    console.log(action);
    currentId = urlParams.get('id');

    if (action === 'New' || action === 'Update') {

        if (action === 'New') {
            serialNo.value = urlParams.get('serialNo');
        }
        serialNo.readOnly = true;

        addButton.classList.remove('hidden');
        editButton.classList.remove('hidden');
        clearButton.classList.remove('hidden');

        addButton.classList.add('visible');
        editButton.classList.add('visible');
        clearButton.classList.add('visible');

    } else if (action === 'View') {

        first.classList.remove('hidden');
        previous.classList.remove('hidden');
        next.classList.remove('hidden');
        last.classList.remove('hidden');

        first.classList.add('visible');
        previous.classList.add('visible');
        next.classList.add('visible');
        last.classList.add('visible');

        disableInputFields(fieldsInForm);

        //-------------Getting Data From XML

        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/Home/EmployeesData', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('employees List Retrieved Successfully');
                    employeesData = JSON.parse(xhr.responseText);

                    for (let i = 0; i < employeesData.length; i++) {
                        if (employeesData[i].SerialNo == currentId) {
                            currIndex = i;
                        }

                    }
                    console.log('current Index = ' + currIndex);
                    dataRetrieved = true;

                    first.addEventListener('click', () => {
                        currIndex = 0;
                        SetValuesIntoFields(employeesData[currIndex], fieldsInForm);
                        first.disabled = true;
                    });

                    previous.addEventListener('click', () => {
                        if (currIndex != 0) {
                            currIndex -= 1;
                            SetValuesIntoFields(employeesData[currIndex], fieldsInForm);
                        }
                    });

                    next.addEventListener('click', () => {
                        if (currIndex != employeesData.length - 1) {
                            currIndex += 1;
                            SetValuesIntoFields(employeesData[currIndex], fieldsInForm);
                        }
                    });

                    last.addEventListener('click', () => {

                        currIndex = employeesData.length - 1;
                        SetValuesIntoFields(employeesData[currIndex], fieldsInForm);
                    }
                    );
                    /* SetValuesIntoFields(employeesData[currIndex - 1], fieldsInForm);*/

                } else {
                    console.error('Error:', xhr.statusText);
                }
            }
        };

        xhr.send();





    }
});


/*first = first.querySelector('button');
console.log(first)*/
if (dataRetrieved) {



}

const serialNoField = document.getElementById('SerialNo');
let prefixField = document.getElementById('Prefix');
let firstNameField = document.getElementById('FirstName');
let middleNameField = document.getElementById('MiddleName');
let lastNameField = document.getElementById('LastName');
let DOBField = document.getElementById('DOB');
let currentAddressField = document.getElementById('CurrentAddress');
let educationField = document.getElementById('Education');
let currentCompanyField = document.getElementById('CurrentCompany');
let joiningDateField = document.getElementById('JoiningDate');

function SetValuesIntoFields(object) {
    console.log("SerialNo: " + object.SerialNo);
    serialNoField.value = object.SerialNo;

    console.log("Prefix: " + object.Prefix);
    prefixField.value = object.Prefix;

    console.log("FirstName: " + object.FirstName);
    firstNameField.value = object.FirstName;

    console.log("MiddleName: " + object.MiddleName);
    middleNameField.value = object.MiddleName;

    console.log("LastName: " + object.LastName);
    lastNameField.value = object.LastName;

    console.log("DOB: " + object.DOB);
    DOBField.value = formatDate(object.DOB);

    console.log("CurrentAddress: " + object.CurrentAddress);
    currentAddressField.value = object.CurrentAddress;

    console.log("Education: " + object.Education);
    educationField.value = object.Education;

    console.log("CurrentCompany: " + object.CurrentCompany);
    currentCompanyField.value = object.CurrentCompany;

    console.log("JoiningDate: " + object.JoiningDate);
    joiningDateField.value = formatDate(object.JoiningDate);
}


function formatDate(dateString) {
    const timestamp = parseInt(dateString.match(/\d+/)[0]);
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formattedDate.replace(/\//g, '-'); // Replace forward slashes with dashes
}
