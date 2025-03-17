import os

# 폴더 경로 설정
folder_path = "./assets/poster/popular_programs"

# 이미지 파일 가져오기
image_files = [f for f in os.listdir(folder_path) if f.startswith("img_frame-") and f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]

# 이름 변경 규칙 설정
name_map = {0: 'chaebol_son', 1: 'drunk_urban_women', 2: 'twilight', 3: 'Canada_checkin', 4: 'Saturday', 5: 'Show_me_the_money', 6: 'love_catcher', 7: 'useful_job'}
size_map = {0: '_sm', 1: '_md', 2: '_lg'}

for image in image_files:
    name, ext = os.path.splitext(image)  # 파일 이름과 확장자 분리
    
    try:
        num = int(name.replace("img_frame-", ""))  # 숫자 추출
        new_name = name_map[num % 8] + size_map[num // 8] + ext  # 새로운 이름 생성
        old_path = os.path.join(folder_path, image)
        new_path = os.path.join(folder_path, new_name)
        os.rename(old_path, new_path)  # 파일 이름 변경
        print(f'Renamed: {image} -> {new_name}')
    except ValueError:
        print(f'Skipping: {image} (invalid format)')
