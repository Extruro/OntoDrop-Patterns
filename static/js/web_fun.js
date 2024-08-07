const dragDropArea = document.getElementById('drag-drop-area');
const input = dragDropArea.querySelector('#fileElem');
const inputName = dragDropArea.querySelector('#drag-text');
const closeModal = document.querySelector('.close');

const submitButton = document.getElementById('submit');
const downloadButton = document.getElementById('download');
const goBackButton = document.getElementById("go-back");
const goBackButton2 = document.getElementById("go-back2");
const goBackButton3 = document.getElementById("go-back3");

const flattenOption = document.querySelector('input[name="flattenOption"]:checked');
const patternOption = document.querySelector('input[name="patternOption"]:checked');
const patternsInfo = document.getElementById('patterns-info');
const flattenInfo = document.getElementById('flatten-info');

//Button to download an xml file which helps users to detect the errors in their Ontologys
const downloadButtonXmlErrorFile = document.getElementById('download-xml-errors');

//Spinner loading
const spinnerLoading = document.getElementById('loadingSpinner');

const responseText = document.getElementById('response');
const errorReport = document.getElementById('error-report');

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

// Obtener la ventana modal
const modal = document.getElementById("myModal");
//Obtener la ventana + info Patterns
const infoPat = document.getElementById("infoPatterns");
//Obtener la ventana + info Flatten
const infoFlat = document.getElementById("infoFlatten");

const confirm = document.getElementById("confirmSelect");
// Obtener el botón que abre la ventana modal
const btn = document.getElementById("drag-drop-area");
// Obtener el botón "Save"
const modalSubmit = document.getElementById("modal-submit");
const modalSubmit2 = document.getElementById("modal-submit2");
const modalSubmit3 = document.getElementById("modal-submit3");
// Obtener botón "Continuar"
const btnContinue = document.getElementById("continue-btn");
// Obtener botón  "Editar"
const btnEdit = document.getElementById("edit-btn");
//Radios
const pattern1Radio = document.getElementById("pattern1Radio");
const pattern2Radio = document.getElementById("pattern2Radio");
const pattern3Radio = document.getElementById("pattern3Radio");
const flatten1Radio = document.getElementById("flatten1Radio");
const flatten2Radio = document.getElementById("flatten2Radio");

let response;
let file;
let loadFile = false;
let loadTransformedOntology = false;
let xmlErrorFile;
let loadXmlErrorFile = false;
var patterns = "type";
var flatten = "no";
var isDrop = false;

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

// Evento change en el input de tipo file para detectar cuando se ha seleccionado un archivo
dragDropArea.addEventListener('change', (e) => {
    // Cambiar el fondo del área de drop a blanco cuando se haya añadido un archivo
    dragDropArea.style.backgroundColor = 'white';    
});


dragDropArea.addEventListener('click', (e) => {
    const patternOptionChecked = document.querySelector('input[name="patternOption"]:checked');
    const flattenOptionChecked = document.querySelector('input[name="flattenOption"]:checked');
    isDrop = false;

    // Reestablecer botones de Submit y Download Patterns
    submitButton.style.backgroundColor = "#808080";
    submitButton.style.color = "white";
    submitButton.disabled = true;
    submitButton.style.cursor = "not-allowed";
    downloadButton.style.backgroundColor = "#808080";
    downloadButton.style.color = "white";
    downloadButton.disabled = true;
    downloadButton.style.cursor = "not-allowed";

    // Comprueba si han seleccionado los dos checks
    if (!patternOptionChecked || !flattenOptionChecked) {

        // Actualiza los campos del modal
        const patternsSelect = document.getElementById('patterns');
        const flattenSelect = document.getElementById('flatten');

        // Actualizar select de Patterns si hay un valor seleccionado
        if (patternOptionChecked) {
            if (document.getElementById("pattern1Radio").checked) {
                patternsSelect.value = "type";
            } else if (document.getElementById("pattern2Radio").checked) {
                patternsSelect.value = "name";
            } else if (document.getElementById("pattern3Radio").checked) {
                patternsSelect.value = "both";
            }
        } else {
            patternsSelect.selectedIndex = -1; // Desseleccionar si no hay opción
        }

        // Actualizar select de Flatten si hay un valor seleccionado
        if (flattenOptionChecked) {
            if (document.getElementById("flatten1Radio").checked) {
                flattenSelect.value = "no";
            } else if (document.getElementById("flatten2Radio").checked) {
                flattenSelect.value = "yes";
            }
        } else {
            flattenSelect.selectedIndex = -1; // Desseleccionar si no hay opción
        }

        document.getElementById("myModal").style.display = "block";
    } else {
        if (document.getElementById("pattern1Radio").checked) {
            patterns = "type";
        } else if (document.getElementById("pattern2Radio").checked) {
            patterns = "name";
        } else if (document.getElementById("pattern3Radio").checked) {
            patterns = "both";
        }

        if (document.getElementById("flatten1Radio").checked) {
            flatten = "no";
        } else if (document.getElementById("flatten2Radio").checked) {
            flatten = "yes";
        }
        
        input.click();
    }
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
    const patternOptionChecked = document.querySelector('input[name="patternOption"]:checked');
    const flattenOptionChecked = document.querySelector('input[name="flattenOption"]:checked');
    isDrop = true;
    // Reestablecer botones de Submit y Download Patterns
    submitButton.style.backgroundColor = "#808080";
    submitButton.style.color = "white";
    submitButton.disabled = true;
    submitButton.style.cursor = "not-allowed";
    downloadButton.style.backgroundColor = "#808080";
    downloadButton.style.color = "white";
    downloadButton.disabled = true;
    downloadButton.style.cursor = "not-allowed";

    e.preventDefault();
    dragDropArea.style.backgroundColor = 'white';
    inputName.innerHTML = 'Drag and drop your ontology or click to choose your file';
    inputName.style.display = 'block';
    
    //Comprueba si han seleccionado los dos checks
    if (!patternOptionChecked || !flattenOptionChecked) {

        // Actualiza los campos del modal
        const patternsSelect = document.getElementById('patterns');
        const flattenSelect = document.getElementById('flatten');

        // Actualizar select de Patterns si hay un valor seleccionado
        if (patternOptionChecked) {
            if (document.getElementById("pattern1Radio").checked) {
                patternsSelect.value = "type";
            } else if (document.getElementById("pattern2Radio").checked) {
                patternsSelect.value = "name";
            } else if (document.getElementById("pattern3Radio").checked) {
                patternsSelect.value = "both";
            }
        } else {
            patternsSelect.selectedIndex = -1; // Desseleccionar si no hay opción
        }

        // Actualizar select de Flatten si hay un valor seleccionado
        if (flattenOptionChecked) {
            if (document.getElementById("flatten1Radio").checked) {
                flattenSelect.value = "no";
            } else if (document.getElementById("flatten2Radio").checked) {
                flattenSelect.value = "yes";
            }
        } else {
            flattenSelect.selectedIndex = -1; // Desseleccionar si no hay opción
        }

        document.getElementById("myModal").style.display = "block";
    } else {
        if (document.getElementById("pattern1Radio").checked) {
            patterns = "type";
        } else if (document.getElementById("pattern2Radio").checked) {
            patterns = "name";
        } else if (document.getElementById("pattern3Radio").checked) {
            patterns = "both";
        }

        if (document.getElementById("flatten1Radio").checked) {
            flatten = "no";
        } else if (document.getElementById("flatten2Radio").checked) {
            flatten = "yes";
        }
        
    }

    checkFiles(e.dataTransfer.files);
    
});

//Function to check the number of files
function checkFiles(files){
    const patternOptionChecked = document.querySelector('input[name="patternOption"]:checked');
    const flattenOptionChecked = document.querySelector('input[name="flattenOption"]:checked');
    
    if (files.length === undefined) {
        
        //There is just one file
        if (!patternOptionChecked || !flattenOptionChecked) {
            modal.style.display = "block";
        }
        else{
            processFile(files);
        }
        
    } else if (files.length === 1) {
        //There is just one file    
        if (!patternOptionChecked || !flattenOptionChecked) {
            modal.style.display = "block";
        }
        else{
            processFile(files[0]);
        }
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
        if (extension === 'zip' || extension === 'csv') {
            // File extension correct
            inputName.innerHTML = '<b>"' + f.name + '"</b>' + ' selected';
            file = f;
            loadFile = true;
            submitButton.style.backgroundColor = "#4CAF50"; // Change background colour
            submitButton.style.color = "white"; // Change text colour
            submitButton.disabled = false; // Enable the button if it was previously disabled.
            submitButton.style.cursor = "pointer"; // Change the cursor to indicate that it is clickable            
            submitButton.classList.add('border-blink');
            // To stop the flashing after 10 seconds
            setTimeout(function() {
                submitButton.classList.remove('border-blink');
            }, 15000);
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
        submitButton.classList.remove('border-blink');
        spinnerLoading.style.display = 'block';
        pattern1Radio.disabled = true;
        pattern2Radio.disabled = true;
        pattern3Radio.disabled = true;
        flatten1Radio.disabled = true;
        flatten2Radio.disabled = true;
        pattern1Radio.style.cursor = "not-allowed";
        pattern2Radio.style.cursor = "not-allowed";
        pattern3Radio.style.cursor = "not-allowed";
        flatten1Radio.style.cursor = "not-allowed";
        flatten2Radio.style.cursor = "not-allowed";
        dragDropArea.style.cursor = "not-allowed";
        inputName.innerHTML = 'Generating patterns...';  
    

        // Seleccionar el radio adecuado según el valor de patterns
        if (document.getElementById("pattern1Radio").checked === true) {
            patterns = "type";
            
        } else if (document.getElementById("pattern2Radio").checked === true) {
            patterns = "name";
        } else if (document.getElementById("pattern3Radio").checked === true) {           
            patterns = "both";
        }
        
        // Seleccionar el radio adecuado según el valor de flatten
        if (document.getElementById("flatten1Radio").checked === true) {           
            flatten = "no";
        } else if (document.getElementById("flatten2Radio").checked === true) {           
            flatten = "yes";
        }
    
        transformOntology(file, patterns, flatten);
        
        
    } else {
        //Incorrect submit
        alert('There is not a ontology selected');
    }
});

function transformOntology(file, patterns, flatten){
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
            inputName.style.display = 'none';
            responseText.style.display = 'block';
            spinnerLoading.style.display = 'none';
            pattern1Radio.disabled = false;
            pattern2Radio.disabled = false;
            pattern3Radio.disabled = false;
            flatten1Radio.disabled = false;
            flatten2Radio.disabled = false;
            pattern1Radio.style.cursor = "pointer";
            pattern2Radio.style.cursor = "pointer";
            pattern3Radio.style.cursor = "pointer";
            flatten1Radio.style.cursor = "pointer";
            flatten2Radio.style.cursor = "pointer";
            dragDropArea.style.cursor = "pointer";
            
            // Configuración del texto principal
            responseText.innerText = "SUCCESSFULLY COMPLETED"; // response['csv'];
            responseText.style.fontSize = "20px";  // Tamaño de fuente más grande
            responseText.style.fontWeight = "bold"; // Texto en negrita
            responseText.style.color = "green";     // Color verde para indicar éxito
            responseText.style.textAlign = "center"; // Centrar el texto en el elemento
            responseText.style.marginBottom = "0"; // Eliminar margen inferior
            
            // Crear un nuevo elemento para el texto adicional
            const additionalText = document.createElement('span');
            additionalText.innerText = "(To resubmit more ontologies, click on the checkbox or drag your file.)"; // Texto adicional
            additionalText.style.fontSize = "12px"; // Tamaño de la fuente más pequeño
            additionalText.style.color = "#666"; // Color gris para diferenciarlo
            additionalText.style.display = "block"; // Asegura que sea un bloque separado
            additionalText.style.textAlign = "center"; // Centrar el texto adicional
            additionalText.style.marginTop = "0"; // Eliminar margen superior
            additionalText.style.paddingTop = "0"; // Asegura que no haya padding superior
            
            // Añadir el texto adicional debajo del texto principal
            responseText.appendChild(additionalText);
            
            downloadButton.style.backgroundColor = "#4CAF50"; // Cambiar color de fondo
            downloadButton.style.color = "white"; // Cambiar color del texto
            downloadButton.disabled = false; // Habilitar el botón si estaba deshabilitado
            downloadButton.style.cursor = "pointer"; // Cambiar el cursor para indicar que es clicable
            // Añadir la clase border-blink para hacer que el borde del botón parpadee
            downloadButton.classList.add('border-blink');

            // Ejemplo: Para detener el parpadeo después de 10 segundos
            setTimeout(function() {
                downloadButton.classList.remove('border-blink');
            }, 15000);
            
            loadTransformedOntology = true;

            var errors_keys = Object.keys(response['errors']);   

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
        }    
    }
    fd.append('data', file);
    fd.append('patterns', patterns)
    fd.append('flatten', flatten)
    xhr.send(fd);
}

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

//Click event handler for the button 'download' in order to download the zip file
//If there is not a transform ontology loaded => warn the user
//If there is a transform ontology loaded => download it
downloadButton.addEventListener('click', () => {
    downloadButton.classList.remove('border-blink');
    if (loadTransformedOntology) {
        var zipData = {
            'Errors.txt': response['errors'],
            'Structure.csv': response['structure_csv']
        };

        // Añadir archivos según el valor de patterns
        if (patterns === 'type') {
            zipData['Patterns_type.txt'] = response['patterns_type_txt'];
            zipData['Patterns_type.csv'] = response['patterns_type_csv'];
            zipData['Structure_term_type.txt'] = response['structure_type'];
            zipData['Structure_term_inferred_type.txt'] = response['inferred_type'];
        } else if (patterns === 'name') {
            zipData['Patterns_name.txt'] = response['patterns_name_txt'];
            zipData['Patterns_name.csv'] = response['patterns_name_csv'];
            zipData['Structure_term_name.txt'] = response['structure_name'];
            zipData['Structure_term_inferred_blank_nodes.txt'] = response['inferred_blank_nodes'];
        } else if (patterns === 'both') {
            zipData['Patterns_type.txt'] = response['patterns_type_txt'];
            zipData['Patterns_type.csv'] = response['patterns_type_csv'];
            zipData['Patterns_name.txt'] = response['patterns_name_txt'];
            zipData['Patterns_name.csv'] = response['patterns_name_csv'];
            zipData['Structure_term_type.txt'] = response['structure_type'];
            zipData['Structure_term_inferred_type.txt'] = response['inferred_type'];
            zipData['Structure_term_name.txt'] = response['structure_name'];
            zipData['Structure_term_inferred_blank_nodes.txt'] = response['inferred_blank_nodes'];
        }

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


// Cuando el usuario haga clic en el botón, abrir la ventana modal
btn.onclick = function() {

}


// Asignar un evento de clic al botón "Save"
modalSubmit.addEventListener('click', (e) => {
    
    patterns = document.getElementById("patterns").value;
    flatten = document.getElementById("flatten").value;
    modal.style.display = "none";
    

    // Seleccionar el radio adecuado según el valor de patterns
    if (patterns === "type") {
        document.getElementById("pattern1Radio").checked = true;
    } else if (patterns === "name") {
        document.getElementById("pattern2Radio").checked = true;
    } else if (patterns === "both") {
        document.getElementById("pattern3Radio").checked = true;
    }
    
    // Seleccionar el radio adecuado según el valor de flatten
    if (flatten === "no") {
        document.getElementById("flatten1Radio").checked = true;
    } else if (flatten === "yes") {
        document.getElementById("flatten2Radio").checked = true;
    }

    if(!areFieldsFilled()){
        alert("Both fields must be filled in.");
        document.getElementById('myModal').style.display = 'block';
    }
    else if(areFieldsFilled()){
        input.click();
    }
    
    
});

document.getElementById('modal-submit2').addEventListener('click', (e) => {
    const patterns = document.getElementById("patterns2").value;

    // Seleccionar el radio adecuado según el valor de patterns
    if (patterns === "type") {
        document.getElementById("pattern1Radio").checked = true;
    } else if (patterns === "name") {
        document.getElementById("pattern2Radio").checked = true;
    } else if (patterns === "both") {
        document.getElementById("pattern3Radio").checked = true;
    }

    updateMainModalOptions();
    document.getElementById("infoPatterns").style.display = "none";
});

document.getElementById('modal-submit3').addEventListener('click', (e) => {
    const flatten = document.getElementById("flatten2").value;

    // Seleccionar el radio adecuado según el valor de flatten
    if (flatten === "no") {
        document.getElementById("flatten1Radio").checked = true;
    } else if (flatten === "yes") {
        document.getElementById("flatten2Radio").checked = true;
    }

    updateMainModalOptions();
    document.getElementById("infoFlatten").style.display = "none";
});

function updateMainModalOptions() {
    const patternOptionChecked = document.querySelector('input[name="patternOption"]:checked');
    const flattenOptionChecked = document.querySelector('input[name="flattenOption"]:checked');

    const patternsSelect = document.getElementById('patterns');
    const flattenSelect = document.getElementById('flatten');

    // Actualizar select de Patterns si hay un valor seleccionado
    if (patternOptionChecked) {
        if (document.getElementById("pattern1Radio").checked) {
            patternsSelect.value = "type";
        } else if (document.getElementById("pattern2Radio").checked) {
            patternsSelect.value = "name";
        } else if (document.getElementById("pattern3Radio").checked) {
            patternsSelect.value = "both";
        }
    } else {
        patternsSelect.selectedIndex = -1; // Desseleccionar si no hay opción
    }

    // Actualizar select de Flatten si hay un valor seleccionado
    if (flattenOptionChecked) {
        if (document.getElementById("flatten1Radio").checked) {
            flattenSelect.value = "no";
        } else if (document.getElementById("flatten2Radio").checked) {
            flattenSelect.value = "yes";
        }
    } else {
        flattenSelect.selectedIndex = -1; // Desseleccionar si no hay opción
    }
}

document.querySelectorAll('.info').forEach(item => {
    item.addEventListener('click', event => {
        const explanationId = item.id === 'patterns-info' ? 'patterns-explanation' : 'flatten-explanation';
        const content = document.getElementById(explanationId);
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
});

// Close explanation when clicking outside of it
window.addEventListener('click', event => {
    if (!event.target.classList.contains('info')) {
        document.querySelectorAll('.explanation-content').forEach(content => {
            content.style.display = 'none';
        });
    }
});

// Agregar eventos de escucha para mostrar la información emergente
patternsInfo.addEventListener('mouseenter', () => {
    patternsInfo.setAttribute('title', 'Patterns describe how classes are structured in your ontology.');
});

flattenInfo.addEventListener('mouseenter', () => {
    flattenInfo.setAttribute('title', 'Flatten indicates whether collections containing only named classes should be flattened.');
});

// Asignar un evento de clic al botón "Volver atrás"
goBackButton.addEventListener("click", () => {
    // Ocultar la ventana modal
    document.getElementById("myModal").style.display = "none";
});

document.addEventListener('DOMContentLoaded', function() {
    var triggers = document.querySelectorAll('.explanation-trigger-flatten');
    triggers.forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            var targetId = this.getAttribute('data-target');
            var target = document.querySelector('.' + targetId);
            target.style.display = (target.style.display === 'none' || target.style.display === '') ? 'block' : 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var triggers = document.querySelectorAll('.explanation-trigger-patterns');
    triggers.forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            var targetId = this.getAttribute('data-target');
            var target = document.querySelector('.' + targetId);
            target.style.display = (target.style.display === 'none' || target.style.display === '') ? 'block' : 'none';
        });
    });
});

document.getElementById('flatten-info').addEventListener('click', function() {
    patterns = document.getElementById("patterns").value;
    flatten = document.getElementById("flatten").value;

    

    // Seleccionar el radio adecuado según el valor de patterns
    if (patterns === "type") {
        document.getElementById("pattern1Radio").checked = true;
    } else if (patterns === "name") {
        document.getElementById("pattern2Radio").checked = true;
    } else if (patterns === "both") {
        document.getElementById("pattern3Radio").checked = true;
    }
    
    // Seleccionar el radio adecuado según el valor de flatten
    if (flatten === "no") {
        document.getElementById("flatten1Radio").checked = true;
    } else if (flatten === "yes") {
        document.getElementById("flatten2Radio").checked = true;
    }
    updateAndSaveValues();
    infoFlat.style.display = 'block';
});

document.getElementById('patterns-info').addEventListener('click', function() {
    patterns = document.getElementById("patterns").value;
    flatten = document.getElementById("flatten").value;

    // Seleccionar el radio adecuado según el valor de patterns
    if (patterns === "type") {
        document.getElementById("pattern1Radio").checked = true;
    } else if (patterns === "name") {
        document.getElementById("pattern2Radio").checked = true;
    } else if (patterns === "both") {
        document.getElementById("pattern3Radio").checked = true;
    }
    
    // Seleccionar el radio adecuado según el valor de flatten
    if (flatten === "no") {
        document.getElementById("flatten1Radio").checked = true;
    } else if (flatten === "yes") {
        document.getElementById("flatten2Radio").checked = true;
    }
    updateAndSaveValues();
    infoPat.style.display = 'block';
});

// Función para actualizar y guardar valores seleccionados
function updateAndSaveValues() {
    const patternOptionChecked = document.querySelector('input[name="patternOption"]:checked');
    const flattenOptionChecked = document.querySelector('input[name="flattenOption"]:checked');

    const patternsSelect = document.getElementById('patterns');
    const flattenSelect = document.getElementById('flatten');

    const patternsSelect2 = document.getElementById('patterns2');
    const flattenSelect2 = document.getElementById('flatten2');

    // Actualizar y guardar select de Patterns si hay un valor seleccionado
    if (patternOptionChecked) {
        if (document.getElementById("pattern1Radio").checked) {
            patternsSelect.value = "type";
            patternsSelect2.value = "type";
        } else if (document.getElementById("pattern2Radio").checked) {
            patternsSelect.value = "name";
            patternsSelect2.value = "name";
        } else if (document.getElementById("pattern3Radio").checked) {
            patternsSelect.value = "both";
            patternsSelect2.value = "both";
        }
    } else {
        patternsSelect.selectedIndex = -1; // Desseleccionar si no hay opción
        patternsSelect2.selectedIndex = -1;
    }

    // Actualizar y guardar select de Flatten si hay un valor seleccionado
    if (flattenOptionChecked) {
        if (document.getElementById("flatten1Radio").checked) {
            flattenSelect.value = "no";
            flattenSelect2.value = "no";
        } else if (document.getElementById("flatten2Radio").checked) {
            flattenSelect.value = "yes";
            flattenSelect2.value = "yes";
        }
    } else {
        flattenSelect.selectedIndex = -1; // Desseleccionar si no hay opción
        flattenSelect2.selectedIndex = -1;
    }
}

document.getElementById('flatten-info-icon').addEventListener('click', function() {
    updateAndSaveValues();
    infoFlat.style.display = 'block';
});

document.getElementById('patterns-info-icon').addEventListener('click', function() {
    updateAndSaveValues();
    infoPat.style.display = 'block';
});

// Asignar un evento de clic al botón "Volver atrás"
goBackButton2.addEventListener("click", () => {
    // Ocultar la ventana modal
    document.getElementById("infoPatterns").style.display = "none";
});

document.getElementById('go-back3').addEventListener('click', function() {

    document.getElementById("infoFlatten").style.display = "none";
});

function areFieldsFilled() {
    const patternsSelect = document.getElementById('patterns');
    const flattenSelect = document.getElementById('flatten');

    const isPatternSelected = patternsSelect.value !== "";
    const isFlattenSelected = flattenSelect.value !== "";

    return isPatternSelected && isFlattenSelected;
}





// Evento beforeunload para detectar cuando el usuario intenta salir de la página
window.addEventListener('beforeunload', function(event) {
    // Obtener session_id desde sessionStorage
    var session_id = sessionStorage.getItem('session_id');

    // Verificar que session_id no sea null o undefined
    if (session_id) {
        // Enviar una solicitud al servidor para limpiar la sesión
        navigator.sendBeacon('/cleanup', JSON.stringify({ session_id: session_id }));
    }
});











