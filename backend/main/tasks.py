
# main/tasks.py
from celery import shared_task
import pickle
from PIL import Image
import io

# Загружаем модель при старте
MODEL_PATH = '/app/ml/ml_model.pkl'

try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@shared_task
def recognize_math_expression(image_data):
    """
    Распознать математическое выражение из изображения
    """
    try:
        if model is None:
            return {
                'success': False,
                'error': 'Model not loaded',
                'expression': '',
                'result': ''
            }
        
        # Конвертируем bytes в изображение PIL
        image = Image.open(io.BytesIO(image_data))
        
        # Конвертируем в grayscale
        if image.mode != 'L':
            image = image.convert('L')
        
        # Конвертируем PIL в numpy array для OpenCV
        # img_array = np.array(image)
        
        # Здесь должна быть логика обработки изображения:
        # 1. Найти символы
        # 2. Выделить каждый символ
        # 3. Подготовить для модели (28x28)
        # 4. Распознать каждый символ
        # 5. Собрать выражение
        # 6. Вычислить результат
        
        # Временная заглушка
        expression = "12+34"
        result = 46.0
        
        return {
            'success': True,
            'expression': expression,
            'result': str(result),
            'task_id': recognize_math_expression.request.id
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'expression': '',
            'result': ''
        }

@shared_task
def process_uploaded_image(sheet_id, image_data, user_id):
    """
    Полная обработка загруженного изображения
    """
    try:
        # Распознаем выражение
        recognition_result = recognize_math_expression(image_data)
        
        if not recognition_result['success']:
            return recognition_result
        
        # Здесь можно сохранить результат в базу данных
        from .models import MathsExpression, Sheet
        from django.contrib.auth.models import User
        
        try:
            sheet = Sheet.objects.get(id=sheet_id)
            user = User.objects.get(id=user_id)
            
            expression = MathsExpression.objects.create(
                expression_text=recognition_result['expression'],
                calculation_result=float(recognition_result['result']),
                sheet=sheet,
            )
            
            recognition_result['expression_id'] = expression.id
            recognition_result['saved'] = True
            
        except Exception as db_error:
            recognition_result['saved'] = False
            recognition_result['db_error'] = str(db_error)
        
        return recognition_result
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }
