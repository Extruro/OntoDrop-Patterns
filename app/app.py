<!DOCTYPE html>
<style>



*{
    box-sizing: border-box;
}


#sidebar{
    width: 400px;
}

#logo{
    width: 150px;
}

.showcase{
    background-image: linear-gradient(120deg, #155799, #159957);
    min-height:400px;
}

#title{
    font-size: 70px;
}

.secondary-text{
    color: #c3c3c3;
}

.link{
    text-decoration: none;
    color: #c3c3c3;
}

.link:hover{
    color: #e2e2e2;
    text-decoration: underline;
}

.footer-logo{
    width: 30%;
}

.video{
    height: 100%;
}

.drop-area{
    border-radius: 5px;
    border-style: dashed;
    height: 313px;
    position: relative;
    overflow: scroll;
}

.drag-text{
    text-align: center;
    position: absolute;
    left: 45px;
    right: 45px;
    top: 110px;

}

.drag-button{
    background-color:#155799;
    color: white;
    width: 49%;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}

#toc{
    position: fixed;
    height: 100vh;
    overflow: auto;
}

.main-tag{
    position: absolute;
    color: lightcoral;
    border: lightcoral solid;
    border-radius: 5px;
    padding: 0.25rem;
    width: 100px;
}

.alt-tag{
    position: absolute;
    color: lightslategray;
    border: lightslategray solid;
    border-radius: 5px;
    padding: 0.25rem;
    width: 100px;
}

.row-height{
    height: 100px;
}

.row {
    display: flex;
    justify-content: space-between; /* Distribuir las columnas uniformemente en la fila */
    margin: 120px;
}

.column {
    flex: 1;
    margin: 0 100px; /* Espacio horizontal entre cada columna */
    text-align: center;
}



#response{
    padding-left: 10px;
    padding-top: 10px;
    padding-right: 10px;
}


.options{
    border-bottom: rgb(151, 151, 151) solid 1px;
}


.btn {
    background-color: blue;
    color: white;
}

.btn:hover {
    background-color: rgb(173, 230, 204); /* Cambiar el color de fondo cuando el mouse está sobre el botón */
}

.selected{
    background-color: white;
    border: rgb(151, 151, 151) solid 1px;
}

.tabulacion:first-letter {
	margin-left: 15px;
}
.tabulacion2:first-letter {
	margin-left: 30px;
}
.black-letter {
	font-weight: bold;
}
.contenedor-imagenes {
    display: flex;
}
.contenedor-imagenes img:first-child {
    margin: right;
}

.image{
    max-width: 100%;
    width: 225px;
    height: 225px;
    margin: 20px;
    padding: 20px;
    display: inline-block;
    margin: auto;
}

#imageOEG{
    max-width: 100%;
    width: 225px;
    height: 225px;
}

.image-caption{
    margin: 20px;
    padding: 5px;
}

div.img{
    display:table;
}

div.img span{
    line-height:normal;
    font-size:20px;
    display:table-caption;
    margin:0;
    font-style:italic;
    padding:5px;
    text-align:center;
}

.job-title{
    color:#155799;
}

.job-title-2{
    text-align:center;
    font-weight: bold;
}

.imagen-pequena {
    width: 70px;
    height: 70px;
}

.navbar-nav li {
    transition: all 0.3s ease;
}
.navbar-nav li:hover {
    transform: translateY(-3px); 
}





</style>








<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="static/css/new_style.css">

    <title>OntoDrop Patterns</title>

</head>
<body>

    <!--Navbar-->
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <img id="logo" src="imagenes/logo.png" alt="Logo">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto fw-bold" style="font-size: 18px;">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">How to use?</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="examples.html">Examples</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">About</a>
                        </li>
                    </ul>
                    <!-- <a href="https://github.com/oeg-upm/Chowlk" target="_blank"><i class="bi bi-github h4 text-dark"></i></a> -->
                </div>
            </div>
        </nav>
    </header>
    
        


    <!--Showcase-->
    <section class="showcase pt-5 px-5 text-light">
        <div class="container text-center pt-5"> 
            <h1 id="title" class="pt-4 pb-2">OntoDrop Patterns</h1>
            <p class="lead pb-3">OntoDrop identify and extract patterns from a collection of ontologies.</p>
            <!--<div class="py-1">
                <p class="fw-bold mb-1">Contact:</p>
                <p>María Poveda-Villalón <br>
                    Contact email: chowlk@delicias.dia.fi.upm.es</p>
            </div>
            <div class="py-1">
                <p class="fw-bold mb-1">Authors:</p>
                <p class="px-3 secondary-text">
                    <a class="link" href="https://thepetiteontologist.wordpress.com/" target="_blank">
                        María Poveda-Villalón
                    </a> 
                    (<a class="link" href="https://oeg.fi.upm.es/" target="_blank">Ontology Engineering Group</a>, <a class="link" href="https://www.upm.es/" target="_blank">Universidad Politécnica de Madrid)</a><br>

                    <a class="link" href="http://www.garcia-castro.com/" target="_blank">
                        Raúl García-Castro
                    </a> 
                    (<a class="link" href="https://oeg.fi.upm.es/" target="_blank">Ontology Engineering Group</a>, <a class="link" href="https://www.upm.es/" target="_blank">Universidad Politécnica de Madrid)</a><br>
                    
                    <a class="link" href="https://www.linkedin.com/in/sergio-mario-carulli-p%C3%A9rez-7632b5217/" target="_blank">
                        Sergio-Mario Carulli-Pérez
                    </a> 
                    (<a class="link" href="https://oeg.fi.upm.es/" target="_blank">Ontology Engineering Group</a>, <a class="link" href="https://www.upm.es/" target="_blank">Universidad Politécnica de Madrid)</a><br>

                    <a class="link" href="https://www.linkedin.com/in/serge-chavez-feria/" target="_blank">
                        Serge Chávez-Feria
                    </a> 
                    (<a class="link" href="https://oeg.fi.upm.es/" target="_blank">Ontology Engineering Group</a>, <a class="link" href="https://www.upm.es/" target="_blank">Universidad Politécnica de Madrid)</a>
                </p>
            </div> -->
        </div>
    </section>

    <!--Instructions-->
    <!-- <section class="content pt-5 px-5">
        <div class="container">
            <h4>Instructions</h4>
            <ol>
                <li>Download the Chowlk template (<a class="link-primary" href="static/resources/chowlk-library-complete.xml" download="chowlk-library-complete">complete</a> or <a class="link-primary" href="static/resources/chowlk-library-lightweight.xml" download="chowlk-library-lightweight">lightweight</a> version).</li>
                <li>Open diagrams.net (web or desktop)</li>
                <li>In diagrams.net go to  File > Open Library from > Device ...</li>
                <li>Select the library downloaded.</li>
                <li>Make your conceptualization using the block that will appear on the side bar.</li>
                <li>Download the diagram in xml format.</li>
                <li>Drag and drop your model in the Service dropping area and download your TTL file.</li>
            </ol>

        </div>
    </section> -->


    <!--Service-->
    <section class="container" >
        <div class="row justify-content-center" style="margin-top: 20px;">
            
                <!--<div class="col-lg-6 pt-2">
                    <h4>How to use it</h4>
                    <video class="w-100" controls>
                        <source src="static/resources/getting-started.mp4" type="video/mp4">
                        Your browser does not support HTML video.
                    </video>
                </div> -->

                <div class="col-lg-8 pt-2 text-dark text-center">
                    <h4 class="mb-4">SERVICE</h4>
                    <div class="drop-area" id="drag-drop-area">
                        <p class="lead text-dark drag-text" id="drag-text">Drag and drop your ontology or click to choose your file</p>
                        <div id="response" style="display: none;"></div>
                        <input type="file" id="fileElem" style="display: none;">
                    </div>
                    <div class="d-flex justify-content-between">
                        <button class="btn mt-2 drag-button" id="submit">Submit</button>
                        <button class="btn mt-2 drag-button" id="download">Download Pattern</button>
                    </div>


                </div>
            
        </div>
        
    </section>

    <!--Descriptions about web-->
    <section class="row">
        <div class="column">
            <img src="imagenes/clock.png" alt="Imagen 1" class="imagen-pequena">
            <h5>Quick and easy.</h5>
            <p>Drag and drop the files onto the page and click the generate button.</p>
        </div>
        <div class="column">
            <img src="imagenes/security.png" alt="Imagen 2" class="imagen-pequena">
            <h5>Guaranteed security.</h5>
            <p>Secure file transfers.</p>
        </div>
        <div class="column">
            <img src="imagenes/compatibility.png" alt="Imagen 3" class="imagen-pequena">
            <h5>Compatibility.</h5>
            <p>The tool works with different formats and sizes of ontologies.</p>
        </div>
    </section>
    
    


    
    <!--Error Report-->

    <section id="error-report" class="pt-3 px-5" style="display: none;">
        <div class="container">
            <h4>Error Reporting</h4>

            <!--Download the xml file with the marked errors-->
            <div id="xml-errors" style="display: none;">
                <p>You can download an xml file with the errors marked in red:</p>
                <button class="btn mt-2 drag-button" id="download-xml-errors">Download XML file report</button>
            </div>

            <!--Namespaces-->
            <div id="new-namespaces" style="display: none;">
                <p>The following namespaces were found in the ontology but not in the namespace declaration block. We created new namespaces
                    that are listed bellow, please check them:
                </p>
                <div id="textNamespaces"></div>
            </div>
            

            <!--Errors-->
            <div class="accordion" id="accordionExample">
                <div class="accordion-item" id="concepts-item" style="display: none;">
                    <h2 class="accordion-header" id="heading01">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#concepts">
                            Concepts
                        </button>
                    </h2>
                    <div id="concepts" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="concepts-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="attributes-item" style="display: none;">
                    <h2 class="accordion-header" id="heading02">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#attributes">
                            Attributes
                        </button>
                    </h2>
                    <div id="attributes" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="attributes-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="arrows-item" style="display: none;">
                    <h2 class="accordion-header" id="heading03">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#arrows">
                            Arrows
                        </button>
                    </h2>
                    <div id="arrows" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="arrows-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="ellipses-item" style="display: none;">
                    <h2 class="accordion-header" id="heading04">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#ellipses">
                            Ellipses
                        </button>
                    </h2>
                    <div id="ellipses" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="ellipses-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="namespaces-item" style="display: none;">
                    <h2 class="accordion-header" id="heading05">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#namespaces">
                            Namespaces
                        </button>
                    </h2>
                    <div id="namespaces" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="namespaces-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="metadata-item" style="display: none;">
                    <h2 class="accordion-header" id="heading06">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#metadata">
                            Metadata
                        </button>
                    </h2>
                    <div id="metadata" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="metadata-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="rhombuses-item" style="display: none;">
                    <h2 class="accordion-header" id="heading07">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#rhombuses">
                            Rhombuses
                        </button>
                    </h2>
                    <div id="rhombuses" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="rhombuses-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="individual-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#individual">
                            Individuals
                        </button>
                    </h2>
                    <div id="individual" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="individual-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="hexagons-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#hexagons">
                            Hexagons
                        </button>
                    </h2>
                    <div id="hexagons" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="hexagons-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="cardinalityRestrictions-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#cardinalityRestrictions">
                            Cardinality Restrictions
                        </button>
                    </h2>
                    <div id="cardinalityRestrictions" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="cardinalityRestrictions-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="intersectionOf-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#intersectionOf">
                            Intersections
                        </button>
                    </h2>
                    <div id="intersectionOf" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="intersectionOf-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="oneOf-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#oneOf">
                            Enumerations
                        </button>
                    </h2>
                    <div id="oneOf" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="oneOf-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="complementOf-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#complementOf">
                            Complements
                        </button>
                    </h2>
                    <div id="complementOf" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="complementOf-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="unionOf-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#unionOf">
                            Unions
                        </button>
                    </h2>
                    <div id="unionOf" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="unionOf-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="relation-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#relation">
                            Relations
                        </button>
                    </h2>
                    <div id="relation" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="relation-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="syntax-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#syntax">
                            Syntax
                        </button>
                    </h2>
                    <div id="syntax" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="syntax-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="base-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#base">
                            Base
                        </button>
                    </h2>
                    <div id="base" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="base-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="ontology-uri-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#ontology-uri">
                            Ontology uri
                        </button>
                    </h2>
                    <div id="base" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="ontology-uri-body">
                        </div>
                    </div>
                </div>

                <div class="accordion-item" id="server-error-item" style="display: none;">
                    <h2 class="accordion-header" id="heading08">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#server-error">
                            Server Error
                        </button>
                    </h2>
                    <div id="server-error" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="server-error-body">
                        </div>
                    </div>
                </div>

            </div>
            

        </div>
    </section>

    <!--Footer-->
    <footer class="footer py-2">
        <div class="container">
            <hr>
            <div class="row">
                <div class="col">
                    <img id="logo" src="imagenes/logo.png" alt="Logo">             
                </div>
                <div class="col-3 ms-auto" style="margin-top: 20px;">
                    <a href="https://oeg.fi.upm.es/" target="_blank"><img class="footer-logo" src="imagenes/oeg-logo.gif" alt=""></a>
                    <a id="fi-logo" href="https://www.fi.upm.es/" target="_blank"><img class="footer-logo" src="imagenes/fi-logo.png" alt=""></a>
                    <a href="https://www.upm.es/" target="_blank"><img class="footer-logo" src="imagenes/upm-logo.png" alt=""></a>
                </div>
            </div>
        </div>
    </footer>

    <script src="static/js/new_converter.js"></script>

</body>
</html>