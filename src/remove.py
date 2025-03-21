import os
import glob

# 삭제할 파일이 있는 디렉토리 경로
directory = "./src/assets/poster/Quick_VOD/"

# .png 확장자를 가진 모든 파일 찾기
png_files = glob.glob(os.path.join(directory, "*.png"))

# 파일 삭제
for file in png_files:
    try:
        os.remove(file)
        print(f"Deleted: {file}")
    except Exception as e:
        print(f"Error deleting {file}: {e}")

print("PNG 파일 삭제 완료!")
