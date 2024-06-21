# OntoDrop identify and extract patterns from a collection of ontologies
## Description
The purpose of this website is to improve the usability of an ontological design pattern identification system. Despite the importance of patterns in the construction of ontologies, there is currently a great lack of open and accessible tools that facilitate the systematic identification and generation of these patterns. Our tool will facilitate the identification and extraction of patterns from a collection of ontologies.

## How to use the tool
You have several options to use this tool.

### The web application:
   1. Go to OntoDrop Patterns web application.<br>
   2. Read the guide if this is your first time on the site.<br>
   3. Fill in the optional parameters in point 1) Choose options.<br>
   4. Prepare your ontologies in a .zip or .csv file.<br>
   5. Attach your ontologies in point 2)Upload your ontologies here.<br>
   6. Wait for the pattern extraction and download them.<br>
   
## Preparing the local environment
To run the tool locally in Windows we need to perform the following process:<br>
   1. The first thing to do is to have Python, Virtualenv and Flask downloaded on your device.<br>
   2. Declare the variable: $env:FLASK_APP = "run.py". Inside the following file: OntoDrop-Patterns\env\Scripts\activate.ps1.<br>
   3. Activate the environment with the following command:<br>
      `env\Scripts\activate.ps1`<br>
   4. We launch the application with the command:<br>
      `python -m flask run`<br>
   5. Our application is up and running.<br>
   
## How to execute the tool
The tool can be executed via the command line as follows:<br>

`app.py [-h] [-ontology ONTOLOGY_PATH] [-csv CSV_PATH] [-output OUTPUT_PATH] [-patterns {type,name,both}] [-flatten {yes,no}]`

where:

-ONTOLOGY_PATH is the path to a folder where the ontologies are going to be downloaded. The patterns are going to be identified using the ontologies stored in this folder<br>
-CSV_PATH is the path to the csv file indicating what ontologies are going to be downloaded. This parameter is optional. If this parameter is not specified, it is assumed that the ontologies are already downloaded and are located in ONTOLOGY_PATH.<br>
-OUTPUT_PATH is the path a folder where the output is going to be stored. This parameter is optional. If this parameter is not specified, it is assumed that the output is going to be stored in the current directory.<br>
-PATTERNS is a flag to indicate if the patterns are going to be created from the type of the terms or from the name of the terms or from both. This parameter is optional. By default the patterns are going to be creaded just by the type of the terms.<br>
-FLATTEN is a flag to indicate if the collections are going to be flattened if they only contain named classes. This parameter is optional. By default the collections are not going to be flattened.<br>


