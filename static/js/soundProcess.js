/*const Meyda = require('meyda');
const fs = require('fs');
const path = require('path');

function processSound(filename) {
    let audioFile, buffer, audioData, D, S, freqs, mask, mean_freq_hz, an;

    try {
        audioFile = path.join(process.cwd(), "uploadFile", filename);
        console.log(`讀取音頻文件: ${audioFile}`);
    } catch (error) {
        console.error(`讀取音頻文件時發生錯誤: ${error}`);
    }

    try {
        buffer = fs.readFileSync(audioFile);
        audioData = new Float32Array(buffer.buffer);
    } catch (error) {
        console.error(`加載音頻文件時發生錯誤: ${error}`);
    }

    try {
        D = Meyda.extract('spectralFlux', audioData);
        S = Math.abs(D);
    } catch (error) {
        console.error(`計算音頻的頻譜時發生錯誤: ${error}`);
    }

    try {
        freqs = Meyda.extract('frequency', audioData);
    } catch (error) {
        console.error(`轉換頻譜為頻率時發生錯誤: ${error}`);
    }

    const min_freq = 85;  // 適當的最低頻率
    const max_freq = 255;  // 適當的最高頻率

    try {
        mask = freqs.filter(freq => freq >= min_freq && freq <= max_freq);
        mean_freq_hz = mask.reduce((sum, freq) => sum + freq) / mask.length;
    } catch (error) {
        console.error(`計算頻率平均值時發生錯誤: ${error}`);
    }

    try {
        console.log(`人聲頻率平均值: ${mean_freq_hz.toFixed(2)} Hz`);
        an = rangeJudgment(Math.round(mean_freq_hz));
        console.log(`圖片路徑: ${an}`);
    } catch (error) {
        console.error(`處理音頻文件時發生錯誤: ${error}`);
    }

    return an;
}

function rangeJudgment(freqHz) {
    let imagePath = "../static/img/voice_img/";

    if (freqHz <= 100) {
        imagePath += "01.png";
        return imagePath;
    } else if (freqHz <= 198) {
        const num = freqHz + 1;
        const a = String(num).slice(1);
        imagePath += a + ".png";
        return imagePath;
    } else if (freqHz < 250) {
        const num = freqHz + 1;
        const a = String(num).slice(1);
        imagePath += "1" + a + ".png";
        return imagePath;
    } else {
        imagePath += "152.png";
        return imagePath;
    }
}*/

/*if (require.main === module) {
    const a = "E:/桌面/版本3(1226)/Web-test/uploadFile/recorder.mp3";
    processSound(a);
}*/