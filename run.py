from flask import Flask, render_template, request, flash, session, redirect, url_for

import source.download_ontology
import source.infer_structures
app = Flask(__name__)

import os
import copy
from datetime import datetime
import json
import time

from source import download_ontology
import source.create_structure
import source.identify_patterns
import source.infer_types

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

        # Temporal folder called input to store the zip file (input)
        os.makedirs("data/input/zip", exist_ok=True)
        ontology_path = os.path.join("data/input", filename)

        #Temporal folder to store csv (input)
        os.makedirs("data/input/csv", exist_ok=True)
        csv_path = os.path.join("data/input/csv", filename)

        
        # Store the ontologies
        if filename.endswith('.zip'):      
            file.save(ontology_path)
        elif filename.endswith('.csv'):
            file.save(csv_path)


        # Temporal folder called output to store the ttl file (output)
        os.makedirs("data/output", exist_ok=True)
        output_path = os.path.join("data/output", ttl_filename)


        error_log_path = os.path.join(output_path, 'error_log.txt')
        structure_csv_path = os.path.join(output_path, 'Structure.csv')
        structure_type_path = os.path.join(output_path, 'Structure_term_type.txt')
        structure_name_path = os.path.join(output_path, 'Structure_term_name.txt')
        inferred_type_path = os.path.join(output_path, 'Structure_term_inferred_type.txt')
        inferred_blank_nodes_path = os.path.join(output_path, 'Structure_term_inferred_blank_nodes.txt')
        patterns_type_path = os.path.join(output_path, 'Patterns_type')
        patterns_name_path = os.path.join(output_path, 'Patterns_name')
        
        # Create a new file in which to write the logs 
        error_log = open(error_log_path , "w", encoding='utf-8')
        # Empty the file (in case the program has been run before)
        error_log.truncate()
        
        #xml_error_generated = True
        flatten = False;
        pattern = type;

        if csv_path != '':
            root = source.download_ontology.download_ontologies(csv_path, ontology_path, error_log)
        
        source.create_structure.create_structure(ontology_path, error_log, flatten, structure_csv_path, structure_type_path, structure_name_path );
        source.infer_structures.infer_structures(inferred_type_path, inferred_blank_nodes_path, structure_type_path, structure_name_path);

        # Has the user specified that the patterns are going to be created from the name of the terms?
        source.identify_patterns.identify_patterns(inferred_type_path, patterns_type_path);
        source.identify_patterns.identify_patterns(inferred_blank_nodes_path, patterns_name_path);

        app.main(ontology_path, csv_path, output_path, pattern, flatten)


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

        #return {'ttl_data': turtle_file_string, "errors": new_errors, "new_namespaces": new_namespaces, 'xml_error_generated': xml_error_generated, 'xml_error_file': xml_error_file, 'warnings': new_warnings}

