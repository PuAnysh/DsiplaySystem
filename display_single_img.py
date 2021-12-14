import cv2
import os
img_name = '0000069_02480_d_0000007'

img_path = 'D:\\dataset\\VisDrone2019-DET-val\\images\\' + img_name + '.jpg'

anno_path = 'D:\\dataset\\VisDrone2019-DET-val\\annotations\\' + img_name + '.txt'

CLASS = ('pedestrian', 'people', 'bicycle', 'car', 'van',
               'truck', 'tricycle', 'awning-tricycle', 'bus', 'motor')

def draw_img(img_path, anno_path):
    img = cv2.imread(img_path)
    anno = open(anno_path)
    colors = (0, 255, 0)
    font = cv2.FONT_HERSHEY_COMPLEX_SMALL
    recs = []
    for rec in anno.readlines():
        x,y,w,h,s,_cls,truncation,occlusion = [int(_) for _ in rec.split(',')]
        # if _cls == 0:
        if _cls in list(range(1,11)):
            recs.append([x,y,x+w,y+h, _cls-1])
    for rec in recs:
        cv2.rectangle(img, (rec[0], rec[1]), (rec[2], rec[3]), colors, 1)
        cv2.putText(img, CLASS[rec[4]], (rec[0], rec[1]-10), font, 1.2, (0, 255, 0), 1)
        # img[rec[1]:rec[3],rec[0]:rec[2],:] = 0
    anno.close()
    return img


def get_ignore(img_name):
    anno_path = 'D:\\dataset\\VisDrone2019-DET-val\\annotations\\' + img_name + '.txt'
    anno = open(anno_path)
    recs = []
    for rec in anno.readlines():
        x,y,w,h,s,_cls,truncation,occlusion = [int(_) for _ in rec.split(',')]
        if _cls == 0:
            recs.append([x,y,x+w,y+h])
    anno.close()
    return recs

if __name__ == '__main__':
    img_list = os.listdir('D:\\dataset\\VisDrone2019-DET-val\\images\\')
    for img in img_list:
        img_name = img.split('.')[0]
        img_path = 'D:\\dataset\\VisDrone2019-DET-val\\images\\' + img_name + '.jpg'
        anno_path = 'D:\\dataset\\VisDrone2019-DET-val\\annotations\\' + img_name + '.txt'
        out = draw_img(img_path, anno_path)
        cv2.imwrite('D:\\dataset\\VisDrone2019-DET-val-gt\\' + img, out)

