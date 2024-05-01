from flask import Flask, render_template, request, flash, session, redirect, url_for

app = Flask(__name__)

import os
import copy
from datetime import datetime
import json
import time
import zipfile
from source.infer_structures import infer_structures
from source.download_ontology import download_ontologies
from source.create_structure import create_structure
from source.identify_patterns import identify_patterns



@app.route("/")
def index():
    return render_template("index.html")

# Load secondary web pages
@app.route("/<path:path>")
def send_static(path):
    return render_template(path)


@app.route("/api", methods=["GET", "POST"])
def api():
    if request.method == "POST":
        #inicio = time.time()
        file = request.files["data"]
        filename = file.filename

        if filename == "":
            error = "No file choosen. Please choose a diagram."
            flash(error)
            return redirect(url_for("index"))

        # output file name 
        ttl_filename = filename[:-3] + "ttl"

        # Temporal folder called input to store ontologies
        os.makedirs("data/input/ontos", exist_ok=True)
        ontology_path = os.path.join("data/input/ontos", filename)

        #Temporal folder to store csv (input)
        os.makedirs("data/input/csv", exist_ok=True)
        csv_path = os.path.join("data/input/csv", filename)

        #Temporal folder to store zip (input)
        os.makedirs("data/input/zip", exist_ok=True)
        zip_path = os.path.join("data/input/zip", filename)

        #Temporal folder to extract .zip
        os.makedirs("data/input/extract", exist_ok=True)
        extract_path = os.path.join("data/input/extract", filename)

        os.makedirs("data/input/ontos", exist_ok=True)
        ontos_folder = "data/input/ontos"  # Guardar la ruta base de las ontologías

        
        # Store the ontologies
        if filename.endswith('.zip'):      
            file.save(zip_path)


            # Extraer el contenido del archivo ZIP
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(extract_path)

            # Iterar sobre los archivos extraídos y moverlos a la carpeta deseada
            for root, dirs, files in os.walk(extract_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    # Mover solo los archivos (no directorios) a la carpeta de ontologías
                    if file.endswith('.rdf'):
                        # Aquí defines la ruta donde deseas mover los archivos
                        target_path   = os.path.join(ontos_folder, file)
                        os.rename(file_path, target_path )
                        ontology_path = ontos_folder
                
           


        if filename.endswith('.csv'):
            file.save(csv_path)
           


        # Temporal folder called output to store the ttl file (output)
        os.makedirs("data/output", exist_ok=True)
        output_path = os.path.join("data/output", ttl_filename)


        error_log_path = os.path.join("data/output", 'error_log.txt')
        structure_csv_path = os.path.join("data/output", 'Structure.csv')
        structure_type_path = os.path.join("data/output", 'Structure_term_type.txt')
        structure_name_path = os.path.join("data/output", 'Structure_term_name.txt')
        inferred_type_path = os.path.join("data/output", 'Structure_term_inferred_type.txt')
        inferred_blank_nodes_path = os.path.join("data/output", 'Structure_term_inferred_blank_nodes.txt')
        patterns_type_path = os.path.join("data/output", 'Patterns_type')
        patterns_name_path = os.path.join("data/output", 'Patterns_name')
    
     
        
        # Create a new file in which to write the logs 
        error_log = open(error_log_path , "w", encoding='utf-8')
        # Empty the file (in case the program has been run before)
        error_log.truncate()
        
        
         # Cast string to boolean
        #flatten = True if flatten_lists == 'yes' else False
        #xml_error_generated = True
        flatten = False
        pattern = type

        if csv_path != '':
            download_ontologies(csv_path, ontology_path, error_log_path)
        
        create_structure(ontology_path, error_log_path, flatten, structure_csv_path, structure_type_path, structure_name_path )
        infer_structures(inferred_type_path, inferred_blank_nodes_path, structure_type_path, structure_name_path)

        # Has the user specified that the patterns are going to be created from the name of the terms?
        identify_patterns(inferred_type_path, patterns_type_path)
        identify_patterns(inferred_blank_nodes_path, patterns_name_path)
        error_log.close()

        return {'errors': error_log_path,
                 "csv": structure_csv_path,
                   "structure_type": structure_type_path,
                     'structure_name': structure_name_path,
                       'inferred_type': inferred_type_path,
                         'patterns_type': patterns_type_path,
                         'patterns_name': patterns_name_path}
        

        # try:
        #     # Transforming the diagram
        #     root = read_drawio_xml(input_path)
        #     turtle_file_string, xml_file_string, new_namespaces, errors, warnings = transform_ontology(root)
        # except:
        #     return {'ttl_data': "", "errors": {'Server Error': {'message': 'Server error, review the input diagram'}}, 'new_namespaces': {}, 'xml_error_generated': False, 'xml_error_file': "", 'warnings': ""}

        # try:
        #     xml_error_file, xml_error_generated = generate_xml_error(input_path, errors, os.path.join("data/output", filename[:-3] + "xml"))
        # except:
        #     errors['Server Error'] = {'message': 'Server error, something wrong happened trying to generate the xml file with the errors'}
        #     xml_error_generated = False
        #     xml_error_file = ""
        

        # write output file in the tmp folder
        #with open(output_path, "w") as file:
        #    file.write(turtle_file_string)

        # Eliminating keys that do not contain errors
        #new_errors = {}
        #for key, error in errors.items():
        #    if len(error) > 0:
        #        new_errors[key] = error
        
        # Eliminating keys that do not contain warnings
        #new_warnings = {}
        #for key, warning in warnings.items():
        #    if len(warning) > 0:
        #        new_warnings[key] = warning

        #session["ttl_filename"] = ttl_filename

        # store the results of the converter in the database
        # user = User(date = datetime.now(), input = input_path, output = ttl_filepath, errors = errors)
        # user.save()

        #fin = time.time()
        #print(fin-inicio)

        

