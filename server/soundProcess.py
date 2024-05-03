import librosa
import numpy as np
import sys

def process_sound(filename):
    try:
        # 使用Librosa加載音頻文件
        y, sr = librosa.load(filename)
        
        # 計算音頻的頻譜
        D = librosa.stft(y)
        S = np.abs(D)

        # 將頻譜轉換為頻率
        freqs = librosa.fft_frequencies(sr=sr)

        # 選擇一個適當的頻率範圍，以排除噪音
        min_freq = 85  # 適當的最低頻率
        max_freq = 255  # 適當的最高頻率

        # 計算在所選的頻率範圍內的頻率平均值
        mask = (freqs >= min_freq) & (freqs <= max_freq)
        mean_freq_hz = np.sum(freqs[mask] * np.sum(S[mask, :], axis=1)) / np.sum(S[mask, :])

        #print(f"人聲頻率平均值: {mean_freq_hz:.2f} Hz")
        an = range_judgment(int(mean_freq_hz))
        #print(an)
        return an

    except Exception as e:
        print(f"Python Error occurred while processing sound file: {e}")
        return None



def range_judgment(freq_hz):
    img_dict = {"101": "02.png", "102": "03.png", "103": "04.png", "104": "05.png", "105": "06.png", "106": "07.png",
                "107": "08.png", "108": "09.png", "109": "10.png", "110": "11.png", "111": "12.png", "112": "13.png",
                "113": "14.png", "114": "15.png", "115": "16.png", "116": "17.png", "117": "18.png", "118": "19.png",
                "119": "20.png", "120": "21.png", "121": "22.png", "122": "23.png", "123": "24.png", "124": "25.png",
                "125": "26.png", "126": "27.png", "127": "28.png", "128": "29.png", "129": "30.png", "130": "31.png",
                "131": "32.png", "132": "33.png", "133": "34.png", "134": "35.png", "135": "36.png", "136": "37.png",
                "137": "38.png", "138": "39.png", "139": "40.png", "140": "41.png", "141": "42.png", "142": "43.png"}

    image_path = "../static/img/voice_img/"
    if 100 >= freq_hz:
        image_path = image_path + "01.png"
        return image_path

    elif freq_hz <= 198:
        num = freq_hz + 1
        a = str(num)[1:]
        image_path = image_path + str(a) + ".png"
        return image_path

    elif freq_hz < 250:
        num = freq_hz + 1
        a = str(num)[1:]
        image_path = image_path + "1" + str(a) + ".png"
        return image_path

    elif freq_hz >= 250:
        image_path = image_path + "152.png"
        return image_path
    




if __name__ == "__main__":
    # 檢查是否有提供命令行參數
    if len(sys.argv) != 2:
        print("Usage: python soundProcess.py <file_path>")
        sys.exit(1)

    # 從命令行參數獲取音檔的路徑
    file_path = sys.argv[1]
    print(process_sound(file_path))

