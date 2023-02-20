let content = document.querySelector('.contentArea')
let data;
fetch('data.json')
  .then(response => response.json())
  .then(res =>{
      console.log('data:',res)
      data = res;
  }).catch(error => console.log('ERROR:',error))
setTimeout(() => {
  let tags;
  let keywordsBox = document.querySelector('.keywords');
  let clearBtn;
addFilter()
  function addFilter(toFilterItem) {
    if (keywordsBox.children.length === 0) {
      keywordsBox.parentElement.style.display = 'none';
    } else {
      keywordsBox.parentElement.style.display = 'flex';
    }
    const htmlString = data.map((item) => {
      let keys = [item.level, item.role,...item.languages, ...item.tools]
      let tags = keys.map((ele) => {
        return `
           <span class="tag">${ele}</span>
        `
      }).join('')
   if (toFilterItem !== undefined) {
     if (keys.includes(toFilterItem)) {
       return `
       <div class="jobOption">
         <div class="jobProfile">
             <img src=${item.logo} alt="job title">
         </div>
       <div class="basicInfo">
         <div class="jobInformation">
            <div class="jobHeader-tags">
                <h3 class="jobHeader">${item.company}</h3>
                <div class="jobTags">
                  <span class="jobTag" style="display:${item.new ? "flex":"none"}">NEW!</span>
                  <span class="jobTag" style="display:${item.featured ? "flex":"none"};background-color:hsl(180, 14%, 20%)">FEATURED</span>
               </div>
            </div>
         </div>

         <div class="jobsPosition">
          <h3 class="jobPosition">${item.position}</h3>
         </div>

         <div class="jobsDetails">
          <span class="postingTime detail">${item.postedAt} ~ </span>
          <span class="duration detail">${item.contract} ~ </span>
          <span class="location detail">${item.location}</span>
         </div>
         </div>
          <hr>
         <div class="tags">
           ${tags}
         </div>
       </div>
       `
     } else {
       return null;
     }
   } else {
     return `
     <div class="jobOption">
       <div class="jobProfile">
           <img src=${item.logo} alt="job title">
       </div>
     <div class="basicInfo">
       <div class="jobInformation">
          <div class="jobHeader-tags">
              <h3 class="jobHeader">${item.company}</h3>
              <div class="jobTags">
                <span class="jobTag" style="display:${item.new ? "flex":"none"}">NEW!</span>
                <span class="jobTag" style="display:${item.featured ? "flex":"none"};background-color:hsl(180, 14%, 20%)">FEATURED</span>
             </div>
          </div>
       </div>

       <div class="jobsPosition">
        <h3 class="jobPosition">${item.position}</h3>
       </div>

       <div class="jobsDetails">
        <span class="postingTime detail">${item.postedAt} ~ </span>
        <span class="duration detail">${item.contract} ~ </span>
        <span class="location detail">${item.location}</span>
       </div>
       </div>
        <hr>
       <div class="tags">
         ${tags}
       </div>
     </div>
     `
   }

  }).join('')
  content.innerHTML = htmlString;
  tags = document.querySelectorAll('.tag')
  keywordsBox = document.querySelector('.keywords')
  clearBtn = document.querySelector('.clearBtn')
  let removeBtn = document.querySelectorAll('.removeBtn')
  tags.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      console.log('clicked');
      keywordsBox.innerHTML += `<div class="key">
      <h3>${e.target.textContent}</h3>
      <img src="images/icon-remove.svg" class="removeBtn"/>
      </div>`
      addFilter(e.target.textContent)
    })
  });
  clearBtn.addEventListener('click', () => {
    keywordsBox.innerHTML = ''
  })
  removeBtn.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        e.target.parentElement.style.display = 'none'
      })
  });

  }

 },400)
