from flask import Flask, render_template, request, flash, session, redirect, url_for

import os
import copy
from datetime import datetime
import json
import time
import zipfile
from flask import jsonify
import uuid
import shutil
import csv
from source.infer_structures import infer_structures
from source.download_ontology import download_ontologies
from source.create_structure import create_structure
from source.identify_patterns import identify_patterns


app = Flask(__name__)

# Ruta para eliminar la sesión
@app.route("/cleanup", methods=["POST"])
def cleanup():
    try:
        # Obtener los datos JSON de la solicitud
        data = request.get_json()

        # Verificar si 'session_id' está presente en los datos recibidos
        session_id = data.get('session_id')

        if session_id:
            session_folder = os.path.join("data/sessions", session_id)

            # Verificar si la carpeta de sesión existe
            if os.path.exists(session_folder):
                # Intentar eliminar la carpeta
                shutil.rmtree(session_folder)
                print(f"Deleted session folder: {session_folder}")
                return jsonify({"status": "success", "message": "Session folder deleted"}), 200
            else:
                # Si la carpeta no existe, retornar un mensaje de error
                return jsonify({"status": "error", "message": "Session folder not found"}), 404
        else:
            # Si no se proporcionó session_id, retornar un mensaje de error
            return jsonify({"status": "error", "message": "No session ID provided"}), 400

    except Exception as e:
        # Capturar cualquier excepción que pueda ocurrir durante el proceso
        print(f"Error deleting session folder: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500



# Main page
@app.route("/")
def index():
    return render_template("index.html")

# Load secondary web pages
@app.route("/<path:path>")
def send_static(path):
    return render_template(path)


@app.route("/api", methods=["GET", "POST"])
def api():
    # Generar un identificador único para esta sesión
    session_id = str(uuid.uuid4())
    
    if request.method == "POST":
        file = request.files["data"]
        patterns = request.form["patterns"]
        flatten = request.form["flatten"]    
        filename = file.filename
        print(flatten)
        print(patterns)

        if filename == "":
            error = "No file chosen. Please choose a .zip or a .csv file."
            flash(error)
            return redirect(url_for("index"))

        # output file name 
        ttl_filename = filename[:-3] + "ttl"

        # Crear una carpeta única para esta sesión
        os.makedirs("data/sessions", exist_ok=True)
        session_folder = os.path.join("data/sessions", session_id)

        # Carpeta input
        os.makedirs("data/sessions/"+session_id+"/input", exist_ok=True)
        input_path = os.path.join("data/sessions/"+session_id+"/input")

        # Folder called output to store the file (output)
        os.makedirs("data/sessions/"+session_id+"/output", exist_ok=True)
        output_path = os.path.join("data/sessions/"+session_id+"/output", ttl_filename)

        # Folder to store ontologies downloaded by .csv or extracted from .zip
        os.makedirs("data/sessions/"+session_id+"/input/ontos", exist_ok=True)
        ontology_path = os.path.join("data/sessions/"+session_id+"/input/ontos", filename)

        # Folder to store .csv 
        os.makedirs("data/sessions/"+session_id+"/input/csv", exist_ok=True)
        csv_path = os.path.join("data/sessions/"+session_id+"/input/csv", filename)

        # If the file type is .zip
        if filename.endswith('.zip'):
            # Temporal folder to store .zip
            os.makedirs("data/sessions/"+session_id+"/input/zip", exist_ok=True)
            zip_path = os.path.join("data/sessions/"+session_id+"/input/zip", filename)

            # Temporal folder to extract .zip
            os.makedirs("data/sessions/"+session_id+"/input/extract", exist_ok=True)
            extract_path = os.path.join("data/sessions/"+session_id+"/input/extract", filename)

            # Temporal folder to store ontologies
            os.makedirs("data/sessions/"+session_id+"/input/ontos", exist_ok=True)
            ontos_folder = "data/sessions/"+session_id+"/input/ontos"
            file.save(zip_path)

            # Extract the contents of the ZIP file
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(extract_path)

            # Iterate over the extracted files and move them to the folder
            for root, dirs, files in os.walk(extract_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    # Files only .rdf (not directories)
                    if file.endswith('.rdf'):
                        # The path where the files are to be located
                        target_path = os.path.join(ontos_folder, file)
                        os.rename(file_path, target_path)
                        ontology_path = ontos_folder
            # Delete folder used to extract ontologies
            shutil.rmtree("data/sessions/"+session_id+"/input/extract")

        # If the file type is .csv
        if filename.endswith('.csv'):
            file.save(csv_path)

        error_log_path = os.path.join("data/sessions/"+session_id+"/output", 'error_log.txt')
        structure_csv_path = os.path.join("data/sessions/"+session_id+"/output", 'Structure.csv')
        structure_type_path = os.path.join("data/sessions/"+session_id+"/output", 'Structure_term_type.txt')
        structure_name_path = os.path.join("data/sessions/"+session_id+"/output", 'Structure_term_name.txt')
        inferred_type_path = os.path.join("data/sessions/"+session_id+"/output", 'Structure_term_inferred_type.txt')
        inferred_blank_nodes_path = os.path.join("data/sessions/"+session_id+"/output", 'Structure_term_inferred_blank_nodes.txt')
        patterns_type_path = os.path.join("data/sessions/"+session_id+"/output", 'Patterns_type')
        patterns_name_path = os.path.join("data/sessions/"+session_id+"/output", 'Patterns_name')

        # Open the error log file
        with open(error_log_path, "w", encoding='utf-8') as error_log:
            # Empty the file (in case the program has been run before)
            error_log.truncate()

            ontology_path = "data/sessions/"+session_id+"/input/ontos"
            flattenRes = True if flatten == 'yes' else False

            # Calling functions
            try:
                if csv_path:
                    download_ontologies(csv_path, ontology_path, error_log)
            except:
                print("The ontologies have been inserted via .zip")

            create_structure(ontology_path, error_log, flattenRes, structure_csv_path, structure_type_path, structure_name_path)
            infer_structures(inferred_type_path, inferred_blank_nodes_path, structure_type_path, structure_name_path)

            # Se crea con los archivos fijos para los dos tipos
            files_dict = {
                'errors': error_log_path,
                'structure_csv': structure_csv_path,
            }

            # Condicionalmente llamar a identify_patterns según el valor de patterns
            if patterns == 'type':
                identify_patterns(inferred_type_path, patterns_type_path)
                patterns_type_txt_path = os.path.join(f"data/sessions/{session_id}/output", 'Patterns_type.txt')
                patterns_type_csv_path = os.path.join(f"data/sessions/{session_id}/output", 'Patterns_type.csv')

                files_dict.update({
                    'patterns_type_txt': patterns_type_txt_path,
                    'patterns_type_csv': patterns_type_csv_path,
                    'structure_type': structure_type_path,
                    'inferred_type': inferred_type_path
                })

            elif patterns == 'name':
                identify_patterns(inferred_blank_nodes_path, patterns_name_path)
                patterns_name_txt_path = os.path.join(f"data/sessions/{session_id}/output", 'Patterns_name.txt')
                patterns_name_csv_path = os.path.join(f"data/sessions/{session_id}/output", 'Patterns_name.csv')

                files_dict.update({
                    'patterns_name_txt': patterns_name_txt_path,
                    'patterns_name_csv': patterns_name_csv_path,
                    'structure_name': structure_name_path,
                    'inferred_blank_nodes': inferred_blank_nodes_path
                })

            else:
                identify_patterns(inferred_type_path, patterns_type_path)
                identify_patterns(inferred_blank_nodes_path, patterns_name_path)
                patterns_type_txt_path = os.path.join(f"data/sessions/{session_id}/output", 'Patterns_type.txt')
                patterns_type_csv_path = os.path.join(f"data/sessions/{session_id}/output", 'Patterns_type.csv')
                patterns_name_txt_path = os.path.join(f"data/sessions/{session_id}/output", 'Patterns_name.txt')
                patterns_name_csv_path = os.path.join(f"data/sessions/{session_id}/output", 'Patterns_name.csv')

                files_dict.update({
                    'patterns_type_txt': patterns_type_txt_path,
                    'patterns_type_csv': patterns_type_csv_path,
                    'patterns_name_txt': patterns_name_txt_path,
                    'patterns_name_csv': patterns_name_csv_path,
                    'structure_type': structure_type_path,
                    'inferred_type': inferred_type_path,
                    'structure_name': structure_name_path,
                    'inferred_blank_nodes': inferred_blank_nodes_path
                })

        # Crear un nuevo diccionario para almacenar el contenido de los archivos
        file_contents = {}

        # Leer el contenido de cada archivo y guardarlos en el diccionario
        for key, path in files_dict.items():
            try:
                with open(path, 'r', encoding='utf-8') as file:
                    # Para otros archivos de texto, leer el contenido como una cadena
                    file_contents[key] = file.read()
            except Exception as e:
                print(f"Error reading file '{path}': {e}")

        # Combinar el diccionario de rutas de archivos con el diccionario de contenidos de archivos
        files_dict_with_contents = {**files_dict, **file_contents}

        # Devolver el diccionario combinado como un objeto JSON
        return jsonify(files_dict_with_contents)
    


if __name__ == "__main__":
    app.run(debug=True)