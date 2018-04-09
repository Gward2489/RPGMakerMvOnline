from data_manager.models import SAVE_FILE
from django.http import HttpResponse
from django.http import HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def save(request):
    if request.method == 'POST':
        savefileId = request.POST['saveFileId']
        data = request.POST['dataString']

        file = SAVE_FILE(save_file_id=savefileId, save_file=data)
        file.save()

        response = "Game was saved"
        return HttpResponse(response)
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def load(request):
    if request.method == 'GET':
        data = SAVE_FILE.objects.get(save_file_id=1).save_file
        print(data)
        return HttpResponse(data)
    else:
        return HttpResponseNotAllowed(['GET'])
