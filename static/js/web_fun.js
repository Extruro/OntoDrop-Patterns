const dragDropArea = document.getElementById('drag-drop-area');
const input = dragDropArea.querySelector('#fileElem');
const inputName = dragDropArea.querySelector('#drag-text');
const submitButton = document.getElementById('submit');
const downloadButton = document.getElementById('download');

//Button to download an xml file which helps users to detect the errors in their diagrams
const downloadButtonXmlErrorFile = document.getElementById('download-xml-errors');


const responseText = document.getElementById('response');
const errorReport = document.getElementById('error-report');
const warningReport = document.getElementById('warning-report');

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
let loadTransformedDiagram = false;
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
    inputName.innerHTML = 'Drag and drop your diagram or click to choose your file';
});