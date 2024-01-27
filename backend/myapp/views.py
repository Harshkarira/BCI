import pickle
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import os
import pandas as pd
import pdfplumber
from sklearn.ensemble import RandomForestClassifier

# Load the pickled model
model_path = os.path.join(settings.BASE_DIR, 'pickle files', 'BCI_model.pkl')

with open(model_path, 'rb') as model_file:
    clf = pickle.load(model_file)

# Set feature names to suppress the warning
clf.feature_names = ['POW.F3.Theta', 'POW.F3.BetaL', 'POW.F4.Theta', 'POW.F4.BetaL']

def hello_world(request):
    return HttpResponse("Hello, World!")

def extract_values_from_pdf(file_path):
    # Extract text from the PDF using pdfplumber
    with pdfplumber.open(file_path) as pdf:
        text_content = ''
        for page in pdf.pages:
            text_content += page.extract_text()

    # Sample logic to extract the four values
    pow_f3_theta, pow_f3_beta_l, pow_f4_theta, pow_f4_beta_l = None, None, None, None

    # Split the text by lines to extract the values
    lines = text_content.split('\n')
    for line in lines:
        if 'POW.F3.Theta:' in line:
            pow_f3_theta = float(line.split(':')[1].strip())
        elif 'POW.F3.BetaL:' in line:
            pow_f3_beta_l = float(line.split(':')[1].strip())
        elif 'POW.F4.Theta:' in line:
            pow_f4_theta = float(line.split(':')[1].strip())
        elif 'POW.F4.BetaL:' in line:
            pow_f4_beta_l = float(line.split(':')[1].strip())

    return pow_f3_theta, pow_f3_beta_l, pow_f4_theta, pow_f4_beta_l

@csrf_exempt
def file_upload_view(request):
    if request.method == 'POST':
        # Assuming 'pdfFile' is the name of the file input in your form
        uploaded_file = request.FILES.get('pdfFile')
        
        if not uploaded_file:
            response_data = {'error': 'No file provided'}
            return JsonResponse(response_data, status=400)
        
        # Save the uploaded file to the 'uploads' folder
        file_path = os.path.join(settings.UPLOADS_DIR, uploaded_file.name)
        with open(file_path, 'wb') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

        # Extract values from the PDF
        pow_f3_theta, pow_f3_beta_l, pow_f4_theta, pow_f4_beta_l = extract_values_from_pdf(file_path)

        # Make predictions using the machine learning model
        # ...

# Make predictions using the machine learning model
        input_data = pd.DataFrame([[pow_f3_theta, pow_f3_beta_l, pow_f4_theta, pow_f4_beta_l]], columns=['POW.F3.Theta', 'POW.F3.BetaL', 'POW.F4.Theta', 'POW.F4.BetaL'])
        predicted_attention_span = clf.predict(input_data)[0]

# ...


        # Process the extracted values and prediction as needed
        # For now, let's just return them in the response
        response_data = {
            'message': 'File received and processed successfully',
            'file_path': file_path,
            'pow_f3_theta': pow_f3_theta,
            'pow_f3_beta_l': pow_f3_beta_l,
            'pow_f4_theta': pow_f4_theta,
            'pow_f4_beta_l': pow_f4_beta_l,
            'predicted_attention_span': predicted_attention_span,
        }
        
        return JsonResponse(response_data)
    else:
        response_data = {'error': 'Invalid request method'}
        return JsonResponse(response_data, status=400)
