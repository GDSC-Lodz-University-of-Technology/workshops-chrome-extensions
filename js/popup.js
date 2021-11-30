console.log('popup message');

chrome.storage.sync.get('dark', (result)=>{
    document.querySelector('#dark-mode-toggle').checked = result.dark
})

document.querySelector('#dark-mode-toggle').addEventListener('change', (e)=>{
    const c = e.currentTarget.checked;
    chrome.storage.sync.set({dark: c}, ()=>{
        console.log('changed');
    })
})