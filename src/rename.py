import os

# 폴더 경로 설정
folder_path = "./assets/poster/LIVE"

# 이미지 파일 가져오기
image_files = [f for f in os.listdir(folder_path) if f.startswith("img_frame-") and f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]

# 이름 변경 규칙 설정
# 영어로 하기 ㅠㅠ
name_map = {0: 'JTBC', 1: 'tvN', 2: 'YTN', 3: 'JTBC2', 4: '연합뉴스TV', 5: '투니버스'}
size_map = {0: '_sm', 1: '_md', 2: '_lg'}

for image in image_files:
    name, ext = os.path.splitext(image)  # 파일 이름과 확장자 분리
    
    try:
        num = int(name.replace("img_frame-", ""))  # 숫자 추출
        new_name = name_map[num % 6] + size_map[num // 6] + ext  # 새로운 이름 생성
        old_path = os.path.join(folder_path, image)
        new_path = os.path.join(folder_path, new_name)
        os.rename(old_path, new_path)  # 파일 이름 변경
        print(f'Renamed: {image} -> {new_name}')
    except ValueError:
        print(f'Skipping: {image} (invalid format)')
