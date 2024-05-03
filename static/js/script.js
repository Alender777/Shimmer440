
function showDetails() {
    // Get the modal and its components
    var modal = document.getElementById("myModal");
    var modalImage = document.getElementById("modalImage");
    var modalTitle = document.getElementById("modalTitle");
    var modalDescription = document.getElementById("modalDescription");
  
    // Set the modal content based on the clicked element
    modalImage.src = "../img/tiles/forever.png"; // Update with your image source
    modalTitle.innerText = "Lizzy";
    modalDescription.innerText = "在我高中的時候，除了平常要學習大考要讀的的學科外，我有額外的興趣—寫作。我從小對文字的理解能力很高，對於文字的形音義這種基本文字素養很了解，但是我卻很喜歡把文字拿去「操弄」，從作文、新詩到古詩、詞，各種文體都是我的挑戰範圍。然而在台灣的大考制度底下，這種非學科外的興趣往往不是主流，時常會聽聞別人建議我放棄的聲音，令我幾度想要放棄創作。直到我遇到了高二的國文老師，她叫玫瑰，她喜歡人家叫她Rose，由名知人，她是一個非常颯爽又溫暖的老師，對於我的創作這件愛好非常鼓勵，常常會給我許多建議，我也在她的鼓勵下去參加創作比賽，不斷修正我的寫法，後來也拿下了新詩組第一名。這讓我非常的想感謝她，如果不是她告訴我可以堅持夢想，對於自己喜歡的事物可以去勇敢嘗試，不斷修正，我想我也不會獲得這麼好的成績，也不會對自己的這項興趣保有熱忱。她是我非常想感謝的老師，不只教我知識而已，更多的是對我的興趣的肯定，讓我從此對夢想的態度改觀，變得正向積極，影響我很深，非常感謝有她。"; // Update with your description
  
    // Display the modal
    modal.style.display = "block";
  }
  
  function closeModal() {
    // Close the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  











// 當時我第一次有了兄弟姊妹，他很小也很可愛，是我夢寐以求的小夥伴，但是現實並沒有我想像的那麼美好，
// 所有人都圍著他轉，被冠上姐姐之名後，都因為是姐姐而被訓話，開頭前一句都是“你已經是姐姐了”，
// 或許是小孩子心性作祟，覺得不被家人關注，家人更多時間花在弟弟身上，獨佔七年家人關注的我，覺得自己
// 領地被侵犯。但是漸漸的看著他長大，不知不覺我也跟著成長許多，或許是因為習慣有或者是找到解決辦法，
// 我也逐漸包容這個奇葩小孩，很感謝他有機會讓我學習，對小孩有耐性也是因他逐漸養成，學習如何成為姐姐。



// 尊敬的外公：

// 我是你的孫女，現在是一名學生。我想寫這封信表達我對你的感激和歉意。

// 以前，我常常對未來感到焦慮。雖然我喜歡參與課外活動，並能專注在自己的學業上，但我的個性太過內向
// ，常常在活動中不能很好的展現自我，也不太懂得與人交流，長期下來給予自己很多壓力，卻不知道怎麼釋放
// 。然而，我渴求能找到追求自我發展的矛盾自我，卻也常常忽略身邊人的關心。
// 在這樣的生活中，我也沒有好好陪伴你。當你身上出現腫瘤的消息傳來時，我下意識地不想面對它可能以後會
// 離開我的可能，我不想讓自己難過，所以在你癌症進手術房後我都沒有回去看你。
// 雖然我知道媽媽比誰都還要辛苦，但我自私地不想分擔這一切。直到有一天，當我在學校參加活動時，接到了
// 你離開的消息。我瞬間感到心痛，因為我錯過了與你見面的機會，錯過了向你表達我的愛和感激之情。
// 在你走後，我感到非常後悔，對於沒有好好陪伴你，我感到非常的抱歉。我很感激你在我成長過程中的照顧和
// 關愛，你教導我做人的道理和對家人的愛，讓我懂得感恩和珍惜身邊的人。我也要向你保證，我會好好地跟家人
// 相處，並珍惜我們之間的每一刻。我希望你在之後能順利，我永遠愛你，外公。

// 感恩的孫女









// $(document).ready(function() {

//     $('.gotop a').click(function(event) {
//          event.preventDefault();
//          $('html,body').animate({scrollTop: 0}, 700);
//         });
    
//     });
    

// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 頁面載入後執行的初始化工作
    loadStories(); // 可以在頁面載入時加載現有故事
});

function searchStories() {
    // 實現搜尋故事的功能
    const searchInput = document.getElementById('searchInput').value;
    // 根據搜索條件進行過濾並更新 storiesContainer
    // (這部分可以在後端實現，前端發送請求即可)
}


function uploadStory() {
    // 獲取表單數據，上傳故事到後端
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('authorInput').value;
    const content = document.getElementById('contentInput').value;

    // 使用 fetch 或其他方式將數據發送到後端
    fetch('/api/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, content }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Story uploaded:', data);
        // 上傳成功後，重新加載故事列表
        loadStories();
        // 可以根據後端的回應進行相應的處理，例如顯示成功消息或重置表單
    })
    .catch(error => {
        console.error('Error uploading story:', error);
    });
}

function loadStories() {
    $.ajax({
        url: 'http://localhost:3000/stories', // 請改成你的伺服器放 stories 的網址
        type: 'GET',
        success: function(stories) {
            $('#storiesContainer').empty();
            console.log("Number of stories:", stories.length);
            
            var storiesDiv = $('<div class="story-img"></div>');
            $('#storiesContainer').append(storiesDiv);

            stories.slice(0, 3).forEach(function(story, index) {
                var storyDiv = $(`<div class="story-img${index + 1}"></div>`);      
                storyDiv.append(`
                    <a href="/images/html.png"><img src="../static/img/tiles/forever.png" alt=""></a>
                    <h2>${story.name}</h2>
                    <p>${story.content.length > 32 ? story.content.substring(0, 32) + '...' : story.content}</p>
                `);
                storiesDiv.append(storyDiv);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching stories:', textStatus, errorThrown);
        }
      });
}

function createStoryElement(story) {
    // 創建故事元素
    const storyDiv = document.createElement('div');
    storyDiv.classList.add('story-img');

    const storyImg = document.createElement('div');
    storyImg.innerHTML = `<a href="#"><img src="${story.image}" alt=""></a>`;
    storyDiv.appendChild(storyImg);

    const storyInfo = document.createElement('div');
    storyInfo.innerHTML = `
        <h2>${story.title}</h2>
        <p>${story.content}</p>
    `;
    storyDiv.appendChild(storyInfo);

    return storyDiv;
}
