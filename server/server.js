const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const fs = require('fs');
const path = require("path");
const app = express();
port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chijack520:rvNa0JLOLBaAPOUz@storyteller.ogcbua2.mongodb.net/?retryWrites=true&w=majority&appName=StoryTeller')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const storySchema = new mongoose.Schema({
    name: String, 
    content: String
});

const Story = mongoose.model('Story', storySchema);

// Route for submitting stories
app.post('/submit-story', async (req, res) => {
    const story = new Story({ name: req.body.name, content: req.body.story }); 
    await story.save();
    res.send('Story received');
    console.log(story);
});

// Route for searching stories
app.get('/search', async (req, res) => {
    const searchTerm = req.query.term;
    const searchResults = await Story.find({ content: new RegExp(searchTerm, 'i') });
    res.json(searchResults);
});

// Route for getting all stories
app.get('/stories', async (req, res) => {
  const stories = await Story.find({});
  res.json(stories);
});

// Route for deleting all stories
app.delete('/delete-stories', async (req, res) => {
  try {
    await Story.deleteMany({});
    res.send('All stories deleted');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Route for uploading voice
const voiceSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String
});

const Voice = mongoose.model('Voice', voiceSchema);
const upload = multer({ storage: multer.memoryStorage() });

//upload voice to mongodb
app.post('/upload_voice', upload.single('upfile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  // 創建一個新的 Voice 物件並儲存到 MongoDB
  const voice = new Voice({
    name: req.file.originalname,
    data: req.file.buffer,
    contentType: 'audio/wav'
  });
  await voice.save();

  // 檔案上傳成功，回傳檔案 ID
  res.send(voice.id);
});

const { spawn } = require('child_process');
const { Readable } = require('stream');

app.get('/voice/:id', async (req, res) => {
  let tempFilePath;
  try {
    const voice = await Voice.findById(req.params.id);
    if (!voice) return res.status(404).send('No voice found with the given id.');

    try {
      // 將 voice.data 寫入一個臨時文件
      tempFilePath = path.join(__dirname, 'tempVoiceData.wav');
      console.log('Writing to temp file: ' + tempFilePath);
      const readable = new Readable();
      readable._read = () => {}; // _read is required but you can noop it
      readable.push(voice.data);
      readable.push(null);
      const writeStream = fs.createWriteStream(tempFilePath);
      readable.pipe(writeStream);
    } catch (err) {
      return res.status(500).send('Error occurred while writing to temp file: ' + err.message);
    }

    try {
      // 呼叫 Python 腳本
      const scriptPath = path.join(__dirname, 'soundProcess.py');
      
      const process = spawn('python', [scriptPath, tempFilePath]);
      console.log('python'+ [scriptPath, tempFilePath])
      let result = '';
      console.log('Python script started '+ tempFilePath);

      process.on('error', (error) => {
        console.error(`Error occurred while spawning Python script: ${error.message}`);
      });

      process.stdout.on('data', (data) => {
        result += data.toString();
        console.log('Python script output: ' + data.toString());  
      });

      process.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
      });

      process.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        if (code !== 0) {
          res.status(500).send('Error occurred while processing sound ' + code);
        } else {
          res.json({ voice, result });
          console.log('Result: ' + result);
        }
        fs.unlink(tempFilePath, (err) => {
          if (err) console.error('Failed to delete temp file: ', err);
          else console.log('Temp file deleted successfully');
        });
      });
      
    } catch (err) {
      return res.status(500).send('Error occurred while running Python script: ' + err.message);
    }
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
});

//listen to port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});