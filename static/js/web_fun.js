const dragDropArea = document.getElementById('drag-drop-area');
const input = dragDropArea.querySelector('#fileElem');
const inputName = dragDropArea.querySelector('#drag-text');
const submitButton = document.getElementById('submit');
const downloadButton = document.getElementById('download');

//Button to download an xml file which helps users to detect the errors in their Ontologys
const downloadButtonXmlErrorFile = document.getElementById('download-xml-errors');

//Spinner loading
const spinnerLoading = document.getElementById('loadingSpinner');

const responseText = document.getElementById('response');
const errorReport = document.getElementById('error-report');
//const warningReport = document.getElementById('warning-report');

//Warning accordions
const restrictionsWItem = document.getElementById('restrictions-w-item');
const restrictionsWBody = document.getElementById('restrictions-w-body');

//Error accordions
const conceptsItem = document.getElementById('concepts-item');
const conceptsBody = document.getElementById('concepts-body');

const arrowsItem = document.getElementById('arrows-item');
const arrowsBody = document.getElementById('arrows-body');

const ellipsesItem = document.getElementById('ellipses-item');
const ellipsesBody = document.getElementById('ellipses-body');

const attributesItem = document.getElementById('attributes-item');
const attributesBody = document.getElementById('attributes-body');

const namespacesItem = document.getElementById('namespaces-item');
const namespacesBody = document.getElementById('namespaces-body');

const metadataItem = document.getElementById('metadata-item');
const metadataBody = document.getElementById('metadata-body');

const rhombusesItem = document.getElementById('rhombuses-item');
const rhombusesBody = document.getElementById('rhombuses-body');

const individualItem = document.getElementById('individual-item');
const individualBody = document.getElementById('individual-body');

const hexagonsItem = document.getElementById('hexagons-item');
const hexagonsBody = document.getElementById('hexagons-body');

const cardinalityRestrictionsItem = document.getElementById('cardinalityRestrictions-item');
const cardinalityRestrictionsBody = document.getElementById('cardinalityRestrictions-body');

const intersectionOfItem = document.getElementById('intersectionOf-item');
const intersectionOfBody = document.getElementById('intersectionOf-body');

const oneOfItem = document.getElementById('oneOf-item');
const oneOfBody = document.getElementById('oneOf-body');

const complementOfItem = document.getElementById('complementOf-item');
const complementOfBody = document.getElementById('complementOf-body');

const unionOfItem = document.getElementById('unionOf-item');
const unionOfBody = document.getElementById('unionOf-body');

const relationItem = document.getElementById('relation-item');
const relationBody = document.getElementById('relation-body');

const syntaxItem = document.getElementById('syntax-item');
const syntaxBody = document.getElementById('syntax-body');

const baseItem = document.getElementById('base-item');
const baseBody = document.getElementById('base-body');

const ontologyUriItem = document.getElementById('ontology-uri-item');
const ontologyUriBody = document.getElementById('ontology-uri-body');

const serverErrorItem = document.getElementById('server-error-item');
const serverErrorBody = document.getElementById('server-error-body');

const newNamespaces = document.getElementById('new-namespaces');
const textNamespace = document.getElementById('textNamespaces');

const xmlErrors = document.getElementById('xml-errors');

let response;
let file;
let loadFile = false;
let loadTransformedOntology = false;
let xmlErrorFile;
let loadXmlErrorFile = false;






//Drag enter event handler
//If the drag file enter the box => the box color is white and
//it is detected as a new file
dragDropArea.addEventListener('dragenter', (e) => {
    e.preventDefault();
    loadFile = false;
    responseText.style.display = 'none';
    inputName.style.display = 'block';
    dragDropArea.style.backgroundColor = 'white';
    inputName.innerHTML = 'Drag and drop your ontology or click to choose your file';
});

//Drag leave event handler
//If the drag file leave the box => the box color is white
dragDropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dragDropArea.style.backgroundColor = 'white';
    inputName.innerHTML = 'Drag and drop your ontology or click to choose your file';
});

//Drag over event handler
//While the drag file is on the box => the box color is grey
dragDropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragDropArea.style.backgroundColor = '#ECECEC';
    inputName.innerHTML = 'Release your ontology';
});

//Mouseover event handler
//While the mouse is on the box => the mouse pointer change in
//order to indicate to the user that they can click the box
dragDropArea.addEventListener('mouseover', ()=>{
    dragDropArea.style.cursor = 'pointer';
});

//Click event handler
//If the user click on the box => the user can select a local file to upload
dragDropArea.addEventListener('click', (e)=>{
    input.click();
});

//Change event handler
//Each time a user select a file => indicate to the user the name of the file
input.addEventListener('change', (e) => {
    loadFile = false;
    responseText.style.display = 'none';
    inputName.innerHTML = 'Drag and drop your ontology or click to choose your file';
    inputName.style.display = 'block';
    checkFiles(input.files);
});

//Drop event handler
//Each time a user drop a file => indicate to the user the name of the file
dragDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDropArea.style.backgroundColor = 'white';
    inputName.innerHTML = 'Drag and drop your ontology or click to choose your file';
    checkFiles(e.dataTransfer.files);
});

//Function to check the number of files
function checkFiles(files){
    if (files.length === undefined) {
        //There is just one file
        processFile(files);
    } else if (files.length === 1) {
        //There is just one file
        processFile(files[0]);
    } else {
        //There is more than one file. Just the first file is processed
        alert('Only the first ontology is going to be processed');
        processFile(files[0]);
    }
}

//Function to show the name of the ontology the user selected, check its extension
//and load the file in memory
function processFile(f) {
    if (f != undefined) {
        // Check file extension
        const extension = f.name.split('.').pop().toLowerCase();
        if (extension === 'xml' || extension === 'zip' || extension === 'csv') {
            // File extension correct
            inputName.innerHTML = '<b>"' + f.name + '"</b>' + ' selected';
            file = f;
            loadFile = true;
        } else {
            alert('The file extension must be zip or csv');
        }
    } else {
        alert('No file selected');
    }
}


//Click event handler for the button 'submit'
//If there is not a file loaded => warn the user
//If there is a file loaded => transform the ontology
submitButton.addEventListener('click', (e) => {
    //Submit
    if (loadFile){
        //Correct submit
        loadXmlErrorFile = false;
        loadFile = false;
        spinnerLoading.style.display = 'block';
        inputName.innerHTML = 'Transforming ontology...';        
        transformOntology(file);
        
        
    } else {
        //Incorrect submit
        alert('There is not a ontology selected');
    }
});

function transformOntology(file){
    loadTransformedOntology = false;
    const uri = 'http://localhost:5000/api';
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', uri);
    xhr.onreadystatechange = function(){
   
        if(xhr.readyState == 4 && xhr.status == 200){
            //Ontology transformed
            response = JSON.parse(xhr.responseText);        
            xmlErrors.style.display = 'none';
            newNamespaces.style.display = 'none';
            errorReport.style.display = 'none';
            //warningReport.style.display = 'none';
            inputName.style.display = 'none';
            responseText.style.display = 'block';
            spinnerLoading.style.display = 'none';
            responseText.innerText = "SUCCESSFULLY COMPLETED"//response['csv'];
            responseText.style.fontSize = "20px";  // Tamaño de fuente más grande
            responseText.style.fontWeight = "bold"; // Texto en negrita
            responseText.style.color = "green";     // Color verde para indicar éxito
            responseText.style.textAlign = "center"; // Centrar el texto en el elemento
            responseText.style.lineHeight = "250px"; // Ajustar la altura de línea verticalmente
            loadTransformedOntology = true;

            var errors_keys = Object.keys(response['errors']);   
            //var warnings_keys = Object.keys(response['warnings']);
            //var namespaces_keys = Object.keys(response['new_namespaces']);

            //xml file with highlight errors
            //loadXmlErrorFile = response['xml_error_generated'];
        
            /*if (warnings_keys.length > 0){
                warningReport.style.display = 'block';

                baseBody.innerHTML = '';
                ontologyUriBody.innerHTML = '';
                restrictionsWBody.innerHTML = '';
                
                baseItem.style.display = 'none';
                ontologyUriItem.style.displey = 'none';
                restrictionsWItem.style.display = 'none';

                warnings_keys.forEach((key) => classifyWarning(key, response['warnings'][key]));
            }*/

            if (errors_keys.length > 0){
                //The ontology has error that is neccesary to show to the user
                errorReport.style.display = 'block';
                if (loadXmlErrorFile){
                    xmlErrors.style.display = 'block';
                }

                conceptsBody.innerHTML = '';
                arrowsBody.innerHTML = '';
                ellipsesBody.innerHTML = '';
                attributesBody.innerHTML = '';
                namespacesBody.innerHTML = '';
                metadataBody.innerHTML = '';
                rhombusesBody.innerHTML = '';
                individualBody.innerHTML = '';
                hexagonsBody.innerHTML = '';
                cardinalityRestrictionsBody.innerHTML = '';
                intersectionOfBody.innerHTML = '';
                oneOfBody.innerHTML = '';
                complementOfBody.innerHTML = '';
                unionOfBody.innerHTML = '';
                relationBody.innerHTML = '';
                syntaxBody.innerHTML = '';
                serverErrorBody.innerHTML = '';

                conceptsItem.style.display = 'none';
                arrowsItem.style.display = 'none';
                ellipsesItem.style.display = 'none';
                attributesItem.style.display = 'none';
                namespacesItem.style.display = 'none';
                metadataItem.style.display = 'none';
                rhombusesItem.style.display = 'none';
                individualItem.style.display = 'none';
                hexagonsItem.style.display = 'none';
                cardinalityRestrictionsItem.style.display = 'none';
                intersectionOfItem.style.display = 'none';
                oneOfItem.style.display = 'none';
                complementOfItem.style.display = 'none';
                unionOfItem.style.display = 'none';
                relationItem.style.display = 'none';
                syntaxItem.style.display = 'none';
                serverErrorItem.style.display = 'none';
                
                errors_keys.forEach((key) => classifyError(key, response['errors'][key]));
            }

            /*if (namespaces_keys.length > 0){
                errorReport.style.display = 'block';
                textNamespace.innerHTML = '';
                newNamespaces.style.display = 'block';

                var unorderedList = document.createElement('ul');

                for(let k = 0; k < namespaces_keys.length; k++){
                    prefix = namespaces_keys[k]
                    namespace = response['new_namespaces'][prefix]

                    var listBullet = document.createElement('li');
                    listBullet.innerHTML = '<b>' + prefix + ': </b>' + namespace;
                    unorderedList.appendChild(listBullet);
                }

                textNamespace.appendChild(unorderedList);
            }*/
        }    
    }
    fd.append('data', file);
    xhr.send(fd);
}



/*function classifyWarning(key, value){

    if (key == 'Restrictions'){
        showError(restrictionsWItem, restrictionsWBody, value);
    }
    else if (key == 'Base'){
        showError(baseItem, baseBody, value);
    }
    else if (key == 'Ontology'){
        showError(ontologyUriItem, ontologyUriBody, value);
    }
}*/

function classifyError(key, value){
    switch(key){
        case 'Concepts':
            showError(conceptsItem, conceptsBody, value);
            break;
        case 'Arrows':
            showError(arrowsItem, arrowsBody, value);
            break;
        case 'Ellipses':
            showError(ellipsesItem, ellipsesBody, value);
            break;
        case 'Attributes':
            showError(attributesItem, attributesBody, value);
            break;
        case 'Namespaces':
            showError(namespacesItem, namespacesBody, value);
            break;
        case 'Metadata':
            showError(metadataItem, metadataBody, value);
            break;
        case 'Rhombuses':
            showError(rhombusesItem, rhombusesBody, value);
            break;
        case 'Individual':
            showError(individualItem, individualBody, value);
            break;
        case 'Hexagons':
            showError(hexagonsItem, hexagonsBody, value);
            break;
        case 'Cardinality-Restrictions':
            showError(cardinalityRestrictionsItem, cardinalityRestrictionsBody, value);
            break;
        case 'intersectionOf':
            showError(intersectionOfItem, intersectionOfBody, value);
            break;
        case 'oneOf':
            showError(oneOfItem, oneOfBody, value);
            break;
        case 'complementOf':
            showError(complementOfItem, complementOfBody, value);
            break;
        case 'unionOf':
            showError(unionOfItem, unionOfBody, value);
            break;
        case 'Relations':
            showError(relationItem, relationBody, value);
            break;
        case 'Syntax':
            showSimpleError(syntaxItem, syntaxBody, value);
            break;
        case 'Server Error':
            showSimpleError(serverErrorItem, serverErrorBody, value);
            break;
    }
}

function showError(item, body, errors){
    var unorderedList = document.createElement('ul');
    item.style.display = 'block';

    for(let j = 0; j < errors.length; j++){
        var listBullet = document.createElement('li');
        text = '';
        if(errors[j]['value']){
            text = '<b>Value:</b> '  + errors[j]['value'];
        }
        if(errors[j]['message']){
            if(text != ''){
                text += ', ';
            }
            text += '<b>Problem:</b> ' + errors[j]['message'];
        }
        if(errors[j]['shape_id']){
            if(text != ''){
                text += ', ';
            }
            text += '<b>Shape id:</b> ' + errors[j]['shape_id'];
        }
        //listBullet.innerHTML = '<b>Value:</b> '  + errors[j]['value'] + ', <b>Problem:</b> ' + errors[j]['message'] + ', <b>Shape id:</b> ' + errors[j]['shape_id'];
        listBullet.innerHTML = text;
        unorderedList.appendChild(listBullet);
    }
    body.appendChild(unorderedList);
}

function showSimpleError(item, body, errors){
    var unorderedList = document.createElement('ul');
    item.style.display = 'block';

    var listBullet = document.createElement('li');
    listBullet.innerHTML = '<b>Message:</b> '  + errors['message'];
    unorderedList.appendChild(listBullet);
    body.appendChild(unorderedList);
}

//Click event handler for the button 'download' in order to download the ttl file
//If there is not a transform ontology loaded => warn the user
//If there is a transform ontology loaded => download it
downloadButton.addEventListener('click', () => {
    
    if (loadTransformedOntology) {
        var zipData = {
            'Errors.txt': response['errors'],
            'Structure.csv': response['structure_csv'],
            'Structure_term_type.txt': response['structure_type'],
            'Structure_term_name.txt': response['structure_name'],
            'Structure_term_inferred_type.txt': response['inferred_type'],
            'Structure_term_inferred_blank_nodes.txt': response['inferred_blank_nodes'],
            'Patterns_type.txt': response['patterns_type_txt'],
            'Patterns_name.txt': response['patterns_name_txt'],
            'Patterns_type.csv': response['patterns_type_csv'],
            'Patterns_name.csv': response['patterns_name_csv']
        };
        downloadZipFile('patterns.zip', zipData);
    } else {
        alert('There is not loaded a transform ontology');
    }
});


// Function to download a ZIP file with multiple documents
function downloadZipFile(filename, responses) {
    // Create a new ZIP object
    var zip = new JSZip();

    // Add each response as a file to the ZIP
    for (var key in responses) {
        if (responses.hasOwnProperty(key)) {
            zip.file(key, responses[key]);
        }
    }

    // Generate the ZIP file asynchronously
    zip.generateAsync({ type: "blob" }).then(function(content) {
        // Save the ZIP file using FileSaver.js
        saveAs(content, filename);
    });
}



// Function to download a file
function downloadFile(filename, text){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


//Click event handler for the button 'download' in order to download the xml error file
//If there is not a xml error file loaded => warn the user
//If there is a xml error file loaded => download it
downloadButtonXmlErrorFile.addEventListener('click', ()=>{
    if(loadXmlErrorFile){
        downloadFile('ontology.xml', response['xml_error_file']);
    } else{
        alert('There is not loaded an xml error file');
    }
});

