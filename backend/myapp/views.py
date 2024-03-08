import pickle
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import os
import pandas as pd
import pdfplumber
from sklearn.ensemble import RandomForestClassifier

# Load the pickled models
# model 1
attention_model_path = os.path.join(settings.BASE_DIR, 'pickle files', 'BCI_model.pkl')

with open(attention_model_path, 'rb') as attention_model_file:
    attention_clf = pickle.load(attention_model_file)

# model 2
order_model_path = os.path.join(settings.BASE_DIR, 'pickle files', 'BCI_order.pkl')

with open(order_model_path, 'rb') as order_model_file:
    order_clf = pickle.load(order_model_file)

# model 3
memory_model_path = os.path.join(settings.BASE_DIR, 'pickle files', 'BCI_memory.pkl')

with open(memory_model_path, 'rb') as memory_model_file:
    memory_clf = pickle.load(memory_model_file)

# Set feature names to suppress the warning
attention_clf.feature_names = ['POW.F3.Theta', 'POW.F3.BetaL', 'POW.F4.Theta', 'POW.F4.BetaL','POW.F3.Gamma','POW.F4.Gamma','POW.F7.Gamma','POW.F8.Gamma','POW.T7.Gamma','POW.T8.Gamma','POW.F7.Theta','POW.F8.Theta','POW.T7.Theta','POW.T8.Theta',]

order_clf.feature_names = ['POW.F3.Theta', 'POW.F3.BetaL', 'POW.F4.Theta', 'POW.F4.BetaL','POW.F3.Gamma','POW.F4.Gamma','POW.F7.Gamma','POW.F8.Gamma','POW.T7.Gamma','POW.T8.Gamma','POW.F7.Theta','POW.F8.Theta','POW.T7.Theta','POW.T8.Theta',]

memory_clf.feature_names = ['POW.F3.Theta', 'POW.F3.BetaL', 'POW.F4.Theta', 'POW.F4.BetaL','POW.F3.Gamma','POW.F4.Gamma','POW.F7.Gamma','POW.F8.Gamma','POW.T7.Gamma','POW.T8.Gamma','POW.F7.Theta','POW.F8.Theta','POW.T7.Theta','POW.T8.Theta',]

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
    pow_f3_gamma, pow_f4_gamma, pow_f7_gamma, pow_f8_gamma = None, None, None, None
    pow_t7_gamma, pow_t8_gamma, pow_f7_theta, pow_f8_theta = None, None, None, None
    pow_t7_theta, pow_t8_theta = None, None

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
        elif 'POW.F3.Gamma:' in line:
            pow_f3_gamma = float(line.split(':')[1].strip())
        elif 'POW.F4.Gamma:' in line:
            pow_f4_gamma = float(line.split(':')[1].strip())
        elif 'POW.F7.Gamma:' in line:
            pow_f7_gamma = float(line.split(':')[1].strip())
        elif 'POW.F8.Gamma:' in line:
            pow_f8_gamma = float(line.split(':')[1].strip())
        elif 'POW.T7.Gamma:' in line:
            pow_t7_gamma = float(line.split(':')[1].strip())
        elif 'POW.T8.Gamma:' in line:
            pow_t8_gamma = float(line.split(':')[1].strip())
        elif 'POW.F7.Theta:' in line:
            pow_f7_theta = float(line.split(':')[1].strip())
        elif 'POW.F8.Theta:' in line:
            pow_f8_theta = float(line.split(':')[1].strip())
        elif 'POW.T7.Theta:' in line:
            pow_t7_theta = float(line.split(':')[1].strip())
        elif 'POW.T8.Theta:' in line:
            pow_t8_theta = float(line.split(':')[1].strip())

    return pow_f3_theta, pow_f3_beta_l, pow_f4_theta, pow_f4_beta_l, pow_f3_gamma, pow_f4_gamma, pow_f7_gamma, pow_f8_gamma, pow_t7_gamma, pow_t8_gamma, pow_f7_theta, pow_f8_theta, pow_t7_theta, pow_t8_theta

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
        pow_f3_theta, pow_f3_beta_l, pow_f4_theta, pow_f4_beta_l, pow_f3_gamma, pow_f4_gamma, pow_f7_gamma, pow_f8_gamma, pow_t7_gamma, pow_t8_gamma, pow_f7_theta, pow_f8_theta, pow_t7_theta, pow_t8_theta = extract_values_from_pdf(file_path)

        # Make predictions using the machine learning model
        # ...

# Make predictions using the machine learning model 
        # making predictions for attention span 
        attention_input_data = pd.DataFrame([[pow_f3_theta, pow_f3_beta_l, pow_f4_theta, pow_f4_beta_l]], columns=['POW.F3.Theta', 'POW.F3.BetaL', 'POW.F4.Theta', 'POW.F4.BetaL'])
        predicted_attention_span = attention_clf.predict(attention_input_data)[0]


        # making predictions for cognitive ordering
        order_input_data = pd.DataFrame([[pow_f3_gamma, pow_f3_beta_l, pow_f4_gamma, pow_f4_beta_l]], columns=['POW.F3.Gamma', 'POW.F3.BetaL', 'POW.F4.Gamma', 'POW.F4.BetaL'])
        predicted_order = order_clf.predict(order_input_data)[0]

        # making predictions for memory 
        memory_input_data = pd.DataFrame([[pow_f7_gamma,pow_f8_gamma,pow_t7_gamma,pow_t8_gamma,pow_f7_theta,pow_f8_theta,pow_t7_theta,pow_t8_theta]], columns=['POW.F7.Gamma','POW.F8.Gamma','POW.T7.Gamma','POW.T8.Gamma','POW.F7.Theta','POW.F8.Theta','POW.T7.Theta','POW.T8.Theta'])
        predicted_memory = memory_clf.predict(memory_input_data)[0]

        predictions = [predicted_attention_span, predicted_order, predicted_memory]

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
            'pow_f3_gamma': pow_f3_gamma,
            'pow_f4_gamma': pow_f4_gamma,
            'pow_f7_gamma': pow_f7_gamma,
            'pow_f8_gamma': pow_f8_gamma,
            'pow_t7_gamma': pow_t7_gamma,
            'pow_t8_gamma': pow_t8_gamma,
            'pow_f7_theta': pow_f7_theta,
            'pow_f8_theta': pow_f8_theta,
            'pow_t7_theta': pow_t7_theta,
            'pow_t8_theta': pow_t8_theta,
            'predictions':predictions
        }
        
        return JsonResponse(response_data)
    else:
        response_data = {'error': 'Invalid request method'}
        return JsonResponse(response_data, status=400)
